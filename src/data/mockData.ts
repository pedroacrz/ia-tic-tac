import type { Skin, LiveWin } from '../types';

export const MOCK_SKINS: Skin[] = [
    {
        id: '1',
        name: 'Dragon Lore',
        weapon: 'AWP',
        rarity: 'Covert',
        price: 12500,
        image: 'https://placehold.co/400x300/1a0b29/ffffff?text=AWP+Dragon+Lore',
        wear: 'FN'
    },
    {
        id: '2',
        name: 'Emerald',
        weapon: 'Gamma Doppler',
        rarity: 'Gold',
        price: 8900,
        image: 'https://placehold.co/400x300/1a0b29/ffffff?text=Gamma+Doppler+Emerald',
        wear: 'FN'
    },
    {
        id: '3',
        name: 'Cyber Security',
        weapon: 'M4A4',
        rarity: 'Classified',
        price: 90,
        image: 'https://placehold.co/400x300/1a0b29/ffffff?text=M4A4+Cyber+Security',
        wear: 'FN'
    },
    {
        id: '4',
        name: 'Jawbreaker',
        weapon: 'USP-S',
        rarity: 'Classified',
        price: 10.3,
        image: 'https://placehold.co/400x300/1a0b29/ffffff?text=USP-S+Jawbreaker',
        wear: 'FN'
    },
];

export const MOCK_WINS: LiveWin[] = [
    { id: 'w1', skin: MOCK_SKINS[1], user: 'Gamma Doppler', timestamp: '2 mins ago' },
    { id: 'w2', skin: MOCK_SKINS[2], user: 'M4A4', timestamp: '5 mins ago' },
    { id: 'w3', skin: MOCK_SKINS[0], user: 'AWP', timestamp: '10 mins ago' },
    { id: 'w4', skin: MOCK_SKINS[3], user: 'USP-S', timestamp: '12 mins ago' },
    { id: 'w5', skin: MOCK_SKINS[1], user: 'Gamma Doppler', timestamp: '15 mins ago' },
    { id: 'w6', skin: MOCK_SKINS[2], user: 'M4A4', timestamp: '18 mins ago' },
];
