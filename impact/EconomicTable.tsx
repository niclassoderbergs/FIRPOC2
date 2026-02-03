import React from 'react';
import { styles } from './styles';

const riskBadge = (level: 'low' | 'medium' | 'high' | 'critical', label: string) => {
  const colors = {
    low: { bg: '#e3fcef', text: '#006644' },
    medium: { bg: '#fff0b3', text: '#172b4d' },
    high: { bg: '#ffebd6', text: '#974f0c' },
    critical: { bg: '#ffebe6', text: '#bf2600' }
  };
  const style = colors[level];
  return (
    <span style={{
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '0.7rem',
      fontWeight: 800,
      backgroundColor: style.bg,
      color: style.text,
      textTransform: 'uppercase'
    }}>
      {label}
    </span>
  );
};

export const EconomicTable: React.FC = () => {
  return (
    <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ ...styles.th, width: '30%' }}>Ekonomisk parameter</th>
            <th style={styles.th}>Alt 1 (Centralt)</th>
            <th style={styles.th}>Alt 2 (Växel)</th>
            <th style={styles.th}>Alt 3 (Hybrid)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>
              <strong>CAPEX (Investering)</strong><br/>
              <span style={{ fontSize: '0.75rem', color: '#666' }}>Samlad kostnad för utveckling centralt.</span>
            </td>
            <td style={styles.td}>
              {riskBadge('high', 'Hög')}
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Betydande investering för att bygga den centrala motorn och migrera branschens data.</div>
            </td>
            <td style={styles.td}>
              {riskBadge('medium', 'Medel')}
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Kräver omfattande anpassningar av lokala system för att stödja realtidsanrop.</div>
            </td>
            <td style={styles.td}>
              {riskBadge('high', 'Hög')}
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Kombinerar kostnaden för en central växel med ett separat centralt register.</div>
            </td>
          </tr>
          <tr>
            <td style={styles.td}>
              <strong>OPEX (Drift & Beredskap)</strong><br/>
              <span style={{ fontSize: '0.75rem', color: '#666' }}>Löpande kostnad för IT-support och dygnet-runt-beredskap.</span>
            </td>
            <td style={styles.td}>
              {riskBadge('low', 'Låg')}
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Stordriftsfördel. En central dygnet-runt-support för hela marknaden.</div>
            </td>
            <td style={styles.td}>
              {riskBadge('critical', 'Kritisk')}
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Extremt dyr för branschen. Kräver IT-jour dygnet runt hos 170 nätägare för att säkra flöden.</div>
            </td>
            <td style={styles.td}>
              {riskBadge('high', 'Hög')}
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Dubbla supportorganisationer och splittrat felsökningsansvar ökar kostnaderna.</div>
            </td>
          </tr>
          <tr>
            <td style={styles.td}>
              <strong>Kostnad per framtida reform</strong><br/>
              <span style={{ fontSize: '0.75rem', color: '#666' }}>T.ex. införande av energidelning eller nya EU-krav.</span>
            </td>
            <td style={styles.td}>
              {riskBadge('low', 'Låg')}
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>"Build once". Ändras på ett ställe för hela Sverige.</div>
            </td>
            <td style={styles.td}>
              {riskBadge('high', 'Hög')}
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Kräver 170 parallella lokala utvecklingsprojekt för varje lagändring.</div>
            </td>
            <td style={styles.td}>
              {riskBadge('high', 'Hög')}
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Spillover-effekter kräver ändringar i flera centrala och lokala system.</div>
            </td>
          </tr>
          <tr>
            <td style={styles.td}>
              <strong>Cybersecurity Overhead</strong><br/>
              <span style={{ fontSize: '0.75rem', color: '#666' }}>Kostnad för att säkra attackytor och NIS2-efterlevnad.</span>
            </td>
            <td style={styles.td}>
              {riskBadge('low', 'Låg')}
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>En central punkt att härda, övervaka och skydda statligt.</div>
            </td>
            <td style={styles.td}>
              {riskBadge('high', 'Hög')}
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>170 attackytor kräver 170 separata säkerhetsteam och härdade system.</div>
            </td>
            <td style={styles.td}>
              {riskBadge('high', 'Hög')}
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Kombinerar sårbarheter i växel-arkitekturen med de i det centrala registret.</div>
            </td>
          </tr>
          <tr>
            <td style={styles.td}>
              <strong>Alternativkostnad (Behovsgap)</strong><br/>
              <span style={{ fontSize: '0.75rem', color: '#666' }}>Priset för att inte möta KN1-KN5 och ME1-ME7.</span>
            </td>
            <td style={styles.td}>
              {riskBadge('low', 'Minimal')}
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Löser fundamentala hinder för innovation och kundrörlighet.</div>
            </td>
            <td style={styles.td}>
              {riskBadge('critical', 'Kritisk')}
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Utebliven kundnytta. Hämmad konkurrens och bromsad energiomställning.</div>
            </td>
            <td style={styles.td}>
              {riskBadge('high', 'Hög')}
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Löser flexibiliteten men lämnar retail-marknaden i fortsatt ineffektivitet.</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};