import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useRef, ChangeEvent } from "react";

import { Modal } from "../../pages/pageUtils";

interface ImplementingGuidelinesProps {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

export function ImplementingGuidelinesView({
  editMode,
  setEditMode,
  currentPage,
  setCurrentPage,
}: ImplementingGuidelinesProps) {
  const totalPages = 5;
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    dateIssued: "",
    supersedes: "",
    introText:
      "In the interest of the service and to provide quality and uniform program delivery, the following guidelines in the deployment of the Competency Standards (CS) for Scriptwriting (Radio & Audio Production) Level III is hereby issued.",
    background_a:
      'By virtue of Republic Act No. 7796, otherwise known as the "TESDA Act of 1994", TESDA is accorded the authority in the "establishment and administration of National Trade Skills Standards". The NTSS eventually evolved into the present-day training regulations (TRs) following the reforms instituted by the agency for the country\'s TVET, particularly along competency-based, education and training. As such, TESDA is mandated by law to develop and update the competence of the country\'s industry workers to enhance their employability and ensure long-term economic development.',
    background_b:
      "TESDA Circular No. 009 series of 2024 on Implementing Guidelines on Adopt-Adapt Strategies for Competency Standards/ Training Review and Development states that the adopt-and-adapt strategy allows the faster development of standards, and strengthens the quality assurance mechanisms for immediate program delivery. It focuses on the skills needs as characterized by the industries/employers in the area. Industry participation and thus, a direct relationship, is established with these industry partners keeping TESDA informed on the workforce needs and development;",
    background_c:
      "Further, the same TESDA Circular provides the implementation of the adopt-adapt mechanism ensures the development of competency standards that are acknowledged/recognized at the international, regional, and global levels. This would be crucial in providing valuable support to the emerging needs of the industries and catering to the needs of the workforce for it to become workplace-ready;",
    background_d:
      "The above-mentioned Competency Standards (CS) was developed a combination of research, consultation meetings, and TESDA's 'Adopt and Adapt' process. The collaboration with National Commission for Culture and the Arts (NCCA) ensured that the CS integrates internationally informed practices with the local context, aligning with institutional capabilities and identified labor market requirements. The said CS is validated with various industry stakeholders and practitioners in the field of scriptwriting for radio and audio production under the Creative sector. Furthermore, to ensure proper structuring and alignment with the Philippine TVET Qualifications Framework, the abovementioned CS has undergone Level Alignment Matrix (LAM). LAM is a quality assurance mechanism that determines the appropriate PQF level by evaluating competencies against national descriptors of knowledge, skills, values, and degree of independence. This alignment ensures clear learner pathways, uniform program delivery, and recognition of qualifications locally and internationally.",
    background_e:
      "Furthermore, to ensure proper structuring and alignment with the Philippine TVET Qualifications Framework, the abovementioned CS has undergone Level Alignment Matrix (LAM). LAM is a quality assurance mechanism that determines the appropriate PQF level by evaluating competencies against national descriptors of knowledge, skills, values, and degree of independence. This alignment ensures clear learner pathways, uniform program delivery, and recognition of qualifications locally and internationally.",
    // Page 2 - Objectives, Scope, Implementation
    objectives_a:
      "To immediately respond to the industry skills requirements for scriptwriters with the goal to produce competent individuals equipped with 21st Century Skills and compliant with the existing industry standards and practices.",
    objectives_b:
      "To ensure that the education and training providers shall deliver the programs in accordance with the abovementioned CS as required by the Creative Sector.",
    scope_coverage:
      "This CS shall be the basis for the development of the Competency-based Curriculum (CBC) which shall be submitted by the education and training providers registering the program with the TESDA Provincial/District Offices.",
    implementation_a:
      "To ensure utilization of this CS, all Regional/Provincial/District Directors shall immediately advocate/encourage the registration of abovementioned program; and",
    implementation_b:
      "Copy of the CS will be made available and can be downloaded from the TESDA website.",
    implementation_b_1:
      "All Regional/Provincial/District Directors are hereby instructed to process applications for program registration as Recognized TVET Program (RTP) following the Omnibus Guidelines on Technical Vocational Education and Training (TVET) Program Registration (TESDA Circular No. 107 series of 2021) and within the allowable process cycle time (PCT) of three (3) working days indicated in the existing guidelines (TESDA Circular No. 073, Series of 2019). Further, the education and training providers shall develop and submit the competency-based curriculum with number of training hours and appropriate lists of tools, materials, equipment and facilities for training and assessment.",
    implementation_b_2:
      "To standardize the program implementation and ensure that they are in accordance with the CS, the Qualifications and Standards Office (QSO through Curriculum and Training Aids Development Division (QSO-CTADD) and Regional Offices/Provincial Offices/District Offices (ROPODOs) shall assist in the development of the Competency-Based Curriculum (CBC).",
    implementation_b_3: "The following codes shall be applied for this CS:",
    // Page 4 - Assessments, Scholarship, Risk
    assessment_1:
      "The education and training providers shall ensure the conduct of institutional assessment after the completion of the training program; and",
    assessment_2:
      "The education and training providers (including the enterprises where trainings are conducted) shall issue the Training Certificate after completion of the training and passing the institutional assessment of graduates.",
    scholarship_1:
      "A scholarship training subsidy shall be allocated/provided to enrollees of the registered training program under the existing guidelines; and",
    scholarship_2:
      "Training cost shall be computed based on the submitted curriculum where the training hours and list of tools, materials and equipment are indicated.",
    risk_1:
      "Nonstandard implementation of competency standard across all regions",
    risk_2: "Limited number of registered training providers to offer the CS",
    risk_3:
      "Non-existence of policy to address the migration of Registered Training Programs (RTP) to RTP with CS",
    // Page 5 - Monitoring and Effectivity
    mitigate_1:
      "Deploy the competency standards and its implementing guidelines for common understanding and uniform implementation.",
    mitigate_2:
      "For the Regional and Provincial/District Offices (ROPODO) to extensively encourage providers to utilize the CS for program registration.",
    mitigate_3:
      "To discuss with relevant offices on the development of policy on migrating RTPs with developed CS.",
    monitoring_1:
      "The Regional and Provincial/District Offices (ROPO/DO) shall closely monitor the implementation of the registered programs under these CS; and",
    monitoring_2:
      "The ROPODOs shall require the education and training providers with registered program under this CS to report the enrolled, graduates and employed in the T2MIS as part of the regular monitoring and feedback system",
    effectivity:
      "This Circular shall take effect immediately. Wide dissemination of this Circular by all concerned is hereby enjoined.",
  });

  // Refs for Jump to Section
  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    background: useRef<HTMLDivElement>(null),
    objectives: useRef<HTMLDivElement>(null),
    scope: useRef<HTMLDivElement>(null),
    implementation: useRef<HTMLDivElement>(null),
    scholarship: useRef<HTMLDivElement>(null),
    risk: useRef<HTMLDivElement>(null),
    monitoring: useRef<HTMLDivElement>(null),
    effectivity: useRef<HTMLDivElement>(null),
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderPage = () => {
    if (currentPage === 1) {
      return (
        <Page1Content
          currentPage={currentPage}
          editMode={editMode}
          formData={formData}
          sectionRef={sectionRefs.background}
          totalPages={totalPages}
          onFieldChange={handleFieldChange}
        />
      );
    } else if (currentPage === 2) {
      return (
        <Page2Content
          currentPage={currentPage}
          editMode={editMode}
          formData={formData}
          sectionRefs={{
            objectives: sectionRefs.objectives,
            scope: sectionRefs.scope,
            implementation: sectionRefs.implementation,
          }}
          totalPages={totalPages}
          onFieldChange={handleFieldChange}
        />
      );
    } else if (currentPage === 3) {
      return (
        <Page3Content
          currentPage={currentPage}
          editMode={editMode}
          formData={formData}
          totalPages={totalPages}
          onFieldChange={handleFieldChange}
        />
      );
    } else if (currentPage === 4) {
      return (
        <Page4Content
          currentPage={currentPage}
          editMode={editMode}
          formData={formData}
          sectionRefs={{
            scholarship: sectionRefs.scholarship,
            risk: sectionRefs.risk,
          }}
          totalPages={totalPages}
          onFieldChange={handleFieldChange}
        />
      );
    } else {
      return (
        <Page5Content
          currentPage={currentPage}
          editMode={editMode}
          formData={formData}
          sectionRefs={{
            monitoring: sectionRefs.monitoring,
            effectivity: sectionRefs.effectivity,
          }}
          totalPages={totalPages}
          onFieldChange={handleFieldChange}
        />
      );
    }
  };

  return (
    <>
      <main className="flex-1 flex flex-col h-screen overflow-hidden text-gray-900">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 uppercase">
              Implementing Guidelines
            </h2>
          </div>
          <div className="flex gap-8 text-md text-gray-700 mt-1">
            <h4 className="text-gray-600">
              Scriptwriting (Radio & Audio Production) Level III
            </h4>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Edit Mode Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Edit Mode:</span>

              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  editMode ? "bg-green-500" : "bg-gray-300"
                }`}
                type="button"
                onClick={() => setEditMode(!editMode)}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    editMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>

              <span className="text-sm text-gray-600">
                {editMode ? "ON" : "OFF"}
              </span>
            </div>
          </div>

          {/* Jump to Section */}
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              <ChevronLeftIcon className="size-4" />
              Previous
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
            >
              Next
              <ChevronRightIcon className="size-4" />
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mx-auto bg-white shadow-sm border border-gray-200 p-12">
            {renderPage()}
          </div>
        </div>
      </main>

      <Modal
        isOpen={showPreview}
        title="Preview Document"
        onClose={() => setShowPreview(false)}
      >
        <div className="p-4">
          <p>Document preview coming soon...</p>
        </div>
      </Modal>
    </>
  );
}

// Info Table Component
interface InfoTableProps {
  currentPage: number;
  totalPages: number;
  editMode?: boolean;
  formData?: any;
  onFieldChange?: (field: string, value: string) => void;
}

function InfoTable({
  currentPage,
  totalPages,
  editMode,
  formData,
  onFieldChange,
}: InfoTableProps) {
  return (
    <div className="border border-gray-700 mb-6">
      <table className="w-full">
        <tbody>
          <tr className="border-b border-gray-700">
            <td
              className="border-r border-gray-700 p-3 align-top w-2/3"
              colSpan={2}
            >
              <div className="mb-2">
                <span className="font-bold">Subject:</span> <br />
                Implementing Guidelines on the Deployment of Competency
                Standards (CS) for Scriptwriting (Radio & Audio Production)
                Level III
              </div>
            </td>
            <td className="p-3 align-top w-2/3">
              <div className="mb-3">
                <span className="font-bold">
                  Page {currentPage} of {totalPages} pages
                </span>{" "}
              </div>
              <div>
                <span className="font-bold">Number _________</span>{" "}
                <span className="font-bold">series of 2025</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border-r border-gray-700 p-3 align-top w-1/3">
              <label className="font-bold" htmlFor="dateIssued">
                Date Issued:
              </label>
              {editMode ? (
                <input
                  className="mt-1 w-full px-2 py-1 border border-gray-300 rounded"
                  id="dateIssued"
                  placeholder="Enter date"
                  type="text"
                  value={formData?.dateIssued || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onFieldChange?.("dateIssued", e.target.value)
                  }
                />
              ) : (
                <div className="mt-1">{formData?.dateIssued || ""}</div>
              )}
            </td>
            <td className="border-r border-gray-700 p-3 w-1/3 align-top">
              <div className="mb-2">
                <span className="font-bold">Effectivity:</span>
              </div>
              <div className="ml-4">Immediately</div>
            </td>
            <td className="p-3 w-1/3 align-top">
              <label className="font-bold" htmlFor="supersedes">
                Supersedes:
              </label>
              {editMode ? (
                <input
                  className="mt-1 w-full px-2 py-1 border border-gray-300 rounded"
                  id="supersedes"
                  placeholder="Enter details"
                  type="text"
                  value={formData?.supersedes || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onFieldChange?.("supersedes", e.target.value)
                  }
                />
              ) : (
                <div className="mt-1">{formData?.supersedes || ""}</div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Page 1 Content
interface PageContentProps {
  editMode?: boolean;
  formData?: any;
  onFieldChange?: (field: string, value: string) => void;
  sectionRef?: React.RefObject<HTMLDivElement | null>;
  sectionRefs?: Record<string, React.RefObject<HTMLDivElement | null>>;
  currentPage?: number;
  totalPages?: number;
}

function Page1Content({
  editMode,
  formData,
  onFieldChange,
  sectionRef,
  currentPage = 1,
  totalPages = 5,
}: PageContentProps) {
  return (
    <>
      <h1 className="text-center text-3xl font-bold mb-6">TESDA CIRCULAR</h1>

      <InfoTable
        currentPage={currentPage}
        editMode={editMode}
        formData={formData}
        totalPages={totalPages}
        onFieldChange={onFieldChange}
      />

      {/* Document Content */}
      <div className="border border-gray-700 p-6">
        <div className="mb-6 text-justify leading-relaxed">
          {editMode ? (
            <textarea
              className="w-full px-2 py-1 border border-gray-300 rounded mb-2"
              rows={3}
              value={formData?.introText || ""}
              onChange={(e) => onFieldChange?.("introText", e.target.value)}
            />
          ) : (
            <span>{formData?.introText || ""}</span>
          )}{" "}
        </div>

        <div ref={sectionRef}>
          <Section number="I" title="BACKGROUND/LEGAL BASIS">
            <Subsection
              editMode={editMode}
              field="background_a"
              formData={formData}
              letter="A"
              onFieldChange={onFieldChange}
            >
              By virtue of Republic Act No. 7796, otherwise known as the
              {' "'}TESDA Act of 1994{'"'}, TESDA is accorded the authority in
              the {'"'}establishment and administration of National Trade Skills
              Standards{'"'}. The NTSS eventually evolved into the present-day
              training regulations (TRs) following the reforms instituted by the
              agency for the country{'"'}s TVET, particularly along
              competency-based, education and training. As such, TESDA is
              mandated by law to develop and update the competence of the
              country{'"'}s industry workers to enhance their employability and
              ensure long-term economic development.
            </Subsection>

            <Subsection
              editMode={editMode}
              field="background_b"
              formData={formData}
              letter="B"
              onFieldChange={onFieldChange}
            >
              TESDA Circular No. 009 series of 2024 on Implementing Guidelines
              on Adopt-Adapt Strategies for Competency Standards/ Training
              Review and Development states that the adopt-and-adapt strategy
              allows the faster development of standards, and strengthens the
              quality assurance mechanisms for immediate program delivery. It
              focuses on the skills needs as characterized by the
              industries/employers in the area. Industry participation and thus,
              a direct relationship, is established with these industry partners
              keeping TESDA informed on the workforce needs and development;
            </Subsection>

            <Subsection
              editMode={editMode}
              field="background_c"
              formData={formData}
              letter="C"
              onFieldChange={onFieldChange}
            >
              Further, the same TESDA Circular provides the implementation of
              the adopt-adapt mechanism ensures the development of competency
              standards that are acknowledged/recognized at the international,
              regional, and global levels. This would be crucial in providing
              valuable support to the emerging needs of the industries and
              catering to the needs of the workforce for it to become
              workplace-ready;
            </Subsection>

            <Subsection
              editMode={editMode}
              field="background_d"
              formData={formData}
              letter="D"
              makeReadonly={true}
              onFieldChange={onFieldChange}
            >
              The above-mentioned Competency Standards (CS) was developed a
              combination of research, consultation meetings, and
              {`TESDA's "Adopt and Adapt" process.`} The collaboration with
              National Commission for Culture and the Arts (NCCA) ensured that
              the CS integrates internationally informed practices with the
              local context, aligning with institutional capabilities and
              identified labor market requirements. The said CS is validated
              with various industry stakeholders and practitioners in the field
              of scriptwriting for radio and audio production under the Creative
              sector.
            </Subsection>

            <Subsection
              editMode={editMode}
              field="background_e"
              formData={formData}
              letter="E"
              makeReadonly={true}
              onFieldChange={onFieldChange}
            >
              Furthermore, to ensure proper structuring and alignment with the
              Philippine TVET Qualifications Framework, the abovementioned CS
              has undergone Level Alignment Matrix (LAM). LAM is a quality
              assurance mechanism that determines the appropriate PQF level by
              evaluating competencies against national descriptors of knowledge,
              skills, values, and degree of independence. This alignment ensures
              clear learner pathways, uniform program delivery, and recognition
              of qualifications locally and internationally.
            </Subsection>
          </Section>
        </div>
      </div>
    </>
  );
}

