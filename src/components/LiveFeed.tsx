import React from 'react';
import { MOCK_WINS } from '../data/mockData';
import type { SkinRarity } from '../types';

const getRarityColor = (rarity: SkinRarity) => {
  switch (rarity) {
    case 'Gold': return '#ffaa00';
    case 'Covert': return '#eb4b4b';
    case 'Classified': return '#d32ee6';
    case 'Restricted': return '#8847ff';
    case 'Mil-Spec': return '#4b69ff';
    default: return '#b0c3d9';
  }
};

const LiveFeed = () => {
  const wins = [...MOCK_WINS, ...MOCK_WINS]; // Duplicate for infinite scroll effect

  return (
    <div className="live-feed-wrapper">
      <div className="live-scroll">
        {wins.map((win, idx) => (
          <div key={`${win.id}-${idx}`} className="win-card glass glass-hover">
            <div className="win-rarity-indicator" style={{ backgroundColor: getRarityColor(win.skin.rarity) }}></div>
            <div className="win-image">
              <img src={win.skin.image} alt={win.skin.name} />
            </div>
            <div className="win-info">
              <span className="win-skin-name">{win.skin.name}</span>
              <div className="win-meta">
                <span className="win-weapon">({win.skin.weapon})</span>
                <span className="win-time">{win.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .live-feed-wrapper {
          width: 100%;
          overflow: hidden;
          padding: 15px 0;
          background: rgba(0, 0, 0, 0.4);
          border-bottom: 1px solid var(--border-glass);
        }

        .live-scroll {
          display: flex;
          gap: 15px;
          animation: scroll 40s linear infinite;
        }

        .win-card {
          min-width: 180px;
          height: 70px;
          display: flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: 10px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .win-rarity-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
        }

        .win-image {
          width: 50px;
          height: 40px;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .win-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 0 5px rgba(255,255,255,0.2));
        }

        .win-info {
          display: flex;
          flex-direction: column;
        }

        .win-skin-name {
          font-size: 11px;
          font-weight: 700;
          color: white;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100px;
        }

        .win-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .win-weapon {
          font-size: 9px;
          color: var(--text-dim);
        }

        .win-time {
          font-size: 8px;
          color: var(--primary-light);
          font-weight: 600;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .live-feed-wrapper:hover .live-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default LiveFeed;
