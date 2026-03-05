import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Trophy, Wifi, Hash } from 'lucide-react';

type SquareValue = 'X' | 'O' | null;

const TicTacToe: React.FC = () => {
    const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [roomId, setRoomId] = useState<string>('');
    const [joinedRoom, setJoinedRoom] = useState<string | null>(null);
    const [mySymbol, setMySymbol] = useState<SquareValue>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        return () => {
            if (ws.current) ws.current.close();
        };
    }, []);

    const connectToRoom = () => {
        if (!roomId.trim()) return;

        ws.current = new WebSocket('ws://147.79.83.68:8080');

        ws.current.onopen = () => {
            setIsConnected(true);
            ws.current?.send(JSON.stringify({ type: 'join', roomId: roomId.trim() }));
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === 'joined') {
                setMySymbol(data.symbol);
                setJoinedRoom(data.roomId);
            } else if (data.type === 'start') {
                // Game starts
            } else if (data.type === 'move') {
                handleRemoteMove(data.index, data.symbol);
            } else if (data.type === 'reset') {
                handleRemoteReset();
            } else if (data.type === 'opponentLeft') {
                handleRemoteReset();
            } else if (data.type === 'error') {
                alert(data.message);
                ws.current?.close();
                setIsConnected(false);
            }
        };

        ws.current.onclose = () => {
            setIsConnected(false);
            setJoinedRoom(null);
            setMySymbol(null);
        };
    };

    const handleRemoteMove = (i: number, symbol: SquareValue) => {
        setSquares(prev => {
            const next = [...prev];
            next[i] = symbol;
            return next;
        });
        setXIsNext(symbol === 'O');
    };

    const handleRemoteReset = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    };

    const calculateWinner = (squares: SquareValue[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], line: lines[i] };
            }
        }
        return null;
    };

    const winInfo = calculateWinner(squares);
    const winner = winInfo?.winner;
    const isDraw = !winner && squares.every(sq => sq !== null);
    const isMyTurn = (xIsNext && mySymbol === 'X') || (!xIsNext && mySymbol === 'O');

    const handleClick = (i: number) => {
        if (!joinedRoom || !isMyTurn || squares[i] || winner) return;

        const nextSquares = squares.slice();
        nextSquares[i] = mySymbol;
        setSquares(nextSquares);
        setXIsNext(!xIsNext);

        ws.current?.send(JSON.stringify({ type: 'move', index: i, symbol: mySymbol }));
    };

    const resetGame = () => {
        if (!joinedRoom) return;
        ws.current?.send(JSON.stringify({ type: 'reset' }));
    };

    const MarkX = () => (
        <svg viewBox="0 0 100 100" className="mark x-mark">
            <path d="M20 20 L80 80 M80 20 L20 80" stroke="#00ff41" strokeWidth="12" strokeLinecap="round" fill="none" />
        </svg>
    );

    const MarkO = () => (
        <svg viewBox="0 0 100 100" className="mark o-mark">
            <circle cx="50" cy="50" r="35" stroke="#ff3e3e" strokeWidth="12" strokeLinecap="round" fill="none" />
        </svg>
    );

    return (
        <div className="game-container">
            <div className="game-wrapper">
                <div className="game-header">
                    <h2 className="game-title">Tic Tac Toe <span className="premium-badge">Multiplayer</span></h2>

                    {!joinedRoom ? (
                        <div className="join-container glass">
                            <div className="input-group">
                                <Hash size={18} className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="Enter Room Code..."
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                                    onKeyPress={(e) => e.key === 'Enter' && connectToRoom()}
                                />
                            </div>
                            <button className="join-btn" onClick={connectToRoom}>Join Room</button>
                        </div>
                    ) : (
                        <div className="game-status-bar glass">
                            <div className="status-info">
                                <Wifi size={14} className={isConnected ? 'text-x' : 'text-dim'} />
                                <span>Room: <b>{joinedRoom}</b></span>
                                <span className="divider">|</span>
                                <span>Playing as: <b className={mySymbol === 'X' ? 'text-x' : 'text-o'}>{mySymbol}</b></span>
                            </div>
                            <div className="current-status">
                                {winner ? (
                                    <div className="status-winner">
                                        <Trophy size={16} className="winner-icon" />
                                        <span>{winner === mySymbol ? 'You Won!' : 'Opponent Won'}</span>
                                    </div>
                                ) : isDraw ? (
                                    <span>Draw!</span>
                                ) : (
                                    <span className={isMyTurn ? 'pulse-text' : ''}>
                                        {isMyTurn ? "Your Turn" : "Opponent's Turn"}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className={`wooden-board ${!isMyTurn && joinedRoom && !winner && !isDraw ? 'opponent-turn' : ''}`}>
                    <div className="board-grid">
                        {squares.map((square, i) => (
                            <div
                                key={i}
                                className={`square ${winInfo?.line.includes(i) ? 'winning-square' : ''} ${!isMyTurn ? 'disabled' : ''}`}
                                onClick={() => handleClick(i)}
                            >
                                {square === 'X' && <MarkX />}
                                {square === 'O' && <MarkO />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="game-controls">
                    {joinedRoom && (
                        <button className="reset-btn glass glass-hover" onClick={resetGame}>
                            <RotateCcw size={18} />
                            <span>Rematch</span>
                        </button>
                    )}
                </div>
            </div>

            <style>{`
                .game-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 40px 20px;
                    min-height: 600px;
                }

                .game-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 25px;
                }

                .game-title {
                    font-size: 32px;
                    font-weight: 800;
                    margin-bottom: 20px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                }

                .premium-badge {
                    font-size: 10px;
                    text-transform: uppercase;
                    background: var(--primary);
                    color: white;
                    padding: 2px 8px;
                    border-radius: 4px;
                    letter-spacing: 1px;
                    -webkit-text-fill-color: initial;
                }

                .join-container {
                    display: flex;
                    padding: 15px;
                    gap: 10px;
                    border-radius: 12px;
                    border: 1px solid var(--border-glass);
                }

                .input-group {
                    display: flex;
                    align-items: center;
                    background: rgba(0,0,0,0.3);
                    padding: 0 12px;
                    border-radius: 8px;
                    border: 1px solid var(--border-glass);
                }

                .input-group input {
                    background: none;
                    border: none;
                    outline: none;
                    color: white;
                    padding: 10px 5px;
                    width: 150px;
                    font-weight: 700;
                }

                .join-btn {
                    background: var(--primary);
                    color: white;
                    padding: 0 20px;
                    border-radius: 8px;
                    font-weight: 700;
                }

                .game-status-bar {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    padding: 12px 20px;
                    border-radius: 12px;
                    min-width: 300px;
                    text-align: center;
                }

                .status-info {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    font-size: 12px;
                    color: var(--text-dim);
                }

                .divider { opacity: 0.3; }

                .current-status {
                    font-size: 18px;
                    font-weight: 700;
                    color: white;
                }

                .pulse-text {
                    animation: pulse 1.5s infinite;
                    color: var(--warning);
                }

                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }

                .text-x { color: #00ff41; }
                .text-o { color: #ff3e3e; }
                .text-dim { color: var(--text-dim); }

                .wooden-board {
                    background: #5d3a1a;
                    background-image: 
                        linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1)),
                        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
                    background-size: 100px 100px, 100% 20px;
                    border-radius: 20px;
                    padding: 20px;
                    box-shadow: 
                        inset 0 0 50px rgba(0,0,0,0.5),
                        0 20px 40px rgba(0,0,0,0.4),
                        0 0 0 8px #7b4e29;
                    transition: opacity 0.3s ease;
                }

                .opponent-turn {
                    opacity: 0.7;
                }

                .board-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 110px);
                    grid-template-rows: repeat(3, 110px);
                    gap: 12px;
                }

                .square {
                    background: #7b4e29;
                    background-image: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 
                        inset 2px 2px 5px rgba(255,255,255,0.1),
                        inset -2px -2px 5px rgba(0,0,0,0.3),
                        0 4px 6px rgba(0,0,0,0.2);
                    transition: all 0.2s ease;
                    position: relative;
                }

                .square.disabled {
                    cursor: not-allowed;
                }

                .square:not(.disabled):hover {
                    transform: scale(1.02);
                    background: #8a5730;
                }

                .winning-square {
                    background: #a06e40;
                    box-shadow: 0 0 20px rgba(255, 228, 64, 0.3);
                    border: 2px solid var(--warning);
                }

                .mark {
                    width: 70%;
                    height: 70%;
                    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
                }

                .x-mark path {
                    stroke-dasharray: 200;
                    stroke-dashoffset: 200;
                    animation: draw 0.5s ease forwards;
                }

                .o-mark circle {
                    stroke-dasharray: 220;
                    stroke-dashoffset: 220;
                    animation: draw 0.5s ease forwards;
                }

                @keyframes draw {
                    to { stroke-dashoffset: 0; }
                }

                .reset-btn {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 25px;
                    border-radius: 12px;
                    font-weight: 700;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default TicTacToe;
