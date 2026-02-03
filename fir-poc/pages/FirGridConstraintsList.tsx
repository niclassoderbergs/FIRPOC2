
import React, { useMemo } from 'react';
import { pocStyles } from '../styles';
import { Search, Filter, ShieldAlert, Clock, Info, ChevronRight, History } from 'lucide-react';
import { mockGridConstraints } from '../mockData';
import { GridConstraint } from '../types';

interface Props {
    onSelect: (id: string) => void;
}

export const FirGridConstraintsList: React.FC<Props> = ({ onSelect }) => {
    const { activeAndPlanned, expired } = useMemo(() => {
        return {
            activeAndPlanned: mockGridConstraints.filter(gc => gc.status !== 'Expired'),
            expired: mockGridConstraints.filter(gc => gc.status === 'Expired')
        };
    }, []);

    const renderConstraintTable = (data: GridConstraint[], isHistorical: boolean) => (
        <div style={{...pocStyles.section, padding: 0, overflow: 'hidden', marginBottom: isHistorical ? '0' : '40px'}}>
            <table style={pocStyles.table}>
                <thead style={{backgroundColor: isHistorical ? '#f4f5f7' : '#fafbfc'}}>
                    <tr>
                        <th style={{...pocStyles.th, color: isHistorical ? '#6b778c' : '#172b4d'}}>ID</th>
                        <th style={pocStyles.th}>System Operator</th>
                        <th style={pocStyles.th}>Limit</th>
                        <th style={pocStyles.th}>Period</th>
                        <th style={pocStyles.th}>Status</th>
                        <th style={pocStyles.th}>Affected Units</th>
                        <th style={pocStyles.th}></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, idx) => (
                        <tr 
                            key={item.id} 
                            style={{
                                ...pocStyles.row, 
                                backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff',
                                opacity: isHistorical ? 0.8 : 1
                            }}
                            onClick={() => onSelect(item.id)}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = isHistorical ? '#ebecf0' : '#e6effc'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#fafbfc' : '#fff'}
                        >
                            <td style={{...pocStyles.td, fontWeight: 600, color: isHistorical ? '#42526e' : '#0052cc'}}>
                                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                                    <ShieldAlert size={14} color={isHistorical ? '#6b778c' : '#0052cc'} />
                                    {item.id}
                                </div>
                            </td>
                            <td style={pocStyles.td}>{item.gridOwner}</td>
                            <td style={pocStyles.td}>
                                <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                    <ShieldAlert size={14} color={isHistorical ? '#6b778c' : '#bf2600'} />
                                    <span style={{fontWeight: 700, color: isHistorical ? '#42526e' : '#bf2600'}}>
                                        Max {item.limitValue} {item.limitUnit}
                                    </span>
                                </div>
                            </td>
                            <td style={pocStyles.td}>
                                <div style={{fontSize: '0.8rem', color: isHistorical ? '#6b778c' : '#172b4d'}}>
                                    <div style={{display:'flex', alignItems:'center', gap:'4px'}}><Clock size={12}/> {new Date(item.startTime).toLocaleString()}</div>
                                    <div style={{display:'flex', alignItems:'center', gap:'4px', marginTop:'2px'}}><Clock size={12}/> {new Date(item.endTime).toLocaleString()}</div>
                                </div>
                            </td>
                            <td style={pocStyles.td}>
                                <span style={{
                                    ...pocStyles.badge, 
                                    backgroundColor: item.status === 'Active' ? '#ffebe6' : (item.status === 'Planned' ? '#fff0b3' : '#ebecf0'),
                                    color: item.status === 'Active' ? '#bf2600' : (item.status === 'Planned' ? '#172b4d' : '#42526e')
                                }}>
                                    {item.status}
                                </span>
                            </td>
                            <td style={pocStyles.td}>
                                <span style={{fontSize: '0.8rem', color: '#6b778c'}}>
                                    {item.affectedUnits.length} units affected
                                </span>
                            </td>
                            <td style={{...pocStyles.td, textAlign: 'right'}}>
                                <ChevronRight size={16} color="#6b778c" />
                            </td>
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={7} style={{...pocStyles.td, textAlign: 'center', padding: '32px', color: '#6b778c', fontStyle: 'italic'}}>
                                No constraints found in this category.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>Temporary Grid Constraints</h1>
                    <p style={{color: '#6b778c', fontSize: '0.9rem'}}>Active and planned restrictions registered by System Operators.</p>
                </div>
            </div>

            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '32px'}}>
                <div style={{position: 'relative', flex: 1}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b778c'}} />
                    <input 
                        type="text" 
                        placeholder="Search constraints..." 
                        style={{
                            width: '100%', padding: '10px 10px 10px 40px', borderRadius: '4px', border: '1px solid #dfe1e6', fontSize: '0.9rem', outline: 'none'
                        }} 
                    />
                </div>
                <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#42526e', border: '1px solid #dfe1e6', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Filter size={16} /> Filter
                </button>
            </div>

            {/* SECTION 1: ACTIVE & PLANNED */}
            <div style={{marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <ShieldAlert size={20} color="#bf2600" />
                <h2 style={{fontSize: '1.2rem', fontWeight: 700, margin: 0}}>Current & Planned Constraints</h2>
                <span style={{...pocStyles.badge, ...pocStyles.badgeBlue, marginLeft: '8px'}}>{activeAndPlanned.length}</span>
            </div>
            <p style={{fontSize: '0.85rem', color: '#6b778c', marginBottom: '16px'}}>These constraints are currently active or scheduled to take effect, affecting market capacity.</p>
            {renderConstraintTable(activeAndPlanned, false)}

            {/* SECTION 2: EXPIRED / HISTORICAL */}
            <div style={{marginTop: '48px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <History size={20} color="#6b778c" />
                <h2 style={{fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#42526e'}}>Historical Constraints</h2>
                <span style={{...pocStyles.badge, marginLeft: '8px'}}>{expired.length}</span>
            </div>
            <p style={{fontSize: '0.85rem', color: '#6b778c', marginBottom: '16px'}}>Previous limitations that are no longer active. Available for audit and reporting.</p>
            {renderConstraintTable(expired, true)}

            <div style={{marginTop: '32px', padding: '16px', backgroundColor: '#fff7d6', borderRadius: '8px', border: '1px solid #ffeeba', display: 'flex', gap: '12px'}}>
                <Info size={20} color="#856404" style={{flexShrink: 0}} />
                <p style={{margin: 0, fontSize: '0.85rem', color: '#856404'}}>
                    Temporary constraints directly affect the <strong>available capacity</strong> for market bids. 
                    The system automatically validates incoming bids against these limits (BRS-FLEX-7011).
                </p>
            </div>
        </div>
    );
};
