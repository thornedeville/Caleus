import { useState } from 'react'

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

      {result && (
        <div style={styles.resultCard}>
          <img src={result.overlay} alt="Change overlay" style={styles.overlayImage} />
          <div style={styles.statBadge}>
            <p style={{ marginBottom: '4px' }}>Forest lost</p>
            <h3 style={{ fontSize: '22px' }}>{result.percentLost}%</h3>
          </div>
        </div>
      )}
    </div>
  )
}

function UploadSlot({ label, file, onFile }) {
  return (
    <label style={styles.uploadSlot}>
      <span style={{ fontWeight: 500, marginBottom: '6px' }}>{label}</span>
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
    padding: '32px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  title: {
    fontSize: '28px',
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
    padding: '12px 28px',
    borderRadius: 'var(--radius-pill)',
    border: 'none',
    background: 'var(--text)',
    color: 'var(--surface)',
    fontSize: '14px',
    fontWeight: 500,
  },
  resultCard: {
    position: 'relative',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '16px',
    boxShadow: 'var(--shadow)',
  },
  overlayImage: {
    width: '100%',
    borderRadius: '10px',
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
    boxShadow: 'var(--shadow)',
  },
}

export default Compare
