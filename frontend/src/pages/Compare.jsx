import { useState } from 'react'
import { UploadIcon } from '../components/icons'

const API_BASE = 'http://localhost:8000'

function Compare() {
  const [imageOne, setImageOne] = useState(null)
  const [imageTwo, setImageTwo] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const canCompare = imageOne && imageTwo && !loading

  const handleCompare = () => {
    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('image_one', imageOne)
    formData.append('image_two', imageTwo)

    fetch(`${API_BASE}/api/compare`, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => setResult(data))
      .catch(() => setError('Could not compare those images.'))
      .finally(() => setLoading(false))
  }

  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <p className="eyebrow">Caleus / Compare</p>
      </div>

      <div>
        <h1 style={styles.title}>Compare satellite images</h1>
        <p>Upload two images of the same location, taken at different times.</p>
      </div>

      <div style={styles.uploadRow}>
        <UploadSlot label="Earlier image" file={imageOne} onFile={setImageOne} />
        <UploadSlot label="Later image" file={imageTwo} onFile={setImageTwo} />
      </div>

      <button
        onClick={handleCompare}
        disabled={!canCompare}
        style={{ ...styles.button, opacity: canCompare ? 1 : 0.5 }}
      >
        {loading ? 'Comparing...' : 'Compare'}
      </button>

      {error && <p style={{ color: 'var(--loss)' }}>{error}</p>}

      {loading && (
        <div className="skeleton" style={{ width: '100%', height: '360px', borderRadius: 'var(--radius)' }} />
      )}

      {!loading && !result && !error && (
        <div style={styles.emptyState}>
          <p>Choose two images above and run a comparison to see the change overlay here.</p>
        </div>
      )}

      {result && (
        <div style={styles.resultCard}>
          <img src={result.overlay} alt="Change overlay" style={styles.overlayImage} />
          <div style={styles.statBadge}>
            <p className="eyebrow" style={{ marginBottom: '4px' }}>Forest lost</p>
            <h3 style={{ fontSize: '22px', color: 'var(--loss)' }}>{result.percentLost}%</h3>
          </div>
        </div>
      )}
    </div>
  )
}

function UploadSlot({ label, file, onFile }) {
  return (
    <label style={styles.uploadSlot}>
      <div style={{ color: 'var(--text)', marginBottom: '4px' }}>
        <UploadIcon size={22} />
      </div>
      <span style={{ fontWeight: 500, marginBottom: '4px' }}>{label}</span>
      <span style={{ fontSize: '13px' }}>
        {file ? file.name : 'Click to choose a file'}
      </span>
      <input
        type="file"
        accept="image/*"
        onChange={e => onFile(e.target.files[0])}
        style={{ display: 'none' }}
      />
    </label>
  )
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
  title: {
    fontSize: '26px',
    marginBottom: '6px',
  },
  uploadRow: {
    display: 'flex',
    gap: '16px',
  },
  uploadSlot: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
    border: '1.5px dashed var(--border)',
    borderRadius: 'var(--radius)',
    background: 'var(--surface)',
    cursor: 'pointer',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'flex-start',
    padding: '11px 26px',
    borderRadius: 'var(--radius-pill)',
    border: 'none',
    background: 'var(--active-bg)',
    color: 'var(--active-text)',
    fontSize: '14px',
    fontWeight: 500,
  },
  emptyState: {
    border: '1px dashed var(--border)',
    borderRadius: 'var(--radius)',
    padding: '48px',
    textAlign: 'center',
  },
  resultCard: {
    position: 'relative',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '16px',
  },
  overlayImage: {
    width: '100%',
    borderRadius: '8px',
    display: 'block',
  },
  statBadge: {
    position: 'absolute',
    bottom: '32px',
    right: '32px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '12px 18px',
    boxShadow: 'var(--shadow-lifted)',
  },
}

export default Compare
