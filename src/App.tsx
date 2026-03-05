import React from 'react';
import Header from './components/Header';
import LiveFeed from './components/LiveFeed';
import Exchanger from './components/Exchanger';
import InventoryGrid from './components/InventoryGrid';
import TicTacToe from './components/TicTacToe';
import { MOCK_SKINS } from './data/mockData';
import type { Skin } from './types';

function App() {
  const [currentView, setCurrentView] = React.useState('Exchanger');
  const [userSelection, setUserSelection] = React.useState<Skin | null>(null);
  const [storeSelection, setStoreSelection] = React.useState<Skin | null>(null);

  const userSkins = [MOCK_SKINS[2], MOCK_SKINS[3]];

  return (
    <div className="app-container">
      <Header activeView={currentView} onViewChange={setCurrentView} />
      <LiveFeed />

      <main className="content">
        {currentView === 'Exchanger' && (
          <>
            <Exchanger
              userSelection={userSelection}
              setUserSelection={setUserSelection}
              storeSelection={storeSelection}
              setStoreSelection={setStoreSelection}
            />
            <div className="main-inventories">
              <div className="container grid-split">
                <div className="user-inventory-col">
                  <h3 className="inventory-title">Your Inventory</h3>
                  <InventoryGrid
                    skins={userSkins}
                    selectedId={userSelection?.id}
                    onSelect={setUserSelection}
                  />
                </div>
                <div className="store-inventory-col">
                  <h3 className="inventory-title">Store Selection</h3>
                  <InventoryGrid
                    skins={MOCK_SKINS}
                    selectedId={storeSelection?.id}
                    onSelect={setStoreSelection}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {currentView === 'Store' && (
          <div className="container">
            <h2 style={{ margin: '40px 0', textAlign: 'center' }}>Store Coming Soon</h2>
          </div>
        )}

        {currentView === 'Contracts' && (
          <div className="container">
            <h2 style={{ margin: '40px 0', textAlign: 'center' }}>Contracts Coming Soon</h2>
          </div>
        )}

        {currentView === 'Games' && (
          <TicTacToe />
        )}
      </main>

      <style>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .content {
          flex: 1;
          padding-bottom: 60px;
        }
        
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .grid-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .main-inventories {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

export default App;
