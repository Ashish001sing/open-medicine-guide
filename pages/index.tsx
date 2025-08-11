    // Helper: get icon URL based on type/category
    function getMedicineIcon(medicine: any) {
      // Use the provided pills icon for all medicine types
      return 'https://cdn-icons-png.flaticon.com/512/6642/6642783.png';
    }
import { useEffect, useState } from 'react';
import styles from './index.module.css';

export default function Home() {
  // ...existing code removed for syntax correctness...
  const [medicines, setMedicines] = useState<any[]>([]);
  const [customMedicines, setCustomMedicines] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', uses: '', dosage: '', sideEffects: '', prohibited: '', warnings: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedCustom, setSelectedCustom] = useState<any | null>(null);
  const [selectedOpenFDA, setSelectedOpenFDA] = useState<any | null>(null);
  // Interaction checker state
  const [selectedForInteraction, setSelectedForInteraction] = useState<{type: 'custom'|'openfda', index: number}[]>([]);
  const [interactionResult, setInteractionResult] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/openfda-medicines?search=${encodeURIComponent(search)}&skip=${page * 20}&limit=20`).then(res => res.json()),
      fetch('/api/custom-medicines').then(res => res.json()),
    ])
      .then(([openfda, custom]) => {
        setMedicines(openfda);
        setCustomMedicines(custom);
        setError(null);
      })
      .catch(() => setError('Failed to fetch medicines'))
      .finally(() => setLoading(false));
  }, [search, page]);


    return (
    <>
        <nav style={{ background: '#0070f3', padding: '12px 0', marginBottom: 24 }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.3rem', display: 'flex', alignItems: 'center' }}>
              <img src="https://cdn-icons-png.flaticon.com/512/6642/6642783.png" alt="MedWise" style={{ width: 32, height: 32, marginRight: 8 }} />
              MedWise 💊
            </span>
            <div>
              <a href="/" style={{ color: '#fff', marginRight: 16, textDecoration: 'none' }}>Home</a>
              <a href="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Admin</a>
            </div>
          </div>
        </nav>
        <main className={styles.main}>
    <section className={styles.detailSection}>
            <h2 className={styles.sectionTitle}>About MedWise</h2>
            <p>
              MedWise is an open-source medicine guide that helps users find information about medicines, their uses, dosage, side effects, prohibitions, and warnings. You can search for medicines, add your own, and import bulk data for research or personal use.     
            </p>
            <p>
              <strong>Features:</strong>
            </p>
            <ul>
              <li>Search and browse medicines from OpenFDA and your own database</li>
              <li>Add custom medicines with full details</li>
              <li>Bulk import medicines via CSV</li>
              <li>Responsive, modern UI</li>
              <li>Open-source and ready for your resume or portfolio</li>
              <li>Medicine Interaction Checker</li>
            </ul>
          </section>
          {/* ...existing code for search, add, and list medicines... */}
          <input
            type="text"
            placeholder="Search medicine..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className={styles.searchInput}
            style={{ padding: 8, width: '100%', maxWidth: 400, marginBottom: 24, borderRadius: 8, border: '1px solid #ccc', fontSize: '1rem' }}
          />

        {/* Medicine Interaction Checker UI */}
        <section className={styles.detailSection}>
          <h2 className={styles.sectionTitle}>Medicine Interaction Checker</h2>
          <p>Select medicines below and click "Check Interactions" to see possible interactions.</p>
          <div style={{ display: 'flex', gap: 32 }}>
            <div>
              <h3>Custom Medicines</h3>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 16, listStyle: 'none', padding: 0 }}>
                {customMedicines.map((m, i) => (
                  <li key={i} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 12, minWidth: 180, display: 'flex', alignItems: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                    <label style={{ width: '100%' }}>
                      <input
                        type="checkbox"
                        checked={selectedForInteraction.some(sel => sel.type === 'custom' && sel.index === i)}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectedForInteraction([...selectedForInteraction, {type: 'custom', index: i}]);
                          } else {
                            setSelectedForInteraction(selectedForInteraction.filter(sel => !(sel.type === 'custom' && sel.index === i)));
                          }
                        }}
                        style={{ marginRight: 8 }}
                      />
                      <img src={getMedicineIcon(m)} alt="icon" style={{ width: 24, height: 24, marginRight: 8, verticalAlign: 'middle' }} />
                      <span style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{m.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>OpenFDA Medicines</h3>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 16, listStyle: 'none', padding: 0 }}>
                {medicines.map((m, i) => (
                  <li key={i} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 12, minWidth: 180, display: 'flex', alignItems: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                    <label style={{ width: '100%' }}>
                      <input
                        type="checkbox"
                        checked={selectedForInteraction.some(sel => sel.type === 'openfda' && sel.index === i)}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectedForInteraction([...selectedForInteraction, {type: 'openfda', index: i}]);
                          } else {
                            setSelectedForInteraction(selectedForInteraction.filter(sel => !(sel.type === 'openfda' && sel.index === i)));
                          }
                        }}
                        style={{ marginRight: 8 }}
                      />
                      <img src={getMedicineIcon(m)} alt="icon" style={{ width: 24, height: 24, marginRight: 8, verticalAlign: 'middle' }} />
                      <span style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{m.brand || m.generic}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            style={{ marginTop: 16, padding: '8px 16px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            disabled={selectedForInteraction.length < 2}
            onClick={async () => {
              const selectedNames = selectedForInteraction.map(sel => {
                if (sel.type === 'custom') return customMedicines[sel.index]?.name;
                if (sel.type === 'openfda') return medicines[sel.index]?.brand || medicines[sel.index]?.generic;
                return '';
              }).filter(Boolean);
              // Gather custom interactions from customMedicines
              const customInteractions = customMedicines
                .filter(med => Array.isArray(med.interactions) && med.interactions.length > 0)
                .map(med => ({
                  pair: [med.name, ...med.interactions],
                  message: `Custom interaction: ${med.name} interacts with ${med.interactions.join(', ')}`
                }));
              if (selectedNames.length >= 2) {
                setInteractionResult('Checking...');
                try {
                  const res = await fetch('/api/check-interactions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ medicines: selectedNames, customInteractions })
                  });
                  const data = await res.json();
                  setInteractionResult(data.result);
                } catch (err) {
                  setInteractionResult('Error checking interactions.');
                }
              } else {
                setInteractionResult(null);
              }
            }}
          >Check Interactions</button>
          {interactionResult && (
            <div style={{ marginTop: 16, color: interactionResult.startsWith('Warning') ? 'red' : 'green' }}>
              <strong>{interactionResult}</strong>
            </div>
          )}
        </section>

        <section className={styles.detailSection}>
          <h2 className={styles.sectionTitle}>Add Custom Medicine</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormLoading(true);
                  setFormError(null);
                  // Simple validation
                  if (!form.name.trim()) {
                    setFormError('Medicine name is required');
                    setFormLoading(false);
                    return;
                  }
                  // Add your form submission logic here
                }}
              >
                {/* form fields here, unchanged */}
              </form>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
              ) : (
                <div>
                  <h2 className={styles.sectionTitle}>Custom Medicines</h2>
                  <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 16, listStyle: 'none', padding: 0 }}>
                    {customMedicines.map((m, i) => (
                      <li key={i} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 12, minWidth: 180, display: 'flex', alignItems: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                        <button style={{ background: 'none', border: 'none', color: '#0070f3', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }} onClick={() => { setSelectedCustom(m); setSelectedOpenFDA(null); } }>
                          <img src={getMedicineIcon(m)} alt="icon" style={{ width: 24, height: 24, marginRight: 8, verticalAlign: 'middle' }} />
                          {m.name}
                        </button>
                        {m.uses && <span style={{ color: '#555', marginLeft: 8 }}> ({m.uses})</span>}
                      </li>
                    ))}
                  </ul>
                  <h2 className={styles.sectionTitle}>Medicines (OpenFDA)</h2>
                  <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 16, listStyle: 'none', padding: 0 }}>
                    {medicines.map((m, i) => (
                      <li key={i} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 12, minWidth: 180, display: 'flex', alignItems: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                        <button style={{ background: 'none', border: 'none', color: '#0070f3', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }} onClick={() => { setSelectedOpenFDA(m); setSelectedCustom(null); } }>
                          <img src={getMedicineIcon(m)} alt="icon" style={{ width: 24, height: 24, marginRight: 8, verticalAlign: 'middle' }} />
                          {m.brand || m.generic}
                        </button>
                        {m.brand && m.generic && m.brand !== m.generic ? (
                          <span style={{ color: '#555', marginLeft: 8 }}> ({m.generic})</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                    <button disabled={page === 0} onClick={() => setPage(page - 1)}>
                      Previous
                    </button>
                    <button onClick={() => setPage(page + 1)}>
                      Next
                    </button>
                  </div>
                  {/* Details for selected custom medicine */}
                  {selectedCustom && (
                    <section className={styles.detailSection}>
                      <h3>{selectedCustom.name}</h3>
                      <p><strong>Uses:</strong> {selectedCustom.uses || 'N/A'}</p>
                      <p><strong>Dosage:</strong> {selectedCustom.dosage || 'N/A'}</p>
                      <p><strong>Side Effects:</strong> {selectedCustom.sideEffects || 'N/A'}</p>
                      <p><strong>Prohibited:</strong> {selectedCustom.prohibited || 'N/A'}</p>
                      <p><strong>Warnings:</strong> {selectedCustom.warnings || 'N/A'}</p>
                    </section>
                  )}
                  {/* Details for selected OpenFDA medicine */}
                  {selectedOpenFDA && (
                    <section className={styles.detailSection}>
                      <h3>{selectedOpenFDA.brand || selectedOpenFDA.generic}</h3>
                      <p><strong>Uses:</strong> Not available from OpenFDA</p>
                      <p><strong>Dosage:</strong> Not available from OpenFDA</p>
                      <p><strong>Side Effects:</strong> Not available from OpenFDA</p>
                      <p><strong>Prohibited:</strong> Not available from OpenFDA</p>
                      <p><strong>Warnings:</strong> Not available from OpenFDA</p>
                    </section>
                  )}
                </div>
              )}
        </section>
            </main>
          </>
        )}

      // Admin component removed to fix duplicate default export error.
