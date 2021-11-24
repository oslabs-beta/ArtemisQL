import React from 'react'
import ReactFlow, { Background, MiniMap, Controls, Handle } from 'react-flow-renderer';
import mockData from '../../mockData'


const elements = [
  //Connect Nodes
  { id: '1-2', source: '1', target: '2', sourceHandle: 'a'},
  { id: '1-3', source: '1', target: '3', sourceHandle: 'a', targetHandle: 'b'},
  { id: '2-3', source: '2', target: '3', sourceHandle: 'b'},
  { id: '3-4', source: '3', target: '4', sourceHandle: 'a'},
  { id: '4-5', source: '4', target: '5', sourceHandle: 'a'},
  { id: '5-6', source: '5', target: '6', sourceHandle: 'b'},
  { id: '6-7', source: '6', target: '7', sourceHandle: 'a'}
];

function FlowComponent() {
  return (
    <div style={{ height: 500 }}>
      <ReactFlow elements={elements} nodeTypes={nodeTypes} >
        <Background
            variant="dots"
            gap={12}
            size={.5}
        /> 
        <MiniMap
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
        />
      <Controls />
      </ReactFlow>

    </div>
  )
}


// Populating our element array of nodes so react flow can render them.

let id = 1;
let positionX = 0;
let positionY = 0;

// Iterates through all the tables
for (let key in mockData.allTables){
  
  //assign current value to val
  let val = mockData.allTables[key];

  //Iterate through all the column of a specific table to get the column name
  const columnName = val.map(col => 
    <p>{col.column_name}</p>
  )
  
  // declares a new node object
  const newNode = {
    id: id.toString(),
    type: 'special',
    data: { label:
    // Table name and all its columns
    <div>
      <h3>{key}</h3>
      {columnName}
    </div>
   },
    position: { x: positionX, y: positionY }
  }
  id++;
  positionX += 200;
  // positionY += 100;

  // push newNode into elements array
  elements.push(newNode)
}


//CSS for the node
const customNodeStyles = {
  background: '#9CA8B3',
  color: '#FFF',
  padding: 10,
  borderRadius: 5,
};

// Custom Node
const CustomNodeComponent= ( {data} ) => {
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
  special: CustomNodeComponent,
};

export default FlowComponent;