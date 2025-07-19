import './App.css';
import { useState } from 'react';
import CanvasBoard from './componentes/CanvasBoard';
import Toolbar from './componentes/Toolbar';
import LoginPage from './componentes/LoginPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Chat from "./componentes/Chat";

function App() {
    const [user, setUser] = useState(null);
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(3);

    return (
        <GoogleOAuthProvider clientId="788033542499-b373grvvhglbb999laqhiguj70lorv5q.apps.googleusercontent.com">
            {!user ? (
                <LoginPage onLoginSuccess={setUser} />
            ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <button className="boton-cerrar-sesion" onClick={() => setUser(null)}>
                        🔓 Cerrar sesión
                    </button>
                    <h2>Pizarra - Bienvenido, {user.name}</h2>
                    <Toolbar
                        color={color}
                        setColor={setColor}
                        lineWidth={lineWidth}
                        setLineWidth={setLineWidth}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <CanvasBoard color={color} lineWidth={lineWidth} />
                        <Chat user={user} />
                    </div>
                </div>
            )}
        </GoogleOAuthProvider>
    );
}


export default App;