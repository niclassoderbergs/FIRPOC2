
import React from 'react';
import { BRSData } from './types';
import { MermaidDiagram } from './MermaidDiagram';

interface PurposeSectionProps {
  activeBRS: BRSData;
  styles: any;
  isEditing: boolean;
  onUpdate: (updatedBRS: BRSData) => void;
}

export const PurposeSection: React.FC<PurposeSectionProps> = ({ activeBRS, styles, isEditing, onUpdate }) => {
  
  const handlePurposeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ ...activeBRS, purpose: e.target.value });
  };

  const handleDiagramChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ ...activeBRS, diagramCode: e.target.value });
  };

  const handleActorChange = (index: number, field: 'role' | 'description', value: string) => {
    const newActors = [...activeBRS.actors];
    newActors[index] = { ...newActors[index], [field]: value };
    onUpdate({ ...activeBRS, actors: newActors });
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #0052cc',
    borderRadius: '4px',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    backgroundColor: '#fffdf5'
  };

  return (
    <section>
      <h2 style={styles.sectionHeader}>Purpose</h2>
      
      {isEditing ? (
        <textarea 
          style={{...inputStyle, minHeight: '100px', marginBottom: '16px'}}
          value={activeBRS.purpose}
          onChange={handlePurposeChange}
        />
      ) : (
        <p style={styles.paragraph}>{activeBRS.purpose}</p>
      )}
      
      <div style={{ fontSize: '0.9rem', color: '#555', marginBottom: '16px' }}>
         <strong>Actors:</strong> 
         {isEditing ? (
           <div style={{marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
             {activeBRS.actors.map((actor, idx) => (
               <div key={idx} style={{display: 'flex', gap: '8px'}}>
                 <input 
                    style={{...inputStyle, width: '150px'}} 
                    value={actor.role} 
                    onChange={(e) => handleActorChange(idx, 'role', e.target.value)}
                 />
                 <input 
                    style={inputStyle} 
                    value={actor.description} 
                    onChange={(e) => handleActorChange(idx, 'description', e.target.value)}
                 />
               </div>
             ))}
           </div>
         ) : (
           <span style={{marginLeft: '4px'}}>
             {activeBRS.actors.map((a: any) => a.role).join(', ')}
           </span>
         )}
      </div>

      {(activeBRS.diagramCode || isEditing) && (
        <>
          <div style={styles.diagramWrapper}>
            {isEditing ? (
              <textarea 
                style={{...inputStyle, minHeight: '300px', fontFamily: 'monospace', fontSize: '0.85rem'}}
                value={activeBRS.diagramCode || ''}
                onChange={handleDiagramChange}
                placeholder="Paste Mermaid diagram code here..."
              />
            ) : (
               activeBRS.diagramCode && <MermaidDiagram chart={activeBRS.diagramCode} />
            )}
          </div>
          <div style={styles.caption}>
            Figure. <span style={styles.captionId}>{activeBRS.id}</span> {activeBRS.title}
          </div>
        </>
      )}
    </section>
  );
};
