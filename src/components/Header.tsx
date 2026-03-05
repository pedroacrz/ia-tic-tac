import React from 'react';
import { ShoppingBag, Repeat, ShieldCheck, Gamepad2, Bell, Plus, ChevronDown } from 'lucide-react';

interface HeaderProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, onViewChange }) => {
  return (
    <header className="header-wrapper glass">
      {/* ... rest of the preamble remains same up to main-nav ... */}
      <div className="utility-bar">
        <div className="container flex-between">
          <div className="external-links">
            <a href="#">TERMS OF SERVICE</a>
            <a href="#">PRIVACY POLICY</a>
            <a href="#">PROBABLY FAIR</a>
          </div>
          <div className="utility-right">
            <div className="currency-selector">
              <span>USD</span>
              <ChevronDown size={14} />
            </div>
            <div className="language-selector">
              <span>ENGLISH</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>

      <div className="main-nav">
        <div className="container flex-between">
          <div className="logo-section" onClick={() => onViewChange('Exchanger')} style={{ cursor: 'pointer' }}>
            <div className="logo-hex">
              <div className="logo-inner"></div>
            </div>
            <span className="logo-text">GetDrop</span>
          </div>

          <nav className="nav-links">
            <div className={`nav-item ${activeView === 'Live' ? 'active' : ''}`} onClick={() => onViewChange('Live')}>
              <div className="live-indicator">
                <div className="live-dot"></div>
                <span>Live</span>
              </div>
            </div>
            <div className={`nav-item ${activeView === 'Store' ? 'active' : ''}`} onClick={() => onViewChange('Store')}>
              <ShoppingBag size={18} />
              <span>Store</span>
            </div>
            <div className={`nav-item ${activeView === 'Exchanger' ? 'active' : ''}`} onClick={() => onViewChange('Exchanger')}>
              <Repeat size={18} />
              <span>Exchanger</span>
            </div>
            <div className={`nav-item ${activeView === 'Games' ? 'active' : ''}`} onClick={() => onViewChange('Games')}>
              <Gamepad2 size={18} />
              <span>Games</span>
            </div>
            <div className={`nav-item ${activeView === 'Contracts' ? 'active' : ''}`} onClick={() => onViewChange('Contracts')}>
              <ShieldCheck size={18} />
              <span>Contracts</span>
            </div>
          </nav>

          <div className="user-section">
            <div className="notification-bell">
              <Bell size={20} />
              <div className="bell-badge"></div>
            </div>

            <div className="balance-card">
              <div className="balance-amount">$ 44,590.90</div>
              <button className="add-funds">
                <Plus size={16} />
              </button>
            </div>

            <div className="user-profile">
              <div className="user-avatar">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
              <div className="user-info">
                <span className="username">trader490</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .header-wrapper {
          border-bottom: 1px solid var(--border-glass);
          width: 100%;
        }

        .utility-bar {
          padding: 8px 0;
          border-bottom: 1px solid var(--border-glass);
          font-size: 11px;
          color: var(--text-dim);
          font-weight: 500;
        }

        .external-links {
          display: flex;
          gap: 20px;
        }

        .utility-right {
          display: flex;
          gap: 20px;
        }

        .currency-selector, .language-selector {
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
        }

        .main-nav {
          padding: 15px 0;
        }

        .flex-between {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-hex {
          width: 32px;
          height: 32px;
          background: var(--primary);
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-inner {
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 2px;
        }

        .logo-text {
          font-size: 22px;
          font-weight: 700;
          color: white;
        }

        .nav-links {
          display: flex;
          gap: 30px;
          background: rgba(0,0,0,0.2);
          padding: 8px 20px;
          border-radius: 30px;
          border: 1px solid var(--border-glass);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-dim);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .nav-item:hover, .nav-item.active {
          color: white;
        }

        .live-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(157, 78, 221, 0.2);
          padding: 4px 12px;
          border-radius: 20px;
          color: var(--primary-light);
        }

        .live-dot {
          width: 6px;
          height: 6px;
          background: var(--primary-light);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--primary-light);
        }

        .user-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .notification-bell {
          position: relative;
          color: var(--text-dim);
          cursor: pointer;
        }

        .bell-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background: var(--danger);
          border-radius: 50%;
          border: 2px solid var(--bg-dark);
        }

        .balance-card {
          display: flex;
          align-items: center;
          background: rgba(157, 78, 221, 0.15);
          padding: 2px 2px 2px 15px;
          border-radius: 10px;
          border: 1px solid var(--border-active);
        }

        .balance-amount {
          font-weight: 700;
          font-size: 14px;
          margin-right: 12px;
        }

        .add-funds {
          background: var(--primary);
          color: white;
          padding: 6px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .add-funds:hover {
          background: var(--primary-light);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.05);
          padding: 5px 12px 5px 5px;
          border-radius: 10px;
          border: 1px solid var(--border-glass);
          cursor: pointer;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          overflow: hidden;
          background: var(--accent);
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .username {
          font-size: 13px;
          font-weight: 600;
        }
      `}</style>
    </header>
  );
};

export default Header;
