// pages/api/pingHost.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import { promisify } from "util";

//const exec = promisify(execCb);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const host = req.query.host;

    exec(`ping ${host}`, (error, stdout, stderr) => {
        if (error) {
            res.status(500).json({ error: `Execution error: ${error.message}` });
            return;
        }
        if (stderr) {
            res.status(500).json({ error: `Ping error: ${stderr}` });
            return;
        }

        res.status(200).json({ result: stdout });
    });

    /*try {
        const stdout = await exec(`ping ${host}`);
        res.status(200).json({ result: stdout });
    } catch (error) {
        res.status(500).json({ error: `Execution error: ${error.message}` });
    }*/
}
