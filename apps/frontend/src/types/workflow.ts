export type TriggerType = "interval" | "price";

export type ActionType = "buy" | "sell" | "long" | "short" | "sendEmail";

export interface BaseNodeData {
  label: string;
}

export interface TriggerNodeData extends BaseNodeData {
  type: "trigger";
  triggerType: TriggerType;
  intervalSeconds?: number;
  symbol?: string;
  price?: number;
}

export interface ConditionNodeData extends BaseNodeData {
  type: "condition";
  expression: string;
}

export interface ActionNodeData extends BaseNodeData {
  type: "action";
  actionType: ActionType;
  symbol?: string;
  size?: number;
  email?: string;
}

export type NodeKind = TriggerNodeData | ConditionNodeData | ActionNodeData;

export interface WorkflowMeta {
  id: string;
  name: string;
  description?: string;
}

export interface SerializedWorkflowGraph {
  id?: string;
  name: string;
  nodes: import("reactflow").Node<NodeKind>[];
  edges: import("reactflow").Edge[];
}
