import type {
  SelfCheckOption,
  SelfCheckOptionLetter,
  SelfCheckQuestion,
} from "./self-check-types";

export const SELF_CHECK_DIRECTION =
  "Select the best answer for each question based on the Information Sheet.";

export const PAIRED_INFORMATION_SHEET_TITLE =
  "Safety Protocols for EV Inspection";

export interface MockSelfCheckContext {
  contentTitle?: string;
  loTitle?: string;
}

export function buildMockSelfCheckChoices(
  context: MockSelfCheckContext = {},
): SelfCheckOption[] {
  const contentTitle = context.contentTitle?.trim() || "this topic";
  const loTitle = context.loTitle?.trim() || "the learning outcome";

  return [
    {
      letter: "A",
      text: `[MOCK] To explain and apply ${contentTitle} as part of ${loTitle}`,
    },
    {
      letter: "B",
      text: `[MOCK] To identify the tools and materials used for ${contentTitle}`,
    },
    {
      letter: "C",
      text: `[MOCK] To describe the safety requirements when performing ${contentTitle}`,
    },
    {
      letter: "D",
      text: `[MOCK] To summarize the key concepts covered in ${contentTitle}`,
    },
  ];
}

export function createMockSelfCheckQuestion(
  context: MockSelfCheckContext = {},
): SelfCheckQuestion {
  const contentTitle = context.contentTitle?.trim() || "this topic";

  return {
    questionText: `[MOCK] Based on the Information Sheet, what is the main purpose of ${contentTitle}?`,
    options: buildMockSelfCheckChoices(context),
  };
}

export function getMockSelfCheckAnswer(question: SelfCheckQuestion): string {
  return question.options.find((option) => option.letter === "A")?.text ?? "";
}

export function normalizeSelfCheckQuestion(
  question: SelfCheckQuestion,
): SelfCheckQuestion {
  return {
    questionText: question.questionText ?? "",
    options:
      question.options?.length === 4
        ? question.options
        : buildMockSelfCheckChoices().map((option, index) => ({
            letter: option.letter,
            text: question.options?.[index]?.text ?? "",
          })),
  };
}

export function resolveLegacyAnswerLetter(
  answer: string,
  question?: SelfCheckQuestion,
): string {
  const trimmed = answer.trim();
  const letterMatch = trimmed.match(/^([A-D])$/i);
  if (!letterMatch || !question) {
    return trimmed;
  }

  const letter = letterMatch[1].toUpperCase() as SelfCheckOptionLetter;
  return (
    question.options.find((option) => option.letter === letter)?.text ?? letter
  );
}
