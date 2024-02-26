'use client';
import React, { useEffect } from 'react';
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
import SelectServer from "@/components/test-connection/SelectServer";
import PingChart from "@/components/test-connection/PingChart";
import { usePingTest } from "@/hooks/usePingTest";

interface PingResults {
    host: string;
    average: number;
    packetsLost: number;
}

const TestConnection: React.FC = () => {

    const { theme } = useTheme();
    const [ chartStyle, setChartStyle ] = React.useState<any>({});
    const [ host, setHost ] = React.useState('google.com');
    const [ averagePing, setAveragePing ] = React.useState<number | null>(null);
    // Customized hook to retrieve the ping test data
    const { chartData, isPinging, setIsPinging, clearChartData } = usePingTest(host);

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
        if (isPinging) {
            const average = chartData.reduce((sum, data) => sum + data.y, 0) / chartData.length;
            setAveragePing(average);
        }
        setIsPinging(!isPinging);
    }

    return (
        <div className="flex fex-col md:flex-row justify-between w-full">
            <div className="w-full md:w-1/3 m-4">
                <h2 className="text-center text-base md:text-xl mb-5">Effectuez un test de stabilité de votre connexion</h2>

                <SelectServer setHost={setHost} />

                <Button
                    variant='ghost'
                    className="w-full my-5 border-solid border-2"
                    onClick={handlePingTest}
                >
                    {isPinging ? 'Arrêter le test' : 'Démarrer le test'}
                </Button>

                {averagePing && (
                    <Card className="bg-accent">
                        <CardHeader>
                            <CardTitle>Résultats du test</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Serveur : {host} <br />
                            Ping moyen : {averagePing.toFixed(2)} ms
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="w-full md:w-2/3 m-4">
                <PingChart chartData={chartData} chartStyle={chartStyle} />

                <Button
                    variant='ghost'
                    className="w-full my-5 border-solid border-2"
                    onClick={clearChartData} // Met à jour chartData à un tableau vide
                >
                    Effacer les données du graphique
                </Button>
            </div>
        </div>

    );
};

export default TestConnection;

