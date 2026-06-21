import type { Edge, Node } from "@xyflow/react";
import type { DashboardData } from "@/lib/types";

const COMMON = {
  color: "#14161a",
  borderRadius: 10,
  padding: "10px 14px",
  fontSize: 13,
  width: 178,
  textAlign: "center" as const,
  lineHeight: 1.35,
  boxShadow:
    "0 1px 2px rgba(16,18,40,0.06), 0 10px 28px -18px rgba(16,18,40,0.22)",
};

const STYLES = {
  user: {
    ...COMMON,
    border: "2px solid #1959ff",
    background: "rgba(25,89,255,0.12)",
    fontWeight: 800,
  },
  case: {
    ...COMMON,
    border: "1px solid #008f87",
    background: "rgba(0,143,135,0.10)",
  },
  section: {
    ...COMMON,
    border: "1px solid #7c3aed",
    background: "rgba(124,58,237,0.10)",
  },
  outcome: {
    ...COMMON,
    border: "1px solid #057a55",
    background: "rgba(5,122,85,0.10)",
  },
  evidence: {
    ...COMMON,
    border: "1px solid #b5741f",
    background: "rgba(181,116,31,0.10)",
  },
};

const EDGE_BASE: Partial<Edge> = {
  style: { stroke: "rgba(17,18,26,0.22)", strokeWidth: 1.4 },
  labelStyle: { fill: "#5d6675", fontSize: 11, fontWeight: 600 },
  labelBgStyle: { fill: "#ffffff" },
};

/** Build a React Flow graph linking the user's case to similar cases,
 *  evidence, sections, and outcomes. */
export function buildGraph(data: DashboardData): {
  nodes: Node[];
  edges: Edge[];
} {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const cases = data.scored.slice(0, 3);

  nodes.push({
    id: "user",
    position: { x: 80, y: 250 },
    data: { label: "Your question" },
    style: STYLES.user,
  });

  // Evidence the user already has.
  const evidence = data.evidence.filter((e) => e.available).slice(0, 3);
  evidence.forEach((e, i) => {
    const id = `ev-${i}`;
    nodes.push({
      id,
      position: { x: 80, y: 70 + i * 86 },
      data: { label: e.item },
      style: STYLES.evidence,
    });
    edges.push({
      id: `e-${id}-user`,
      source: id,
      target: "user",
      label: "you have",
      ...EDGE_BASE,
    });
  });

  const sectionIdx = new Map<string, string>();
  const outcomeIdx = new Map<string, string>();

  cases.forEach((sc, i) => {
    const cid = `case-${i}`;
    nodes.push({
      id: cid,
      position: { x: 420, y: 120 + i * 150 },
      data: { label: `${sc.case.title} - ${sc.relevance.similarity_score}%` },
      style: STYLES.case,
    });
    edges.push({
      id: `e-user-${cid}`,
      source: "user",
      target: cid,
      label: "similar facts",
      animated: true,
      ...EDGE_BASE,
    });

    for (const sec of sc.case.sections) {
      if (!sectionIdx.has(sec)) {
        const sid = `sec-${sectionIdx.size}`;
        sectionIdx.set(sec, sid);
        nodes.push({
          id: sid,
          position: { x: 790, y: 70 + sectionIdx.size * 92 },
          data: { label: sec },
          style: STYLES.section,
        });
      }
      edges.push({
        id: `e-${cid}-${sectionIdx.get(sec)}`,
        source: cid,
        target: sectionIdx.get(sec)!,
        label: "law used",
        ...EDGE_BASE,
      });
    }

    const outcome = sc.case.outcome;
    if (!outcomeIdx.has(outcome)) {
      const oid = `out-${outcomeIdx.size}`;
      outcomeIdx.set(outcome, oid);
      nodes.push({
        id: oid,
        position: { x: 790, y: 470 + outcomeIdx.size * 86 },
        data: { label: outcome },
        style: STYLES.outcome,
      });
    }
    edges.push({
      id: `e-${cid}-${outcomeIdx.get(outcome)}`,
      source: cid,
      target: outcomeIdx.get(outcome)!,
      label: "result",
      ...EDGE_BASE,
    });
  });

  return { nodes, edges };
}
