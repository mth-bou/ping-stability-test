// pages/api/pingHost.ts
import { NextApiRequest, NextApiResponse } from 'next';
import * as ping from 'ping';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const host = req.query.host;

    if (typeof host !== 'string') {
        res.status(400).json({ error: 'Invalid host.' });
        return;
    }

    const result = await ping.promise.probe(host);

    if (result.alive) {
        const pingResult = {
            host: host,
            average: result.avg,
            packetsLost: result.packetLoss
        };
        res.status(200).json(pingResult);
    } else {
        res.status(500).json({ error: `Ping error: ${result.output}` });
    }
}

/*
import { NextApiRequest, NextApiResponse } from 'next';
import { spawn, ChildProcessWithoutNullStreams} from "child_process";

let pingProcess: ChildProcessWithoutNullStreams | null = null;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const host = req.query.host;
    const action = req.query.action;

    if (typeof host !== 'string') {
        res.status(400).json({ error: 'Invalid host.' });
        return;
    }

    if (action === 'stop') {
        if (pingProcess) {
            pingProcess.kill();
            pingProcess = null;
            res.status(200).json({ message: 'Ping process stopped.' });
        } else {
            res.status(200).json({ message: 'No ping process to stop.' });
        }
        return;
    }

    pingProcess = spawn('ping', [host]);

    if (pingProcess) {

        pingProcess.stdout.on('data', (data) => {
            const stdout = data.toString();
            console.log(stdout);
            const lines = stdout.split('\n');
            const averageLine = lines.find((line: string) => line.includes('Moyenne ='));
            const average = averageLine ? averageLine.split('=')[1].split('ms')[0].trim() : 'N/A';
            const packetsLostLine = lines.find((line: string) => line.includes('perdus ='));
            const packetsLost = packetsLostLine ? packetsLostLine.split('perdus =')[1].split(' ')[1] : 'N/A';

            const pingResult = {
                host: host,
                average,
                packetsLost
            };
            res.status(200).json(pingResult);
        });

        pingProcess.stderr.on('data', (data) => {
            const stderr = data.toString();
            console.log(`Ping error: ${stderr}`);
            res.status(500).json({ error: `Ping error: ${stderr}` });
        });

        pingProcess.on('error', (error) => {
            console.log(`Execution error: ${error.message}`);
            res.status(500).json({ error: `Execution error: ${error.message}` });
        });
    }

}
*/
