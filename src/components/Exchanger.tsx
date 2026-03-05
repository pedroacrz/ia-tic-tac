import React, { useState } from 'react';
import { ArrowLeftRight, RotateCcw, Info, Filter, Search } from 'lucide-react';
import type { Skin } from '../types';

interface ExchangerProps {
  userSelection: Skin | null;
  setUserSelection: (skin: Skin | null) => void;
  storeSelection: Skin | null;
  setStoreSelection: (skin: Skin | null) => void;
}

const Exchanger: React.FC<ExchangerProps> = ({
  userSelection,
  setUserSelection,
  storeSelection,
  setStoreSelection
}) => {

  const [isExchanging, setIsExchanging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleExchange = async () => {
    if (!userSelection || !storeSelection || isExchanging) return;

    setIsExchanging(true);
    // Simulate API call/processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsExchanging(false);
    setShowSuccess(true);

    // Reset success state and selections after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setUserSelection(null);
      setStoreSelection(null);
    }, 3000);
  };

  const isButtonDisabled = !userSelection || !storeSelection || isExchanging;

  return (
    <div className="exchanger-container">
      <div className="exchanger-header">
        <button className="back-btn glass">
          <ArrowLeftRight size={16} />
          <span>Back</span>
        </button>
      </div>

      <div className="exchange-grid">
        {/* User Inventory Side */}
        <div className="inventory-section">
          <div className="inventory-label">
            <span className="count">1/10</span>
            <span className="label">Inventory</span>
            <button className="reset-btn" onClick={() => setUserSelection(null)} disabled={isExchanging}>
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>

          <div className="selection-slot glass">
            {userSelection ? (
              <div className="selected-item-display">
                <img src={userSelection.image} alt={userSelection.name} />
                <div className="price-tag">$ {userSelection.price}</div>
              </div>
            ) : (
              <div className="empty-slot-msg">Select an item from your inventory</div>
            )}
          </div>
        </div>

        {/* Central Action */}
        <div className="action-section">
          <div className="decoration-arrows">
            <div className="arrow"></div>
            <div className="arrow"></div>
            <div className="arrow"></div>
          </div>

          <button
            className={`exchange-main-btn ${showSuccess ? 'success' : ''}`}
            onClick={handleExchange}
            disabled={isButtonDisabled}
            style={{
              opacity: isButtonDisabled ? 0.6 : 1,
              cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
              backgroundColor: showSuccess ? 'var(--success)' : 'var(--primary)',
              transition: 'all 0.4s ease'
            }}
          >
            {isExchanging ? 'Exchanging...' : showSuccess ? 'Exchange Success!' : 'Press to exchange'}
          </button>

          <div className="exchange-info">
            <span className="info-text">The max price of items you can get $1039.43</span>
            <Info size={14} className="info-icon" />
          </div>
        </div>

        {/* Store Inventory Side */}
        <div className="inventory-section">
          <div className="inventory-label">
            <span className="count">1/10</span>
            <span className="label">Selection</span>
            <button className="reset-btn" onClick={() => setStoreSelection(null)}>
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>

          <div className="selection-slot glass">
            {storeSelection ? (
              <div className="selected-item-display">
                <img src={storeSelection.image} alt={storeSelection.name} />
                <div className="price-info">
                  <div className="price-tag yellow">$ {storeSelection.price}</div>
                  <div className="balance-delta">+ $400 on balance</div>
                </div>
              </div>
            ) : (
              <div className="empty-slot-msg">Select an item from the store</div>
            )}
          </div>
        </div>
      </div>

      <div className="inventory-controls">
        <div className="search-box glass">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
        <button className="filter-btn glass">
          <Filter size={18} />
          <span>Filters</span>
          <span className="badge">2</span>
        </button>
        <div className="price-range glass">
          <span>Price</span>
          <input type="text" placeholder="From" />
          <input type="text" placeholder="To" />
        </div>
        <div className="sort-box glass">
          <ArrowLeftRight size={16} className="rotate-90" />
          <span>Sort by: </span>
          <span className="active-sort">Price</span>
        </div>
      </div>

      <style>{`
        .exchanger-container {
          padding: 30px 0;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .exchanger-header {
          margin-bottom: 20px;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 8px;
          color: var(--text-dim);
          font-size: 14px;
          font-weight: 600;
        }

        .exchange-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 40px;
          align-items: center;
          margin-bottom: 40px;
        }

        .inventory-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
          justify-content: center;
        }

        .inventory-label .count {
          font-size: 10px;
          background: rgba(255,255,255,0.1);
          padding: 2px 6px;
          border-radius: 4px;
          color: var(--text-dim);
        }

        .inventory-label .label {
          font-size: 16px;
          font-weight: 700;
          color: white;
        }

        .reset-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: var(--text-dim);
          background: rgba(255,255,255,0.05);
          padding: 4px 10px;
          border-radius: 6px;
        }

        .selection-slot {
          height: 300px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border: 2px dashed rgba(255,255,255,0.05);
          position: relative;
          background: radial-gradient(circle at center, rgba(157, 78, 221, 0.1) 0%, transparent 70%);
        }

        .empty-slot-msg {
          color: var(--text-dim);
          font-size: 14px;
          text-align: center;
          max-width: 150px;
        }

        .selected-item-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .selected-item-display img {
          max-width: 220px;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5));
        }

        .price-tag {
          background: var(--bg-card);
          padding: 8px 20px;
          border-radius: 12px;
          border: 1px solid var(--border-active);
          font-weight: 700;
          font-size: 16px;
        }

        .price-tag.yellow {
          border-color: var(--warning);
          color: var(--warning);
        }

        .price-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .balance-delta {
          font-size: 11px;
          font-weight: 600;
          color: var(--warning);
        }

        .action-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }

        .decoration-arrows {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .decoration-arrows .arrow {
          width: 30px;
          height: 10px;
          background: var(--text-dim);
          opacity: 0.2;
          clip-path: polygon(50% 100%, 0 0, 100% 0);
        }

        .exchange-main-btn {
          background: var(--primary);
          color: white;
          padding: 15px 40px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          box-shadow: 0 0 30px rgba(157, 78, 221, 0.4);
        }

        .exchange-main-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 50px rgba(157, 78, 221, 0.6);
        }

        .exchange-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-dim);
          font-size: 11px;
        }

        .inventory-controls {
          display: flex;
          gap: 15px;
          align-items: center;
          margin-bottom: 20px;
        }

        .search-box {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 8px 15px;
          border-radius: 10px;
        }

        .search-box input {
          background: none;
          border: none;
          outline: none;
          color: white;
          margin-left: 10px;
          width: 100%;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 15px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
        }

        .badge {
          background: var(--primary);
          color: white;
          font-size: 10px;
          min-width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .price-range {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 15px;
          border-radius: 10px;
          font-size: 13px;
          color: var(--text-dim);
        }

        .price-range input {
          width: 60px;
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--border-glass);
          border-radius: 6px;
          color: white;
          padding: 4px 8px;
          font-size: 12px;
        }

        .sort-box {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 15px;
          border-radius: 10px;
          font-size: 13px;
        }

        .active-sort {
          font-weight: 700;
          color: white;
        }

        .rotate-90 {
          transform: rotate(90deg);
        }
      `}</style>
    </div>
  );
};

export default Exchanger;
