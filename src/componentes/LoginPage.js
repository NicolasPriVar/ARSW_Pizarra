import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function LoginPage({ onLoginSuccess }) {
    const handleSuccess = (credentialResponse) => {
        localStorage.setItem('google_token', credentialResponse.credential);
        const decoded = jwtDecode(credentialResponse.credential);
        console.log('Usuario autenticado:', decoded);
        onLoginSuccess(decoded);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>🎨 Bienvenido a la Pizarra</h2>
                <p style={styles.subtitle}>Inicia sesión con Google para empezar.</p>
                <div style={styles.loginButton}>
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() => console.log('Fallo el login')}
                    />
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #00cbc8 0%, #6FCFEB 100%)',
        fontFamily: 'Poppins, sans-serif',
    },
    card: {
        background: 'white',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        marginBottom: '10px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '30px',
    },
    loginButton: {
        display: 'flex',
        justifyContent: 'center',
    }
};
