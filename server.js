import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const rooms = new Map();

wss.on('connection', (ws) => {
    let currentRoomId = null;
    let playerSymbol = null;

    ws.on('message', (data) => {
        const message = JSON.parse(data);

        if (message.type === 'join') {
            const { roomId } = message;
            currentRoomId = roomId;

            if (!rooms.has(roomId)) {
                rooms.set(roomId, []);
            }

            const room = rooms.get(roomId);
            if (room.length < 2) {
                playerSymbol = room.length === 0 ? 'X' : 'O';
                room.push(ws);
                ws.send(JSON.stringify({ type: 'joined', symbol: playerSymbol, roomId }));

                if (room.length === 2) {
                    room.forEach(client => {
                        client.send(JSON.stringify({ type: 'start', turn: 'X' }));
                    });
                }
            } else {
                ws.send(JSON.stringify({ type: 'error', message: 'Room full' }));
            }
        }

        if (message.type === 'move') {
            const room = rooms.get(currentRoomId);
            if (room) {
                room.forEach(client => {
                    if (client !== ws) {
                        client.send(JSON.stringify({ type: 'move', index: message.index, symbol: message.symbol }));
                    }
                });
            }
        }

        if (message.type === 'reset') {
            const room = rooms.get(currentRoomId);
            if (room) {
                room.forEach(client => {
                    client.send(JSON.stringify({ type: 'reset' }));
                });
            }
        }
    });

    ws.on('close', () => {
        if (currentRoomId && rooms.has(currentRoomId)) {
            const room = rooms.get(currentRoomId);
            const index = room.indexOf(ws);
            if (index !== -1) {
                room.splice(index, 1);
                if (room.length === 0) {
                    rooms.delete(currentRoomId);
                } else {
                    room.forEach(client => {
                        client.send(JSON.stringify({ type: 'opponentLeft' }));
                    });
                }
            }
        }
    });
});

console.log('WebSocket server running on ws://localhost:8080');
