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
      Here is one mermaid diagram:
      <MermaidChart graphDefinition={graphDefinition} />
      
    </div>
  )
}

export default MermaidHome;
