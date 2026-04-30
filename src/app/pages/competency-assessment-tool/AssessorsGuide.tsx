import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { CheckIcon } from "@heroicons/react/24/outline";
import React from "react";

import {
  Breadcrumbs,
  DOCUMENT_ID,
  SECTOR_ID,
  PROJECT_ID,
  usePageNavigation,
} from "../pageUtils";

import { Unit } from "./EvidencePlanEditor";

export function AssessorsGuide() {
  const { navigateToPage } = usePageNavigation();
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState<"draft" | "finalized">("draft");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const [units, setUnits] = useState<Unit[]>([
    {
      id: "unit1",
      name: "CORE 1: Perform Shielded Metal Arc Welding — Plate to Plate Joint",
      elements: [
        {
          id: "elem1_1",
          name: "Element 1: Prepare materials and welding equipment",
          pcs: [
            {
              id: "pc1",
              text: "Identify type and size of electrode to be used in accordance with Welding Procedure Specification (WPS)",
              critical: true,
              mcq: true,
              demo: true,
              qt: true,
              portfolio: true,
            },
            {
              id: "pc2",
              text: "Set up welding machine and accessories as per WPS requirements",
              critical: false,
              mcq: false,
              demo: true,
              qt: true,
              portfolio: false,
            },
            {
              id: "pc3",
              text: "Clean base metals in accordance with standard operating procedures",
              critical: false,
              mcq: false,
              demo: true,
              qt: false,
              portfolio: false,
            },
            {
              id: "pc4",
              text: "Prepare work area and ensure compliance with Occupational Safety and Health Standards (OSHS)",
              critical: false,
              mcq: true,
              demo: true,
              qt: true,
              portfolio: false,
            },
            {
              id: "pc8",
              text: "Select appropriate electrodes for pipe welding as per WPS",
              critical: true,
              mcq: true,
              demo: true,
              qt: true,
              portfolio: false,
            },
            {
              id: "pc9",
              text: "Set up welding machine for pipe welding operations",
              critical: false,
              mcq: true,
              demo: true,
              qt: false,
              portfolio: false,
            },
            {
              id: "pc10",
              text: "Prepare pipe surfaces according to welding requirements",
              critical: false,
              mcq: false,
              demo: true,
              qt: true,
              portfolio: false,
            },
          ],
        },
        {
          id: "elem1_2",
          name: "Element 2: Perform root pass on plate to plate joint",
          pcs: [
            {
              id: "pc5",
              text: "Perform root pass in accordance with WPS",
              critical: true,
              mcq: true,
              demo: true,
              qt: true,
              portfolio: true,
            },
            {
              id: "pc6",
              text: "Clean and inspect root pass using visual and mechanical methods",
              critical: false,
              mcq: false,
              demo: true,
              qt: true,
              portfolio: false,
            },
            {
              id: "pc7",
              text: "Repair root pass defects as required",
              critical: false,
              mcq: false,
              demo: true,
              qt: false,
              portfolio: false,
            },
            {
              id: "pc11",
              text: "Execute root pass on pipe joints following WPS",
              critical: true,
              mcq: true,
              demo: true,
              qt: true,
              portfolio: true,
            },
            {
              id: "pc12",
              text: "Perform fill passes maintaining proper bead sequence",
              critical: false,
              mcq: false,
              demo: true,
              qt: true,
              portfolio: false,
            },
          ],
        },
      ],
    },
  ]);

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
        return renderArrangementsPage1();
      case 3:
        return renderArrangementsPage2();
      case 4:
        return renderEvidencePlan();
      case 5:
        return renderSpecificInstructions1();
      case 6:
        return renderSpecificInstructions2();
      case 7:
        return renderDemonstrationGuide();
      case 8:
        return renderQuestionsBasic();
      case 9:
        return renderQuestionsCore();
      case 10:
        return renderToolsEquipment();
      case 11:
        return renderAnswerKey();
      default:
        return renderCoverPage();
    }
  };

  const renderCoverPage = () => (
    <div className="text-center space-y-4 py-6">
      <div className="p-1 text-sm leading-relaxed text-black font-semibold border border-black inline-block mb-10 mt-[-10px] text-justify">
        “No part of this Competency Assessment Tools (CATs) may be produced,
        distributed, or transmitted in any form or by any means, including
        photocopying, recording, or other electronic or mechanical methods,
        without prior written consent of TESDA. Any violation hereof shall be
        subject to the penalties provided for by applicable laws, rules and
        regulations.”
      </div>

      <div className="flex justify-center mb-6">
        <ImageWithFallback
          alt="TESDA Logo"
          className="max-w-full h-auto"
          height={300}
          src="/tesda-cropped-logo.png"
          width={300}
        />
      </div>

      <h1 className="text-2xl font-bold text-black uppercase">
        TECHNICAL EDUCATION AND SKILLS DEVELOPMENT AUTHORITY
      </h1>

      <div className="space-y-6 my-10">
        <p className="text-xl font-semibold text-black uppercase">
          National Assessment
        </p>
        <p className="text-xl font-semibold text-black uppercase">for</p>
      </div>

      <h2 className="text-3xl font-bold text-black my-6">
        SHIELDED METAL ARC WELDING (SMAW) NC II
      </h2>

      <h3 className="text-2xl font-bold text-black mt-8">
        ASSESSOR&apos;S GUIDE
      </h3>
    </div>
  );

  const renderArrangementsPage1 = () => (
    <div className="space-y-4 text-black">
      <h2 className="text-center font-bold mb-4">
        NATIONAL ASSESSMENT AND CERTIFICATION ARRANGEMENTS
      </h2>

      <ol className="list-decimal ml-6 space-y-3 text-sm">
        <li>
          To attain the National Qualification of{" "}
          <strong>Shielded Metal Arc Welding (SMAW) NC II</strong>, the
          candidate must demonstrate competence in all the units listed below. A
          successful candidate shall be awarded a National Certificate signed by
          the TESDA Director General.
        </li>
      </ol>

      <div className="mt-4 mx-4">
        <table className="w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-2 py-1">UNIT CODE</th>
              <th className="border border-gray-300 px-2 py-1">
                BASIC COMPETENCY
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-1">400311210</td>
              <td className="border border-gray-300 px-2 py-1">
                Participate in Workplace Communication
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">400311211</td>
              <td className="border border-gray-300 px-2 py-1">
                Work in Team Environment
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">400311212</td>
              <td className="border border-gray-300 px-2 py-1">
                Solve/Address General Workplace Problems
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">400311213</td>
              <td className="border border-gray-300 px-2 py-1">
                Develop Career and Life Decisions
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">400311214</td>
              <td className="border border-gray-300 px-2 py-1">
                Contribute to Workplace Innovation
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">400311215</td>
              <td className="border border-gray-300 px-2 py-1">
                Present Relevant Information
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">400311216</td>
              <td className="border border-gray-300 px-2 py-1">
                Practice Occupational Safety and Health Policies and Procedures
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">400311218</td>
              <td className="border border-gray-300 px-2 py-1">
                Exercise Efficient and Effective Sustainable Practices in the
                Workplace
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">400311327</td>
              <td className="border border-gray-300 px-2 py-1">
                Practice Entrepreneurial Skills in the Workplace
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 mx-4">
        <table className="w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-2 py-1">UNIT CODE</th>
              <th className="border border-gray-300 px-2 py-1">
                COMMON COMPETENCY
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-1">1</td>
              <td className="border border-gray-300 px-2 py-1">
                Apply Quality Standards
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">2</td>
              <td className="border border-gray-300 px-2 py-1">
                Maintain an Effective Relationship with Clients and Customers
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">3</td>
              <td className="border border-gray-300 px-2 py-1">
                Manage Own Performance
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">4</td>
              <td className="border border-gray-300 px-2 py-1">
                Perform Computer Operations
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 mx-4">
        <table className="w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-2 py-1">UNIT CODE</th>
              <th className="border border-gray-300 px-2 py-1">
                CORE COMPETENCY
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-1">CS-AFF611319</td>
              <td className="border border-gray-300 px-2 py-1">
                Maintain Records of Financial Transactions
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">CS-AFF611320</td>
              <td className="border border-gray-300 px-2 py-1">
                Handle Disbursement and Payment
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">CS-AFF611321</td>
              <td className="border border-gray-300 px-2 py-1">
                Process Procurement and Inventory of Supplies, Materials and
                Equipment
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ol className="list-decimal ml-6 space-y-3 text-sm mt-6" start={2}>
        <li>
          The qualification of SHIELDED METAL ARC WELDING (SMAW) NC II may be
          attained through demonstration of competence in a single comprehensive
          project-type assessment covering all required units of competency of
          this qualification.{" "}
        </li>
        <li>
          Assessment shall cover all competencies with basic and common
          integrated or assessed concurrently with the core units of competency.
        </li>
        <li>
          The following are qualified to apply for assessment and certification:
          <ul className="ml-6 list-disc mt-2">
            <li>
              Graduating learners/trainees of WTR-, Recognized TVET Program or
              formal/non-formal/informal including institution-based trainings,
              community-based trainings or government/NGOs sponsored trainings
              relevant to Halal Awareness; or
            </li>
            <li>
              Workers with industry experience (wage-employed or self-employed)
              who gained competencies in Halal Awareness and/or Halal Assurance
              Management Systems or other related industry fields for at least
              two (2) years of continuous service in the last five (5) years,
              such as:
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );

  const renderArrangementsPage2 = () => (
    <div className="space-y-4 text-black">
      <ol className="list-decimal ml-6 space-y-3 text-sm" start={5}>
        <li>
          Candidates who have gained competencies through informal training and
          previous work or life experiences may opt to apply for Recognition of
          Prior Learning (RPL) through portfolio assessment.
          <br />
          <br />
          To qualify for portfolio assessment, the candidate must have gained
          competencies through education, informal training, and previous work
          or life experiences for at least 3 years within the last five (5)
          years.
        </li>
      </ol>
    </div>
  );

  const renderEvidencePlan = () => (
    <div className="space-y-4 text-black">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold">EVIDENCE PLAN</h2>
      </div>

      <table className="w-full border-collapse border border-[#000] text-sm">
        <tbody>
          <tr>
            <td className="border border-[#000] p-2 font-semibold w-50">
              Qualification Title
            </td>
            <td className="border border-[#000] p-2" colSpan={4}>
              <span className="font-bold">
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
                <li>Perform Shielded Metal Arc Welding - Pipe to Pipe Joint</li>
                <li>Repair Welds</li>
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
            <td className="border border-[#000] p-2 text-center font-bold">
              Demonstration
            </td>
            <td className="border border-[#000] p-2 text-center font-bold">
              Oral Questioning
            </td>
            <td className="border border-[#000] p-2 text-center font-bold">
              Written Test
            </td>
          </tr>

          {units.map((unit) => (
            <React.Fragment key={unit.id}>
              {unit.elements.map((element) => (
                <React.Fragment key={element.id}>
                  {/* Element Title */}
                  <tr>
                    <td
                      className="bg-gray-100 border border-[#000] p-2 font-bold"
                      colSpan={5}
                    >
                      {element.name}
                    </td>
                  </tr>

                  {element.pcs.map((pc) => (
                    <tr key={pc.id}>
                      <td className="border border-[#000] p-2" colSpan={2}>
                        {pc.text}
                      </td>

                      <td className="border border-[#000] p-1 text-center">
                        {pc.demo && (
                          <CheckIcon className="inline w-5 h-5 text-gray-600" />
                        )}
                      </td>

                      <td className="border border-[#000] p-1 text-center">
                        {pc.qt && (
                          <CheckIcon className="inline w-5 h-5 text-gray-600" />
                        )}
                      </td>

                      <td className="border border-[#000] p-1 text-center">
                        {pc.mcq && (
                          <CheckIcon className="inline w-5 h-5 text-gray-600" />
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <p className="text-xs italic text-[#666] mt-2">
        Note:{" "}
        <span className="font-semibold">Critical Aspects of Competency*</span>
      </p>
    </div>
  );

  const renderSpecificInstructions1 = () => (
    <div className="p-6 bg-white max-w-4xl mx-auto text-sm text-black">
      <h2 className="text-left font-bold mb-4">
        SPECIFIC INSTRUCTIONS FOR THE ASSESSOR
      </h2>

      {/* Top Table */}
      <table className="w-full border border-black mb-4">
        <tbody>
          <tr>
            <td className="border border-black p-2 w-1/3 font-semibold">
              Qualification Title
            </td>
            <td className="border border-black p-2">
              Shielded Metal Arc Welding (SMAW) NC II
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-semibold">
              Unit of Competencies
            </td>
            <td className="border border-black p-2" colSpan={4}>
              <ul className="list-disc ml-5">
                <li>
                  Perform Shielded Metal Arc Welding - Plate to Plate Joint
                </li>
                <li>Perform Shielded Metal Arc Welding - Pipe to Pipe Joint</li>
                <li>Repair Welds</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-semibold">
              Time Allotted:
            </td>
            <td className="border border-black p-2">
              ____ per candidate or ____ for 10 candidates
            </td>
          </tr>
          <tr>
            <td className="p-6" colSpan={2}>
              {/* Instructions */}
              <div className="space-y-2">
                <p>
                  1. Conduct an orientation to candidates on the procedures of
                  the assessment <b>(10 minutes).</b>
                </p>

                <p>
                  2. Provide each candidate with a complete set of supplies and
                  materials, tools and equipment, the necessary ingredients, and
                  a copy of the Specific Instructions to the Candidate.
                </p>

                <p>
                  3. For safety reasons, you may instruct the candidate to
                  temporarily halt or completely end the demonstration at any
                  given time.
                </p>

                <p>
                  4. To assess the candidate’s competence, instruct the
                  candidates to perform the following tasks:
                </p>

                <div className="ml-6">
                  <p>
                    4.1. Instruct the candidate to make a Shielded Metal Arc
                    Weld out of the specified materials.
                  </p>
                  <p>
                    4.2. Instruct the candidate to inspect the weld for defects.
                  </p>
                </div>

                <p>
                  5. Use the “Assessment Guide for Demonstration” as reference
                  when rating the candidate’s performance in skills
                  demonstration.
                </p>

                <p>
                  6. Probe the candidate’s knowledge by oral questioning. A list
                  of questions and answers are provided in this Guide.
                </p>

                <p>
                  7. Assessment is based on the units of competency in the
                  Training Regulations and EVIDENCE PLAN, and shall focus on the
                  evidence-gathering methods with estimated maximum time limits
                  below:
                </p>
              </div>

              {/* Assessment Table */}
              <table className="w-full border border-black mt-4 text-center text-xs">
                <thead>
                  <tr>
                    <th className="border border-black p-2">
                      Assessment Activities
                    </th>
                    <th className="border border-black p-2">Per Candidate</th>
                    <th className="border border-black p-2">10 candidates</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-2 text-left">
                      Orientation
                    </td>
                    <td className="border border-black p-2 ">
                      10 minutes (simultaneous)
                    </td>
                    <td className="border border-black p-2" />
                  </tr>
                  <tr>
                    <td className="border border-black p-2 text-left ">
                      Written Test
                    </td>
                    <td className="border border-black p-2 ">
                      30 minutes (simultaneous)
                    </td>
                    <td className="border border-black p-2" />
                  </tr>
                  <tr>
                    <td className="border border-black p-2 text-left ">
                      Demonstration
                    </td>
                    <td className="border border-black p-2 ">
                      4 hours and 20 minutes (simultaneous)
                    </td>
                    <td className="border border-black p-2" />
                  </tr>
                  <tr>
                    <td className="border border-black p-2 text-left ">
                      Oral questioning
                    </td>
                    <td className="border border-black p-2 ">15 minutes</td>
                    <td className="border border-black p-2 ">
                      2 hours and 30 minutes
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 text-left">
                      Feedbacking
                    </td>
                    <td className="border border-black p-2 ">3 minutes</td>
                    <td className="border border-black p-2 ">30 minutes</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-bold w-1/2">
                      TOTAL
                    </td>
                    <td className="border border-black p-2">
                      5 hours and 18 minutes
                    </td>
                    <td className="border border-black p-2">8 hours</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderSpecificInstructions2 = () => (
    <div className="p-6 bg-white max-w-4xl mx-auto text-sm text-black">
      {/* Footer Instructions */}
      <table className="w-full border border-black mt-4">
        <tbody>
          <tr>
            <td className="p-6" colSpan={2}>
              <div className="mt-4 space-y-2">
                <p>
                  8. The final assessment shall be your responsibility as the
                  Accredited Assessor.
                </p>
                <p>
                  9. Record the assessment outcome using the prescribed Rating
                  Sheet and provide the candidate feedback on the results of the
                  assessment. The feedback shall indicate whether the candidate
                  is COMPETENT or NOT YET COMPETENT.
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderDemonstrationGuide = () => (
    <div className="space-y-4">
      <div className="bg-[#E0E0E0] px-2 py-1 rounded text-xs text-[#666] inline-block">
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
        Auto-compiled from Demonstration Test - Phase 2
      </div>

      <h2 className="text-base font-bold text-[#333] mb-4">
        RECOMMENDED LIST OF TOOLS, EQUIPMENT AND MATERIALS <br /> FOR TEN (10)
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
          {Array.from({ length: 25 }, (_, i) => (
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

  return (
    <div className="p-6 text-gray-800">
      <div className="text-sm text-[#666] mb-4">
        <Breadcrumbs
          items={[
            {
              label: "Sector Details",
              href: `#`,
            },
            {
              label: "Sector Projects",
              href: `/`,
            },
            {
              label: "Competency Assessment Tools (CATs)",
              href: `/cats`,
            },
            {
              label: "Assessor's Guide",
              href: `/cats/assessors-guide`,
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

        <div className="p-6 bg-[#FAFAFA] text-sm text-[#666]">
          <div className="w-[794px] h-[1123px] p-16 bg-white shadow-md mx-auto overflow-hidden">
            {renderPage()}
          </div>
        </div>
      </div>
      {/* Footer Actions */}
      <div className="mt-6 flex justify-between">
        <button
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
          onClick={() => navigateToPage("package-navigator")}
        >
          ← Back to Package Navigator
        </button>
      </div>
    </div>
  );
}
