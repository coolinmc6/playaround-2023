"use client";

import React, { useEffect, useState } from 'react';

import mermaid from 'mermaid';
import Button from '@/core/Button';

mermaid.initialize({
  startOnLoad: true,
  theme: 'forest',
});

type MermaidChartType = {
  graphDefinition: string;
  hideRerenderButton?: boolean;
}

const MermaidChart = ({ graphDefinition, hideRerenderButton = true }: MermaidChartType) => {
  const [hideMermaid, setHideMermaid] = useState(false);

  useEffect(() => {
    if (hideMermaid) return;
    mermaid.contentLoaded();
  }, [hideMermaid])

  const handleRerender = () => {
    setHideMermaid(true)
    setTimeout(() => {
      setHideMermaid(false)
    }, 100)
  }

  if (hideRerenderButton) {
    return <pre className="mermaid" dangerouslySetInnerHTML={{ __html: graphDefinition }} />
  }

  return (
    <div className="relative p-4 border">
      <Button 
        onClick={handleRerender}
        rootClassName="absolute top-2 left-2"
        size="small"
      >
        Rerender Mermaid
      </Button>
      {!hideMermaid ? <pre className="mermaid m-4" dangerouslySetInnerHTML={{ __html: graphDefinition }} /> : null}
    </div>
  )

}

export default MermaidChart;
