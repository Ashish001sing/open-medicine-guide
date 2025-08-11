import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Example: Get a query parameter called 'input'
  const { input } = req.query;

  // Process the input and generate a result
  const result = `You sent: ${input}`;

  // Send the result as JSON
  res.status(200).json({ result });
}
