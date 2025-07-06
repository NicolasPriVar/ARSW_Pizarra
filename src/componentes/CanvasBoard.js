import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import BotonBorrar from './BotonBorrar';

export default function CanvasBoard({ color, lineWidth }) {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const stompClient = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const socket = new SockJS('pizarra-h0bjb0g0ccemh8bg.canadacentral-01.azurewebsites.net');
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                stompClient.current.subscribe('/topic/board', (message) => {
                    const data = JSON.parse(message.body);
                    if (data.type === 'beginPath') {
                        ctxRef.current.beginPath();
                        ctxRef.current.moveTo(data.x, data.y);
                    } else if (data.type === 'draw') {
                        ctxRef.current.strokeStyle = data.color;
                        ctxRef.current.lineWidth = data.lineWidth;
                        ctxRef.current.lineTo(data.x, data.y);
                        ctxRef.current.stroke();
                    } else if (data.type === 'clear') {
                        clearCanvas();
                    }
                });
            },
        });

        stompClient.current.activate();

        return () => stompClient.current.deactivate();
    }, []);

    const sendMessage = (message) => {
        stompClient.current.publish({
            destination: '/app/draw',
            body: JSON.stringify(message),
        });
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    };

    const clearAndNotify = () => {
        clearCanvas();
        sendMessage({ type: 'clear' });
    };

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
        sendMessage({ type: 'beginPath', x: offsetX, y: offsetY });
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
        sendMessage({ type: 'draw', x: offsetX, y: offsetY, color, lineWidth });
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 0.6;
        canvas.height = window.innerHeight * 0.6;
        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctxRef.current = ctx;
    }, []);

    return (
        <div className="canvas-container">
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="canvas"
            />
            <div className="side-button">
                <BotonBorrar onClear={clearAndNotify} />
            </div>
        </div>
    );
}
