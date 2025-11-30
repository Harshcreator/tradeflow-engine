"use client";

import { create } from "zustand";
import type { Edge, Node, Connection } from "reactflow";
import type { NodeKind, SerializedWorkflowGraph } from "../types/workflow";

export interface WorkflowState {
  nodes: Node<NodeKind>[];
  edges: Edge[];
  selectedWorkflowId?: string;
  setWorkflowId: (id: string | undefined) => void;
  setElements: (nodes: Node<NodeKind>[], edges: Edge[]) => void;
  addNode: (node: Node<NodeKind>) => void;
  removeNode: (nodeId: string) => void;
  onNodesChange: (nodes: Node<NodeKind>[]) => void;
  onEdgesChange: (edges: Edge[]) => void;
  onConnect: (connection: Connection) => void;
  serialize: (meta: { id?: string; name: string }) => SerializedWorkflowGraph;
  loadFromSerialized: (graph: SerializedWorkflowGraph) => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedWorkflowId: undefined,
  setWorkflowId: (id: string | undefined) => set({ selectedWorkflowId: id }),
  setElements: (nodes: Node<NodeKind>[], edges: Edge[]) => set({ nodes, edges }),
  addNode: (node: Node<NodeKind>) =>
    set((state: WorkflowState) => ({ nodes: [...state.nodes, node] })),
  removeNode: (nodeId: string) =>
    set((state: WorkflowState) => ({
      nodes: state.nodes.filter((n) => n.id !== nodeId),
      edges: state.edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId,
      ),
    })),
  onNodesChange: (nodes: Node<NodeKind>[]) => set({ nodes }),
  onEdgesChange: (edges: Edge[]) => set({ edges }),
  onConnect: (connection: Connection) =>
    set((state: WorkflowState) => ({
      edges: [
        ...state.edges,
        {
          id: `${connection.source}-${connection.target}-${state.edges.length + 1}`,
          ...connection,
        } as Edge,
      ],
    })),
  serialize: (meta: { id?: string; name: string }) => {
    const { nodes, edges } = get();
    return {
      id: meta.id,
      name: meta.name,
      nodes,
      edges,
    };
  },
  loadFromSerialized: (graph: SerializedWorkflowGraph) => {
    set({ nodes: graph.nodes, edges: graph.edges });
  },
}));