function Page2Content({
  editMode,
  formData,
  onFieldChange,
  sectionRefs,
  currentPage = 2,
  totalPages = 5,
}: PageContentProps) {
  return (
    <>
      <h1 className="text-center text-3xl font-bold mb-6">TESDA CIRCULAR</h1>

      <InfoTable
        currentPage={currentPage}
        editMode={editMode}
        formData={formData}
        totalPages={totalPages}
        onFieldChange={onFieldChange}
      />

      <div className="border border-gray-700 p-6">
        <div ref={sectionRefs?.objectives}>
          <Section number="II" title="OBJECTIVES">
            <Subsection
              editMode={editMode}
              field="objectives_a"
              formData={formData}
              letter="A"
              onFieldChange={onFieldChange}
            >
              To immediately respond to the industry skills requirements for{" "}
              scriptwriters with the goal to produce competent individuals
              equipped with 21
              <sup>st</sup> Century Skills and compliant with the existing
              industry standards and practices.
            </Subsection>

            <Subsection
              editMode={editMode}
              field="objectives_b"
              formData={formData}
              letter="B"
              onFieldChange={onFieldChange}
            >
              To ensure that the education and training providers shall deliver
              the programs in accordance with the abovementioned CS as required
              by the Creative Sector.
            </Subsection>
          </Section>
        </div>

        <div ref={sectionRefs?.scope}>
          <Section number="III" title="SCOPE/COVERAGE">
            <div>
              {editMode ? (
                <textarea
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                  rows={4}
                  value={formData?.scope_coverage || ""}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    onFieldChange?.("scope_coverage", e.target.value)
                  }
                />
              ) : (
                <div className="text-justify leading-relaxed">
                  This CS shall be the basis for the development of the
                  Competency-based Curriculum (CBC) which shall be submitted by
                  the education and training providers registering the program
                  with the TESDA Provincial/District Offices.
                </div>
              )}
            </div>
          </Section>
        </div>

        <div ref={sectionRefs?.implementation}>
          <Section number="IV" title="IMPLEMENTATION MECHANICS">
            <div className="font-bold mb-3">
              A. Utilization of the Developed CS
            </div>

            <div className="ml-4 space-y-3">
              {editMode ? (
                <div className="flex">
                  <span className="text-sm font-medium mr-2">1.</span>
                  <textarea
                    className="w-full px-2 py-1 border border-gray-300 rounded ml-2"
                    rows={4}
                    value={formData?.implementation_a || ""}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      onFieldChange?.("implementation_a", e.target.value)
                    }
                  />
                </div>
              ) : (
                <div className="flex">
                  <span className="text-sm font-medium mr-2">1.</span>
                  <div className="mt-[-3px]">
                    To ensure utilization of this CS, all
                    Regional/Provincial/District Directors shall immediately
                    advocate/encourage the registration of abovementioned
                    program; and
                  </div>
                </div>
              )}

              {editMode ? (
                <div className="flex">
                  <span className="text-sm font-medium mr-2">2.</span>
                  <textarea
                    className="w-full px-2 py-1 border border-gray-300 rounded ml-2"
                    rows={4}
                    value={formData?.implementation_b || ""}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      onFieldChange?.("implementation_b", e.target.value)
                    }
                  />
                </div>
              ) : (
                <div className="flex">
                  <span className="text-sm font-medium mr-2">2.</span>
                  <div className="mt-[-3px]">
                    Copy of the CS will be made available and can be downloaded
                    from the TESDA website.
                  </div>
                </div>
              )}
            </div>

            <div className="font-bold mb-3 mt-6">B. Program Registration</div>

            {editMode ? (
              <div className="ml-4 space-y-3">
                <div className="flex">
                  <label className="text-sm font-medium" htmlFor="impl_b_1">
                    1.
                  </label>
                  <textarea
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm w-full ml-2"
                    id="impl_b_1"
                    rows={4}
                    value={formData?.implementation_b_1 || ""}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      onFieldChange?.("implementation_b_1", e.target.value)
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="ml-4">
                <div className="flex mb-3">
                  <span className="text-sm font-medium mr-2">1.</span>
                  <div className="mt-[-3px]">
                    {formData?.implementation_b_1 || ""}
                  </div>
                </div>
              </div>
            )}
          </Section>
        </div>
      </div>
    </>
  );
}

