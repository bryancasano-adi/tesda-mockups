// -------------------- TYPES --------------------
export interface Competency {
  id: string;
  type: "competency" | "element";
  code: string;
  name: string;
}

export interface Descriptor {
  id: string;
  text: string;
  domain: string;
}

type MappingStatus = "generated" | "reviewed" | "finalized";

export interface Mapping {
  competencyId: string;
  descriptorId: string;
  value: string;
  reasoning?: string;
  status?: MappingStatus;
}

export const mockCompetencies: Competency[] = [
  {
    id: "c1",
    type: "competency" as const,
    code: "C1",
    name: "Prepare and maintain work area",
  },
  {
    id: "c1e1",
    type: "element" as const,
    code: "C1-E1",
    name: "Identify and obtain required tools and equipment",
  },
  {
    id: "c1e2",
    type: "element" as const,
    code: "C1-E2",
    name: "Prepare work area according to safety requirements",
  },
  {
    id: "c1e3",
    type: "element" as const,
    code: "C1-E3",
    name: "Maintain cleanliness and organization of work area",
  },
  {
    id: "c2",
    type: "competency" as const,
    code: "C2",
    name: "Perform basic food preparation",
  },
  {
    id: "c2e1",
    type: "element" as const,
    code: "C2-E1",
    name: "Follow standard recipes and procedures",
  },
  {
    id: "c2e2",
    type: "element" as const,
    code: "C2-E2",
    name: "Use basic cooking techniques",
  },
  {
    id: "c2e3",
    type: "element" as const,
    code: "C2-E3",
    name: "Apply food safety and hygiene practices",
  },
  {
    id: "c3",
    type: "competency" as const,
    code: "C3",
    name: "Operate kitchen equipment",
  },
  {
    id: "c3e1",
    type: "element" as const,
    code: "C3-E1",
    name: "Select appropriate equipment for tasks",
  },
  {
    id: "c3e2",
    type: "element" as const,
    code: "C3-E2",
    name: "Operate equipment according to manufacturer guidelines",
  },
  {
    id: "c3e3",
    type: "element" as const,
    code: "C3-E3",
    name: "Perform routine cleaning and maintenance",
  },
];

// Based on actual LAM template structure
export const mockDescriptors = [
  {
    domain: "Responsibility and Autonomy",
    genericDescriptor:
      "Work or learn under close supervision; demonstrate responsibility for completing assigned work and for following instructions in shared or guided activities.",
    granularized: [
      {
        id: "ksv1",
        domain: "Responsibility and Autonomy",
        title: "Work or learn under close supervision ",
      },
      {
        id: "ksv2",
        domain: "Responsibility and Autonomy",
        title: "Demonstrate responsibility for completing assigned work ",
      },
      {
        id: "ksv3",
        domain: "Responsibility and Autonomy",
        title:
          "Demonstrate responsibility for following instructions in shared or guided activities",
      },
    ],
  },
  {
    domain: "Knowledge and Understanding",
    genericDescriptor:
      "Recall and demonstrate basic factual and procedural knowledge/ including simple concepts related to everyday creative or expressive activities.",
    granularized: [
      {
        id: "app1",
        domain: "Knowledge and Understanding",
        title:
          "Recall basic factual and procedural knowledge including simple concepts related to everyday creative or expressive activities.",
      },
      {
        id: "app2",
        domain: "Knowledge and Understanding",
        title:
          "Demonstrate basic factual and procedural knowledge including concepts related to everyday creative or expressive activities.",
      },
    ],
  },
  {
    domain: "Skills and Application",
    genericDescriptor:
      "Perform simple, routine tasks using basic tools and established methods /including routine or guided creative or expressive tasks under direct supervision.",
    granularized: [
      {
        id: "doi1",
        domain: "Skills and Application",
        title: `Perform simple, routine tasks using basic tools and established methods`,
      },
      {
        id: "doi2",
        domain: "Skills and Application",
        title: `Perform simple, routine tasks using basic tools and established methods including routine or guided creative or expressive tasks `,
      },
      {
        id: "doi3",
        domain: "Skills and Application",
        title: `Perform simple, routine tasks under direct supervision.`,
      },
    ],
  },
];

