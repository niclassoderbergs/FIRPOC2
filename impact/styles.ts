
export const styles = {
  container: { padding: '40px 60px', backgroundColor: '#fff', minHeight: '100%', boxSizing: 'border-box' as const, maxWidth: '1500px', margin: '0 auto' },
  header: { fontSize: '2rem', fontWeight: 800, marginBottom: '24px', color: '#172b4d', letterSpacing: '-0.5px' },
  section: { marginBottom: '48px' },
  sectionHeader: { fontSize: '1.75rem', fontWeight: 700, color: '#172b4d', marginTop: '48px', marginBottom: '20px', borderBottom: '2px solid #ebecf0', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' },
  paragraph: { fontSize: '1.05rem', lineHeight: '1.7', color: '#333', marginBottom: '20px' },
  recommendationBox: { backgroundColor: '#e3fcef', borderLeft: '6px solid #36b37e', padding: '32px', borderRadius: '8px', marginBottom: '48px', boxShadow: '0 4px 12px rgba(54, 179, 126, 0.1)' },
  recommendationTitle: { fontSize: '1.25rem', fontWeight: 800, color: '#006644', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' },
  govAssessmentBox: { backgroundColor: '#f0f7ff', borderLeft: '6px solid #0052cc', padding: '24px 32px', borderRadius: '8px', marginBottom: '32px', display: 'flex', gap: '20px', alignItems: 'center' },
  warningBox: { backgroundColor: '#ffebe6', borderLeft: '4px solid #ff5630', padding: '20px', borderRadius: '4px', marginBottom: '32px', color: '#bf2600', fontSize: '0.95rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' },
  altCard: { padding: '20px', border: '1px solid #dfe1e6', borderRadius: '12px', display: 'flex', flexDirection: 'column' as const, backgroundColor: '#fff', minHeight: '220px', textDecoration: 'none', transition: 'all 0.2s' },
  altTitle: { fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px', color: '#172b4d', lineHeight: '1.3' },
  altBadge: { fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' as const, padding: '2px 6px', borderRadius: '4px', marginBottom: '10px', width: 'fit-content' },
  cardText: { fontSize: '0.85rem', color: '#42526e', lineHeight: '1.5', margin: 0 },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: '0.85rem', marginBottom: '32px' },
  th: { backgroundColor: '#f4f5f7', color: '#172b4d', padding: '12px 16px', textAlign: 'left' as const, borderBottom: '2px solid #dfe1e6', fontWeight: 700 },
  td: { padding: '12px 16px', borderBottom: '1px solid #ebecf0', verticalAlign: 'top' as const, lineHeight: '1.5', color: '#333' },
  subTitle: { fontSize: '1.25rem', fontWeight: 700, color: '#172b4d', marginTop: '32px', marginBottom: '16px' },
  detailBox: { padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px', backgroundColor: '#f8fafc' },
  detailTitle: { fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }
};
