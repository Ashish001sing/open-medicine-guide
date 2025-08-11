import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // For POST, get data from body
    const { input } = req.body;
    res.status(200).json({ result: `You sent (POST): ${input}` });
  } else {
    // For GET, get data from query
    const { input } = req.query;
    res.status(200).json({ result: `You sent (GET): ${input}` });
  }
}
