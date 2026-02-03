
import React, { useEffect, useRef, useState, useId } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#e6effc',
    primaryBorderColor: '#0052cc',
    lineColor: '#42526e',
    secondaryColor: '#ffffff',
    tertiaryColor: '#ffffff'
  },
  flowchart: { htmlLabels: true },
  sequence: { 
    showSequenceNumbers: false,
    useMaxWidth: true,
    stickyHeader: false
  },
  securityLevel: 'loose',
});

interface MermaidProps {
  chart: string;
}

export const MermaidDiagram: React.FC<MermaidProps> = ({ chart }) => {
  // Generate a unique ID for this specific diagram instance.
  // We remove colons because Mermaid IDs must be valid CSS selectors.
  const baseId = useId().replace(/:/g, '');
  const elementId = `mermaid-svg-${baseId}`;
  
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCanceled = false;

    const renderDiagram = async () => {
      if (!chart) return;
      
      try {
        setError(null);
        // Use mermaid.render which returns an SVG string. 
        // This is much safer than mermaid.run for multiple diagrams on one page.
        const { svg } = await mermaid.render(elementId, chart);
        
        if (!isCanceled) {
          setSvgContent(svg);
        }
      } catch (err: any) {
        console.error("Mermaid rendering failed:", err);
        if (!isCanceled) {
          setError(err.message || "Could not render diagram");
        }
      }
    };

    renderDiagram();

    return () => {
      isCanceled = true;
    };
  }, [chart, elementId]);

  if (error) {
    return (
      <div style={{
        color: '#c00', 
        fontFamily: 'monospace', 
        padding: '16px', 
        border: '1px solid #fdd', 
        backgroundColor: '#fee',
        borderRadius: '4px',
        fontSize: '0.8rem'
      }}>
        <strong>Diagram Syntax Error:</strong><br/>{error}
      </div>
    );
  }

  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '24px', 
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #ebecf0',
        minHeight: '100px',
        overflowX: 'auto',
        width: '100%'
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};
