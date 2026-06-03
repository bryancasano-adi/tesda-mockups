import { CblmBadge, LoAccordion } from "../CblmPrimitives";
import { cblm } from "../cblmClasses";

const letSections = [
  {
    no: 1,
    title: "Prepare for EV inspection",
    activities: [
      "● Read Information Sheet IS 1.1.1 on Safety Protocols for HV EV Inspection",
      "● Answer Self-Check SC 1.1.1",
      "● Compare your answers with Answer Key AK 1.1.1",
      "● Read Information Sheet IS 1.1.2 on PPE Requirements for HV Work",
      "● Perform Task Sheet TS 1.1.1 — EV Safety Preparation and LOTO [TS]",
    ],
    instructions:
      "Complete all self-checks without referring back to the Information Sheet. If you score below 80%, re-read the IS and re-attempt.",
  },
  {
    no: 2,
    title: "Carry out visual inspection of EV components",
    activities: [
      "● Read IS 1.2.1 on EV Exterior and Undercarriage Inspection",
      "● Read Operation Sheet OS 1.2.1 on EV Diagnostic Scanner before the task [OS]",
      "● Perform Task Sheet TS 1.2.1 — Visual Inspection of EV Exterior [TS]",
      "● Perform Task Sheet TS 1.2.2 — EV Diagnostic System Scan [TS]",
    ],
    instructions:
      "Read OS 1.2.1 in full BEFORE operating the diagnostic scanner. Equipment must not be operated without trainer supervision.",
  },
  {
    no: 3,
    title: "Complete inspection report and documentation",
    activities: [
      "● Read IS 1.3.1 on Inspection Report Documentation Standards",
      "● Answer SC 1.3.1 and compare with AK 1.3.1",
      "● Complete and submit your inspection report using fleet form AUT-F-001",
    ],
    instructions:
      "LO 3 is documentation-focused. No Task Sheet is required. Ensure report is complete before proceeding to the Job Sheet.",
  },
];

export function LearningExperiencesTableEditor() {
  return (
    <>
      <div className={cblm.metaStrip}>
        <div className={cblm.metaItem}>
          <div className={cblm.metaLbl}>Document</div>
          <div className={cblm.metaVal}>Learning Experiences Table — Module 1</div>
        </div>
        <div className={cblm.metaItem}>
          <div className={cblm.metaLbl}>Format</div>
          <div className={cblm.metaVal}>
            TESDA 2-column (Learning Activities | Special Instructions)
          </div>
        </div>
        <div className={cblm.metaItem}>
          <div className={cblm.metaLbl}>LOs</div>
          <div className={cblm.metaVal}>3 sections</div>
        </div>
        <div className={cblm.metaItem}>
          <div className={cblm.metaLbl}>Status</div>
          <div>
            <CblmBadge variant="b-done">✓ Auto-generated</CblmBadge>
          </div>
        </div>
      </div>
      {letSections.map((sec) => (
        <LoAccordion
          key={sec.no}
          id={`let-lo${sec.no}`}
          number={sec.no}
          title={sec.title}
          subtitle={`Learning Outcome ${sec.no}`}
          progress="✓ Auto-generated"
          defaultOpen
        >
          <div className="mb-2.5 grid gap-3.5" style={{ gridTemplateColumns: "55fr 45fr" }}>
            <div>
              <table className={cblm.letTbl}>
                <thead>
                  <tr>
                    <th className={cblm.letTh}>Activity Sequence</th>
                  </tr>
                </thead>
                <tbody>
                  {sec.activities.map((a) => (
                    <tr key={a}>
                      <td className={cblm.letTd}>{a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div className={cblm.fieldLabel}>
                <span className={cblm.fieldLabelText}>Special Instructions</span>
                <span className={cblm.tagEdit}>Editable</span>
              </div>
              <textarea className={cblm.fieldEdit} rows={6} defaultValue={sec.instructions} />
            </div>
          </div>
          <div className="mb-1.5 text-[10px] font-bold uppercase text-[#999]">
            TESDA Format Preview
          </div>
          <table className={cblm.letTbl}>
            <thead>
              <tr>
                <th className={cblm.letTh} style={{ width: "55%" }}>
                  Learning Activities
                </th>
                <th className={cblm.letTh}>Special Instructions</th>
              </tr>
            </thead>
            <tbody>
              {sec.activities.map((a, i) => (
                <tr key={a}>
                  <td className={cblm.letTd}>{a}</td>
                  {i === 0 && (
                    <td
                      rowSpan={sec.activities.length}
                      className={`${cblm.letTd} bg-[#E3F2FD] text-[#1565C0] align-top`}
                    >
                      {sec.instructions}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </LoAccordion>
      ))}
    </>
  );
}
