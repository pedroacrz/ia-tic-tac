import React from 'react';
import type { Skin } from '../types';

interface SkinCardProps {
    skin: Skin;
    onClick?: (skin: Skin) => void;
    isSelected?: boolean;
}

const getRarityColor = (rarity: string) => {
    switch (rarity) {
        case 'Gold': return '#ffaa00';
        case 'Covert': return '#eb4b4b';
        case 'Classified': return '#d32ee6';
        case 'Restricted': return '#8847ff';
        case 'Mil-Spec': return '#4b69ff';
        default: return '#b0c3d9';
    }
};

const SkinCard: React.FC<SkinCardProps> = ({ skin, onClick, isSelected }) => {
    const rarityColor = getRarityColor(skin.rarity);

    return (
        <div
            className={`skin-card-wrapper glass glass-hover ${isSelected ? 'selected' : ''}`}
            onClick={() => onClick?.(skin)}
        >
            <div className="skin-card-header">
                <span className="wear-badge">FN</span>
            </div>

            <div className="skin-image-container">
                <div className="rarity-glow" style={{ background: `radial-gradient(circle, ${rarityColor}22 0%, transparent 70%)` }}></div>
                <img src={skin.image} alt={skin.name} />
            </div>

            <div className="skin-details">
                <div className="price-tag">$ {skin.price}</div>
                <div className="info">
                    <span className="weapon">{skin.weapon}</span>
                    <span className="name">{skin.name}</span>
                </div>
            </div>

            <div className="rarity-border" style={{ backgroundColor: rarityColor }}></div>

            <style>{`
        .skin-card-wrapper {
          position: relative;
          border-radius: 12px;
          padding: 12px;
          cursor: pointer;
          transition: var(--transition-smooth);
          height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .skin-card-wrapper.selected {
          border-color: var(--primary);
          background: rgba(157, 78, 221, 0.15);
        }

        .skin-card-header {
          display: flex;
          justify-content: flex-start;
        }

        .wear-badge {
          font-size: 9px;
          font-weight: 700;
          color: var(--text-dim);
        }

        .skin-image-container {
          position: relative;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rarity-glow {
          position: absolute;
          width: 120%;
          height: 120%;
          border-radius: 50%;
          z-index: 0;
        }

        .skin-image-container img {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          z-index: 1;
          filter: drop-shadow(0 5px 15px rgba(0,0,0,0.3));
          transition: var(--transition-smooth);
        }

        .skin-card-wrapper:hover .skin-image-container img {
          transform: scale(1.1);
        }

        .skin-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .price-tag {
          font-size: 11px;
          font-weight: 700;
          color: white;
          background: rgba(0,0,0,0.3);
          padding: 2px 8px;
          border-radius: 4px;
          align-self: flex-start;
        }

        .info {
          display: flex;
          flex-direction: column;
        }

        .weapon {
          font-size: 10px;
          color: var(--text-dim);
          font-weight: 600;
        }

        .name {
          font-size: 11px;
          font-weight: 700;
          color: white;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .rarity-border {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
        }
      `}</style>
        </div>
    );
};

export default SkinCard;
