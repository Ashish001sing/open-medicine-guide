import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma =
  globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, uses, dosage, sideEffects, prohibited, warnings } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    try {
      const medicine = await prisma.medicine.create({
        data: { name, uses, dosage, sideEffects, prohibited, warnings },
      });
      res.status(201).json(medicine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add medicine' });
    }
  } else if (req.method === 'GET') {
    try {
      const medicines = await prisma.medicine.findMany();
      res.status(200).json(medicines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch medicines' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
