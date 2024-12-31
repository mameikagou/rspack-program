import type { EChartsOption } from 'echarts';

// 定义数据接口
export interface LineChartData {
    xAxis: string[];
    series: number[];
}

export interface PieChartData {
    series: Array<{
        value: number;
        name: string;
    }>;
}

// 图表策略接口
interface ChartStrategy {
    createOption(data: LineChartData | PieChartData): EChartsOption;
    handleInteraction?(params: unknown): void;
}

// 具体策略实现 - 折线图
class LineChartStrategy implements ChartStrategy {
    createOption(data: LineChartData): EChartsOption {
        return {
            xAxis: { type: 'category', data: data.xAxis },
            yAxis: { type: 'value' },
            series: [{
                type: 'line',
                data: data.series
            }]
        };
    }
}

// 具体策略实现 - 饼图
class PieChartStrategy implements ChartStrategy {
    createOption(data: PieChartData): EChartsOption {
        return {
            series: [{
                type: 'pie',
                data: data.series
            }]
        };
    }
}

// 模拟数据
export const mockLineData: LineChartData = {
    xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [150, 230, 224, 218, 135, 147, 260]
};

export const mockPieData: PieChartData = {
    series: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' }
    ]
};

export { type ChartStrategy, LineChartStrategy, PieChartStrategy };
