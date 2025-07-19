import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import BotonBorrar from './BotonBorrar';

export default function CanvasBoard({ color, lineWidth }) {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const stompClient = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const token = localStorage.getItem('google_token');

    useEffect(() => {
        const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                stompClient.current.subscribe('/topic/board', (message) => {
                    const data = JSON.parse(message.body);
                    if (data.type === 'beginPath') {
                        ctxRef.current.beginPath();
                        ctxRef.current.strokeStyle = data.color;
                        ctxRef.current.lineWidth = data.lineWidth;
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
                const trazosPendientes = JSON.parse(localStorage.getItem('trazosLocal')) || [];
                trazosPendientes.forEach((trazo) => {
                    sendMessage(trazo);
                });
                localStorage.removeItem('trazosLocal');
            }
        },[token]);

        stompClient.current.activate();

        return () => stompClient.current.deactivate();
    }, []);

    const sendMessage = (message) => {
        if (stompClient.current && stompClient.current.connected) {
            stompClient.current.publish({
                destination: "/app/draw",
                body: JSON.stringify(message),
            });
        } else {
            console.warn("⚠️ WebSocket no conectado todavía. No se envió el mensaje:", message);
        }
    };

    function guardarTrazo(trazo) {
        const trazosGuardados = JSON.parse(localStorage.getItem('trazosLocal')) || [];
        trazosGuardados.push(trazo);
        localStorage.setItem('trazosLocal', JSON.stringify(trazosGuardados));
    }

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
        ctxRef.current.strokeStyle = color;
        ctxRef.current.lineWidth = lineWidth;
        ctxRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);

        const trazo = {
            type: "beginPath",
            x: offsetX,
            y: offsetY,
            color: color,
            lineWidth: lineWidth
        };

        guardarTrazo(trazo);
        sendMessage(trazo);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();

        const trazo = {
            type: "draw",
            x: offsetX,
            y: offsetY,
            color: color,
            lineWidth: lineWidth
        };

        guardarTrazo(trazo);
        sendMessage(trazo);
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
            <BotonBorrar onClear={clearAndNotify} />
        </div>
    );
}