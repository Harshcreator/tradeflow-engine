import Link from "next/link";
import { getWorkflows } from "../../src/api/workflows";
import type { WorkflowMeta } from "../../src/types/workflow";

export default async function WorkflowsPage() {
  let workflows: WorkflowMeta[] = [];
  try {
    workflows = await getWorkflows();
  } catch (e) {
    // ignore for now
  }

  return (
    <main>
      <h1>Workflows</h1>
      <ul>
        {workflows.map((wf) => (
          <li key={wf.id}>
            <Link href={`/workflows/${wf.id}`}>{wf.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
