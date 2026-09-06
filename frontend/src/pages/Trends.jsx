import { useEffect, useState } from 'react'
import CountrySelect from '../components/CountrySelect'
import BarChart from '../components/BarChart'
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

  const yearlyChange = getYearlyChange(trend?.series)

  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <p className="eyebrow">Caleus / Trends</p>
      </div>

      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.title}>Deforestation trends</h1>
          <p>Yearly forest loss by country, from Our World in Data.</p>
        </div>
        <CountrySelect countries={countries} value={country} onSelect={setCountry} />
      </div>

      {error && <p style={{ color: 'var(--loss)' }}>{error}</p>}

      <div style={styles.statRow}>
        {loading || !trend?.stats
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="skeleton" style={{ height: '92px', flex: 1 }} />
            ))
          : trend.stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                change={index === 1 ? yearlyChange : null}
              />
            ))}
      </div>

      <div style={styles.chartCard}>
        <div style={styles.chartHeader}>
          <p className="eyebrow">Annual loss</p>
          <span style={{ fontSize: '13px', fontWeight: 500 }}>{country}</span>
        </div>

        {loading ? (
          <div className="skeleton" style={{ width: '100%', height: '240px' }} />
        ) : (
          <BarChart series={trend?.series} />
        )}
      </div>
    </div>
  )
}

function getYearlyChange(series) {
  if (!series || series.length < 2) return null
  const last = series[series.length - 1]
  const prev = series[series.length - 2]
  if (prev.value === 0) return null

  const percent = (((last.value - prev.value) / prev.value) * 100).toFixed(1)
  return {
    direction: last.value < prev.value ? 'down' : 'up',
    percent: Math.abs(percent),
  }
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '28px 36px',
    maxWidth: '1080px',
  },
  topBar: {
    marginBottom: '-8px',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '16px',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: '26px',
    marginBottom: '6px',
  },
  statRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  chartCard: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '24px',
  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
}

export default Trends
