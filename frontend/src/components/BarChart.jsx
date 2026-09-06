import { useRef, useState } from 'react'

const WIDTH = 680
const HEIGHT = 280
const PADDING_LEFT = 44
const PADDING_BOTTOM = 30
const PADDING_TOP = 16

function BarChart({ series }) {
  const svgRef = useRef(null)
  const [hoverIndex, setHoverIndex] = useState(null)

  if (!series || series.length === 0) {
    return <p>No data to show yet.</p>
  }

  const values = series.map(point => point.value)
  const maxValue = Math.max(...values, 1)

  const plotWidth = WIDTH - PADDING_LEFT - 16
  const plotHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM
  const barSlot = plotWidth / series.length
  const barWidth = Math.min(28, barSlot * 0.55)

  const yFor = value => PADDING_TOP + plotHeight - (value / maxValue) * plotHeight
  const xFor = index => PADDING_LEFT + index * barSlot + (barSlot - barWidth) / 2

  const gridTicks = [0, 0.5, 1].map(t => maxValue * t)

  const handleMove = event => {
    const rect = svgRef.current.getBoundingClientRect()
    const relativeX = ((event.clientX - rect.left) / rect.width) * WIDTH
    let index = Math.floor((relativeX - PADDING_LEFT) / barSlot)
    index = Math.max(0, Math.min(series.length - 1, index))
    setHoverIndex(index)
  }

  const hovered = hoverIndex !== null ? series[hoverIndex] : null

  return (
    <div style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        {gridTicks.map(tick => (
          <g key={tick}>
            <line
              x1={PADDING_LEFT}
              y1={yFor(tick)}
              x2={WIDTH - 16}
              y2={yFor(tick)}
              stroke="var(--border)"
            />
            <text x={PADDING_LEFT - 10} y={yFor(tick) + 4} fontSize="11" fill="var(--text-muted)" textAnchor="end">
              {tick.toFixed(0)}
            </text>
          </g>
        ))}

        {series.map((point, index) => (
          <rect
            key={point.year}
            x={xFor(index)}
            y={yFor(point.value)}
            width={barWidth}
            height={PADDING_TOP + plotHeight - yFor(point.value)}
            rx="3"
            fill={index === hoverIndex ? 'var(--text)' : '#c7c9cc'}
          />
        ))}

        {series.map((point, index) =>
          index % Math.ceil(series.length / 10) === 0 ? (
            <text
              key={point.year}
              x={xFor(index) + barWidth / 2}
              y={HEIGHT - 10}
              fontSize="11"
              fill="var(--text-muted)"
              textAnchor="middle"
            >
              {point.year}
            </text>
          ) : null
        )}
      </svg>

      {hovered && (
        <div
          className="chart-tooltip"
          style={{
            left: `${((xFor(hoverIndex) + barWidth / 2) / WIDTH) * 100}%`,
            top: `${(yFor(hovered.value) / HEIGHT) * 100}%`,
          }}
        >
          {hovered.year}<br />{hovered.value}k ha
        </div>
      )}
    </div>
  )
}

export default BarChart
