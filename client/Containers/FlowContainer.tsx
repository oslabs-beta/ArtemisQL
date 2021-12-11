import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, Handle } from 'react-flow-renderer';
import SchemaComponent from '../Components/SchemaComponent';

type Elements = object[];

type Edge = {
  id: number;
  source: string;
  target: string;
  sourceHandle: string;
  style: object;
  animated: boolean;
};

const FlowContainer = ({ data, schema, resolvers }) => {
  
  // declare elements array to store table nodes and edges
  const elements: Elements = [];
  
  // declare coordinate variables for table node positions/mapping
  let positionX = 100;
  let positionY = 200;
  let row = 0;

  // Iterate through each table...
  for (const key in data) {
    // initialize tableName, tableName as key, table to value
    const tableName = key;
    const title = tableName.toUpperCase();
    const table = data[key];

    // declare primary / foreign key variables
    let primaryKey = false;
    const foreignKeys: [any] = [''];
    
    //console.log('tableName', tableName)
    //console.log('table', table);

    // Iterate through each column of each table creating creating columnName and dataType rows
    const columns = table.map((column) => {
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
          style: { stroke: '#00009f' },
          animated: true,
        };
        // append edge object to elements array
        elements.push(edge);
      }

      // append columnName and hasForeignKey to foreignKeys array
      foreignKeys.push([column.column_name, hasForeignKey]);
      
      // return new column and data type to render in newNode
      return (
        <p>{column.column_name} 
          <span style={{color: 'gray', paddingLeft: 5}}>
            {column.data_type}
          </span>
        </p>
      );
    });

    // create a new node object
    const newNode = {
      id: tableName,
      type: 'special',
      data: { 
        label:
          <div style={customNodeStyles}>
            <div style={titleStyles}>
              <h3>{title}</h3>
            </div>
            <div style={containerStyles}>
              {columns}
            </div>
          </div>,
        pk: primaryKey,
        fk: foreignKeys,
      },
      position: { x: positionX, y: positionY }, 
    };

    // assign table position
    row += 1;
    positionY += 600;
    if (row % 2 === 0) {
      positionY = 200;
      positionX += 400;
    }

    // push newNode and edge into elements array
    elements.push(newNode);
  }

  return (
    <div>
      <ReactFlow elements={elements} nodeTypes={nodeTypes} defaultZoom={0.66}>
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
      {data.fk.map((el) => {
        if (el[0] === '_id') index = 111;
        else if (el[1] === true) {
          return (
            <Handle
              type="source"
              id={`${el[0]}`}
              position="left"
              style={{ top: `${index += 37}px`, borderRadius: 5, backgroundColor: '#E10098' }}
            />
        )} else {
          index += 37;
        } 
      })}
    </div>
  );
};

// assign custom node to special type
const nodeTypes = {
  special: CustomNode,
};

// CSS styling for custom node
const customNodeStyles = {
  color: "#403D39",
  backgroundColor: '#eeeeee',
  fontFamily: "JetBrains Mono",
  borderRadius: 5,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#8cbbad",
  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
};

const titleStyles = {
  background: '#282b2e',
  fontSize: '16px',
  color: "rgb(54, 172, 170)",
  textAlign: "center",
  padding: "5px 20px",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px"
};

const containerStyles = {
  padding: 10,
};

export default FlowContainer;