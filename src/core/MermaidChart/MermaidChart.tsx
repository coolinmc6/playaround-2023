"use client";

import React, { useEffect } from 'react';

import mermaid from 'mermaid';
import Button from '@/core/Button';

mermaid.initialize({
  startOnLoad: true,
  theme: 'forest',
});

type MermaidChartType = {
  graphDefinition: string;
}

const MermaidChart = ({ graphDefinition }: MermaidChartType) => {

  useEffect(() => {
    mermaid.contentLoaded();
  }, [])

  const handleRerender = () => {
    console.log('handle rerender')
    mermaid.run();
  }

  return (
    <pre className="mermaid" dangerouslySetInnerHTML={{ __html: graphDefinition }} />
  )

  return (
    <div className="p-4 relative">
      <Button onClick={handleRerender} size="small" rootClassName="absolute top-0 right-0">Rerender</Button>
      <pre className="mermaid" dangerouslySetInnerHTML={{ __html: graphDefinition }} />
    </div>
  )
}

export default MermaidChart;
