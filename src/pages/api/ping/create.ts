// pages/api/ping.js
import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import header from "@/layout/Header";

export type Data = {
    message?: string;
    result?: string;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Notify {
    log: (message: string) => void;
    complete: (data: any) => void;
    error: (error: Error | any) => void;
    close: () => void;
}

const longRunning = async (notify: Notify) => {
    notify.log("Started")
    await delay(1000)
    notify.log("Done 15%")
    await delay(1000)
    notify.log("Done 35%")
    await delay(1000)
    notify.log("Done 75%")
    await delay(1000)
    notify.complete({ data: "My data" })
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    /*if (req.method === 'GET') {
        res.setHeader('Access-Control-Allow-Origin', '*'); // Remplacer '*' par des domaines spécifiques pour une meilleure sécurité
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
        res.setHeader('Content-Type', 'text/event-stream, charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache, no-transform');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader("X-Accel-Buffering", "no");
        res.setHeader("Content-Encoding", "none");

        const host = req.query.host;

        res.write('data: {"message":"connexion réussie"}\n\n');

        const sendPing = () => {
            // Validation de base de l'hôte
            if (!host || typeof host !== 'string' || host.length === 0) {
                res.write('data: ' + JSON.stringify({ message: "Host non valide" }) + '\n\n');
                return clearInterval(intervalPing); // Arrête l'intervalle si l'hôte n'est pas valide
            }

            console.log("Envoi du ping");

            exec(`ping ${host}`, (error, stdout, stderr) => {
                if (error || stderr) {
                    res.write('data: {"message":"erreur de ping"}\n\n');
                } else {
                    res.write(`data: ${JSON.stringify({ result: stdout })}\n\n`);
                }
            });
        }

        const intervalPing: NodeJS.Timeout = setInterval(sendPing, 1000); // Envoie un ping toutes les secondes

        const intervalKeepAlive = setInterval(() => {
            res.write(': keep-alive\n\n');
        }, 3000); // Envoyer un commentaire keep-alive toutes les 3 secondes

        req.on('close', () => {
            clearInterval(intervalPing);
            clearInterval(intervalKeepAlive);
            res.end();
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method Not Allowed`);
    }*/

    if (req.method === 'GET') {

        let responseStream = new TransformStream();
        const writer = responseStream.writable.getWriter();
        const encoder = new TextEncoder();
        let closed = false;

        const pingHost = async (host: string, notify: Notify) => {
            notify.log("Début du ping");

            exec(`ping ${host}`, (error, stdout, stderr) => {
                if (error) {
                    notify.error({ message: `Erreur d'exécution du ping: ${error.message}` });
                    return;
                }
                if (stderr) {
                    notify.error({ message: `Erreur de ping: ${stderr}` });
                    return;
                }
                notify.log(`Résultat du ping: ${stdout}`);
                notify.complete({ message: "Ping terminé avec succès" });
            });
        }

        /*longRunning({
            log: (msg: string) => writer.write(encoder.encode("data: " + msg + "\n\n")),
            complete: (obj: any) => {
                writer.write(encoder.encode("data: " + JSON.stringify(obj) + "\n\n"));
                    if (!closed) {
                        writer.close();
                        closed = true;
                    }
            },
            error: (err: Error | any) => {
                writer.write(encoder.encode("data: " + JSON.stringify(err?.message) + "\n\n"));
                if (!closed) {
                    writer.close();
                    closed = true;
                }
            },
            close: () => {
                if (!closed) {
                    writer.close();
                    closed = true;
                }
            }
        }).then(() => {
            console.info("Done");
            if (!closed) {
                writer.close();
            }
        }).catch((err) => {
            console.error("Failed", err);
            if (!closed) {
                writer.close();
            }
        });*/

        return new Response(responseStream.readable, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "text/event-stream; charset=utf-8",
                "Connection": "keep-alive",
                "Cache-Control": "no-cache, no-transform",
                "X-Accel-Buffering": "no",
                "Content-Encoding": "none",
            }
        })
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method Not Allowed`);
    }
}

export const config = {
    runtime: "edge"
}