function Page3Content({
  editMode,
  formData,
  onFieldChange,
  currentPage = 3,
  totalPages = 5,
}: PageContentProps) {
  const basicCompetencies = [
    { code: "400311319", title: "Lead workplace communication" },
    { code: "400311320", title: "Lead small teams" },
    {
      code: "400311321",
      title:
        "Apply critical thinking and problem-solving techniques in the workplace",
    },
    { code: "400311322", title: "Work in a diverse environment" },
    {
      code: "400311323",
      title:
        "Propose methods of applying learning and innovation in the organization",
    },
    { code: "400311324", title: "Use information systematically" },
    {
      code: "400311325",
      title: "Evaluate occupational safety and health work practices",
    },
    { code: "400311326", title: "Evaluate environmental work practices" },
    {
      code: "400311327",
      title:
        "Facilitate entrepreneurial skills for micro-small-medium enterprises (MSMEs)",
    },
  ];

  const commonCompetencies = [
    { code: "CRE265201", title: "Develop and update industry knowledge" },
    {
      code: "CRE265202",
      title: "Develop creative and artistic skills and cultural awareness",
    },
    {
      code: "CRE265203",
      title: "Observe procedures, specifications and manuals of instructions",
    },
    { code: "CRE265204", title: "Operate equipment" },
    { code: "CRE265205", title: "Manage own performance" },
  ];

  return (
    <>
      <h1 className="text-center text-3xl font-bold mb-6">TESDA CIRCULAR</h1>

      <InfoTable
        currentPage={currentPage}
        editMode={editMode}
        formData={formData}
        totalPages={totalPages}
        onFieldChange={onFieldChange}
      />

      <div className="border border-gray-700 p-6">
        {editMode ? (
          <div className="ml-4 space-y-3">
            <div className="flex">
              <label className="text-sm font-medium" htmlFor="impl_b_2">
                2.
              </label>
              <textarea
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm w-full ml-2"
                id="impl_b_2"
                placeholder="Enter text for point 2"
                rows={3}
                value={formData?.implementation_b_2 || ""}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  onFieldChange?.("implementation_b_2", e.target.value)
                }
              />
            </div>
            <div className="flex">
              <span className="text-sm font-medium mr-2">3.</span>
              <div className="mt-[-3px]">
                {formData?.implementation_b_3 || ""}
              </div>
            </div>
          </div>
        ) : (
          <div className="ml-4">
            <div className="flex mb-3">
              <span className="text-sm font-medium mr-2">2.</span>
              <div className="mt-[-3px]">
                {formData?.implementation_b_2 || ""}
              </div>
            </div>
            <div className="flex mb-3">
              <span className="text-sm font-medium mr-2">3.</span>
              <div className="mt-[-3px]">
                {formData?.implementation_b_3 || ""}
              </div>
            </div>
          </div>
        )}

        <div className="ml-8 my-6">
          <table className="w-full border-collapse border border-gray-700 mb-4">
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="border-r border-gray-700 p-2 font-bold w-48">
                  Qualification Title
                </td>
                <td className="p-2">
                  <span className="font-semibold">
                    Scriptwriting (Radio & Audio Production) Level III
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="border-r border-gray-700 p-2 font-bold">
                  Qualification Code
                </td>
                <td className="p-2 font-semibold">CS-CRESRA325</td>
              </tr>
            </tbody>
          </table>

          <CompetencyTable
            makeReadonly
            data={basicCompetencies}
            editMode={editMode}
            sectionTitle="BASIC COMPETENCIES"
          />

          <CompetencyTable
            makeReadonly
            data={commonCompetencies}
            editMode={editMode}
            sectionTitle="COMMON COMPETENCIES"
          />
        </div>
      </div>
    </>
  );
}

