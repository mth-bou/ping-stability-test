// pages/api/pingHost.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { exec as execCb } from 'child_process';
import { promisify } from "util";

const exec = promisify(execCb);

let pingProcess = null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const host = req.query.host;

    try {
        const { stdout, stderr } = await exec(`ping ${host}`);

        if (stderr) {
            console.log(`Ping error: ${stderr}`);
            res.status(500).json({ error: `Ping error: ${stderr}` });
            return;
        }

        if (stdout) {
            const lines = stdout.split('\n');
            const averageLine = lines.find(line => line.includes('Moyenne ='));
            const average = averageLine ? averageLine.split('=')[1].split('ms')[0].trim() : 'N/A';
            const packetsLostLine = lines.find(line => line.includes('perdus ='));
            const packetsLost = packetsLostLine ? packetsLostLine.split('perdus =')[1].split(' ')[1] : 'N/A';

            const pingResult = {
                host: host,
                average,
                packetsLost
            };
            res.status(200).json(pingResult);

        } else {
            console.log('Ping command executed successfully but produced no output.');
            res.status(200).json({ message: 'Ping command executed successfully but produced no output.' });
        }
    } catch (error) {
        console.log(`Execution error: ${error.message}`);
        res.status(500).json({ error: `Execution error: ${error.message}` });
    }
}
