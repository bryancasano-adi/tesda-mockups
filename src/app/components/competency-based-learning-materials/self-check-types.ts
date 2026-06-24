export type SelfCheckOptionLetter = "A" | "B" | "C" | "D";

export interface SelfCheckOption {
  letter: SelfCheckOptionLetter;
  text: string;
}

export interface SelfCheckQuestion {
  questionText: string;
  options: SelfCheckOption[];
}
