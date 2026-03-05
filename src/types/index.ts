export type SkinRarity = 'Industrial' | 'Mil-Spec' | 'Restricted' | 'Classified' | 'Covert' | 'Contraband' | 'Gold';

export interface Skin {
    id: string;
    name: string;
    weapon: string;
    rarity: SkinRarity;
    price: number;
    image: string;
    float?: number;
    wear?: string; // FN, MW, FT, WW, BS
}

export interface LiveWin {
    id: string;
    skin: Skin;
    user: string;
    timestamp: string;
}
