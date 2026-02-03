
import React from 'react';
import { pocStyles } from '../styles';
import { Filter, Download } from 'lucide-react';

interface Props {
    title: string;
}

export const FirGenericList: React.FC<Props> = ({ title }) => {
    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <h1 style={{...pocStyles.pageTitle, marginBottom: 0}}>{title}</h1>
                <div style={{display: 'flex', gap: '12px'}}>
                    <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#42526e', border: '1px solid #dfe1e6', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Filter size={16} /> Filter
                    </button>
                    <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#42526e', border: '1px solid #dfe1e6', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            <div style={pocStyles.section}>
                <div style={{padding: '40px', textAlign: 'center', color: '#6b778c'}}>
                    <div style={{fontSize: '3rem', marginBottom: '16px', opacity: 0.3}}>🚧</div>
                    <p>This view ({title}) is not fully implemented in the POC.</p>
                    <p style={{fontSize: '0.85rem'}}>Please use the <strong>Controllable Units</strong> view for the detailed demo.</p>
                </div>
            </div>
        </div>
    );
};
