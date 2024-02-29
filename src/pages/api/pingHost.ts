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
            average: Math.floor(result.avg),
            packetsLost: Math.floor(result.packetLoss)
        };
        res.status(200).json(pingResult);
    } else {
        res.status(500).json({ error: `Ping error: ${result.output}` });
    }
}
