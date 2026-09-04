import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const mockData = [
  { name: 'Jan', attempts: 400, success: 300, failure: 100, avgTime: 120 },
  { name: 'Feb', attempts: 300, success: 200, failure: 100, avgTime: 150 },
  { name: 'Mar', attempts: 200, success: 150, failure: 50, avgTime: 110 },
  { name: 'Apr', attempts: 278, success: 200, failure: 78, avgTime: 130 },
  { name: 'May', attempts: 189, success: 160, failure: 29, avgTime: 140 },
  { name: 'Jun', attempts: 239, success: 210, failure: 29, avgTime: 125 },
];

const COLORS = ['#008751', '#E31837']; // BNI Colors: Green and Red

const StatCard = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <p className="text-sm text-gray-500 mb-1">{title}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

const AnalyticsDashboard = () => {
  const totalAttempts = mockData.reduce((acc, curr) => acc + curr.attempts, 0);
  const totalSuccess = mockData.reduce((acc, curr) => acc + curr.success, 0);
  const totalFailure = mockData.reduce((acc, curr) => acc + curr.failure, 0);
  const avgProcessingTime = (mockData.reduce((acc, curr) => acc + curr.avgTime, 0) / mockData.length).toFixed(2);

  const successRate = ((totalSuccess / totalAttempts) * 100).toFixed(1);
  const failureRate = ((totalFailure / totalAttempts) * 100).toFixed(1);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-gray-600">Performance metrics for eKYC processing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Attempts" value={totalAttempts.toLocaleString()} color="text-blue-600" />
        <StatCard title="Success Rate" value={`${successRate}%`} color="text-green-600" />
        <StatCard title="Failure Rate" value={`${failureRate}%`} color="text-red-600" />
        <StatCard title="Avg Processing Time" value={`${avgProcessingTime} ms`} color="text-orange-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Monthly Attempts & Success</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attempts" fill="#8884d8" name="Total Attempts" />
                <Bar dataKey="success" fill="#008751" name="Successes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Average Processing Time Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgTime" stroke="#ff7300" strokeWidth={2} name="Avg Time (ms)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
