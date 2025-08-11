
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#d0ed57', '#a4de6c'];

export default function BudgetPieChart({ expenses, totalBudget }) {

  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  const totalSpent = Object.values(categoryTotals).reduce((a, b) => a + b, 0);
  const remaining = totalBudget - totalSpent;

  const chartData = Object.entries(categoryTotals).map(([key, value]) => ({
    name: key,
    value
  }));

  if (remaining > 0) {
    chartData.push({ name: 'Remaining Budget', value: remaining });
  }

  return (
    <div >
      <h2 style={{ textAlign: 'center' }}>Expence Chart</h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}


// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// const data = [
//   { name: 'Travel', value: 400 },
//   { name: 'Groceries', value: 300 },
//   { name: 'Food & Drink', value: 300 },
//   { name: 'Heal', value: 200 },
// ];

// const COLORS = ['#3C5FFF', '#F8C1C1', '#FF9130', '#39D353'];

// const BudgetPieChart = () => {
//   return (
//     <div>
//       <h2>Expense Chart</h2>
//       <PieChart width={300} height={300}>
//         <Pie
//           data={data}
//           innerRadius={60}
//           outerRadius={100}
//           paddingAngle={5}
//           dataKey="value"
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
      
//     </div>
//   );
// };

// export default BudgetPieChart;
