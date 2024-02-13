'use client';
import React, {useEffect, useRef, useState} from 'react';
import {
    VictoryLine,
    VictoryChart,
    VictoryAxis,
    VictoryVoronoiContainer,
    VictoryScatter,
    VictoryTooltip,
    VictoryTheme
} from "victory";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

interface PingResults {
    host: string;
    average: number;
    packetsLost: number;
}

const TestConnection: React.FC = () => {

    const { theme } = useTheme();
    const [ pingResults, setPingResults ] = useState<PingResults[]>([]);
    const [ isPinging, setIsPinging ] = useState(false);
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    const chartStyle = theme === 'dark' ? {
        background: { fill: "#333" }, // Pour fond sombre
        data: { stroke: "#FFD447" }, // Ligne jaune
        axis: { stroke: "#FFF", tickLabels: { fill: "#FFF" } }, // Axes blancs
    } : {
        background: { fill: "#FFF" }, // Pour fond clair
        data: { stroke: "#000" }, // Ligne noire
        axis: { stroke: "#333", tickLabels: { fill: "#333" } }, // Axes noirs
    };

    const handlePingTest = () => {
        setIsPinging(!isPinging);
    }

    useEffect(() => {
        if (isPinging) {
            intervalIdRef.current = setInterval(() => {
                fetch('/api/pingHost?host=google.com')
                    .then(response => response.json())
                    .then(data => {
                        setPingResults(prevResults => [...prevResults, data]);
                        console.log(data);
                    });
            }, 1000);
        } else if (!isPinging && intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        }
    }, [isPinging]);

    return (
        <div>
            {pingResults && (
                <div>
                    {pingResults.map((result, index) => (
                        <React.Fragment key={`result-${index}`}>
                            <p key={`host-${index}`}>Host : {result.host}</p>
                            <p key={`ping-${index}`}>Ping : {result.average}</p>
                            <p key={`packetsLost-${index}`}>Packets Lost : {result.packetsLost}</p>
                        </React.Fragment>
                    ))}
                </div>
            )}
            <h2>Test Connection Page</h2>
            <Button onClick={handlePingTest}>{isPinging ? 'Stop ping' : 'Start ping'}</Button>

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