function Page4Content({
  editMode,
  formData,
  onFieldChange,
  sectionRefs,
  currentPage = 4,
  totalPages = 5,
}: PageContentProps) {
  const commonCompetencies = [
    {
      code: "CRE265206",
      title: "Maintain clean, safe and efficient work environment",
    },
    {
      code: "CRE265207",
      title: "Provide and maintain effective client relations",
    },
  ];

  const coreCompetencies = [
    {
      code: "CS-CRE264306",
      title: "Develop concepts of radio script and audio production",
    },
    {
      code: "CS-CRE264307",
      title: "Conduct analysis for intended audience and policy application",
    },
    {
      code: "CS-CRE264308",
      title: "Gather necessary data for improvement of the script",
    },
    { code: "CS-CRE264309", title: "Write script for radio broadcast" },
  ];

  return (
    <>
      <h1 className="text-center text-3xl font-bold mb-6">TESDA CIRCULAR</h1>

      <InfoTable
        currentPage={currentPage}
        editMode={editMode}
        formData={formData}
        totalPages={totalPages}
        onFieldChange={onFieldChange}
      />

      <div className="border border-gray-700 p-6">
        <div className="ml-8 mb-6">
          <table className="w-full border-collapse border border-gray-700 mb-4">
            <tbody>
              {commonCompetencies.map((item, index) => (
                <tr key={index} className="border-t-2 border-gray-700">
                  <td
                    className={`border-r border-gray-700 p-2 text-center w-32 font-semibold ${
                      editMode ? "bg-gray-50" : ""
                    }`}
                  >
                    {item.code}
                  </td>
                  <td className="p-2">{item.title}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <CompetencyTable
            makeReadonly
            data={coreCompetencies}
            editMode={editMode}
            sectionTitle="CORE COMPETENCIES"
          />
        </div>

        <Section number="" title="C. Institutional Assessment of Graduates">
          {editMode ? (
            <div className="ml-4 space-y-3">
              <div className="flex">
                <label className="text-sm font-medium" htmlFor="assessment_1">
                  1.
                </label>
                <textarea
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm w-full ml-2"
                  id="assessment_1"
                  placeholder="Enter text for point 1"
                  rows={3}
                  value={formData?.assessment_1 || ""}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    onFieldChange?.("assessment_1", e.target.value)
                  }
                />
              </div>
              <div className="flex">
                <label className="text-sm font-medium" htmlFor="assessment_2">
                  2.
                </label>
                <textarea
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm w-full ml-2"
                  id="assessment_2"
                  placeholder="Enter text for point 2"
                  rows={3}
                  value={formData?.assessment_2 || ""}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    onFieldChange?.("assessment_2", e.target.value)
                  }
                />
              </div>
            </div>
          ) : (
            <div className="ml-4 space-y-3">
              <div className="flex">
                <span className="mr-2">1.</span>
                <div>
                  The education and training providers shall ensure the conduct
                  of institutional assessment after the completion of the
                  training program; and
                </div>
              </div>

              <div className="flex">
                <span className="mr-2">2.</span>
                <div>
                  The education and training providers (including the
                  enterprises where trainings are conducted) shall issue the
                  Training Certificate after completion of the training and
                  passing the institutional assessment of graduates.
                </div>
              </div>
            </div>
          )}
        </Section>

        <div ref={sectionRefs?.scholarship}>
          <Section number="V" title="SCHOLARSHIP PROVISION">
            {editMode ? (
              <div className="ml-4 space-y-3">
                <div className="flex">
                  <label
                    className="text-sm font-medium"
                    htmlFor="scholarship_1"
                  >
                    1.
                  </label>
                  <textarea
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm w-full ml-2"
                    id="scholarship_1"
                    placeholder="Enter text for point 1"
                    rows={3}
                    value={formData?.scholarship_1 || ""}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      onFieldChange?.("scholarship_1", e.target.value)
                    }
                  />
                </div>
                <div className="flex">
                  <label
                    className="text-sm font-medium"
                    htmlFor="scholarship_2"
                  >
                    2.
                  </label>
                  <textarea
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm w-full ml-2"
                    id="scholarship_2"
                    placeholder="Enter text for point 2"
                    rows={3}
                    value={formData?.scholarship_2 || ""}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      onFieldChange?.("scholarship_2", e.target.value)
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="ml-4 space-y-3">
                <div className="flex">
                  <span className="mr-2">1.</span>
                  <div>
                    A scholarship training subsidy shall be allocated/provided
                    to enrollees of the registered training program under the
                    existing guidelines; and
                  </div>
                </div>

                <div className="flex">
                  <span className="mr-2">2.</span>
                  <div>
                    Training cost shall be computed based on the submitted
                    curriculum where the training hours and list of tools,
                    materials and equipment are indicated.
                  </div>
                </div>
              </div>
            )}
          </Section>
        </div>

        <div ref={sectionRefs?.risk}>
          <Section number="VI" title="RISK MANAGEMENT">
            <div className="text-justify leading-relaxed mb-4">
              The wide implementation of this program has potential risks, such
              as but not limited to the following:
            </div>

            {editMode ? (
              <div className="ml-4 space-y-3">
                <div className="flex">
                  <label className="text-sm font-medium" htmlFor="risk_1">
                    1.
                  </label>
                  <textarea
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm w-full ml-2"
                    id="risk_1"
                    placeholder="Enter text for point 1"
                    rows={3}
                    value={formData?.risk_1 || ""}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      onFieldChange?.("risk_1", e.target.value)
                    }
                  />
                </div>
                <div className="flex">
                  <label className="text-sm font-medium" htmlFor="risk_2">
                    2.
                  </label>
                  <textarea
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm w-full ml-2"
                    id="risk_2"
                    placeholder="Enter text for point 2"
                    rows={3}
                    value={formData?.risk_2 || ""}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      onFieldChange?.("risk_2", e.target.value)
                    }
                  />
                </div>
                <div className="flex">
                  <label className="text-sm font-medium" htmlFor="risk_3">
                    3.
                  </label>
                  <textarea
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm w-full ml-2"
                    id="risk_3"
                    placeholder="Enter text for point 3"
                    rows={3}
                    value={formData?.risk_3 || ""}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      onFieldChange?.("risk_3", e.target.value)
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="ml-4 space-y-3">
                <div className="flex">
                  <span className="mr-2">1.</span>
                  <div>
                    Nonstandard implementation of competency standard across all
                    regions
                  </div>
                </div>

                <div className="flex">
                  <span className="mr-2">2.</span>
                  <div>
                    Limited number of registered training providers to offer the
                    CS
                  </div>
                </div>

                <div className="flex">
                  <span className="mr-2">3.</span>
                  <div>
                    Non-existence of policy to address the migration of
                    Registered Training Programs (RTP) to RTP with CS
                  </div>
                </div>
              </div>
            )}
          </Section>
        </div>
      </div>
    </>
  );
}

