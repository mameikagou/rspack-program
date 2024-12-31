<template>
    <div :id="chartId" :style="{ width: width, height: height }" @click="handleChartClick"></div>
</template>

<script lang="ts" setup>
    import { onMounted, onUnmounted, watch } from 'vue';
    import { useChartStore } from '@/stores/chartStore';
    import * as echarts from 'echarts';
    import { ChartStrategyFactory } from '@/utils/ChartStrategyFactory';

    const props = defineProps({
        chartId: {
            type: String,
            required: true
        },
        chartType: {
            type: String,
            required: true
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '300px'
        }
    });

    const store = useChartStore();
    let chart: echarts.ECharts | null = null;

    // 初始化图表
    const initChart = () => {
        const el = document.getElementById(props.chartId);
        if (!el) return;

        // 确保有初始数据
        if (!store.chartData[props.chartId]) {
            store.initializeChartData(props.chartId, props.chartType);
        }

        chart = echarts.init(el);
        const strategy = ChartStrategyFactory.getStrategy(props.chartType);
        const option = strategy.createOption(store.chartData[props.chartId]);
        chart.setOption(option);
    };

    // 处理交互
    const handleChartClick = (params: unknown) => {
        const strategy = ChartStrategyFactory.getStrategy(props.chartType);
        if (strategy.handleInteraction) {
            strategy.handleInteraction(params);
            store.updateInteractionState(props.chartId, params);
        }
    };

    // 监听数据变化
    watch(
        () => store.chartData[props.chartId],
        (newData) => {
            if (chart && newData) {
                const strategy = ChartStrategyFactory.getStrategy(props.chartType);
                const option = strategy.createOption(newData);
                chart.setOption(option);
            }
        }
    );

    onMounted(() => {
        initChart();
        window.addEventListener('resize', () => chart?.resize());
    });

    onUnmounted(() => {
        chart?.dispose();
        window.removeEventListener('resize', () => chart?.resize());
    });
</script>