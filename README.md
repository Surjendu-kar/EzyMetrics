# EzyMetrics

## Overview

A modern React-based dashboard application for lead management, analytics, and reporting built with TypeScript, Material-UI, and Chart.js.

## Features

#### Dashboard: 
- Customizable widgets
- Interactive performance metrics
- Lead summary display
- Add/remove widget functionality

#### Lead Management

- Create, read, update, and delete leads
- Status tracking (New, Contacted, Qualified, Lost)
- Validation for lead information
- Modal-based lead details view

#### Analytics

- Multiple chart types (Bar, Line, Pie)
- Sales performance visualization
- Website traffic analysis
- Lead status distribution

#### Reports

- Customizable report generation
- Multiple report types (Sales, Leads, Performance)
- Flexible date range selection


## Prerequisites


- Node.js (version 14 or higher)
- npm or yarn




## Installation

#### 1. Clone the repository:

- git clone https://github.com/Surjendu-kar/EzyMetrics

#### 2. Install dependencies:

```bash
  yarn install
```

#### 3. Start the development server:

```bash
  yarn start
```
    





## Project Structure

```bash
 src/
├── components/
│   ├── Dashboard/
│   │   ├── Dashboard.tsx
│   │   ├── WidgetComponents.tsx
│   │   └── chartConfig.ts
│   ├── Leads/
│   │   ├── Leads.tsx
│   │   └── LeadModal.tsx
│   ├── Analytics/
│   │   ├── Analytics.tsx
│   │   ├── ChartComponent.tsx
│   │   └── ChartData.ts
│   ├── Reports/
│   │   └── Reports.tsx
│   └── Sidebar/
│       └── Sidebar.tsx
├── App.tsx
└── index.css
└── main.tsx
```


## Key Dependencies

- React: Frontend framework
- TypeScript: Type safety and better development experience
- Material-UI: UI component library
- Chart.js: Data visualization
- React Router: Navigation
- React ChartJS-2: Chart.js React wrapper
## Usage

#### Dashboard :

- View performance metrics
- Add/remove widgets using the "Add Widget" button
- Monitor lead summary


#### Lead Management :

- Add new leads using the "Add New Lead" button
- View and edit lead details
- Update lead status
- Delete leads


#### Analytics :

- View sales performance charts
- Monitor website traffic
- Analyze lead status distribution


#### Reports :

- Select report type
- Choose date range
- Generate customized reports