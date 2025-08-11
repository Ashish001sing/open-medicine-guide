import type { NextApiRequest, NextApiResponse } from 'next';

// Hardcoded interactions for fallback
const fallbackInteractions = [
  {
    pair: ['Aspirin', 'Ibuprofen'],
    message: 'Warning: Aspirin and Ibuprofen may increase risk of bleeding when taken together.'
  },
  {
    pair: ['Paracetamol', 'Alcohol'],
    message: 'Warning: Paracetamol and Alcohol may increase risk of liver damage.'
  },
  {
    pair: ['Warfarin', 'Aspirin'],
    message: 'Warning: Warfarin and Aspirin may increase risk of bleeding.'
  },
  {
    pair: ['Metformin', 'Alcohol'],
    message: 'Warning: Metformin and Alcohol may increase risk of lactic acidosis.'
  },
  {
    pair: ['Ibuprofen', 'Warfarin'],
    message: 'Warning: Ibuprofen and Warfarin may increase risk of bleeding.'
  },
];

// Helper: get RxCUI for a drug name from RxNav
async function getRxcui(drug: string): Promise<string | null> {
  try {
    const resp = await fetch(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${encodeURIComponent(drug)}`);
    const data = await resp.json();
    return data.idGroup?.rxnormId?.[0] || null;
  } catch (err) {
    console.error('Error fetching RxCUI for', drug, err);
    return null;
  }
}

// Helper: get interactions from RxNav for a list of RxCUIs
async function getInteractions(rxcuis: string[]): Promise<string[]> {
  try {
    if (rxcuis.length < 2) return [];
    const resp = await fetch(`https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxcuis.join('+')}`);
    const data = await resp.json();
    const interactions: string[] = [];
    if (data.fullInteractionTypeGroup) {
      for (const group of data.fullInteractionTypeGroup) {
        for (const type of group.fullInteractionType) {
          for (const pair of type.interactionPair) {
            interactions.push(pair.description);
          }
        }
      }
    }
    return interactions;
  } catch (err) {
    console.error('Error fetching interactions from RxNav', err);
    return [];
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { medicines, customInteractions } = req.body;
  if (!Array.isArray(medicines) || medicines.length < 2) {
    return res.status(400).json({ error: 'Please provide at least two medicines.' });
  }
  // Normalize medicine names for RxNav
  const normalizedNames = medicines.map((n: string) => n.trim().toLowerCase());

  // Check custom interactions first (if provided)
  if (Array.isArray(customInteractions) && customInteractions.length > 0) {
    for (const interaction of customInteractions) {
      if (interaction.pair.every((name: string) => normalizedNames.includes(name.trim().toLowerCase()))) {
        return res.status(200).json({ result: interaction.message });
      }
    }
  }

  try {
    // Get RxCUIs for all normalized medicine names
    const rxcuis: string[] = [];
    for (const med of normalizedNames) {
      const rxcui = await getRxcui(med);
      if (rxcui) rxcuis.push(rxcui);
    }
    if (rxcuis.length < 2) throw new Error('No RxNav data found for selected medicines.');
    const interactionDescriptions = await getInteractions(rxcuis);
    if (interactionDescriptions.length > 0) {
      return res.status(200).json({ result: interactionDescriptions.join(' | ') });
    } else {
      // Fallback to hardcoded interactions
      let foundInteraction = null;
      for (const interaction of fallbackInteractions) {
        if (interaction.pair.every(name => normalizedNames.includes(name.trim().toLowerCase()))) {
          foundInteraction = interaction.message;
          break;
        }
      }
      if (foundInteraction) {
        return res.status(200).json({ result: foundInteraction });
      } else {
        return res.status(200).json({ result: 'No known interactions found for selected medicines.' });
      }
    }
  } catch (err) {
    console.error('Interaction API error:', err);
    // Fallback to hardcoded interactions
    let foundInteraction = null;
    for (const interaction of fallbackInteractions) {
      if (interaction.pair.every(name => normalizedNames.includes(name.trim().toLowerCase()))) {
        foundInteraction = interaction.message;
        break;
      }
    }
    if (foundInteraction) {
      return res.status(200).json({ result: foundInteraction });
    } else {
      return res.status(200).json({ result: 'No known interactions found for selected medicines.' });
    }
  }
}
