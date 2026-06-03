import type { ReactNode } from "react";
import { cblm, cblmSourceTag } from "./cblmClasses";

export function CblmSourcePanel({
  blocks,
  footerNote,
  title = "Source Documents",
  showPrimaryLabel = true,
}: {
  blocks: {
    title: string;
    tag: string;
    tagClass: string;
    body: ReactNode;
  }[];
  footerNote?: ReactNode;
  title?: string;
  showPrimaryLabel?: boolean;
}) {
  return (
    <div className={cblm.srcPanel}>
      <div className={cblm.spHdr}>
        📂 <span className={cblm.spTitle}>{title}</span>
      </div>
      <div className={cblm.spBody}>
        {showPrimaryLabel && (
          <div className="mb-1.5 text-[10px] font-bold uppercase text-[#999]">
            Primary Inputs
          </div>
        )}
        {blocks.map((b) => (
          <div className={cblm.spBlock} key={b.title}>
            <div className={cblm.spBh}>
              <span className={cblm.spBl}>{b.title}</span>
              <span className={cblmSourceTag(b.tagClass)}>{b.tag}</span>
            </div>
            <div className={cblm.spBb}>{b.body}</div>
          </div>
        ))}
        {footerNote && (
          <div className="mt-2.5 rounded border border-[#E0E0E0] bg-[#FAFAFA] p-2.5 text-[11px] text-[#999]">
            {footerNote}
          </div>
        )}
      </div>
    </div>
  );
}

export const defaultSheetSourceBlocks = [
  {
    title: "CS — UC-001",
    tag: "CS",
    tagClass: "sbt-cs",
    body: (
      <>
        Unit: Carry out inspection of EV
        <br />
        Unit Code: AUTBEV311201
        <br />
        Performance criteria: safety, PPE, systematic inspection
      </>
    ),
  },
  {
    title: "CBC — LO 1.1",
    tag: "CBC",
    tagClass: "sbt-cbc",
    body: (
      <>
        LO: Prepare for EV inspection
        <br />
        Content item 1: Safety protocols for HV work
        <br />
        Assessment: Written test + observation
      </>
    ),
  },
  {
    title: "CLM — LO 1.1",
    tag: "CLM",
    tagClass: "sbt-clm",
    body: (
      <>
        Methodology: Face-to-face + Demonstration
        <br />
        Activity: Safety briefing + practical setup
        <br />
        Duration: 4 hrs
      </>
    ),
  },
];