function Page5Content({
  editMode,
  formData,
  onFieldChange,
  sectionRefs,
  currentPage = 5,
  totalPages = 5,
}: PageContentProps) {
  return (
    <>
      <h1 className="text-center text-3xl font-bold mb-6">TESDA CIRCULAR</h1>

      <InfoTable
        currentPage={currentPage}
        editMode={editMode}
        formData={formData}
        totalPages={totalPages}
        onFieldChange={onFieldChange}
      />

      <div className="border border-gray-700 p-6">
        <div className="text-justify leading-relaxed mb-6">
          To mitigate, if not eliminate the risks, the following measures shall
          be undertaken:
        </div>

        {editMode ? (
          <div className="ml-4 space-y-3">
            <div className="flex">
              <label className="text-sm font-medium" htmlFor="mitigate_1">
                1.
              </label>
              <textarea
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm w-full ml-2"
                id="mitigate_1"
                placeholder="Enter text for point 1"
                rows={3}
                value={formData?.mitigate_1 || ""}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  onFieldChange?.("mitigate_1", e.target.value)
                }
              />
            </div>
            <div className="flex">
              <label className="text-sm font-medium" htmlFor="mitigate_2">
                2.
              </label>
              <textarea
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm w-full ml-2"
                id="mitigate_2"
                placeholder="Enter text for point 2"
                rows={3}
                value={formData?.mitigate_2 || ""}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  onFieldChange?.("mitigate_2", e.target.value)
                }
              />
            </div>
            <div className="flex">
              <label className="text-sm font-medium" htmlFor="mitigate_3">
                3.
              </label>
              <textarea
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm w-full ml-2"
                id="mitigate_3"
                placeholder="Enter text for point 3"
                rows={3}
                value={formData?.mitigate_3 || ""}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  onFieldChange?.("mitigate_3", e.target.value)
                }
              />
            </div>
          </div>
        ) : (
          <div className="ml-4 mb-6 space-y-3">
            <div className="flex">
              <span className="mr-2">1.</span>
              <div>
                Deploy the competency standards and its implementing guidelines
                for common understanding and uniform implementation.
              </div>
            </div>

            <div className="flex">
              <span className="mr-2">2.</span>
              <div>
                For the Regional and Provincial/District Offices (ROPODO) to
                extensively encourage providers to utilize the CS for program
                registration.
              </div>
            </div>

            <div className="flex">
              <span className="mr-2">3.</span>
              <div>
                To discuss with relevant offices on the development of policy on
                migrating RTPs with developed CS.
              </div>
            </div>
          </div>
        )}

        <div ref={sectionRefs?.monitoring} className="mt-4">
          <Section number="VII" title="MONITORING AND FEEDBACK SYSTEM">
            {editMode ? (
              <div className="ml-4 space-y-3">
                <div className="flex">
                  <label className="text-sm font-medium" htmlFor="monitoring_1">
                    1.
                  </label>
                  <textarea
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm w-full ml-2"
                    id="monitoring_1"
                    placeholder="Enter text for point 1"
                    rows={3}
                    value={formData?.monitoring_1 || ""}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      onFieldChange?.("monitoring_1", e.target.value)
                    }
                  />
                </div>
                <div className="flex">
                  <label className="text-sm font-medium" htmlFor="monitoring_2">
                    2.
                  </label>
                  <textarea
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm w-full ml-2"
                    id="monitoring_2"
                    placeholder="Enter text for point 2"
                    rows={3}
                    value={formData?.monitoring_2 || ""}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      onFieldChange?.("monitoring_2", e.target.value)
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="ml-4 space-y-3">
                <div className="flex">
                  <span className="mr-2">1.</span>
                  <div>
                    The Regional and Provincial/District Offices (ROPO/DO) shall
                    closely monitor the implementation of the registered
                    programs under these CS; and
                  </div>
                </div>

                <div className="flex">
                  <span className="mr-2">2.</span>
                  <div>
                    The ROPODOs shall require the education and training
                    providers with registered program under this CS to report
                    the enrolled, graduates and employed in the T2MIS as part of
                    the regular monitoring and feedback system
                  </div>
                </div>
              </div>
            )}
          </Section>
        </div>

        <div ref={sectionRefs?.effectivity}>
          <Section number="VIII" title="EFFECTIVITY">
            <div className="text-justify leading-relaxed">
              This Circular shall take effect immediately. Wide dissemination of
              this Circular by all concerned is hereby enjoined.
            </div>
          </Section>
        </div>

        <div className="text-center mt-15 w-full">
          <div className="font-bold text-lg mb-1">
            JOSE FRANCISCO {'"'}KIKO{'"'} B. BENITEZ
          </div>
          <div className="text-sm">Secretary/Director General, TESDA</div>
        </div>
      </div>
    </>
  );
}

