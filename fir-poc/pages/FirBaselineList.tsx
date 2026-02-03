
import React from 'react';
import { pocStyles } from '../styles';
import { TrendingUp, Info, CheckCircle2, Zap, Clock } from 'lucide-react';
import { baselineMethods } from '../mockData';

export const FirBaselineList: React.FC = () => {
    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>Baseline Methods</h1>
                    <p style={{color: '#6b778c', fontSize: '0.9rem'}}>Registry of calculation methods used to determine counterfactual consumption/production.</p>
                </div>
            </div>

            <div style={{...pocStyles.section, padding: '20px', backgroundColor: '#f0f7ff', border: '1px solid #cce4ff', display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '32px'}}>
                <Info size={24} color="#0052cc" style={{flexShrink: 0, marginTop: '2px'}} />
                <div>
                    <h4 style={{margin: '0 0 8px 0', color: '#0052cc', fontWeight: 700}}>About Baseline Selection</h4>
                    <p style={{margin: 0, fontSize: '0.9rem', color: '#172b4d', lineHeight: '1.5'}}>
                        A Service Provider must select an approved baseline method for each Controllable Unit during product qualification. 
                        The availability of methods depends on the market product and the technical characteristics of the unit.
                    </p>
                </div>
            </div>

            <div style={{...pocStyles.section, padding: 0, overflow: 'hidden'}}>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={{...pocStyles.th, width: '25%'}}>Method Name</th>
                            <th style={{...pocStyles.th, width: '35%'}}>Description</th>
                            <th style={{...pocStyles.th, width: '25%'}}>Approved Products</th>
                            <th style={{...pocStyles.th, width: '15%'}}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {baselineMethods.map((method, idx) => (
                            <tr key={method.id} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                                <td style={{...pocStyles.td, verticalAlign: 'top'}}>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                        <TrendingUp size={16} color="#42526e" />
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <span style={{fontWeight: 600, color: '#0052cc'}}>{method.name}</span>
                                            <span style={{fontSize: '0.75rem', color: '#6b778c'}}>{method.id}</span>
                                        </div>
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, fontSize: '0.85rem', color: '#42526e', lineHeight: '1.4'}}>
                                    {method.description}
                                </td>
                                <td style={{...pocStyles.td, verticalAlign: 'top'}}>
                                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
                                        {method.approvedProducts.map(product => (
                                            <span key={product} style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '4px',
                                                backgroundColor: '#e6effc', color: '#0052cc', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, border: '1px solid #b3d4ff'
                                            }}>
                                                <Zap size={10} /> {product}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, verticalAlign: 'top'}}>
                                    <span style={{
                                        ...pocStyles.badge, 
                                        backgroundColor: method.status === 'Approved' ? '#e3fcef' : '#fff0b3',
                                        color: method.status === 'Approved' ? '#006644' : '#172b4d',
                                        display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content'
                                    }}>
                                        {method.status === 'Approved' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                        {method.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p style={{textAlign: 'center', color: '#6b778c', fontSize: '0.85rem', marginTop: '16px'}}>
                System calculated baselines are derived automatically based on the configured method.
            </p>
        </div>
    );
};
