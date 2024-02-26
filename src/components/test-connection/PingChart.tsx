import React from "react";
import { useTheme } from "next-themes";
import {
    VictoryLine,
    VictoryChart,
    VictoryAxis,
    VictoryVoronoiContainer,
    VictoryTooltip,
    VictoryTheme
} from "victory";

interface PingChartProps {
    chartData: { x: number, y: number}[];
    chartStyle: any;
}

const PingChart: React.FC<PingChartProps> = ({ chartData, chartStyle }) => {
    // Calculates the range of values for the y-axis
    const yDomain: [number, number] = [
        0,
        Math.max(
            50,
            ...chartData.map(d => d.y)
        )
    ];

    return (
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
                tickValues={Array.from({ length: Math.max(30, chartData.length) }, (_, i) => i + 1)}
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
                interpolation="monotoneX"
                animate={{
                    duration: 500,
                    easing: "sinInOut",
                    onLoad: { duration: 1000 }
                }}

            />
        </VictoryChart>
    );
}

export default PingChart;
