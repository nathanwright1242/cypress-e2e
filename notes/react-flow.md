```javascript
import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom node for the test container
const TestContainerNode = ({ data }) => {
  return (
    <div className="bg-green-100 border-2 border-green-300 rounded-lg p-6 min-w-[200px] shadow-lg">
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
      
      <div className="text-center">
        <h3 className="font-semibold text-gray-800 mb-4">{data.label}</h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-md transform hover:scale-105 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Custom node for dependencies
const DependencyNode = ({ data }) => {
  return (
    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 shadow-lg">
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
      
      <div className="text-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-12 bg-blue-500 rounded-md flex items-center justify-center shadow-md">
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
              ))}
            </div>
          </div>
          <span className="text-sm font-medium text-gray-700">{data.label}</span>
        </div>
      </div>
    </div>
  );
};

// Custom node for app under test
const AppTestNode = ({ data }) => {
  return (
    <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 shadow-lg">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
      
      <div className="text-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700">{data.label}</span>
        </div>
      </div>
    </div>
  );
};

// Custom node for certification engine
const CertificationEngineNode = ({ data }) => {
  return (
    <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 shadow-lg">
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
      
      <div className="text-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700">{data.label}</span>
        </div>
      </div>
    </div>
  );
};

// Custom node for certification request
const CertificationRequestNode = ({ data }) => {
  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-lg">
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      
      <div className="text-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700">{data.label}</span>
        </div>
      </div>
    </div>
  );
};

// Custom node for results
const ResultsNode = ({ data }) => {
  return (
    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 shadow-lg">
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      
      <div className="text-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-20 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
            <div className="text-white">
              <div className="flex flex-col space-y-1">
                <div className="h-1 bg-white rounded w-8"></div>
                <div className="h-1 bg-white rounded w-6"></div>
                <div className="h-1 bg-white rounded w-8"></div>
                <div className="h-1 bg-white rounded w-4"></div>
              </div>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-700">{data.label}</span>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  testContainer: TestContainerNode,
  dependency: DependencyNode,
  appTest: AppTestNode,
  certificationEngine: CertificationEngineNode,
  certificationRequest: CertificationRequestNode,
  results: ResultsNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'certificationRequest',
    position: { x: 50, y: 200 },
    data: { label: 'Certification Request' },
  },
  {
    id: '2',
    type: 'certificationEngine',
    position: { x: 300, y: 200 },
    data: { label: 'Certification Engine' },
  },
  {
    id: '3',
    type: 'dependency',
    position: { x: 300, y: 50 },
    data: { label: 'Down stream dependencies' },
  },
  {
    id: '4',
    type: 'appTest',
    position: { x: 300, y: 350 },
    data: { label: 'App under test' },
  },
  {
    id: '5',
    type: 'testContainer',
    position: { x: 600, y: 150 },
    data: { label: 'Tests' },
  },
  {
    id: '6',
    type: 'results',
    position: { x: 900, y: 200 },
    data: { label: 'Cert Results' },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#3B82F6', strokeWidth: 2 },
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    animated: true,
    style: { stroke: '#10B981', strokeWidth: 2 },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    animated: true,
    style: { stroke: '#F59E0B', strokeWidth: 2 },
  },
  {
    id: 'e2-5',
    source: '2',
    target: '5',
    animated: true,
    style: { stroke: '#6B7280', strokeWidth: 2 },
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    animated: true,
    style: { stroke: '#3B82F6', strokeWidth: 2 },
  },
  {
    id: 'e1-4',
    source: '1',
    target: '4',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    animated: true,
    style: { stroke: '#F59E0B', strokeWidth: 2 },
  },
];

export default function CertificationFlowDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg p-4 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Certification Process Flow</h1>
        <p className="text-sm text-gray-600">Interactive diagram showing the certification workflow</p>
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent"
      >
        <Controls className="bg-white shadow-lg rounded-lg" />
        <MiniMap 
          className="bg-white border border-gray-200 rounded-lg shadow-lg"
          nodeColor="#3B82F6"
          maskColor="rgba(0, 0, 0, 0.1)"
        />
        <Background color="#E5E7EB" gap={20} />
      </ReactFlow>
    </div>
  );
}
```
