import React, { useState } from 'react';

function LoginPanel() {
    // 1. Estat de Connexió (Inicialment desconnectat)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 2. Estat per als inputs del formulari
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    // 3. Funció per controlar els inputs (inputs controlats)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    // 4. Funció per gestionar el botó principal (Iniciar / Tancar Sessió)
    const handleLoginToggle = (e) => {
        // En cas de ser un botó de submit, evita la recàrrega
        if (e) e.preventDefault(); 
        
        // Si estem al formulari, comprovem si els camps estan plens (simulació de login)
        if (!isLoggedIn) {
            if (credentials.username.trim() && credentials.password.trim()) {
                setIsLoggedIn(true); // Canvia a connectat
            } else {
                alert("Si us plau, introdueix l'usuari i la contrasenya.");
                return;
            }
        } else {
            // Si ja estem connectats, tanquem la sessió
            setIsLoggedIn(false);
            setCredentials({ username: '', password: '' }); // Opcional: netegem les credencials
        }
    };

    return (
        <div className="login-panel-container">
            
            {/* Missatge de Benvinguda o Formulari (Renderitzat Condicional) */}
            {isLoggedIn ? (
                // 🅰️ Si està connectat (isLoggedIn = true)
                <div className="welcome-area">
                    <p className="welcome-message">
                        👋 <b>Benvingut/da, {credentials.username}!</b>
                    </p>
                    <p>La teva sessió està activa.</p>
                </div>
            ) : (
                // 🅱️ Si no està connectat (isLoggedIn = false)
                <form onSubmit={handleLoginToggle} className="login-form">
                    <p>Introdueix les teves credencials per iniciar sessió:</p>
                    
                    <div className="form-group">
                        <label htmlFor="username">Usuari:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contrasenya:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    {/* El botó de login utilitza handleLoginToggle com a onSubmit del form */}
                    <button type="submit" className="btn-login-submit">
                        Iniciar Sessió
                    </button>
                </form>
            )}

            <hr className="divider" />
            
            {/* Botó principal per canviar l'estat (En cas de tancar sessió, utilitzem onClick) */}
            <button 
                onClick={() => isLoggedIn && handleLoginToggle()} 
                className={`btn-main-toggle ${isLoggedIn ? 'btn-logout' : 'btn-hidden'}`}
                // El botó de logout només es mostra si ja estem connectats
                style={{ display: isLoggedIn ? 'block' : 'none' }} 
            >
                Finalitzar Sessió
            </button>
        </div>
    );
}

export default LoginPanel;