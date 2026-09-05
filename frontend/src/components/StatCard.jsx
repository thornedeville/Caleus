function StatCard({ label, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.label}>{label}</p>
      <h3 style={styles.value}>{value}</h3>
    </div>
  )
}

const styles = {
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '18px 20px',
    minWidth: '160px',
  },
  label: {
    fontSize: '13px',
    marginBottom: '8px',
  },
  value: {
    fontSize: '24px',
  },
}

export default StatCard
