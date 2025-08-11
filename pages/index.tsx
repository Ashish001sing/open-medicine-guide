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

  // ...existing code...

  return (
  <>
      <nav style={{ background: '#0070f3', padding: '12px 0', marginBottom: 24 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>MedWise 💊</span>
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
            <ul>
              <li>Search and browse medicines from OpenFDA and your own database</li>
              <li>Add custom medicines with full details</li>
              <li>Bulk import medicines via CSV</li>
              <li>Responsive, modern UI</li>
              <li>Open-source and ready for your resume or portfolio</li>
            </ul>
          </p>
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
          style={{ padding: 8, width: '100%', maxWidth: 400 }}
        />

      <section className={styles.detailSection}>
        <h2 className={styles.sectionTitle}>Add Custom Medicine</h2>
        <form
          onSubmit={async e => {
            e.preventDefault();
            setFormLoading(true);
            setFormError(null);
            // Simple validation
            if (!form.name.trim()) {
              setFormError('Medicine name is required');
              setFormLoading(false);
              return;
            }
          {/* form fields here, unchanged */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div>
            <h2 className={styles.sectionTitle}>Custom Medicines</h2>
            <ul>
              {customMedicines.map((m, i) => (
                <li key={i}>
                  <button style={{ background: 'none', border: 'none', color: '#0070f3', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { setSelectedCustom(m); setSelectedOpenFDA(null); }}>
                    {m.name}
                  </button>
                  {m.uses && <span style={{ color: '#555' }}> ({m.uses})</span>}
                </li>
              ))}
            </ul>
            <h2 className={styles.sectionTitle}>Medicines (OpenFDA)</h2>
            <ul>
              {medicines.map((m, i) => (
                <li key={i}>
                  <button style={{ background: 'none', border: 'none', color: '#0070f3', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { setSelectedOpenFDA(m); setSelectedCustom(null); }}>
                    {m.brand || m.generic}
                  </button>
                  <>
                    <nav style={{ background: '#0070f3', padding: '12px 0', marginBottom: 24 }}>
                      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>MedWise 💊</span>
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
                          <ul>
                            <li>Search and browse medicines from OpenFDA and your own database</li>
                            <li>Add custom medicines with full details</li>
                            <li>Bulk import medicines via CSV</li>
                            <li>Responsive, modern UI</li>
                            <li>Open-source and ready for your resume or portfolio</li>
                          </ul>
                        </p>
                      </section>
                      <input
                        type="text"
                        placeholder="Search medicine..."
                        value={search}
                        onChange={e => {
                          setSearch(e.target.value);
                          setPage(0);
                        }}
                        className={styles.searchInput}
                        style={{ padding: 8, width: '100%', maxWidth: 400 }}
                      />
                      <section className={styles.detailSection}>
                        <h2 className={styles.sectionTitle}>Add Custom Medicine</h2>
                        <form
                          onSubmit={async e => {
                            e.preventDefault();
                            setFormLoading(true);
                            setFormError(null);
                            // Simple validation
                            if (!form.name.trim()) {
                              setFormError('Medicine name is required');
                              setFormLoading(false);
                              return;
                            }
                            if (form.name.length < 2) {
                              setFormError('Name must be at least 2 characters');
                              setFormLoading(false);
                              return;
                            }
                            // ...existing code for submitting the form...
                          }}
                        >
                          <div style={{ display: 'grid', gap: 8 }}>
                            <input required className={styles.searchInput} placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                            <input className={styles.searchInput} placeholder="Uses" value={form.uses} onChange={e => setForm(f => ({ ...f, uses: e.target.value }))} />
                            <input className={styles.searchInput} placeholder="Dosage" value={form.dosage} onChange={e => setForm(f => ({ ...f, dosage: e.target.value }))} />
                            <input className={styles.searchInput} placeholder="Side Effects" value={form.sideEffects} onChange={e => setForm(f => ({ ...f, sideEffects: e.target.value }))} />
                            <input className={styles.searchInput} placeholder="Prohibited" value={form.prohibited} onChange={e => setForm(f => ({ ...f, prohibited: e.target.value }))} />
                            <input className={styles.searchInput} placeholder="Warnings" value={form.warnings} onChange={e => setForm(f => ({ ...f, warnings: e.target.value }))} />
                            <button type="submit" disabled={formLoading} style={{ marginTop: 8 }}>
                              {formLoading ? 'Adding...' : 'Add Medicine'}
                            </button>
                            {formError && <p style={{ color: 'red' }}>{formError}</p>}
                          </div>
                        </form>
                      </section>
                        </form>
                      </section>
                        </form>
                      </section>
                      {loading ? (
                        <p>Loading...</p>
                      ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                      ) : (
                        <div>
                          <h2 className={styles.sectionTitle}>Custom Medicines</h2>
                          <ul>
                            {customMedicines.map((m, i) => (
                              <li key={i}>
                                <button style={{ background: 'none', border: 'none', color: '#0070f3', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { setSelectedCustom(m); setSelectedOpenFDA(null); }}>
                                  {m.name}
                                </button>
                                {m.uses && <span style={{ color: '#555' }}> ({m.uses})</span>}
                              </li>
                            ))}
                          </ul>
                          <h2 className={styles.sectionTitle}>Medicines (OpenFDA)</h2>
                          <ul>
                            {medicines.map((m, i) => (
                              <li key={i}>
                                <button style={{ background: 'none', border: 'none', color: '#0070f3', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { setSelectedOpenFDA(m); setSelectedCustom(null); }}>
                                  {m.brand || m.generic}
                                </button>
                                {m.brand && m.generic && m.brand !== m.generic ? (
                                  <span style={{ color: '#555' }}> ({m.generic})</span>
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
                      {/* Close main and fragment */}
                    </main>
                  </>
