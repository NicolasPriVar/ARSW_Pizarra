import { useRef, useEffect, useState } from 'react';
import BotonBorrar from './BotonBorrar';
import './CanvasBoard.css';

export default function CanvasBoard({ color, lineWidth }){
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 0.6;
        canvas.height = window.innerHeight * 0.6;

        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctxRef.current = ctx;
    }, []);

    useEffect(() => {
        if (ctxRef.current) ctxRef.current.strokeStyle = color;
    }, [color]);

    useEffect(() => {
        if (ctxRef.current) ctxRef.current.lineWidth = lineWidth;
    }, [lineWidth]);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
    };

    const stopDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    };

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
            <BotonBorrar onClear={clearCanvas} />
          </div>
        </div>
      );
}