import React from 'react';
import { pocStyles } from '../styles';
import { Search, Filter, Briefcase } from 'lucide-react';
// Fixed: Changed realSpBsp to mockBSPs which is the correct exported member from mockData.
import { mockBSPs } from '../mockData';

interface Props {
  onSelect: (name: string) => void;
}

export const FirSpBspList: React.FC<Props> = ({ onSelect }) => {
    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>Service Providers & BSPs</h1>
                    <p style={{color: '#6b778c', fontSize: '0.9rem'}}>Registry of active aggregator companies and balance service providers.</p>
                </div>
            </div>

            <div style={{...pocStyles.section, padding: 0, overflow: 'hidden'}}>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={pocStyles.th}>Actor Name</th>
                            <th style={pocStyles.th}>Ediel ID</th>
                            <th style={pocStyles.th}>EIC</th>
                            <th style={pocStyles.th}>Primary Role</th>
                            <th style={pocStyles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Fixed: Changed realSpBsp to mockBSPs. */}
                        {mockBSPs.map((actor, idx) => (
                            <tr 
                                key={idx} 
                                style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}
                                onClick={() => onSelect(actor.name)}
                            >
                                <td style={{...pocStyles.td, fontWeight: 600}}>
                                    <span style={{ color: '#0052cc', cursor: 'pointer', textDecoration: 'underline' }}>
                                        {actor.name}
                                    </span>
                                </td>
                                {/* Fix: Property 'ediel' does not exist on type '{ name: string; code: string; scheme: string; businessId: string; country: string; }'. Using 'code' instead. */}
                                <td style={{...pocStyles.td, fontFamily: 'monospace'}}>{actor.code}</td>
                                {/* Fix: Property 'eic' does not exist on type '{ name: string; code: string; scheme: string; businessId: string; country: string; }'. Using 'businessId' instead. */}
                                <td style={{...pocStyles.td, fontFamily: 'monospace', color: '#6b778c'}}>{actor.businessId}</td>
                                <td style={pocStyles.td}>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                                        backgroundColor: '#e6effc', color: '#0052cc', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600
                                    }}>
                                        <Briefcase size={10} /> SP / BSP
                                    </span>
                                </td>
                                <td style={pocStyles.td}>
                                    <span style={{...pocStyles.badge, ...pocStyles.badgeGreen}}>Active</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
