import React from 'react';
import { useParams } from 'react-router-dom';

function UserDetail() {
    // 1. Usem useParams per obtenir els paràmetres de la URL
    const { id } = useParams();

    return (
        <div className="page-content">
            <h2>Detall de l'Usuari</h2>
            <div className="user-detail-box">
                <p>Estàs veient el perfil de l'usuari amb <b>ID: {id}</b></p>
                <p>Aquesta ID es llegeix dinàmicament de la URL gràcies al hook <b>`useParams`</b>.</p>
            </div>
            <p className="tip">
                *Prova de canviar el número a la barra d'adreces del navegador!*
            </p>
        </div>
    );
}

export default UserDetail;