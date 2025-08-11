import type { NextApiRequest, NextApiResponse } from 'next';

const OPENFDA_URL = 'https://api.fda.gov/drug/drugsfda.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search = '', skip = 0, limit = 20 } = req.query;
  try {
    const response = await fetch(`${OPENFDA_URL}?limit=${limit}&skip=${skip}`);
    const data = await response.json();
    // Extract medicine names (brand and generic)
    const medicines = (data.results || []).map((item: any) => ({
      brand: item.products?.[0]?.brand_name || '',
      generic: item.products?.[0]?.generic_name || '',
    }));
    // Optionally filter by search
    const filtered = search
      ? medicines.filter(m =>
          m.brand.toLowerCase().includes((search as string).toLowerCase()) ||
          m.generic.toLowerCase().includes((search as string).toLowerCase())
        )
      : medicines;
    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from OpenFDA' });
  }
}
