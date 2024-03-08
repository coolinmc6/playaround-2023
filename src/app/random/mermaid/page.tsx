"use client";

import React, { useEffect } from 'react';
import MermaidChart from '@/core/MermaidChart';

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

// mermaid.initialize({
//   startOnLoad: true,
//   theme: 'forest',
// });

const MermaidHome = () => {

  useEffect(() => {
    // mermaid.contentLoaded();
  }, [])
  
  return (
    <div>
      <h1>Mermaid</h1>
      <p>Mermaid page content</p>
      <MermaidChart graphDefinition={graphDefinition} hideRerenderButton={false} />
      <MermaidChart graphDefinition={graphDefinition2} hideRerenderButton={false} />
      {/* <MermaidChart graphDefinition={graphDefinition3} hideRerenderButton={false} /> */}
    </div>
  )
}

export default MermaidHome;
