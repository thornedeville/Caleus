import { useEffect, useState } from 'react'
import CountrySelect from '../components/CountrySelect'
import LineChart from '../components/LineChart'
import StatCard from '../components/StatCard'

const API_BASE = 'http://localhost:8000'

function Trends() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')
  const [trend, setTrend] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/countries`)
      .then(res => res.json())
      .then(data => {
        setCountries(data.countries)
        if (data.countries.length > 0) {
          setCountry(data.countries[0])
        }
      })
      .catch(() => setError('Could not load the country list.'))
  }, [])

  useEffect(() => {
    if (!country) return

    setLoading(true)
    setError(null)

    fetch(`${API_BASE}/api/trend/${encodeURIComponent(country)}`)
      .then(res => res.json())
      .then(data => setTrend(data))
      .catch(() => setError('Could not load data for this country.'))
      .finally(() => setLoading(false))
  }, [country])

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.title}>Deforestation trends</h1>
          <p>Yearly forest loss by country, from Our World in Data.</p>
        </div>
        <CountrySelect countries={countries} value={country} onSelect={setCountry} />
      </div>

      {error && <p style={{ color: 'var(--loss)' }}>{error}</p>}

      <div style={styles.chartCard}>
        {loading ? <p>Loading chart...</p> : <LineChart series={trend?.series} />}
      </div>

      {trend?.stats && (
        <div style={styles.statRow}>
          {trend.stats.map(stat => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '32px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '16px',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: '28px',
    marginBottom: '6px',
  },
  chartCard: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '24px',
    boxShadow: 'var(--shadow)',
  },
  statRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
}

export default Trends