export const createInitialMappings = (): Mapping[] => {
  const mappings: Mapping[] = [];

  // C1-E1
  mappings.push(
    {
      competencyId: "c1e1",
      descriptorId: "ksv1",
      value: "C1-E1",
      reasoning:
        "Work is done under supervision when identifying and obtaining tools.",
      status: "generated",
    },
    {
      competencyId: "c1e1",
      descriptorId: "app2",
      value: "C1-E1",
      reasoning:
        "Demonstrates basic procedural knowledge in identifying and handling tools.",
      status: "generated",
    },
    {
      competencyId: "c1e1",
      descriptorId: "doi1",
      value: "C1-E1",
      reasoning: "Involves performing routine tasks using basic tools.",
      status: "generated",
    },
  );

  // C1-E2
  mappings.push(
    {
      competencyId: "c1e2",
      descriptorId: "ksv2",
      value: "C1-E2",
      reasoning: "Shows responsibility in preparing work area.",
      status: "generated",
    },
    {
      competencyId: "c1e2",
      descriptorId: "app1",
      value: "C1-E2",
      reasoning: "Applies basic knowledge of safety procedures.",
      status: "generated",
    },
    {
      competencyId: "c1e2",
      descriptorId: "doi3",
      value: "C1-E2",
      reasoning: "Performed under direct supervision.",
      status: "generated",
    },
  );

  // C1-E3
  mappings.push(
    {
      competencyId: "c1e3",
      descriptorId: "ksv2",
      value: "C1-E3",
      reasoning: "Responsibility in maintaining cleanliness.",
      status: "generated",
    },
    {
      competencyId: "c1e3",
      descriptorId: "app1",
      value: "C1-E3",
      reasoning: "Applies routine cleaning knowledge.",
      status: "generated",
    },
    {
      competencyId: "c1e3",
      descriptorId: "doi1",
      value: "C1-E3",
      reasoning: "Routine maintenance tasks using basic methods.",
      status: "generated",
    },
  );

  // C2-E1
  mappings.push(
    {
      competencyId: "c2e1",
      descriptorId: "ksv3",
      value: "C2-E1",
      reasoning: "Follows instructions in shared/guided cooking tasks.",
      status: "generated",
    },
    {
      competencyId: "c2e1",
      descriptorId: "app2",
      value: "C2-E1",
      reasoning: "Demonstrates procedural knowledge via recipes.",
      status: "generated",
    },
    {
      competencyId: "c2e1",
      descriptorId: "doi1",
      value: "C2-E1",
      reasoning: "Executes routine cooking tasks.",
      status: "generated",
    },
  );

  // C2-E2
  mappings.push(
    {
      competencyId: "c2e2",
      descriptorId: "ksv3",
      value: "C2-E2",
      reasoning: "Follows guided cooking techniques.",
      status: "generated",
    },
    {
      competencyId: "c2e2",
      descriptorId: "app2",
      value: "C2-E2",
      reasoning: "Demonstrates applied cooking knowledge.",
      status: "generated",
    },
    {
      competencyId: "c2e2",
      descriptorId: "doi2",
      value: "C2-E2",
      reasoning: "Performs routine cooking tasks including guided activities.",
      status: "generated",
    },
  );

  // C2-E3
  mappings.push(
    {
      competencyId: "c2e3",
      descriptorId: "ksv2",
      value: "C2-E3",
      reasoning: "Responsibility in maintaining hygiene.",
      status: "generated",
    },
    {
      competencyId: "c2e3",
      descriptorId: "app1",
      value: "C2-E3",
      reasoning: "Applies food safety knowledge.",
      status: "generated",
    },
    {
      competencyId: "c2e3",
      descriptorId: "doi3",
      value: "C2-E3",
      reasoning: "Performed under supervision with strict guidelines.",
      status: "generated",
    },
  );

  // C3-E1
  mappings.push(
    {
      competencyId: "c3e1",
      descriptorId: "ksv1",
      value: "C3-E1",
      reasoning: "Equipment selection is guided.",
      status: "generated",
    },
    {
      competencyId: "c3e1",
      descriptorId: "app2",
      value: "C3-E1",
      reasoning: "Demonstrates knowledge of equipment usage.",
      status: "generated",
    },
  );

  // C3-E2
  mappings.push(
    {
      competencyId: "c3e2",
      descriptorId: "app2",
      value: "C3-E2",
      reasoning: "Applies procedural knowledge in operating equipment.",
      status: "generated",
    },
    {
      competencyId: "c3e2",
      descriptorId: "doi1",
      value: "C3-E2",
      reasoning: "Routine equipment operation tasks.",
      status: "generated",
    },
    {
      competencyId: "c3e2",
      descriptorId: "doi3",
      value: "C3-E2",
      reasoning: "Performed under direct supervision.",
      status: "generated",
    },
  );

  // C3-E3
  mappings.push(
    {
      competencyId: "c3e3",
      descriptorId: "ksv2",
      value: "C3-E3",
      reasoning: "Responsibility in maintenance tasks.",
      status: "generated",
    },
    {
      competencyId: "c3e3",
      descriptorId: "app1",
      value: "C3-E3",
      reasoning: "Applies maintenance knowledge.",
      status: "generated",
    },
    {
      competencyId: "c3e3",
      descriptorId: "doi2",
      value: "C3-E3",
      reasoning: "Routine maintenance including guided tasks.",
      status: "generated",
    },
  );

  return mappings;
};
