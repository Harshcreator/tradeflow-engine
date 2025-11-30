"use client";

import type { FC } from "react";

const nodeTypes = [
  { type: "trigger-interval", label: "Interval Trigger" },
  { type: "trigger-price", label: "Price Trigger" },
  { type: "condition", label: "Condition" },
  { type: "action-buy", label: "Buy" },
  { type: "action-sell", label: "Sell" },
  { type: "action-long", label: "Long" },
  { type: "action-short", label: "Short" },
  { type: "action-email", label: "Send Email" },
];

export const NodeSidebar: FC = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div>Nodes</div>
      {nodeTypes.map((n) => (
        <div
          key={n.type}
          onDragStart={(event) => onDragStart(event, n.type)}
          draggable
        >
          {n.label}
        </div>
      ))}
    </aside>
  );
};
