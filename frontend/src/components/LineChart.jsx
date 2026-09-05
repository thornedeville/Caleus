function LineChart({ series }) {
  if (!series || series.length === 0) {
    return <p>No data to show yet.</p>
  }

  const width = 640
  const height = 280
  const padding = 40

  const years = series.map(point => point.year)
  const values = series.map(point => point.value)

  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)
  const minValue = Math.min(...values, 0)
  const maxValue = Math.max(...values)

  const xFor = year =>
    padding + ((year - minYear) / (maxYear - minYear || 1)) * (width - padding * 2)

  const yFor = value =>
    height - padding - ((value - minValue) / (maxValue - minValue || 1)) * (height - padding * 2)

  const linePoints = series.map(point => `${xFor(point.year)},${yFor(point.value)}`).join(' ')

  const areaPoints = `${xFor(minYear)},${yFor(minValue)} ${linePoints} ${xFor(maxYear)},${yFor(minValue)}`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }}>
      <polygon points={areaPoints} fill="var(--accent-soft)" opacity="0.5" />
      <polyline
        points={linePoints}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="var(--border)"
      />

      <text x={padding} y={height - 12} fontSize="12" fill="var(--text-muted)">
        {minYear}
      </text>
      <text x={width - padding} y={height - 12} fontSize="12" fill="var(--text-muted)" textAnchor="end">
        {maxYear}
      </text>
    </svg>
  )
}

export default LineChart
