import type { SerializedWorkflowGraph, WorkflowMeta } from "../types/workflow";

const BASE_URL = process.env.NEXT_PUBLIC_ORCHESTRATOR_URL ?? "http://localhost:4000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }

  return (await res.json()) as T;
}

export async function getWorkflows(): Promise<WorkflowMeta[]> {
  return request<WorkflowMeta[]>("/workflows");
}

export async function getWorkflow(id: string): Promise<SerializedWorkflowGraph> {
  return request<SerializedWorkflowGraph>(`/workflows/${id}`);
}

export async function createWorkflow(
  payload: Omit<SerializedWorkflowGraph, "id">,
): Promise<SerializedWorkflowGraph> {
  return request<SerializedWorkflowGraph>("/workflows", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function saveWorkflow(
  id: string,
  payload: SerializedWorkflowGraph,
): Promise<SerializedWorkflowGraph> {
  return request<SerializedWorkflowGraph>(`/workflows/${id}` , {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteWorkflow(id: string): Promise<void> {
  await request<void>(`/workflows/${id}`, {
    method: "DELETE",
  });
}
