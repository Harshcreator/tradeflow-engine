"use client";

import type { FC } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import type { TriggerNodeData } from "../../types/workflow";

export const TriggerNode: FC<NodeProps<TriggerNodeData>> = ({ data }) => {
  return (
    <div>
      <strong>Trigger: {data.triggerType}</strong>
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
