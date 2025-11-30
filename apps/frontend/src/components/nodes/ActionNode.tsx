"use client";

import type { FC } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import type { ActionNodeData } from "../../types/workflow";

export const ActionNode: FC<NodeProps<ActionNodeData>> = ({ data }) => {
  return (
    <div>
      <strong>Action: {data.actionType}</strong>
      <div>{data.label}</div>
      <Handle type="target" position={Position.Left} />
    </div>
  );
};
