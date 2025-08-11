import type { NextApiRequest, NextApiResponse } from 'next';

const diseases = [
  {
    name: 'Common Cold',
    recommended: ['Paracetamol'],
    precautions: 'Rest, fluids',
  },
  {
    name: 'Headache',
    recommended: ['Ibuprofen', 'Paracetamol'],
    precautions: 'Avoid triggers',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(diseases);
}
