import { useEffect, useRef, useState } from 'react';

export const usePingTest = (host: string) => {
    const [ chartData, setChartData ] = useState<{ x: number, y: number }[]>([]);
    const [ isPinging, setIsPinging ] = useState(false);
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isPinging) {
            intervalIdRef.current = setInterval(() => {
                fetch('/api/pingHost?host=' + host)
                    .then(response => response.json())
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
    }, [isPinging, host]);

    const clearChartData = () => {
        setChartData([]);
    }

    return { chartData, isPinging, setIsPinging, clearChartData };
}
