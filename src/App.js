import './App.css';
import { useState } from 'react';
import CanvasBoard from './componentes/CanvasBoard';
import Toolbar from './componentes/Toolbar';

function App() {
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(3);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Pizarra</h2>
            <Toolbar
                color={color}
                setColor={setColor}
                lineWidth={lineWidth}
                setLineWidth={setLineWidth}
            />
            <CanvasBoard color={color} lineWidth={lineWidth} />
        </div>
    );
}

export default App;
