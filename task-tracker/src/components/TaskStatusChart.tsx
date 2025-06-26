import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Task } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TaskStatusChartProps {
  tasks: Task[];
}

const TaskStatusChart: React.FC<TaskStatusChartProps> = ({ tasks }) => {
  const statusCounts = {
    todo: tasks.filter(task => task.status === 'todo').length,
    doing: tasks.filter(task => task.status === 'doing').length,
    done: tasks.filter(task => task.status === 'done').length,
  };

  const data = {
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [
      {
        label: '# of Tasks',
        data: [statusCounts.todo, statusCounts.doing, statusCounts.done],
        backgroundColor: [
          'rgba(66, 165, 245, 0.8)',
          'rgba(251, 140, 0, 0.8)',
          'rgba(102, 187, 106, 0.8)',
        ],
        borderColor: [
          'rgba(66, 165, 245, 1)',
          'rgba(251, 140, 0, 1)',
          'rgba(102, 187, 106, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fff',
          font: {
            size: 14,
          }
        }
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ position: 'relative', height: '300px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default TaskStatusChart; 