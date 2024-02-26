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
    const [ chartData, setChartData ] = useState<{ x: number, y: number}[]>([]);
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
        if (isPinging && intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
        setIsPinging(!isPinging);
    }

    useEffect(() => {
        if (isPinging) {
            intervalIdRef.current = setInterval(() => {
                fetch('/api/pingHost?host=google.com')
                    .then(response => response.json())
                    .then(data => {
                        setChartData(prevData => [...prevData, { x: prevData.length + 1, y: data.average }]);
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

    // Calculates the range of values for the y-axis
    const yDomain: [number, number] = [
        0,
        Math.max(
            50,
            ...chartData.map(d => d.y)
        )
    ];

    // Reduces the number of points to display on the chart
    const averageXAxis = (data: { x: number, y: number }[], points: number) => {
        const interval = Math.ceil(data.length / points);
        return data.filter((_, i) => i % interval === 0);
    }

    return (
        <div>
            <h2 className="text-center text-xl">Effectuez un test de stabilité de votre connexion</h2>
            <Button onClick={handlePingTest}>{isPinging ? 'Stop ping' : 'Start ping'}</Button>

            <VictoryChart
                theme={VictoryTheme.grayscale}
                width={1000}
                height={500}
                domain={{ y: yDomain }}
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
                <VictoryAxis
                    tickValues={Array.from({ length: Math.max(20, chartData.length) }, (_, i) => i + 1)}
                    style={{ axis: { stroke: "#FFF" }, tickLabels: { fill: "#FFF" } }}
                />
                <VictoryAxis dependentAxis style={{ axis: { stroke: "#fff" }, tickLabels: { fill: "#fff" } }} />

                <VictoryLine
                    style={{
                        data: { stroke: "#FFD447" },
                        parent: { border: "1px solid #fff"}
                    }}
                    data={chartData}
                    interpolation="natural"
                    animate={{
                        duration: 500,
                        easing: "sinInOut",
                        onLoad: { duration: 1000 }
                    }}

                />

                <VictoryScatter // Ajout du composant VictoryScatter
                    style={{ data: { fill: "#FFD447" } }}
                    size={5}
                    data={chartData}
                />
            </VictoryChart>
        </div>

    );
};

export default TestConnection;

