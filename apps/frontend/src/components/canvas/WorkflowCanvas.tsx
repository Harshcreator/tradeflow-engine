"use client";

import type { FC } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  type Connection,
  type Edge,
  type Node,
} from "reactflow";
import "reactflow/dist/style.css";

import { useCallback, useEffect } from "react";
import { useWorkflowStore } from "../../store/workflowStore";
import { TriggerNode } from "../nodes/TriggerNode";
import { ConditionNode } from "../nodes/ConditionNode";
import { ActionNode } from "../nodes/ActionNode";
import type { NodeKind, ActionNodeData } from "../../types/workflow";

const nodeTypes = {
  trigger: TriggerNode,
  condition: ConditionNode,
  action: ActionNode,
};

export interface WorkflowCanvasProps {
  initialNodes?: Node<NodeKind>[];
  initialEdges?: Edge[];
}

export const WorkflowCanvas: FC<WorkflowCanvasProps> = ({
  initialNodes,
  initialEdges,
}) => {
  const { nodes, edges, setElements, onEdgesChange, onNodesChange, onConnect } =
    useWorkflowStore();

  useEffect(() => {
    if (initialNodes || initialEdges) {
      setElements(initialNodes ?? [], initialEdges ?? []);
    }
  }, [initialNodes, initialEdges, setElements]);

  const handleConnect = useCallback(
    (connection: Connection) => {
      onConnect(connection);
    },
    [onConnect],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const reactFlowBounds = (event.target as HTMLElement).getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const id = `${Date.now()}`;

      let data: NodeKind;

      if (type === "trigger-interval") {
        data = {
          type: "trigger",
          triggerType: "interval",
          intervalSeconds: 60,
          label: "Interval Trigger",
        };
      } else if (type === "trigger-price") {
        data = {
          type: "trigger",
          triggerType: "price",
          label: "Price Trigger",
        };
      } else if (type === "condition") {
        data = {
          type: "condition",
          expression: "price > 0",
          label: "Condition",
        };
      } else {
        const actionType = type.replace("action-", "") as ActionNodeData["actionType"];
        data = {
          type: "action",
          actionType,
          label: `Action: ${actionType}`,
        };
      }

      const newNode: Node<NodeKind> = {
        id,
        type: data.type,
        position,
        data,
      };

      useWorkflowStore.getState().addNode(newNode);
    },
    [],
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }} onDrop={handleDrop} onDragOver={handleDragOver}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};
