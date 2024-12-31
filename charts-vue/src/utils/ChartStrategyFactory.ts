

import { ChartStrategy, LineChartStrategy, PieChartStrategy } from "./ChartStrategy";





export class ChartStrategyFactory {
    private static strategies = new Map<string, ChartStrategy>();

    static {
        // 注册策略
        this.strategies.set("line", new LineChartStrategy());
        this.strategies.set("pie", new PieChartStrategy());
    }

    static getStrategy(type: string): ChartStrategy {
        const strategy = this.strategies.get(type);
        if (!strategy) {
            throw new Error(`Unknown chart type: ${type}`);
        }
        return strategy;
    }
}
