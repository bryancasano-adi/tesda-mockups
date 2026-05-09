import { Status } from "../pages/competency-based-learning-materials/Dashboard";

export const modules = [
  {
    group: "Basic Competencies",
    color: "bg-slate-600",
    items: [
      {
        no: "Mod 1",
        title: "Participate in Workplace Communication",
        code: "500311105",
        duration: "8 hrs",
        status: "fetched",
        los: "Auto-fetched",
      },
      {
        no: "Mod 2",
        title: "Work in a Team Environment",
        code: "500311106",
        duration: "4 hrs",
        status: "fetched",
        los: "Auto-fetched",
      },
      {
        no: "Mod 3",
        title: "Practice Career Professionalism",
        code: "500311107",
        duration: "4 hrs",
        status: "fetched",
        los: "Auto-fetched",
      },
    ],
  },
  {
    group: "Common Competencies",
    color: "bg-blue-600",
    items: [
      {
        no: "Mod 4",
        title:
          "Implement and Monitor Infection Control Policies and Procedures",
        code: "TRS141201",
        duration: "8 hrs",
        status: "validated",
        los: "3 LOs · 12 sheets",
      },
      {
        no: "Mod 5",
        title: "Provide Effective Customer Service",
        code: "TRS141202",
        duration: "16 hrs",
        status: "review",
        los: "4 LOs · 18 sheets",
        current: true,
      },
      {
        no: "Mod 6",
        title: "Maintain an Effective Relationship with Clients/Customers",
        code: "TRS141203",
        duration: "8 hrs",
        status: "generating",
        los: "3 LOs · ~13 sheets",
      },
      {
        no: "Mod 7",
        title: "Manage Own Performance",
        code: "TRS141204",
        duration: "4 hrs",
        status: "not-started",
        los: "2 LOs · ~8 sheets",
      },
      {
        no: "Mod 8",
        title: "Develop and Update Industry Knowledge",
        code: "TRS141205",
        duration: "8 hrs",
        status: "not-started",
        los: "2 LOs · ~9 sheets",
      },
    ],
  },
  {
    group: "Core Competencies",
    color: "bg-green-700",
    items: [
      {
        no: "Mod 9",
        title: "Prepare the Bar/Counter Area",
        code: "TRS322201",
        duration: "12 hrs",
        status: "not-started",
        los: "3 LOs · ~15 sheets",
      },
      {
        no: "Mod 10",
        title: "Perform Bar/Counter Service",
        code: "TRS322202",
        duration: "24 hrs",
        status: "not-started",
        los: "5 LOs · ~25 sheets",
      },
      {
        no: "Mod 11",
        title: "Prepare Alcoholic and Non-Alcoholic Beverages",
        code: "TRS322203",
        duration: "32 hrs",
        status: "not-started",
        los: "6 LOs · ~30 sheets",
      },
      {
        no: "Mod 12",
        title: "Prepare Cocktails",
        code: "TRS322204",
        duration: "16 hrs",
        status: "not-started",
        los: "3 LOs · ~15 sheets",
      },
      {
        no: "Mod 13",
        title: "Provide Room Service",
        code: "TRS322205",
        duration: "16 hrs",
        status: "not-started",
        los: "4 LOs · ~18 sheets",
      },
      {
        no: "Mod 14",
        title: "Process Payment/Transactions",
        code: "TRS322206",
        duration: "12 hrs",
        status: "not-started",
        los: "3 LOs · ~13 sheets",
      },
    ],
  },
];

