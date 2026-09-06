import { MiniBarsIcon } from './icons'

function StatCard({ label, value, change }) {
  return (
    <div style={styles.card}>
      <div style={styles.topRow}>
        <p className="eyebrow">{label}</p>
        <MiniBarsIcon size={20} />
      </div>
      <h3 style={styles.value}>{value}</h3>
      {change && (
        <span className={`change-badge ${change.direction === 'down' ? 'good' : 'bad'}`}>
          {change.direction === 'down' ? '↓' : '↑'} {change.percent}% vs last year
        </span>
      )}
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
    flex: 1,
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },
  value: {
    fontSize: '24px',
    marginBottom: '8px',
  },
}

export default StatCard
