'use client';
import React, {useEffect, useState} from 'react';
import {Data} from "@/pages/api/ping/create";
import {
    VictoryLine,
    VictoryChart,
    VictoryAxis,
    VictoryVoronoiContainer,
    VictoryScatter,
    VictoryTooltip,
    VictoryTheme
} from "victory";
import {Button} from "@/components/ui/button";
import { useTheme } from "next-themes";

/*async function performPing() {
    try {
        const response = await fetch('/api/ping/create', {
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
}*/
const TestConnection: React.FC = () => {

    const { theme } = useTheme();
    const [ pingResults, setPingResults ] = useState<Data[]>([]);

    const chartStyle = theme === 'dark' ? {
        background: { fill: "#333" }, // Pour fond sombre
        data: { stroke: "#FFD447" }, // Ligne jaune
        axis: { stroke: "#FFF", tickLabels: { fill: "#FFF" } }, // Axes blancs
    } : {
        background: { fill: "#FFF" }, // Pour fond clair
        data: { stroke: "#000" }, // Ligne noire
        axis: { stroke: "#333", tickLabels: { fill: "#333" } }, // Axes noirs
    };

    const listenSSE = (callback: (event: MessageEvent<any>) => { cancel?: true } | undefined) => {
        const eventSource = new EventSource("/api/ping/create?host=google.com", {
            withCredentials: true,
        });
        console.info("Listening on SEE", eventSource);
        eventSource.onmessage = (event) => {
            const result = callback(event);
            if (result?.cancel) {
                console.info("Closing SSE");
                eventSource.close();
            }
        };

        return {
            close: () => {
                console.info("Closing SSE");
                eventSource.close();
            },
        };
    }

    const handlePingTest = async () => {
        listenSSE((event: MessageEvent<string>) => {
                console.log("SSE Message:", event.data);
                try {
                    const data = JSON.parse(event.data);
                    console.log(data);
                    // Mettez à jour votre état ou UI ici avec les données de ping
                    setPingResults((prevResults) => [...prevResults, data]);
                } catch (error) {
                    console.error("Erreur de parsing JSON:", error);
                }
                return undefined;
            }
        );
    }

    return (
        <div>
            {pingResults.map((result, index) => (
                <div key={index}>{JSON.stringify(result)}</div>
            ))}
            <h2>Test Connection Page</h2>
            <Button onClick={handlePingTest}>Tester la connexion</Button>

            <VictoryChart
                theme={VictoryTheme.grayscale}
                width={1000}
                height={500}
                containerComponent={
                    <VictoryVoronoiContainer
                        labels={({ datum }) => `y: ${datum.y}`}
                        labelComponent={
                            <VictoryTooltip
                                cornerRadius={0}
                                flyoutStyle={{ fill: "white" }}
                            />
                        }
                    />
                }
                domainPadding={20}
            >
                <VictoryAxis style={{ axis: { stroke: "#FFF" }, tickLabels: { fill: "#FFF" } }} />
                <VictoryAxis dependentAxis style={{ axis: { stroke: "#fff" }, tickLabels: { fill: "#fff" } }} />

                <VictoryLine
                    style={{
                        data: { stroke: "#FFD447" },
                        parent: { border: "1px solid #fff"}
                    }}
                    data={[
                        { x: 1, y: 2 },
                        { x: 2, y: 3 },
                        { x: 3, y: 5 },
                        { x: 4, y: 4 },
                        { x: 5, y: 7 }
                    ]}
                    interpolation="natural"
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}

                />
            </VictoryChart>
        </div>

    );
};

export default TestConnection;

