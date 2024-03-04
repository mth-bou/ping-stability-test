'use client';
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import SelectServer from "@/components/test-connection/SelectServer";
import PingChart from "@/components/test-connection/PingChart";
import { usePingTest } from "@/hooks/usePingTest";
import { useToast } from "@/components/ui/use-toast";
const TestConnection: React.FC = () => {

    const { theme } = useTheme();
    const [ chartStyle, setChartStyle ] = useState<any>({});
    const [ host, setHost ] = useState('');
    const [ hostTested, setHostTested ] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [ averagePing, setAveragePing ] = useState<number | null>(null);
    // Customized hook to retrieve the ping test data
    const {
        chartData,
        allChartData,
        pingState,
        setIsPinging,
        clearChartData } = usePingTest(host);

    const { toast } = useToast();

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
        if (host === '') {
            toast({
                title: 'Erreur',
                description: 'Veuillez sélectionner un jeu',
            });
            setIsButtonClicked(true);
            return;
        }
        if (pingState.isPinging) {
            const average = allChartData.reduce((sum, data) => sum + data.y, 0) / allChartData.length;
            setAveragePing(average);
            setHostTested(host);
        } else {
            // Clear the average ping when the test is stopped
            setAveragePing(null);
        }
        setIsPinging(!pingState.isPinging);
    }

    // Clear the chart data when the host changes
    useEffect(() => {
        clearChartData();
    }, [host]);


    return (
        <div className="flex fex-col md:flex-row justify-between w-full">
            <div className="w-full md:w-1/3 m-4">
                <h2 className="text-center text-base md:text-xl mb-5">Effectuez un test de stabilité de votre connexion</h2>

                <SelectServer setHost={setHost} style={{border: (host || !isButtonClicked) ? '' : '1px solid red'}} />

                <Button
                    variant='ghost'
                    className={`w-full my-5 border-solid border-2 ${pingState.isPinging ? 'animate-button-ripple' : ''}`}
                    onClick={handlePingTest}
                >
                    {pingState.isPinging ? 'Arrêter le test' : 'Démarrer le test'}
                </Button>

                {averagePing && !pingState.hasError && (
                    <Card className="bg-accent">
                        <CardHeader>
                            <CardTitle>Résultats du test</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Serveur : {hostTested} <br />
                            Ping moyen : {averagePing.toFixed(2)} ms
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="w-full md:w-2/3 m-4">
                <PingChart chartData={chartData} chartStyle={chartStyle} />

                {/*<Button
                    variant='ghost'
                    className="w-full my-5 border-solid border-2"
                    onClick={clearChartData} // Met à jour chartData à un tableau vide
                >
                    Effacer les données du graphique
                </Button>*/}
            </div>
        </div>

    );
};

export default TestConnection;

