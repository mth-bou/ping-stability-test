import { useEffect, useRef, useState } from 'react';
import { useToast } from "@/components/ui/use-toast"

const ERROR_MESSAGE = 'Echec de test de ping';

export const usePingTest = (host: string) => {
    const [ chartData, setChartData ] = useState<{ x: number, y: number }[]>([]);
    const [ isPinging, setIsPinging ] = useState(false);
    const [ pingState, setPingState ] = useState({ isPinging: false, hasError: false });
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
    const { toast } = useToast();

    const stopPing = () => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
    }

    const handleError = (error: Error) => {
        if (!pingState.hasError) {
            toast({
                title: 'Erreur',
                description: error.message || ERROR_MESSAGE,
                variant: 'destructive'
            });
            setPingState({ isPinging: false, hasError: true });
        }

        stopPing();
    }

    useEffect(() => {
        if (pingState.isPinging && !pingState.hasError) {
            intervalIdRef.current = setInterval(() => {
                fetch('/api/pingHost?host=' + host)
                    .then(response => {

                        if (!response.ok) {
                            throw new Error(ERROR_MESSAGE);
                        }
                        return response.json();

                    })
                    .then(data => {

                        setChartData(prevData => {
                            let newData = [...prevData, { x: prevData.length + 1, y: data.average }];

                            // Prevent the chart from growing indefinitely, only keep the last 30 data points
                            if (newData.length > 30) {
                                newData = newData.slice(newData.length - 30);
                                newData = newData.map((item, index) => ({ x: index + 1, y: item.y }));
                            }
                            return newData;
                        });

                    })
                    .catch(handleError);
            }, 1000);

        } else {
            stopPing();
        }

        return stopPing;

    }, [pingState.isPinging, pingState.hasError, host]);

    const clearChartData = () => {
        setChartData([]);
    }

    return {
        chartData,
        isPinging: pingState.isPinging,
        setIsPinging: (isPinging: boolean) => setPingState({ isPinging, hasError: false }),
        clearChartData };
}
