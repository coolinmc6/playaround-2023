"use client";

import React, { useEffect } from 'react';
import MermaidChart from '@/core/MermaidChart';
import Table from '@/core/Table';

const graphDefinition = `
graph TD 
A[Enter Chart Definition] --> B(Preview)
B --> C{decide}
C --> D[Keep]
C --> E[Edit Definition]
E --> B
D --> F[Save Image and Code]
F --> B
`
// https://mermaid.js.org/syntax/mindmap.html
const graphDefinition2 = `
mindmap
  root((web repo))
    Testing
      Long history
      Popularisation
        British popular psychology author Tony Buzan
    Code
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Other
      Pen and paper
      Mermaid
`
// Not working for me
const graphDefinition3 = `
block beta
  a[Square Rect] -->|Link text| b((Circle))
`

const frontEndTechnology = [
  { name: 'React', type: 'library', use: 'UI'},
  { name: 'TypeScript', type: 'language', use: 'type checking'},
  { name: 'JavaScript', type: 'language', use: 'ES6' },
  { name: 'Tailwind CSS', type: 'library', use: 'styling' },
  { name: 'Storybook', type: 'tool', use: 'component development' },
  { name: 'Jest', type: 'tool', use: 'testing' },
]

const tableStyles = {
  table: 'max-w-92'
}

const MermaidHome = () => {
  return (
    <div>
      <h1 className="text-2xl mb-6">Mermaid</h1>
      <Table 
        headerArray={['Name', 'Type', 'Use']}
        data={frontEndTechnology} 
        styles={tableStyles}
      />

      <hr />
      <h2>Examples</h2>
      <MermaidChart graphDefinition={graphDefinition} hideRerenderButton={false} />
      <MermaidChart graphDefinition={graphDefinition2} hideRerenderButton={false} />
      {/* <MermaidChart graphDefinition={graphDefinition3} hideRerenderButton={false} /> */}
    </div>
  )
}

export default MermaidHome;
