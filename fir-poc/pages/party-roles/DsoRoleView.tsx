
import React, { useState, useMemo } from 'react';
import { TowerControl, MapPin, Zap, X, ChevronRight, Box, Activity, Hash, CheckCircle2, FileSearch } from 'lucide-react';
import { pocStyles } from '../../styles';
import { mockCUs, mockBids } from '../../mockData';

interface Props {
  managedMGAs: any[];
}

const localStyles = {
  drillDownOverlay: {
    marginTop: '24px',
    padding: '20px',
    backgroundColor: '#f4f5f7',
    borderRadius: '8px',
    border: '1px solid #dfe1e6',
    animation: 'fadeIn 0.2s ease-out'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#6b778c',
    padding: '4px',
    borderRadius: '4px'
  }
};

// Symmetric Bell Curve logic
const getSeededDeliveryFactor = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    let sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += Math.sin(hash * i * 9876.5432);
    }
    const avg = sum / 10; 
    return 1.0 + (avg * 0.4);
};

export const DsoRoleView: React.FC<Props> = ({ managedMGAs }) => {
  const [selectedMGA, setSelectedMGA] = useState<string | null>(null);

  // Area stats calculation
  const areaStats = useMemo(() => {
    const mgaCodes = managedMGAs.map(m => m.mgaCode);
    const cusInDsoArea = mockCUs.filter(c => mgaCodes.includes(c.gridArea));
    
    // Total Capacity
    const totalCap = cusInDsoArea.reduce((acc, curr) => {
      const val = curr.capacityUnit === 'kW' ? curr.capacity / 1000 : curr.capacity;
      return acc + val;
    }, 0);

    // Activations (Sample logic for demo)
    const activeBidsCount = mockBids.filter(b => b.activationStatus === 'Activated' && b.id.includes('500')).length;

    return {
        totalCap: totalCap.toFixed(1),
        activeBidsCount,
        qualifiedUnits: cusInDsoArea.filter(c => c.status === 'Active').length
    };
  }, [managedMGAs]);

  const mgaData = useMemo(() => {
    return managedMGAs.map(mga => {
      const units = mockCUs.filter(c => c.gridArea === mga.mgaCode);
      const capacityMW = units.reduce((acc, curr) => {
        const val = curr.capacityUnit === 'kW' ? curr.capacity / 1000 : curr.capacity;
        return acc + val;
      }, 0);
      return {
        ...mga,
        units,
        capacityMW: parseFloat(capacityMW.toFixed(2))
      };
    });
  }, [managedMGAs]);

  const activeMgaDetail = useMemo(() => {
    return mgaData.find(m => m.mgaCode === selectedMGA);
  }, [selectedMGA, mgaData]);

  return (
    <div style={{ ...pocStyles.section, borderLeft: '4px solid #4a148c' }}>
      <h3 style={pocStyles.sectionTitle}>
        <TowerControl size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 
        Role: Distribution System Operator (DSO)
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#f4f5f7', padding: '12px 16px', borderRadius: '6px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Managed Areas</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#172b4d' }}>{managedMGAs.length} MGA:s</div>
        </div>
        <div style={{ backgroundColor: '#f4f5f7', padding: '12px 16px', borderRadius: '6px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Grid Capacity</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#172b4d' }}>{areaStats.totalCap} MW</div>
        </div>
        <div style={{ backgroundColor: '#f3f0ff', padding: '12px 16px', borderRadius: '6px', border: '1px solid #dcd7f7' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#403294', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recent Activations</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#403294' }}>{areaStats.activeBidsCount} Events</div>
        </div>
      </div>

      <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#fafbfc', borderRadius: '8px', border: '1px solid #ebecf0' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#42526e', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileSearch size={14} color="#0052cc" /> Area Verification Summary
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#5e6c84', lineHeight: '1.5', margin: 0 }}>
            Aggregated delivery data for all Service Providers operating in this DSO's grid. 
            Verification is based on <strong>BRS-FLEX-7110</strong> (Ex-post Quantification).
          </p>
      </div>

      <table style={pocStyles.table}>
        <thead style={{ backgroundColor: '#fafbfc' }}>
          <tr>
            <th style={pocStyles.th}>MGA Code</th>
            <th style={pocStyles.th}>Area Name</th>
            <th style={pocStyles.th}>Type</th>
            <th style={{...pocStyles.th, textAlign: 'right'}}>Total Cap (MW)</th>
            <th style={{...pocStyles.th, textAlign: 'right'}}>Avg. Area Accuracy</th>
            <th style={{...pocStyles.th, textAlign: 'right'}}>Units</th>
          </tr>
        </thead>
        <tbody>
          {mgaData.map(mga => {
            const accuracy = 98 + (mga.capacityMW % 4); // Simulated accuracy per area
            return (
              <tr 
                key={mga.mgaCode} 
                style={{
                  ...pocStyles.row, 
                  backgroundColor: selectedMGA === mga.mgaCode ? '#f4f8fd' : 'transparent'
                }}
                onClick={() => setSelectedMGA(selectedMGA === mga.mgaCode ? null : mga.mgaCode)}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f4f7fb'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = selectedMGA === mga.mgaCode ? '#f4f8fd' : 'transparent'}
              >
                <td style={{ ...pocStyles.td, fontFamily: 'monospace', fontWeight: 700, color: '#0052cc' }}>{mga.mgaCode}</td>
                <td style={pocStyles.td}>{mga.mgaName}</td>
                <td style={pocStyles.td}><span style={pocStyles.badge}>{mga.mgaType}</span></td>
                <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 600 }}>{mga.capacityMW} MW</td>
                <td style={{ ...pocStyles.td, textAlign: 'right' }}>
                    <span style={{fontWeight: 700, color: accuracy >= 98 && accuracy <= 102 ? '#006644' : '#974f0c'}}>
                        {accuracy}%
                    </span>
                </td>
                <td style={{ ...pocStyles.td, textAlign: 'right' }}>
                  <div style={{display:'flex', alignItems:'center', justifyContent: 'flex-end', gap: '8px'}}>
                      {mga.units.length}
                      <ChevronRight size={14} color="#a5adba" style={{ transform: selectedMGA === mga.mgaCode ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {activeMgaDetail && (
        <div style={localStyles.drillDownOverlay}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <MapPin size={18} color="#4a148c" />
                    <h4 style={{margin: 0, fontWeight: 700, fontSize: '1rem'}}>
                        Resources in {activeMgaDetail.mgaName} ({activeMgaDetail.mgaCode})
                    </h4>
                </div>
                <button style={localStyles.closeBtn} onClick={() => setSelectedMGA(null)}><X size={18} /></button>
            </div>

            <div style={{backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #dfe1e6', overflow: 'hidden'}}>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={{...pocStyles.th, fontSize: '0.75rem'}}>CU ID</th>
                            <th style={{...pocStyles.th, fontSize: '0.75rem'}}>Name</th>
                            <th style={{...pocStyles.th, fontSize: '0.75rem'}}>Type</th>
                            <th style={{...pocStyles.th, fontSize: '0.75rem'}}>Status</th>
                            <th style={{...pocStyles.th, fontSize: '0.75rem', textAlign: 'right'}}>Capacity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeMgaDetail.units.map((unit: any) => (
                            <tr key={unit.id}>
                                <td style={{...pocStyles.td, fontWeight: 600, fontSize: '0.85rem', color: '#0052cc'}}>
                                    <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                        <Box size={12} color="#6b778c" />
                                        {unit.id}
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, fontSize: '0.85rem'}}>{unit.name}</td>
                                <td style={{...pocStyles.td, fontSize: '0.85rem'}}>{unit.type}</td>
                                <td style={{...pocStyles.td, fontSize: '0.85rem'}}>
                                    <span style={{
                                        ...pocStyles.badge, 
                                        backgroundColor: unit.status === 'Active' ? '#e3fcef' : '#fff0b3',
                                        color: unit.status === 'Active' ? '#006644' : '#172b4d',
                                        fontSize: '0.65rem'
                                    }}>{unit.status}</span>
                                </td>
                                <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 600, fontSize: '0.85rem'}}>
                                    {unit.capacity} {unit.capacityUnit}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}
    </div>
  );
};
