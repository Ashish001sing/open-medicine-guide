import type { NextApiRequest, NextApiResponse } from 'next';

const medicines = [
  {
    name: 'Paracetamol',
    uses: 'Fever, pain relief',
    dosage: '500mg every 4-6 hours',
    sideEffects: 'Nausea, rash',
    prohibited: 'Liver disease',
    warnings: 'Do not exceed 4g/day',
  },
  {
    name: 'Ibuprofen',
    uses: 'Pain, inflammation',
    dosage: '200-400mg every 6-8 hours',
    sideEffects: 'Stomach upset, dizziness',
    prohibited: 'Ulcer, kidney disease',
    warnings: 'Take with food',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(medicines);
}