interface SectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

function Section({ number, title, children }: SectionProps) {
  return (
    <div className="mb-6">
      <div className="font-bold mb-3">
        {number}
        {number && "."} {title}
      </div>
      <div className={number ? "ml-4" : ""}>{children}</div>
    </div>
  );
}

interface SubsectionProps {
  letter?: string;
  children: React.ReactNode;
  highlight?: boolean;
  editMode?: boolean;
  formData?: any;
  field?: string;
  onFieldChange?: (field: string, value: string) => void;
  makeReadonly?: boolean;
}

function Subsection({
  letter,
  children,
  highlight = false,
  editMode,
  formData,
  field,
  onFieldChange,
  makeReadonly = false,
}: SubsectionProps) {
  const content = typeof children === "string" ? children : "";

  return (
    <div className={`mb-4 ${highlight ? "text-red-600" : ""}`}>
      {letter ? (
        <div className="flex">
          <div className="font-bold mr-2">{letter}.</div>
          <div className="flex-1 text-justify leading-relaxed">
            {editMode && field && onFieldChange ? (
              <textarea
                className={`w-full px-2 py-1 border border-gray-300 focus:outline-none rounded  ${makeReadonly ? "bg-gray-50 focus:ring-0 focus:border-gray-200" : "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}`}
                readOnly={makeReadonly}
                rows={6}
                value={formData?.[field!] || content}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  onFieldChange(field, e.target.value)
                }
              />
            ) : (
              formData?.[field!] || children
            )}
          </div>
        </div>
      ) : (
        <div className="text-justify leading-relaxed">{children}</div>
      )}
    </div>
  );
}

interface CompetencyTableProps {
  data: { code: string; title: string }[];
  sectionTitle: string;
  editMode?: boolean;
  makeReadonly?: boolean;
}

function CompetencyTable({
  data,
  sectionTitle,
  editMode,
  makeReadonly,
}: CompetencyTableProps) {
  return (
    <div className="mb-4">
      <table className="w-full border-collapse border border-gray-700">
        <tbody>
          <tr>
            <td
              className="p-2 font-bold text-center bg-gray-500 text-white"
              colSpan={2}
            >
              {sectionTitle}
            </td>
          </tr>
          {data.map((item, index) => (
            <tr key={index} className="border-t-2 border-gray-700">
              <td
                className={`border-r border-gray-700 p-2 text-center w-32 font-semibold ${
                  editMode && makeReadonly ? "bg-gray-50" : ""
                }`}
              >
                {item.code}
              </td>
              <td className="p-2">{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
