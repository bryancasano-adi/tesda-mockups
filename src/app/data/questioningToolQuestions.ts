export interface Question {
  id: number;
  question: string;
  dimension: string;
  testType: "Knowledge" | "Scenario";
  modelAnswer: string;
}

export const initialQuestions: Question[] = [
  {
    id: 1,
    question:
      "What type of electrode would you use for welding low carbon steel in a flat position?",
    dimension: "Task Skills",
    testType: "Knowledge",
    modelAnswer: "E6013 or E6011 electrodes, following WPS specifications",
  },
  {
    id: 2,
    question:
      "Scenario: You notice that the electrode is sticking frequently during welding. What would you do to address this problem?",
    dimension: "Contingency Management",
    testType: "Scenario",
    modelAnswer:
      "Check and increase amperage if too low; ensure proper arc length; verify electrode is dry; adjust travel speed",
  },
  {
    id: 3,
    question: "Why is it important to clean the base metal before welding?",
    dimension: "Task Skills",
    testType: "Knowledge",
    modelAnswer:
      "To prevent contamination, porosity, and weak welds; to ensure proper fusion and weld quality",
  },
  {
    id: 4,
    question:
      "Scenario: While welding, you smell smoke and see small sparks near the welding cables. What should you do immediately?",
    dimension: "Contingency Management",
    testType: "Scenario",
    modelAnswer:
      "Stop welding immediately; disconnect power; inspect cables for damage; report to supervisor; do not resume until cables are replaced or repaired",
  },
  {
    id: 5,
    question:
      "How would you prioritize your tasks when preparing for a welding job?",
    dimension: "Task Management",
    testType: "Knowledge",
    modelAnswer:
      "Safety first (PPE, equipment check); review WPS; prepare materials; set up equipment; clean work area",
  },
  {
    id: 6,
    question:
      "What is the purpose of preheating before welding thick sections?",
    dimension: "Task Skills",
    testType: "Knowledge",
    modelAnswer:
      "To reduce thermal stress, prevent cracking, ensure proper fusion, and minimize distortion",
  },
  {
    id: 7,
    question:
      "Scenario: The weld shows visible porosity after completion. What could be the possible causes and how would you prevent it?",
    dimension: "Contingency Management",
    testType: "Scenario",
    modelAnswer:
      "Causes: contaminated base metal, moisture in electrode, improper gas shielding. Prevention: clean surface, use dry electrodes, check gas flow, maintain proper arc length",
  },
  {
    id: 8,
    question:
      "Describe the proper procedure for changing electrodes during welding.",
    dimension: "Task Skills",
    testType: "Knowledge",
    modelAnswer:
      "Turn off welding machine, remove electrode stub safely, insert new electrode into holder, ensure secure grip, resume welding position",
  },
  {
    id: 9,
    question:
      "What safety equipment must be worn when performing SMAW operations?",
    dimension: "Job/Role Environment",
    testType: "Knowledge",
    modelAnswer:
      "Welding helmet with proper shade lens, leather gloves, welding jacket, safety boots, long pants, and respiratory protection if needed",
  },
  {
    id: 10,
    question:
      "Scenario: You are assigned to weld in a confined space. What additional safety measures would you implement?",
    dimension: "Job/Role Environment",
    testType: "Scenario",
    modelAnswer:
      "Ensure proper ventilation, use respiratory protection, have fire watch/attendant, check oxygen levels, maintain communication, have rescue plan in place",
  },
  {
    id: 11,
    question: "What is the difference between AC and DC welding current?",
    dimension: "Task Skills",
    testType: "Knowledge",
    modelAnswer:
      "AC alternates direction, good for rust/dirty metal. DC flows one direction, provides deeper penetration and stable arc. DC+ for deeper penetration, DC- for thinner materials",
  },
  {
    id: 12,
    question:
      "How do you ensure the quality of your welds during the welding process?",
    dimension: "Task Management",
    testType: "Knowledge",
    modelAnswer:
      "Monitor arc stability, maintain proper travel speed, check bead appearance, ensure adequate penetration, clean between passes, verify dimensions",
  },
  {
    id: 13,
    question:
      "Scenario: The arc becomes unstable and wanders during welding. What adjustments would you make?",
    dimension: "Contingency Management",
    testType: "Scenario",
    modelAnswer:
      "Check and adjust amperage settings, verify electrode condition, check for magnetic arc blow, clean base metal, adjust arc length, change electrode angle",
  },
  {
    id: 14,
    question:
      "What information must be included in a Welding Procedure Specification (WPS)?",
    dimension: "Task Skills",
    testType: "Knowledge",
    modelAnswer:
      "Base metal type, electrode specification, welding position, current/voltage settings, preheat/interpass temperature, joint design, and acceptance criteria",
  },
  {
    id: 15,
    question:
      "How would you organize your welding consumables and tools at the start of a shift?",
    dimension: "Task Management",
    testType: "Knowledge",
    modelAnswer:
      "Check inventory, arrange by type/size, ensure accessibility, verify electrode storage/drying, inspect tools for damage, maintain organized workspace",
  },
  {
    id: 16,
    question:
      "What are the common welding defects and how can you identify them visually?",
    dimension: "Task Skills",
    testType: "Knowledge",
    modelAnswer:
      "Porosity (small holes), cracks (linear breaks), undercut (groove at toe), lack of fusion (separation), spatter (metal droplets), incomplete penetration",
  },
  {
    id: 17,
    question:
      "Scenario: Your supervisor asks you to complete a rush job, but you notice the WPS calls for preheat that would delay completion. What do you do?",
    dimension: "Job/Role Environment",
    testType: "Scenario",
    modelAnswer:
      "Inform supervisor of WPS requirements, explain consequences of skipping preheat (cracking, weld failure), request proper time allocation or approval for procedure change, document decision",
  },
  {
    id: 18,
    question: "Explain the purpose of post-weld heat treatment.",
    dimension: "Task Skills",
    testType: "Knowledge",
    modelAnswer:
      "Relieves residual stresses, improves ductility, reduces hardness in heat-affected zone, prevents delayed cracking, improves mechanical properties",
  },
  {
    id: 19,
    question:
      "What steps would you take to coordinate with other trades working in the same area?",
    dimension: "Task Management",
    testType: "Knowledge",
    modelAnswer:
      "Communicate schedule, identify hazards, establish safety boundaries, coordinate hot work permits, inform of fire/spark hazards, agree on work sequence",
  },
  {
    id: 20,
    question:
      "Scenario: During overhead welding, molten metal drops on your glove. What is your immediate response?",
    dimension: "Contingency Management",
    testType: "Scenario",
    modelAnswer:
      "Stop welding immediately, step away from work area, remove glove safely, assess for burns, report incident, replace damaged PPE before resuming work",
  },
  {
    id: 21,
    question:
      "How do you read and interpret welding symbols on engineering drawings?",
    dimension: "Task Skills",
    testType: "Knowledge",
    modelAnswer:
      "Identify arrow side vs other side, understand weld type symbols, read dimensions and specifications, note finish symbols, check for tail notes and references",
  },
  {
    id: 22,
    question:
      "What environmental conditions would make welding unsafe or unacceptable?",
    dimension: "Job/Role Environment",
    testType: "Knowledge",
    modelAnswer:
      "Rain or wet conditions, high winds (outdoor), extreme cold affecting preheat, poor ventilation, presence of flammable materials, inadequate lighting",
  },
  {
    id: 23,
    question:
      "Scenario: You run out of specified electrodes mid-job. What should you do?",
    dimension: "Contingency Management",
    testType: "Scenario",
    modelAnswer:
      "Stop welding, do not substitute with different electrode, notify supervisor, request proper electrodes, document delay, protect incomplete weld from contamination",
  },
  {
    id: 24,
    question:
      "Describe the procedure for inspecting welding equipment before starting work.",
    dimension: "Task Management",
    testType: "Knowledge",
    modelAnswer:
      "Check cables for damage, inspect electrode holder, verify ground connection, test machine settings, check cooling system, ensure emergency stop works, verify safety equipment",
  },
  {
    id: 25,
    question:
      "What factors determine the appropriate welding position for a joint?",
    dimension: "Task Skills",
    testType: "Knowledge",
    modelAnswer:
      "Joint accessibility, structural requirements, distortion control, productivity considerations, welder qualification, gravity effects on molten metal",
  },
];
