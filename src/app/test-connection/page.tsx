'use client';
import React from 'react';
import {Data} from "@/pages/api/test-connection/create";

async function performPing() {
    try {
        const response = await fetch('/api/test-connection/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ host: 'google.com' }),
        });
        const data: Data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Erreur lors de la requête de ping', error);
    }
}
const TestConnection = () => {
    const handlePingTest = async () => {
        await performPing();
    }

    return (
        <div>
            <h2>Test Connection Page</h2>
            <button onClick={handlePingTest}>Tester la connexion</button>
        </div>
    );
};

export default TestConnection;

