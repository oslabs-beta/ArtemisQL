import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, MiniMap, Controls, Handle } from 'react-flow-renderer';

function FlowComponent({ data }) {
  const elements = [
    // Connect Nodes
    { id: 'can be what ever', source: 'films', target: 'people', sourceHandle: 'b'}
    // { id: '1-2', source: '1', target: '2', sourceHandle: 'a'},
    // { id: '1-3', source: '1', target: '3', sourceHandle: 'a', targetHandle: 'b'},
    // { id: '2-3', source: '2', target: '3', sourceHandle: 'b'},
    // { id: '3-4', source: '3', target: '4', sourceHandle: 'a'},
    // { id: '4-5', source: '4', target: '5', sourceHandle: 'a'},
    // { id: '5-6', source: '5', target: '6', sourceHandle: 'b'},
    // { id: '6-7', source: '6', target: '7', sourceHandle: 'a'}
  ];
  // Populating our element array of nodes so react flow can render them.
  let positionX = 0;
  let positionY = 0;
  let row = 0;
  
  // Iterates through all the tables
  for (const key in data) {
    console.log('tables', key);
    // columns is an array of objects
    const columns = data[key];
    console.log('columns', columns);
    // Iterate through all the columns of a specific table to get the column name
    const columnName = columns.map((col) => <p>{col.column_name} <span style={{color: 'red', alignText: 'right'}}>{col.data_type}</span></p>);
    // console.log('columnName', columnName); 
    // declares a new node object
    const newNode = {
      id: key,
      type: 'special',
      data: { 
        label:
        // Table name and all its columns
        <div>
          <h3>{key}</h3>
          {columnName}
        </div>
    },
      position: { x: positionX, y: positionY }, 
    };

    row += 1;
    positionY += 500;
    if (row % 2 === 0) {
      positionY = 0;
      positionX += 300;
    }

    // push newNode into elements array
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

// CSS for the node
const customNodeStyles = {
  background: '#9CA8B3',
  color: '#FFF',
  padding: 10,
  borderRadius: 5,
};

// Custom Node
const CustomNode = ({ data }) => {
  return (
    <div style={customNodeStyles}>
    
      {/* Handle are the dots */}
      <Handle type="target" id="a" position="left" style={{ top: '28%'}}/>
      <Handle type="target" id="b" position="left" style={{ top: '78%'}}/>

      <div>{data.label}</div>

      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: '20%' }}
      />

      <Handle
        type="source"
        position="right"
        id="b"
        style={{ top: '70%'}}
      />

    </div>
  );
};

// Giving the custom node a type name
const nodeTypes = {
  special: CustomNode,
};

export default FlowComponent;