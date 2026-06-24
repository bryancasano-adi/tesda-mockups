import type { SelfCheckQuestion } from "./self-check-types";

export const MOCK_SELF_CHECK_QUESTIONS: SelfCheckQuestion[] = [
  {
    questionText:
      "Based on the Information Sheet, what is the minimum wait time after turning off the ignition before commencing high-voltage inspection work on a BEV?",
    options: [
      {
        letter: "A",
        text: "A minimum of 5 minutes must elapse after ignition off to allow HV capacitors to discharge to a safe level.",
      },
      {
        letter: "B",
        text: "A minimum of 30 seconds is sufficient for capacitor discharge.",
      },
      {
        letter: "C",
        text: "No wait time is required if the ignition is off.",
      },
      {
        letter: "D",
        text: "Wait time depends only on ambient temperature, not ignition status.",
      },
    ],
  },
  {
    questionText:
      "Which personal protective equipment is mandatory when working within 2 metres of an energized HV battery pack?",
    options: [
      {
        letter: "A",
        text: "Class 0 or Class 1 insulating gloves rated for the vehicle system voltage, EH-rated safety footwear, high-visibility vest, and face shield when working near battery connectors.",
      },
      {
        letter: "B",
        text: "Standard cotton gloves and safety glasses only.",
      },
      {
        letter: "C",
        text: "Hard hat and steel-toe boots only.",
      },
      {
        letter: "D",
        text: "High-visibility vest alone is sufficient.",
      },
    ],
  },
  {
    questionText:
      "What is the correct sequence for applying Lockout/Tagout (LOTO) before EV inspection?",
    options: [
      {
        letter: "A",
        text: "Park and stabilize the vehicle, turn off ignition and remove key fob, wait 5 minutes, locate and disengage the MSD if present, apply lockout tag, and verify zero-voltage with an approved meter.",
      },
      {
        letter: "B",
        text: "Apply lockout tag first, then turn off ignition.",
      },
      {
        letter: "C",
        text: "Verify zero-voltage before turning off ignition.",
      },
      {
        letter: "D",
        text: "Remove key fob only; MSD disengagement is optional.",
      },
    ],
  },
];

export const MOCK_ANSWER_KEY_ANSWERS = MOCK_SELF_CHECK_QUESTIONS.map(
  (question) => question.options.find((option) => option.letter === "A")?.text ?? "",
);