export const learningOutcomes = [
  {
    no: 1,
    title: "Maintain a professional appearance and positive attitude",
    meta: "4 content items · 4 hr · 3 assessment criteria",
    status: "validated" as Status,
    sheets: [
      [
        "information-sheet",
        "IS 5.1.1",
        "Personal Hygiene and Grooming Standards",
        "validated",
      ],
      ["self-check", "SC 5.1.1", "Multiple Choice · 5 items", "validated"],
      ["answer-key", "AK 5.1.1", "Answers for SC 5.1.1", "validated"],
      [
        "information-sheet",
        "IS 5.1.2",
        "Communication Skills in Customer Interaction",
        "validated",
      ],
      [
        "self-check",
        "SC 5.1.2 · AK 5.1.2",
        "Matching Type · 5 items",
        "validated",
      ],
      [
        "task-sheet",
        "TS 5.1.1",
        "Demonstrate Professional Greeting and Service Approach",
        "validated",
      ],
      [
        "performance-criterion",
        "PCC 5.1.1",
        "Did you... YES/NO checklist + trainer signature",
        "validated",
      ],
    ],
  },

  {
    no: 2,
    title: "Handle customer inquiries and complaints effectively",
    meta: "3 content items · 6 hr · 4 assessment criteria",
    status: "review" as Status,
    sheets: [
      [
        "information-sheet",
        "IS 5.2.1",
        "Customer Complaint Handling Procedures",
        "review",
      ],
      ["self-check", "SC 5.2.1", "Multiple Choice · 5 items", "review"],
      [
        "answer-key",
        "AK 5.2.1",
        "Answers and rationales for SC 5.2.1",
        "generated",
      ],
      [
        "information-sheet",
        "IS 5.2.2",
        "Service Recovery Techniques",
        "generated",
      ],
      ["self-check", "SC 5.2.2 · AK 5.2.2", "Essay · 2 items", "generated"],
      [
        "task-sheet",
        "TS 5.2.1",
        "Conduct a Complaint Resolution Role-Play",
        "generated",
      ],
      [
        "performance-criterion",
        "PCC 5.2.1",
        "Did you... YES/NO checklist + Trainer signature",
        "generated",
      ],
    ],
  },

  // ✅ LO 3 — MATCHES HTML MOCKUP EXACTLY
  {
    no: 3,
    title: "Process and follow up customer requests efficiently",
    meta: "2 content items · 4 hr",
    status: "validated" as Status,

    // this summary text is what appears in collapsed body
    summary:
      "IS 5.3.1 · SC 5.3.1 · AK 5.3.1 · IS 5.3.2 · SC 5.3.2 · AK 5.3.2 · TS 5.3.1 · PCC 5.3.1 — all validated",

    // special OS preview card
    observationSheet: {
      code: "OS 5.3.1",
      title: "Operating the Commercial Espresso Machine",
      description:
        "LLM generated this because LO 3 conditions list a commercial espresso machine (powered equipment). Simple hand tools do not trigger OS generation.",
      status: "validated" as Status,
    },

    sheets: [
      [
        "information-sheet",
        "IS 5.3.1",
        "Request Processing Procedures",
        "validated",
      ],

      ["self-check", "SC 5.3.1", "Short Answer · 5 items", "validated"],

      ["answer-key", "AK 5.3.1", "Answers for SC 5.3.1", "validated"],

      [
        "information-sheet",
        "IS 5.3.2",
        "Customer Follow-Up and Coordination",
        "validated",
      ],

      ["self-check", "SC 5.3.2", "Identification Type · 5 items", "validated"],

      [
        "task-sheet",
        "TS 5.3.1",
        "Process Customer Requests and Follow-Up Actions",
        "validated",
      ],

      [
        "performance-criterion",
        "PCC 5.3.1",
        "Customer request processing performance checklist",
        "validated",
      ],
    ],
  },

  // ✅ LO 4 — MATCHES HTML MOCKUP EXACTLY
  {
    no: 4,
    title: "Maintain customer satisfaction records and reporting",
    meta: "3 content items · 2 hr",
    status: "validated" as Status,

    summary:
      "IS 5.4.1–5.4.3 · SC/AK 5.4.1–5.4.3 — all validated · No TS/OS for this LO (knowledge-only assessment criteria)",

    sheets: [
      [
        "information-sheet",
        "IS 5.4.1",
        "Documentation and Recording Procedures",
        "validated",
      ],

      ["self-check", "SC 5.4.1", "True or False · 5 items", "validated"],

      ["answer-key", "AK 5.4.1", "Answers for SC 5.4.1", "validated"],

      [
        "information-sheet",
        "IS 5.4.2",
        "Service Improvement Records",
        "validated",
      ],

      [
        "self-check",
        "SC 5.4.2 · AK 5.4.2",
        "Matching Type · 5 items",
        "validated",
      ],

      [
        "information-sheet",
        "IS 5.4.3",
        "Customer Satisfaction Reporting",
        "validated",
      ],

      [
        "self-check",
        "SC 5.4.3 · AK 5.4.3",
        "Enumeration · 5 items",
        "validated",
      ],
    ],
  },
];

export const loData = [
  {
    num: 1,
    title: "Maintain a professional appearance and positive attitude",
    activities: [
      "● Read Information Sheet 5.1.1 on Personal Hygiene and Grooming Standards",
      "● Answer Self-Check 5.1.1",
      "● Compare your answers with Answer Key 5.1.1",
      "● Read Information Sheet 5.1.2 on Communication Skills in Customer Interaction",
      "● Answer Self-Check 5.1.2 and compare with Answer Key 5.1.2",
      "● Perform Task Sheet 5.1.1 — Demonstrate Professional Greeting and Service Approach",
    ],
    instructions:
      "Be honest with your learning. Answer Self-Checks without looking back at the Information Sheets. If you score below 80%, re-read the IS and retake the Self-Check. Ask your facilitator if you have questions.",
  },
  {
    num: 2,
    title: "Handle customer inquiries and complaints effectively",
    activities: [
      "● Read Information Sheet 5.2.1 on Customer Complaint Handling Procedures",
      "● Answer Self-Check 5.2.1 and compare with Answer Key 5.2.1",
      "● Read Information Sheet 5.2.2 on Service Recovery Techniques",
      "● Answer Self-Check 5.2.2 and compare with Answer Key 5.2.2",
      "● Perform Task Sheet 5.2.1 — Conduct a Complaint Resolution Role-Play",
    ],
    instructions:
      "Apply the L.A.S.T. framework when you encounter scenarios involving complaints. Re-read IS 5.2.1 if you score below 80% on SC 5.2.1.",
  },
  {
    num: 3,
    title: "Process and follow up customer requests efficiently",
    activities: [
      "● Read Information Sheet 5.3.1 on Request Processing and Follow-up Procedures",
      "● Answer Self-Check 5.3.1 and compare with Answer Key 5.3.1",
      "● Read Operation Sheet 5.3.1 on the Commercial Espresso Machine before the task",
      "● Perform Task Sheet 5.3.1 — Operating the Commercial Espresso Machine",
    ],
    instructions:
      "The Operation Sheet must be read and understood BEFORE performing TS 5.3.1. Safety precautions are mandatory. Equipment operation without trainer supervision is not permitted.",
  },
  {
    num: 4,
    title: "Maintain customer satisfaction records and reporting",
    activities: [
      "● Read Information Sheet 5.4.1 on Recordkeeping and Reporting Standards",
      "● Read Information Sheet 5.4.2 on Digital and Manual Log Systems",
      "● Read Information Sheet 5.4.3 on Customer Feedback Management",
      "● Answer Self-Check 5.4.1, 5.4.2, 5.4.3 and compare with Answer Keys",
    ],
    instructions:
      "LO 4 is knowledge-based. No Task Sheet is required. Ensure you can explain all documentation formats before proceeding to the Job Sheet.",
  },
];
