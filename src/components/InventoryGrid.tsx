import React from 'react';
import SkinCard from './SkinCard';
import type { Skin } from '../types';

interface InventoryGridProps {
    skins: Skin[];
    onSelect?: (skin: Skin) => void;
    selectedId?: string;
    emptyMessage?: string;
}

const InventoryGrid: React.FC<InventoryGridProps> = ({ skins, onSelect, selectedId, emptyMessage }) => {
    if (skins.length === 0) {
        return (
            <div className="empty-inventory glass">
                <div className="empty-icon">📦</div>
                <p>{emptyMessage || "You have no available items yet"}</p>
                <style>{`
          .empty-inventory {
            height: 400px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            border-radius: 20px;
            color: var(--text-dim);
          }
          .empty-icon {
            font-size: 40px;
            opacity: 0.5;
          }
        `}</style>
            </div>
        );
    }

    return (
        <div className="inventory-grid">
            {skins.map(skin => (
                <SkinCard
                    key={skin.id}
                    skin={skin}
                    onClick={onSelect}
                    isSelected={selectedId === skin.id}
                />
            ))}
            <style>{`
        .inventory-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 15px;
          width: 100%;
        }
      `}</style>
        </div>
    );
};

export default InventoryGrid;
