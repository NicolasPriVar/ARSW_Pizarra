export const DrawingMessageTypes = {
    BEGIN_PATH: 'beginPath',
    DRAW: 'draw',
    CLEAR: 'clear'
};

export const createBeginPathMessage = (x, y, color, lineWidth) => ({
    type: DrawingMessageTypes.BEGIN_PATH,
    x,
    y,
    color,
    lineWidth
});

export const createDrawMessage = (x, y, color, lineWidth) => ({
    type: DrawingMessageTypes.DRAW,
    x,
    y,
    color,
    lineWidth
});

export const createClearMessage = () => ({
    type: DrawingMessageTypes.CLEAR
});