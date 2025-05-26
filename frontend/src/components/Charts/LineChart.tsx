import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor?: string;
      borderWidth?: number;
      pointRadius?: number;
      tension?: number;
    }[];
  };
  height?: number;
  options?: ChartOptions<'line'>;
}

const LineChart: React.FC<LineChartProps> = ({ data, height = 400, options = {} }) => {
  const defaultOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          drawBorder: false,
          color: 'rgba(200, 200, 200, 0.15)',
        },
        ticks: {
          maxTicksLimit: 5,
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  };

  // Process the datasets to add default values
  const processedData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || dataset.borderColor + '20',
      borderWidth: dataset.borderWidth || 2,
      pointRadius: dataset.pointRadius || 0,
      tension: dataset.tension || 0.4,
    })),
  };

  return (
    <div style={{ height: `${height}px` }}>
      <Line data={processedData} options={{ ...defaultOptions, ...options }} />
    </div>
  );
};

export default LineChart;
