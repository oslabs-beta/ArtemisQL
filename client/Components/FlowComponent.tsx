import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, Handle } from 'react-flow-renderer';
import SchemaComponent from './SchemaComponent';

const FlowComponent = ({ data, schema, resolvers }) => {

  // check incoming data
  console.log(data);

  // declare elements array to store table nodes and edges
  const elements = [];
  
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
    const foreignKeys = [];
    
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
        const edge = {
          id: count++,
          source: tableName,
          target: column.foreign_table,
          sourceHandle: column.column_name,
          style: { stroke: '#93c763' },
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
            <div style={container}>
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
// style={customNodeStyles}
// Custom Node
const CustomNode = ({ data }) => {
  let index = 111;
  let key = 0;
  return (
    <div>
      
      {/* table data */}
      {data.label}

      {/* primary key handle */}
      {data.pk ? (
        <Handle
          type="target"
          position="right"
          id={`${data.id}`}
          key={key++}
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
              position="left"
              id={`${el[0]}`}
              key={key++}
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
  backgroundColor: '#eeeeee',
  fontFamily: "JetBrains Mono",
  //fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  color: "#403D39",
  borderRadius: 5,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#8cbbad",
  // transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",

};

const titleStyles = {
  // background: "#eeeeee",
  // background: "#8cbbad",
  // background: "#78909c",
  fontSize: '16px',
  background: '#282b2e',
  color: "rgb(54, 172, 170)",
  textAlign: "center",
  padding: "5px 20px",
  //borderColor: "#8cbbad",
  //borderStyle: 'solid',
  //borderWidth: 2,
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px"
};

const container = {
  padding: 10,
};
export default FlowComponent;