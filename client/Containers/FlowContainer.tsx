import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, Handle } from 'react-flow-renderer';
import SchemaComponent from '../Components/SchemaComponent';

// TYPE DEFINITIONS
type Elements = any[];

type Edge = {
  id: number;
  source: string;
  target: string;
  sourceHandle: string;
  style: object;
  animated: boolean;
};

type Node = {
  id: string | number;
  type: string;
  data: object;
  position: object; 
};

type NodeType = {
  special: object;
}

type Props = {
  data: object;
  schema: string;
  resolvers: string;
}

// RENDERS TABLE NODES & SCHEMA COMPONENT
const FlowContainer = ({ data, schema, resolvers }: Props) => {
  
  // declare elements array to store table nodes and edges
  const elements: Elements = new Array();
  
  // declare coordinate variables for table node positions/mapping
  let positionX = 100;
  let positionY = 250;
  let row = 0;

  // Iterate through each table...
  for (const key in data) {
    // assign key to tableName and its value(array of columns) as table
    const tableName = key;
    const table = data[key];
    // capitalize table name and assign it to node title
    const title = tableName.toUpperCase();
    // declare primary / foreign key variables
    let primaryKey = false;
    const foreignKeys: any = [];

    // iterate through each column of each table creating creating columnName and dataType rows
    const columns = table.map((column: any) => {
      let count = 0;
      let hasForeignKey = false;
      
      // check for primary key
      if (column.constraint_type === 'PRIMARY KEY') primaryKey = true;
      // check for foreign keys 
      else if (column.constraint_type === 'FOREIGN KEY') {
        hasForeignKey = true;
        // declare an object to store edges
        const edge: Edge = {
          id: count++,
          source: tableName,
          target: column.foreign_table,
          sourceHandle: column.column_name,
          style: { stroke: "#00009f" },
          animated: true,
        };
        // append edge object to elements array
        elements.push(edge);
      }

      // append columnName and hasForeignKey to foreignKeys array
      foreignKeys.push([column.column_name, hasForeignKey]);
      
      // return new column and data type to render in newNode
      return (
        <p>
          {column.column_name} 
          <span style={{color: "gray", paddingLeft: 5}}>
            {column.data_type}
          </span>
        </p>
      );
    });

    // create a new node object
    const newNode: Node = {
      id: tableName,
      type: 'special',
      data: { 
        label:
          <div style={customNodeStyle}>
            <div style={titleStyle}>
              <h3>{title}</h3>
            </div>
            <div style={containerStyle}>
              {columns}
            </div>
          </div>,
        pk: primaryKey,
        fk: foreignKeys,
      },
      position: { x: positionX, y: positionY }, 
    };

    // assign table node position
    row += 1;
    positionY += 600;
    if (row % 2 === 0) {
      positionY = 250;
      positionX += 400;
    }

    // append new node to elements array
    elements.push(newNode);
  }

  return (
    <div>
      <ReactFlow elements={elements} nodeTypes={nodeTypes} defaultZoom={0.6}>
        <Background
          style={{backgroundColor: '#fafafa'}}   
          variant="dots"
          gap={12}
          size={0.5}
        /> 
        <Controls />
      </ReactFlow>
      <SchemaComponent schema={schema} resolvers={resolvers} />
    </div>
  );
};

// Custom Node Component
const CustomNode = ({ data }) => {
  // initial handle position
  let index = 111;
  return (
    <div>
      
      {/* table data */}
      {data.label}

      {/* primary key handle */}
      {data.pk ? (
        <Handle
          type="target"
          id={`${data.id}`}
          position="right"
          style={{ top: `${index}px`, borderRadius: 5, backgroundColor: '#E10098' }}
        />
      ) : (
        ''
      )}

      {/* foreign key handles */}
      {data.fk.map((el: [string, boolean]) => {
        if (el[0] === '_id') index = 111;
        else if (el[1] === true) {
          return (
            <Handle
              type="source"
              id={`${el[0]}`}
              position="left"
              style={{ top: `${index += 37}px`, borderRadius: 5, backgroundColor: "#E10098" }}
            />
        )} else {
          index += 37;
        } 
      })}
    </div>
  );
};

// assign custom node to special type
const nodeTypes: NodeType = {
  special: CustomNode,
};

// COMPONENT STYLING
const customNodeStyle = {
  color: "#403D39",
  backgroundColor: "#eeeeee",
  fontFamily: "JetBrains Mono",
  borderRadius: 5,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#8cbbad",
  transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
};

const titleStyle = {
  background: "#282b2e",
  fontSize: "16px",
  color: "#36acaa",
  TextAlign: "center",
  padding: "5px 20px",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px"
};

const containerStyle = {
  padding: 10,
};

export default FlowContainer;