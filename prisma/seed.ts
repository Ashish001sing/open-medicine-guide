import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.medicine.createMany({
    data: [
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
      {
        name: 'Amoxicillin',
        uses: 'Bacterial infections',
        dosage: '500mg every 8 hours',
        sideEffects: 'Diarrhea, allergic reaction',
        prohibited: 'Penicillin allergy',
        warnings: 'Complete full course',
      },
      {
        name: 'Cetirizine',
        uses: 'Allergy relief',
        dosage: '10mg once daily',
        sideEffects: 'Drowsiness, dry mouth',
        prohibited: 'Severe kidney disease',
        warnings: 'May cause drowsiness',
      },
    ],
  });

  await prisma.disease.createMany({
    data: [
      {
        name: 'Common Cold',
        recommended: 'Paracetamol,Cetirizine',
        precautions: 'Rest, fluids',
      },
      {
        name: 'Headache',
        recommended: 'Ibuprofen,Paracetamol',
        precautions: 'Avoid triggers',
      },
      {
        name: 'Bacterial Infection',
        recommended: 'Amoxicillin',
        precautions: 'Complete antibiotics course',
      },
      {
        name: 'Allergy',
        recommended: 'Cetirizine',
        precautions: 'Avoid allergens',
      },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
