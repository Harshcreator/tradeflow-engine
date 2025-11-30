"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { WorkflowCanvas } from "../../../src/components/canvas/WorkflowCanvas";
import { NodeSidebar } from "../../../src/components/sidebar/NodeSidebar";
import { getWorkflow, saveWorkflow } from "../../../src/api/workflows";
import { useWorkflowStore } from "../../../src/store/workflowStore";

export default function WorkflowBuilderPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [loading, setLoading] = useState(true);
  const serialize = useWorkflowStore((s) => s.serialize);
  const loadFromSerialized = useWorkflowStore((s) => s.loadFromSerialized);

  useEffect(() => {
    async function load() {
      try {
        const wf = await getWorkflow(id);
        loadFromSerialized(wf);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [id, loadFromSerialized]);

  const handleSave = async () => {
    const graph = serialize({ id, name: `Workflow ${id}` });
    await saveWorkflow(id, graph);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: 240 }}>
        <NodeSidebar />
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </div>
      <div style={{ flex: 1 }}>
        <WorkflowCanvas />
      </div>
    </div>
  );
}
