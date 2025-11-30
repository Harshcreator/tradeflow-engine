"use client";

import type { FC } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import type { ConditionNodeData } from "../../types/workflow";

export const ConditionNode: FC<NodeProps<ConditionNodeData>> = ({ data }) => {
  return (
    <div>
      <strong>Condition</strong>
      <div>{data.expression}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
