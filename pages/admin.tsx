import { useState } from 'react';

const ADMIN_PASSWORD = 'medwise2025'; // Change this to your desired password

export default function Admin() {
  const [inputPassword, setInputPassword] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [error, setError] = useState('');
  const [csv, setCsv] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === ADMIN_PASSWORD) {
      setAccessGranted(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };
      const [interactions, setInteractions] = useState<string>(''); // comma-separated names

  if (!accessGranted) {
    return (
      <div style={{ maxWidth: 400, margin: '80px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={inputPassword}
            onChange={e => setInputPassword(e.target.value)}
            style={{ padding: 8, width: '100%', marginBottom: 12 }}
          />
          <button type="submit" style={{ padding: '8px 16px' }}>Login</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
      </div>
    );
  }

  // Parse CSV and send to backend
  const parseAndImport = async (csvText: string) => {
    setLoading(true);
    setMessage('');
    try {
      const lines = csvText.trim().split('\n');
      const headers = lines[0].split(',');
      const medicines = lines.slice(1).map(line => {
        const values = line.split(',');
        const obj: any = {};
        headers.forEach((h, i) => { obj[h.trim()] = values[i]?.trim() || ''; });
        return obj;
      });
      for (const med of medicines) {
        await fetch('/api/custom-medicines', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(med),
        });
      }
      setMessage('Import successful!');
    } catch (err: any) {
      setMessage('Import failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async e => {
        const text = e.target?.result as string;
        await parseAndImport(text);
      };
      reader.readAsText(file);
    } else {
      await parseAndImport(csv);
    }
  };

  return (
    <main style={{ maxWidth: 600, margin: '40px auto', padding: 32, background: '#f9f9fb', borderRadius: 16 }}>
      <h1>Admin: Bulk Import Medicines</h1>
      <p>Paste CSV with columns: name, uses, dosage, sideEffects, prohibited, warnings</p>
      <input
        type="file"
        accept=".csv"
        style={{ marginBottom: 16 }}
        onChange={e => setFile(e.target.files?.[0] || null)}
      />
      <div style={{ marginBottom: 16 }}>or paste CSV below:</div>
      <textarea
        rows={10}
        style={{ width: '100%', marginBottom: 16 }}
        value={csv}
        onChange={e => setCsv(e.target.value)}
        placeholder="name,uses,dosage,sideEffects,prohibited,warnings\nParacetamol,Fever relief,500mg,Nausea,Liver disease,Max 4g/day"
      />
      <button onClick={handleImport} disabled={loading || !csv.trim()} style={{ padding: '8px 16px', marginBottom: 16 }}>
        {loading ? 'Importing...' : 'Import Medicines'}
      </button>
      {message && <p>{message}</p>}
    </main>
  );
}
