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
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface PingResults {
    host: string;
    average: number;
    packetsLost: number;
}

const TestConnection: React.FC = () => {

    const { theme } = useTheme();
    const [ chartData, setChartData ] = useState<{ x: number, y: number}[]>([]);
    const [ averagePing, setAveragePing ] = useState<number | null>(null);
    const [ isPinging, setIsPinging ] = useState(false);
    const [ chartStyle, setChartStyle ] = useState({} as any);
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setChartStyle(theme === 'dark' ? {
            data: { stroke: "hsl(217.2 91.2% 59.8%)" },
            axis: { stroke: "hsl(0 0% 100%)", tickLabels: { fill: "hsl(0 0% 100%)" } },
            scatter: { fill: "hsl(217.2 91.2% 59.8%)"}
        } : {
            data: { stroke: "hsl(217.2 91.2% 59.8%)" },
            axis: { stroke: "hsl(222.2 84% 4.9%)", tickLabels: { fill: "hsl(222.2 84% 4.9%)"  } },
            scatter: { fill: "hsl(217.2 91.2% 59.8%)" }
        });
    }, [theme]);

    const handlePingTest = () => {
        if (isPinging && intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;

            // Calculate the average ping at the end of the test
            const average = chartData.reduce((sum, data) => sum + data.y, 0) / chartData.length;
            setAveragePing(average);
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
        <div className="flex fex-col md:flex-row justify-between w-full">
            <div className="w-full md:w-2/3 m-4">
                <h2 className="text-center text-base md:text-xl">Effectuez un test de stabilité de votre connexion</h2>
                <Button onClick={handlePingTest}>{isPinging ? 'Arrêter le test' : 'Démarrer le test'}</Button>

                <VictoryChart
                    theme={VictoryTheme.grayscale}
                    width={1000}
                    height={500}
                    domain={{ y: yDomain }}
                    domainPadding={20}
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
                >
                    <VictoryAxis
                        tickValues={Array.from({ length: Math.max(20, chartData.length) }, (_, i) => i + 1)}
                        style={{ axis: chartStyle.axis, tickLabels: chartStyle.axis }}
                    />
                    <VictoryAxis
                        style={{ axis: chartStyle.axis, tickLabels: chartStyle.axis }}
                        dependentAxis
                    />

                    <VictoryLine
                        style={{
                            data: chartStyle.data,
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
                        style={{ data: chartStyle.scatter }}
                        size={3}
                        data={chartData}
                    />
                </VictoryChart>
            </div>
            <div className="w-full md:w-1/3 m-4">
                {averagePing && (
                    <Card className="bg-accent">
                        <CardHeader>
                            <CardTitle>Résultats du test</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Ping moyen : {averagePing.toFixed(2)} ms
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>

    );
};

export default TestConnection;

