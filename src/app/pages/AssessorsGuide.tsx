import { useState } from "react";
import {
  EyeIcon,
  InformationCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CheckIcon } from "@heroicons/react/24/outline";

import {
  DOCUMENT_ID,
  SECTOR_PROJECT_ID,
  usePageNavigation,
} from "./pageUtils";

import { AGPreviewModal } from "../components/AGPreviewModal";
import { Breadcrumbs } from "./Dashboard";

export function AssessorsGuide() {
  const { navigateToPage } = usePageNavigation();
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState<"draft" | "finalized">("draft");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const totalPages = 10;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleJumpToSection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value) {
      const pageMatch = value.match(/Page (\d+)/);

      if (pageMatch) {
        setCurrentPage(parseInt(pageMatch[1]));
      } else if (value === "Cover Page") {
        setCurrentPage(1);
      }
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return renderCoverPage();
      case 2:
        return renderArrangementsPage();
      case 3:
        return renderEvidencePlan();
      case 4:
        return renderSpecificInstructions();
      case 5:
        return renderDemonstrationGuide();
      case 6:
        return renderQuestionsBasic();
      case 7:
        return renderQuestionsCore();
      case 8:
        return renderToolsEquipment();
      case 9:
        return renderAnswerKey();
      case 10:
        return renderCopyright();
      default:
        return renderCoverPage();
    }
  };

  const renderCoverPage = () => (
    <div className="text-center space-y-6 py-8">
      <div className="flex justify-center mb-6">
        <ImageWithFallback
          alt="TESDA Logo"
          height={300}
          src="/tesda-cropped-logo.png"
          width={300}
        />
      </div>

      <h1 className="text-2xl font-bold text-[#1E3A5F]">
        TECHNICAL EDUCATION AND SKILLS DEVELOPMENT AUTHORITY
      </h1>

      <div className="space-y-4 my-8">
        <p className="text-lg font-semibold text-[#333]">National Assessment</p>
        <p className="text-lg font-semibold text-[#333]">for</p>
      </div>

      <h2 className="text-3xl font-bold text-[#1976D2] my-6">
        SHIELDED METAL ARC WELDING (SMAW) NC II
      </h2>

      <h3 className="text-2xl font-bold text-[#333] mt-8">
        ASSESSOR&apos;S GUIDE
      </h3>
    </div>
  );

  const renderArrangementsPage = () => (
    <div className="space-y-4">
      <h2 className="text-base font-bold text-[#333] mb-4">
        NATIONAL ASSESSMENT AND CERTIFICATION ARRANGEMENTS
      </h2>

      <ol className="list-decimal ml-6 space-y-3 text-sm text-[#666]">
        <li>
          To attain the National Qualification of{" "}
          <span className="text-[#FF0000] font-bold">
            Shielded Metal Arc Welding (SMAW) NC II
          </span>
          , the candidate must demonstrate competence in all the units listed
          below. A successful candidate shall be awarded a National Certificate
          signed by the TESDA Director General.
        </li>
      </ol>

      <div className="mt-4">
        <p className="font-bold text-sm text-[#FF0000]">
          Unit Code BASIC COMPETENCIES
        </p>
        <ul className="ml-4 space-y-1 text-sm text-[#666]">
          <li>400311210 Participate in Workplace Communication</li>
          <li>400311211 Work in Team Environment</li>
          <li>400311212 Solve/Address General Workplace Problems</li>
          <li>400311213 Develop Career and Life Decisions</li>
          <li>400311214 Contribute to Workplace Innovation</li>
          <li>400311215 Present Relevant Information</li>
          <li>
            400311216 Practice Occupational Safety and Health Policies and
            Procedures
          </li>
          <li>
            400311218 Exercise Efficient and Effective Sustainable Practices in
            the Workplace
          </li>
          <li>400311327 Practice Entrepreneurial Skills in the Workplace</li>
        </ul>
      </div>

      <div className="mt-4">
        <p className="font-bold text-sm text-[#FF0000]">
          Unit Code COMMON COMPETENCIES
        </p>
        <ul className="ml-4 space-y-1 text-sm text-[#666]">
          <li>Apply Quality Standards</li>
          <li>Maintain an Effective Relationship with Clients and Customers</li>
          <li>Manage Own Performance</li>
          <li>Perform Computer Operations</li>
        </ul>
      </div>

      <div className="mt-4">
        <p className="font-bold text-sm text-[#FF0000]">
          Unit Code CORE COMPETENCIES
        </p>
        <ul className="ml-4 space-y-1 text-sm text-[#666]">
          <li>Perform Shielded Metal Arc Welding - Plate to Plate Joint</li>
          <li>Perform Shielded Metal Arc Welding - Pipe to Pipe Joint</li>
          <li>Repair Welds</li>
        </ul>
      </div>

      <ol
        className="list-decimal ml-6 space-y-3 text-sm text-[#666] mt-6"
        start={2}
      >
        <li>Assessment shall cover all the core units of competency.</li>
        <li>
          The following are qualified to apply for assessment and certification:
          <ul className="ml-6 list-disc mt-2">
            <li>
              Graduate of formal and non-formal including enterprise-based
              training programs
            </li>
            <li>Experienced workers (wage employed or self-employed)</li>
          </ul>
        </li>
        <li>
          The guidelines on assessment and certification are discussed in
          details in the &ldquo;Operating Procedures on Assessment and
          Certification&rdquo; and &ldquo;Guidelines on the Implementation of
          the Philippine TVET Competency Assessment and Certification System
          (PTCACS)&rdquo;.
        </li>
      </ol>
    </div>
  );

  const renderEvidencePlan = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold text-[#333]">EVIDENCE PLAN</h2>
      </div>

      <table className="w-full border-collapse border border-[#000] text-sm text-gray-800">
        <tbody>
          <tr>
            <td className="border border-[#000] p-2 font-semibold w-32">
              Qualification Title
            </td>
            <td className="border border-[#000] p-2" colSpan={4}>
              <span className="text-[#1976D2] font-bold">
                SHIELDED METAL ARC WELDING (SMAW) NC II
              </span>
            </td>
          </tr>
          <tr>
            <td className="border border-[#000] p-2 font-semibold">
              Unit of Competencies
            </td>
            <td className="border border-[#000] p-2" colSpan={4}>
              <ul className="list-disc ml-5">
                <li>
                  Perform Shielded Metal Arc Welding - Plate to Plate Joint
                </li>
              </ul>
            </td>
          </tr>
          <tr className="bg-[#F5F5F5]">
            <td className="border border-[#000] p-3" colSpan={2}>
              <p className="italic text-xs mb-2">
                Ways in which evidence will be collected:
              </p>
              <p className="font-semibold">
                The evidence must show that the candidate...
              </p>
            </td>
            <td className="border border-[#000] p-2 text-center font-bold text-[#FF0000]">
              Demonstration/Observation
            </td>
            <td className="border border-[#000] p-2 text-center font-bold text-[#FF0000]">
              Oral Questioning
            </td>
            <td className="border border-[#000] p-2 text-center font-bold text-[#FF0000]">
              Written Test
            </td>
          </tr>
          <tr>
            <td className="border border-[#000] p-2 font-bold" colSpan={5}>
              Prepare materials and welding equipment
            </td>
          </tr>
          <tr>
            <td className="border border-[#000] p-2" colSpan={2}>
              Identifies and selects electrodes according to WPS
            </td>
            <td className="border border-[#000] p-1 text-center">
              <CheckIcon className="inline w-5 h-5 text-gray-600" />
            </td>
            <td className="border border-[#000] p-1" />
            <td className="border border-[#000] p-1" />
          </tr>
          <tr>
            <td className="border border-[#000] p-2" colSpan={2}>
              Performs welding machine setup and adjustment
            </td>
            <td className="border border-[#000] p-1 text-center">
              <CheckIcon className="inline w-5 h-5 text-gray-600" />
            </td>
            <td className="border border-[#000] p-1 text-center">
              <CheckIcon className="inline w-5 h-5 text-gray-600" />
            </td>
            <td className="border border-[#000] p-1" />
          </tr>
          <tr>
            <td className="border border-[#000] p-2" colSpan={2}>
              Prepares and cleans base metals according to WPS requirements
            </td>
            <td className="border border-[#000] p-1 text-center">
              <CheckIcon className="inline w-5 h-5 text-gray-600" />
            </td>
            <td className="border border-[#000] p-1" />
            <td className="border border-[#000] p-1" />
          </tr>
        </tbody>
      </table>

      <p className="text-xs italic text-[#666] mt-2">
        Note:{" "}
        <span className="font-semibold">Critical Aspects of Competency*</span>
      </p>
    </div>
  );

  const renderSpecificInstructions = () => (
    <div className="space-y-4">
      <div
        className={`p-6 border-2 ${editMode ? "border-[#1976D2]" : "border-[#E0E0E0]"} rounded bg-white relative`}
      >
        {editMode && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-[#E3F2FD] rounded text-xs text-[#1976D2]">
            Editable
          </div>
        )}

        <h2 className="text-base font-bold text-[#333] mb-4">
          SPECIFIC INSTRUCTIONS FOR THE ASSESSOR
        </h2>

        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-semibold text-[#666] mb-2"
              htmlFor="qualificationTitleInput"
            >
              Qualification Title:
            </label>
            {editMode ? (
              <input
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                defaultValue="Shielded Metal Arc Welding (SMAW) NC II"
                id="qualificationTitleInput"
                type="text"
              />
            ) : (
              <div className="text-sm text-[#333]">
                Shielded Metal Arc Welding (SMAW) NC II
              </div>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-[#666] mb-2"
              htmlFor="unitCompetenciesInput"
            >
              Unit of Competencies:
            </label>
            {editMode ? (
              <textarea
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                defaultValue="• Perform Shielded Metal Arc Welding - Plate to Plate Joint"
                id="unitCompetenciesInput"
                rows={3}
              />
            ) : (
              <ul className="list-disc ml-5 text-sm text-[#333]">
                <li>
                  Perform Shielded Metal Arc Welding - Plate to Plate Joint
                </li>
              </ul>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-[#666] mb-2"
              htmlFor="timeAllottedInput"
            >
              Time Allotted:
            </label>
            {editMode ? (
              <div className="flex gap-3">
                <input
                  className="px-3 py-2 border border-[#E0E0E0] rounded text-sm w-40"
                  defaultValue="4 hours"
                  id="timeAllottedInput"
                  placeholder="Per candidate"
                  type="text"
                />
                <span className="text-sm text-[#666] self-center">
                  per candidate /
                </span>
                <input
                  className="px-3 py-2 border border-[#E0E0E0] rounded text-sm w-40"
                  defaultValue="8 hours"
                  id="timeAllottedInput"
                  placeholder="For 10 candidates"
                  type="text"
                />
                <span className="text-sm text-[#666] self-center">
                  for 10 candidates
                </span>
              </div>
            ) : (
              <div className="text-sm text-[#333]">
                4 hours per candidate / 8 hours for 10 candidates
              </div>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-[#666] mb-2"
              htmlFor="assessorInstructionsInput"
            >
              The Assessor MUST:
            </label>
            {editMode ? (
              <textarea
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm min-h-[300px]"
                defaultValue={`1. Provide the following tools, equipment and materials:
   • SMAW Machine (AC/DC, 200A minimum)
   • Welding electrodes (E6013, various sizes)
   • Steel plates (A36, 6mm x 150mm x 200mm)
   • PPE (welding helmet, gloves, apron, safety boots)
   • Angle grinder
   • Wire brush and chipping hammer

2. Given the necessary tools, materials, instruments and equipment, instruct the candidate to perform the following tasks in accordance with the set performance criteria

TASKS:
• Identify and select appropriate electrodes according to WPS
• Set up and adjust welding machine according to specifications
• Prepare and clean base metals according to WPS requirements
• Perform root pass according to WPS specifications
• Complete fill and cover passes ensuring proper penetration
• Conduct visual inspection and document results
• Follow safety procedures throughout the assessment

3. After the demonstration, you are required to:
   • Conduct oral questioning session
   • Administer the written test in a separate quiet area

4. Assessment shall be based on the units of competency focusing on:
   • Demonstration/Observation with Oral Questioning
   • Written Test - 50 items (60 mins)

5. The final Assessment shall be your responsibility as the Accredited Assessor.

6. At the end of the assessment, provide feedback indicating whether the candidate is:
   COMPETENT or NOT YET COMPETENT`}
                id="assessorInstructionsInput"
              />
            ) : (
              <div className="text-sm text-[#666] whitespace-pre-line bg-[#FAFAFA] p-4 rounded border border-[#E0E0E0]">
                {`1. Provide the following tools, equipment and materials:
   • SMAW Machine (AC/DC, 200A minimum)
   • Welding electrodes (E6013, various sizes)
   • Steel plates (A36, 6mm x 150mm x 200mm)
   • PPE (welding helmet, gloves, apron, safety boots)
   • Angle grinder
   • Wire brush and chipping hammer

2. Given the necessary tools, materials, instruments and equipment, instruct the candidate to perform the following tasks in accordance with the set performance criteria

TASKS:
• Identify and select appropriate electrodes according to WPS
• Set up and adjust welding machine according to specifications
• Prepare and clean base metals according to WPS requirements
• Perform root pass according to WPS specifications
• Complete fill and cover passes ensuring proper penetration
• Conduct visual inspection and document results
• Follow safety procedures throughout the assessment

3. After the demonstration, you are required to:
   • Conduct oral questioning session
   • Administer the written test in a separate quiet area

4. Assessment shall be based on the units of competency focusing on:
   • Demonstration/Observation with Oral Questioning
   • Written Test - 50 items (60 mins)

5. The final Assessment shall be your responsibility as the Accredited Assessor.

6. At the end of the assessment, provide feedback indicating whether the candidate is:
   ☐ COMPETENT     ☐ NOT YET COMPETENT`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDemonstrationGuide = () => (
    <div className="space-y-4">
      <div className="bg-[#E0E0E0] px-2 py-1 rounded text-xs text-[#666] inline-block">
        <LockClosedIcon className="w-4 h-4 inline text-yellow-500 mr-1" />{" "}
        Auto-compiled from Demonstration Test - Phase 2
      </div>

      <h2 className="text-base font-bold text-[#333] mb-4">
        ASSESSMENT GUIDE FOR DEMONSTRATION
      </h2>

      <table className="w-full border-collapse border border-[#000] text-sm">
        <thead>
          <tr className="bg-[#F5F5F5]">
            <th className="border border-[#000] p-3 text-left font-bold w-2/5">
              TASK INSTRUCTION
            </th>
            <th className="border border-[#000] p-3 text-left font-bold">
              PERFORMANCE STANDARDS
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-[#000] p-3 align-top">
              <p className="font-semibold mb-2">
                Perform Plate-to-Plate Welding
              </p>
              <p className="text-xs text-[#666]">Time Allotted: 4 hours</p>
            </td>
            <td className="border border-[#000] p-3">
              <p className="font-semibold mb-2">100-Point Rubric:</p>
              <ul className="space-y-1 text-xs">
                <li>• Electrode identification and selection (15 points)</li>
                <li>
                  • Root pass execution{" "}
                  <span className="text-[#FF0000]">*</span> (25 points)
                </li>
                <li>• Fill and cover pass quality (20 points)</li>
                <li>
                  • Visual inspection and acceptance criteria{" "}
                  <span className="text-[#FF0000]">*</span> (20 points)
                </li>
                <li>
                  • Safety compliance and work area management (20 points)
                </li>
              </ul>
              <p className="text-xs text-[#F57C00] mt-2">
                * Critical aspects - Must be demonstrated for competency
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderQuestionsBasic = () => (
    <div className="space-y-4">
      <div className="bg-[#E0E0E0] px-2 py-1 rounded text-xs text-[#666] inline-block mb-4">
        <LockClosedIcon className="w-4 h-4 inline text-yellow-500 mr-1" />{" "}
        Auto-compiled from Questioning Tool Pool - Phase 2
      </div>

      <h2 className="text-base font-bold text-[#333] mb-4">
        SUGGESTED QUESTIONS AND ACCEPTABLE ANSWERS
      </h2>
      <h3 className="text-sm font-bold text-[#333] mb-3">BASIC COMPETENCIES</h3>

      <div className="space-y-6">
        <div className="border border-[#E0E0E0] rounded p-4 bg-[#FAFAFA]">
          <p className="font-semibold text-sm mb-2">
            1. What is the importance of workplace communication in welding
            operations?
          </p>
          <p className="text-sm text-[#666] ml-4">
            <span className="font-semibold">Answer:</span> Workplace
            communication is essential for ensuring safety, coordinating tasks
            with team members, understanding work instructions, reporting
            hazards or defects, and maintaining quality standards in welding
            operations.
          </p>
        </div>

        <div className="border border-[#E0E0E0] rounded p-4 bg-[#FAFAFA]">
          <p className="font-semibold text-sm mb-2">
            2. How do you contribute to a safe work environment?
          </p>
          <p className="text-sm text-[#666] ml-4">
            <span className="font-semibold">Answer:</span> By following OSH
            policies and procedures, wearing appropriate PPE, maintaining clean
            and organized work areas, reporting hazards immediately, following
            lockout/tagout procedures, and ensuring proper ventilation during
            welding operations.
          </p>
        </div>

        <div className="border border-[#E0E0E0] rounded p-4 bg-[#FAFAFA]">
          <p className="font-semibold text-sm mb-2">
            3. What are the basic steps in solving workplace problems?
          </p>
          <p className="text-sm text-[#666] ml-4">
            <span className="font-semibold">Answer:</span> Identify the problem,
            gather relevant information, analyze possible causes, develop
            alternative solutions, select the best solution, implement the
            solution, and evaluate the results.
          </p>
        </div>
      </div>
    </div>
  );

  const renderQuestionsCore = () => (
    <div className="space-y-4">
      <div className="bg-[#E0E0E0] px-2 py-1 rounded text-xs text-[#666] inline-block mb-4">
        <LockClosedIcon className="w-4 h-4 inline text-yellow-500 mr-1" />{" "}
        Auto-compiled from Questioning Tool Pool - Phase 2
      </div>

      <h2 className="text-base font-bold text-[#333] mb-4">
        SUGGESTED QUESTIONS AND ACCEPTABLE ANSWERS
      </h2>
      <h3 className="text-sm font-bold text-[#333] mb-3">CORE COMPETENCIES</h3>

      <div className="space-y-6">
        <div className="border border-[#E0E0E0] rounded p-4 bg-[#FAFAFA]">
          <p className="font-semibold text-sm mb-2">
            1. What is the purpose of a Welding Procedure Specification (WPS)?
          </p>
          <p className="text-sm text-[#666] ml-4">
            <span className="font-semibold">Answer:</span> A WPS provides
            detailed instructions for performing welding operations to ensure
            consistent quality and compliance with codes and standards. It
            specifies parameters such as electrode type, current settings, joint
            preparation, and technique.
          </p>
        </div>

        <div className="border border-[#E0E0E0] rounded p-4 bg-[#FAFAFA]">
          <p className="font-semibold text-sm mb-2">
            2. How do you select the appropriate electrode for a welding job?
          </p>
          <p className="text-sm text-[#666] ml-4">
            <span className="font-semibold">Answer:</span> Electrode selection
            is based on the WPS, base metal type and thickness, welding
            position, current type (AC/DC), and required mechanical properties.
            Common electrodes like E6013 are used for mild steel in all
            positions.
          </p>
        </div>

        <div className="border border-[#E0E0E0] rounded p-4 bg-[#FAFAFA]">
          <p className="font-semibold text-sm mb-2">
            3. What are the critical aspects to check during visual inspection
            of a weld?
          </p>
          <p className="text-sm text-[#666] ml-4">
            <span className="font-semibold">Answer:</span> Visual inspection
            should check for proper penetration, uniform bead appearance,
            absence of cracks, porosity, undercut, overlap, and slag inclusions.
            The weld should meet the acceptance criteria specified in the WPS.
          </p>
        </div>

        <div className="border border-[#E0E0E0] rounded p-4 bg-[#FAFAFA]">
          <p className="font-semibold text-sm mb-2">
            4. Why is proper base metal preparation important?
          </p>
          <p className="text-sm text-[#666] ml-4">
            <span className="font-semibold">Answer:</span> Proper base metal
            preparation ensures good fusion, prevents defects like porosity and
            slag inclusions, removes contaminants (rust, oil, paint), and
            creates the correct joint geometry for proper weld quality.
          </p>
        </div>
      </div>
    </div>
  );

  const renderToolsEquipment = () => (
    <div className="space-y-6">
      <div className="bg-[#E0E0E0] px-2 py-1 rounded text-xs text-[#666] inline-block mb-4">
        <LockClosedIcon className="w-4 h-4 inline text-yellow-500 mr-1" />{" "}
        Auto-compiled from Demonstration Test - Phase 2
      </div>

      <h2 className="text-base font-bold text-[#333] mb-4">
        RECOMMENDED LIST OF TOOLS, EQUIPMENT AND MATERIALS FOR TEN (10)
        CANDIDATES
      </h2>

      <div>
        <h3 className="text-sm font-bold text-[#333] mb-3">
          A. SUPPLIES AND MATERIALS
        </h3>
        <table className="w-full border-collapse border border-[#000] text-sm">
          <thead>
            <tr className="bg-[#F5F5F5]">
              <th className="border border-[#000] p-2 text-center w-12">No.</th>
              <th className="border border-[#000] p-2 text-left">
                Item Description
              </th>
              <th className="border border-[#000] p-2 text-left">
                Specifications
              </th>
              <th className="border border-[#000] p-2 text-center w-24">
                Quantity
              </th>
              <th className="border border-[#000] p-2 text-center w-20">
                Unit
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-[#000] p-2 text-center">1</td>
              <td className="border border-[#000] p-2">Steel Plates</td>
              <td className="border border-[#000] p-2">
                A36, 6mm x 150mm x 200mm
              </td>
              <td className="border border-[#000] p-2 text-center">20</td>
              <td className="border border-[#000] p-2 text-center">pcs</td>
            </tr>
            <tr>
              <td className="border border-[#000] p-2 text-center">2</td>
              <td className="border border-[#000] p-2">Welding Electrodes</td>
              <td className="border border-[#000] p-2">
                E6013, 3.2mm diameter
              </td>
              <td className="border border-[#000] p-2 text-center">10</td>
              <td className="border border-[#000] p-2 text-center">kg</td>
            </tr>
            <tr>
              <td className="border border-[#000] p-2 text-center">3</td>
              <td className="border border-[#000] p-2">Welding Electrodes</td>
              <td className="border border-[#000] p-2">
                E7018, 3.2mm diameter
              </td>
              <td className="border border-[#000] p-2 text-center">5</td>
              <td className="border border-[#000] p-2 text-center">kg</td>
            </tr>
            <tr>
              <td className="border border-[#000] p-2 text-center">4</td>
              <td className="border border-[#000] p-2">Grinding Discs</td>
              <td className="border border-[#000] p-2">
                4.5 inch, cutting & grinding
              </td>
              <td className="border border-[#000] p-2 text-center">20</td>
              <td className="border border-[#000] p-2 text-center">pcs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#333] mb-3">B. EQUIPMENT</h3>
        <table className="w-full border-collapse border border-[#000] text-sm">
          <thead>
            <tr className="bg-[#F5F5F5]">
              <th className="border border-[#000] p-2 text-center w-12">No.</th>
              <th className="border border-[#000] p-2 text-left">
                Item Description
              </th>
              <th className="border border-[#000] p-2 text-left">
                Specifications
              </th>
              <th className="border border-[#000] p-2 text-center w-24">
                Quantity
              </th>
              <th className="border border-[#000] p-2 text-center w-20">
                Unit
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-[#000] p-2 text-center">1</td>
              <td className="border border-[#000] p-2">SMAW Machine</td>
              <td className="border border-[#000] p-2">
                AC/DC, 200A minimum capacity
              </td>
              <td className="border border-[#000] p-2 text-center">10</td>
              <td className="border border-[#000] p-2 text-center">unit</td>
            </tr>
            <tr>
              <td className="border border-[#000] p-2 text-center">2</td>
              <td className="border border-[#000] p-2">Angle Grinder</td>
              <td className="border border-[#000] p-2">4.5 inch, electric</td>
              <td className="border border-[#000] p-2 text-center">10</td>
              <td className="border border-[#000] p-2 text-center">unit</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#333] mb-3">C. TOOLS</h3>
        <table className="w-full border-collapse border border-[#000] text-sm">
          <thead>
            <tr className="bg-[#F5F5F5]">
              <th className="border border-[#000] p-2 text-center w-12">No.</th>
              <th className="border border-[#000] p-2 text-left">
                Item Description
              </th>
              <th className="border border-[#000] p-2 text-left">
                Specifications
              </th>
              <th className="border border-[#000] p-2 text-center w-24">
                Quantity
              </th>
              <th className="border border-[#000] p-2 text-center w-20">
                Unit
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-[#000] p-2 text-center">1</td>
              <td className="border border-[#000] p-2">Wire Brush</td>
              <td className="border border-[#000] p-2">Steel bristles</td>
              <td className="border border-[#000] p-2 text-center">10</td>
              <td className="border border-[#000] p-2 text-center">pcs</td>
            </tr>
            <tr>
              <td className="border border-[#000] p-2 text-center">2</td>
              <td className="border border-[#000] p-2">Chipping Hammer</td>
              <td className="border border-[#000] p-2">Standard</td>
              <td className="border border-[#000] p-2 text-center">10</td>
              <td className="border border-[#000] p-2 text-center">pcs</td>
            </tr>
            <tr>
              <td className="border border-[#000] p-2 text-center">3</td>
              <td className="border border-[#000] p-2">Welding Helmet</td>
              <td className="border border-[#000] p-2">
                Auto-darkening preferred
              </td>
              <td className="border border-[#000] p-2 text-center">10</td>
              <td className="border border-[#000] p-2 text-center">pcs</td>
            </tr>
            <tr>
              <td className="border border-[#000] p-2 text-center">4</td>
              <td className="border border-[#000] p-2">Welding Gloves</td>
              <td className="border border-[#000] p-2">
                Leather, heat-resistant
              </td>
              <td className="border border-[#000] p-2 text-center">10</td>
              <td className="border border-[#000] p-2 text-center">pairs</td>
            </tr>
            <tr>
              <td className="border border-[#000] p-2 text-center">5</td>
              <td className="border border-[#000] p-2">Welding Apron</td>
              <td className="border border-[#000] p-2">Leather</td>
              <td className="border border-[#000] p-2 text-center">10</td>
              <td className="border border-[#000] p-2 text-center">pcs</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAnswerKey = () => (
    <div className="space-y-4">
      <div className="bg-[#E0E0E0] px-2 py-1 rounded text-xs text-[#666] inline-block mb-4">
        <LockClosedIcon className="w-4 h-4 inline text-yellow-500 mr-1" />{" "}
        Auto-compiled from Written Test - Phase 2
      </div>

      <h2 className="text-base font-bold text-[#333] mb-4 text-center">
        ANSWER KEY (SET A, B, C)
      </h2>

      <table className="w-full border-collapse border border-[#000] text-sm">
        <thead>
          <tr>
            <th className="border border-[#000] p-2 bg-[#F5F5F5]">Item No.</th>
            <th className="border border-[#000] p-2 bg-[#F5F5F5]" colSpan={2}>
              Set A
            </th>
            <th className="border border-[#000] p-2 bg-[#F5F5F5]">Item No.</th>
            <th className="border border-[#000] p-2 bg-[#F5F5F5]">Set B</th>
            <th className="border border-[#000] p-2 bg-[#F5F5F5]">Item No.</th>
            <th className="border border-[#000] p-2 bg-[#F5F5F5]">Set C</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 30 }, (_, i) => (
            <tr key={i}>
              <td className="border border-[#000] p-2 text-center">{i + 1}</td>
              <td className="border border-[#000] p-2 text-center" colSpan={2}>
                A
              </td>
              <td className="border border-[#000] p-2 text-center">{i + 1}</td>
              <td className="border border-[#000] p-2 text-center">B</td>
              <td className="border border-[#000] p-2 text-center">{i + 1}</td>
              <td className="border border-[#000] p-2 text-center">C</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCopyright = () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="bg-gray-200 p-4 text-sm leading-relaxed text-black max-w-[800px] font-semibold">
          “No part of this Competency Assessment Tools (CATs) may be produced,
          distributed, or transmitted in any form or by any means, including
          photocopying, recording, or other electronic or mechanical methods,
          without prior written consent of TESDA. Any violation hereof shall be
          subject to the penalties provided for by applicable laws, rules and
          regulations.”
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 text-gray-800">
      <div className="text-sm text-[#666] mb-4">
        <Breadcrumbs
          items={[
            {
              label: "Sector Details",
              href: `/`,
            },
            {
              label: "Sector Projects",
              href: `/`,
            },
            {
              label: "Competency Assessment Tools (CATs)",
              href: `/`,
            },
            {
              label: "Assessor's Guide",
              href: `/assessors-guide`,
            },
          ]}
        />
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
              PHASE 3
            </span>
            Assessor&apos;s Guide
          </h1>
          <p className="text-sm text-[#666]">
            Compiled Document - Final Deliverable
          </p>
        </div>
        <span
          className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
            status === "finalized"
              ? "bg-[#E8F5E9] text-[#2E7D32]"
              : "bg-[#FFF3E0] text-[#F57C00]"
          }`}
        >
          {status === "finalized" ? "Finalized" : "Draft"}
        </span>
      </div>

      {/* Edit Mode Toggle */}
      <div className="bg-white border border-[#E0E0E0] rounded p-4 mb-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm text-[#666]">Edit Mode:</span>
            <div className="relative inline-block w-12 h-6">
              <input
                checked={editMode}
                className="sr-only peer"
                type="checkbox"
                onChange={() => setEditMode(!editMode)}
              />
              <div className="w-12 h-6 bg-[#E0E0E0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1976D2]" />
            </div>
            <span
              className={`text-sm font-medium ${editMode ? "text-[#1976D2]" : "text-[#999]"}`}
            >
              {editMode ? "ON" : "OFF"}
            </span>
          </label>
          {editMode && (
            <span className="text-xs text-[#F57C00] bg-[#FFF3E0] px-2 py-1 rounded">
              <InformationCircleIcon className="w-5 h-5 inline text-blue-500" />{" "}
              Locked sections cannot be edited
            </span>
          )}
        </div>
      </div>

      {/* Document Preview/Editor */}
      <div className="bg-white border border-[#E0E0E0] rounded overflow-hidden">
        {/* Page Navigation */}
        <div className="px-5 py-3 bg-[#FAFAFA] border-b border-[#E0E0E0] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              className={`px-3 py-1.5 bg-white text-[#666] border border-[#E0E0E0] rounded text-xs font-medium transition-colors ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#F5F5F5]"
              }`}
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
            >
              ◀ Previous
            </button>
            <span className="text-sm text-[#666]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`px-3 py-1.5 bg-white text-[#666] border border-[#E0E0E0] rounded text-xs font-medium transition-colors ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#F5F5F5]"
              }`}
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              Next ▶
            </button>
          </div>
          <select
            className="px-3 py-1.5 bg-white border border-[#E0E0E0] rounded text-sm text-[#666]"
            value=""
            onChange={handleJumpToSection}
          >
            <option value="">Jump to Section...</option>
            <option value="Cover Page">Cover Page</option>
            <option value="Page 2">Page 2: Arrangements</option>
            <option value="Page 3">Page 3: Evidence Plan</option>
            <option value="Page 4">Page 4: Specific Instructions</option>
            <option value="Page 5">Page 5: Demonstration Guide</option>
            <option value="Page 6">Page 6: Questions (Basic)</option>
            <option value="Page 7">Page 7: Questions (Core)</option>
            <option value="Page 8">Page 8: Tools & Equipment</option>
            <option value="Page 9">Page 9: Answer Key</option>
            <option value="Page 10">Page 10: Copyright</option>
          </select>
        </div>

        {/* Document Content */}
        <div className="p-8 max-h-[600px] overflow-y-auto">{renderPage()}</div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-between">
        <button
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
          onClick={() => navigateToPage("package-navigator")}
        >
          ← Back to Package Navigator
        </button>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
            Save Draft
          </button>
          <button
            className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors flex items-center gap-2"
            onClick={() => setShowPreview(true)}
          >
            <EyeIcon className="w-5 h-5 inline" />
            Preview
          </button>
          {status === "draft" && (
            <button
              className="px-4 py-2 bg-[#2E7D32] text-white rounded text-sm font-medium hover:bg-[#1B5E20] transition-colors"
              onClick={() => setStatus("finalized")}
            >
              Finalize
            </button>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && <AGPreviewModal onClose={() => setShowPreview(false)} />}
    </div>
  );
}
