// pages/api/ping.js
import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

export type Data = {
    message?: string;
    result?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const { host } = req.body;

        // Validation de base de l'hôte
        if (!host || typeof host !== 'string' || host.length === 0) {
            return res.status(400).json({ message: "Host non valide" });
        }

        exec(`ping ${host}`, (error, stdout, stderr) => {

            if (error) return res.status(500).json({ message: `Erreur d'exécution du ping : ${error.message}` });
            if (stderr) return res.status(500).json({ message: `Erreur de ping : ${stderr}` });

            return res.status(200).json({ result: stdout });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
