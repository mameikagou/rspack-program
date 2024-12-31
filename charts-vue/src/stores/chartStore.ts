import { defineStore } from "pinia";
import type { LineChartData, PieChartData } from "@/utils/ChartStrategy";

interface ChartState {
    chartData: Record<string, LineChartData | PieChartData>;
    interactionState: Record<string, unknown>;
}

export const useChartStore = defineStore("chart", {
    state: (): ChartState => ({
        chartData: {},
        interactionState: {}
    }),

    actions: {
        updateChartData(chartId: string, data: LineChartData | PieChartData) {
            this.chartData[chartId] = data;
        },

        updateInteractionState(chartId: string, state: unknown) {
            this.interactionState[chartId] = state;
        },

        // 初始化图表数据
        initializeChartData(chartId: string, chartType: string) {
            // 根据图表类型初始化对应的数据结构
            // 这里是mock数据
            if (chartType === 'line') {
                this.chartData[chartId] = {
                    xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                    series: [120, 200, 150, 80, 70]
                };
            } else if (chartType === 'pie') {
                this.chartData[chartId] = {
                    series: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' }
                    ]
                };
            }
        }
    }
});
