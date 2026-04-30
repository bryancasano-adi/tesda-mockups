# TESDA Assessment Tools Portal Mockups

This repository contains mockups for TESDA's K-Galing Assessment Tools Portal, a comprehensive platform for competency assessment, alignment mapping, and implementation guidance.

## Features

The portal includes three main tools:

### 1. Level Alignment Matrix (LAM)

- Visualize competency alignment across different levels
- Keep mapping relationships clear and consistent
- Interactive table views for competency mapping

### 2. Implementing Guidelines

- Practical guidance and reference materials
- Consistent assessment implementation resources
- Comprehensive documentation for assessors

### 3. Competency Assessment Tool System (CATS)

A complete assessment management system featuring:

- **Evidence Plan Editor**: Create and manage evidence plans
- **Outline View**: Structured assessment outlines
- **Demonstration Test Editor**: Design practical assessments
- **Questioning Tool Editor**: Build questioning frameworks
- **MCQ Configuration & Editor**: Multiple choice question management
- **MCQ TOS Summary**: Test of Specification summaries
- **MCQ External Analysis**: Question analysis tools
- **Distribution Settings**: Assessment distribution configuration
- **AG Assembly Status**: Assessor's Guide assembly tracking
- **Package Navigator**: Assessment package management
- **Assessor's Guide**: Comprehensive assessment guides
- **SIC View**: Supervisor's Initial Check views
- **Written Test View**: Written assessment interfaces
- **Rating Sheet View**: Assessment rating tools
- **SAG View**: Supervisor's Assessment Guide
- **CARS View**: Competency Assessment Rating Sheets
- **Final Export**: Assessment package export functionality

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**:
  - Radix UI (primitives)
  - Material-UI (MUI)
  - Heroicons
  - Lucide React
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Rich Text**: React Quill
- **Drag & Drop**: React DnD
- **Animations**: Motion (Framer Motion)
- **Themes**: Next Themes

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tesda-mockups
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (buttons, forms, etc.)
│   │   ├── competency-assessment-tool/  # CATS-specific components
│   │   ├── implementing-guidelines/     # IG components
│   │   └── level-alignment-matrix/      # LAM components
│   ├── data/               # Mock data and configurations
│   ├── pages/              # Page components
│   ├── styles/             # CSS and styling files
│   └── utils/              # Utility functions
├── main.tsx                # Application entry point
└── vite-env.d.ts           # Vite type definitions
```

## Development

This project uses:

- **Vite** for fast development and building
- **TypeScript** for type safety
- **ESLint** and **Prettier** for code quality (configured via Vite)
- **Tailwind CSS** for styling with custom design system

## Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for all new components
3. Maintain consistent styling with Tailwind CSS classes
4. Test components across different screen sizes

## License

This project is for internal TESDA development and mockup purposes.
