import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, MiniMap, Controls, Handle } from 'react-flow-renderer';

const FlowComponent = ({ data }) => {

  // check incoming data
  console.log(data);

  // declare elements array to store table nodes and edges
  const elements = [];
  
  // declare coordinate variables for table node positions/mapping
  let positionX = 0;
  let positionY = 0;
  let row = 0;

  // Iterate through each table...
  for (const key in data) {
    
    // initialize tableName, tableName as key, table to value
    const tableName = key;
    const table = data[key];

    // declare primary / foreign key variables
    let primaryKey = false;
    let foreignKeys = [];
    
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
          sourceHandle: column.column_name
        }
        // append edge object to elements array
        elements.push(edge);
      }

      // append columnName and hasForeignKey to foreignKeys array
      foreignKeys.push([column.column_name, hasForeignKey])
      
      // return new column and data type to render in newNode
      return (
        <p>{column.column_name} 
          <span style={{color: 'gray', alignText: 'right'}}>
            {column.data_type}
          </span>
        </p>
      )
    });

    // create a new node object
    const newNode = {
      id: tableName,
      type: 'special',
      data: { 
        label:
          <div>
            <h3>{tableName}</h3>
            {columns}
          </div>,
        pk: primaryKey,
        fk: foreignKeys
      },
      position: { x: positionX, y: positionY }, 
    };

    // assign table position
    row += 1;
    positionY += 500;
    if (row % 2 === 0) {
      positionY = 0;
      positionX += 300;
    }

    // push newNode and edge into elements array
    elements.push(newNode);
  }

  return (
    <div style={{ height: 800 }}>
      <ReactFlow elements={elements} nodeTypes={nodeTypes} defaultZoom={0}>
        <Background
          variant="dots"
          gap={12}
          size={0.5}
        /> 
        {/* <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case 'input':
                return 'red';
              case 'default':
                return '#00ff00';
              case 'output':
                return 'rgb(0,0,255)';
              default:
                return '#eee';
            }
          }}
          nodeStrokeWidth={3}
        /> */}
        <Controls />
      </ReactFlow>

    </div>
  );
}

// Custom Node
const CustomNode = ({ data }) => {
  let index = 75;
  let key = 0;
  return (
    <div style={customNodeStyles}>
      
      {/* table data */}
      <div>{data.label}</div>

      {/* primary key handle */}
      {data.pk ? (
        <Handle
          type="target"
          position="right"
          id={`${data.id}`}
          key={key++}
          style={{ top: `${index}px`, borderRadius: 5 }}
        />
      ) : (
        ''
      )}

      {/* foreign key handles */}
      {data.fk.map((el) => {
        if (el[1] === true) {
          return (
            <Handle
              type="source"
              position="left"
              id={`${el[0]}`}
              key={key++}
              style={{ top: `${index += 20}px`, borderRadius: 5 }}
            />
        )} else {
          index += 30;
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
  backgroundColor: 'lightgray',
  color: 'black',
  padding: 10,
  borderRadius: 5,
};

export default FlowComponent;