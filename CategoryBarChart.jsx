import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { parseISO, format } from 'date-fns';

const CategoryBarChart = ({ expenses }) => {
  const monthMap = {};

  expenses.forEach(exp => {
    const month = format(parseISO(exp.date), 'MMM');
    if (!monthMap[month]) {
      monthMap[month] = 0;
    }
    monthMap[month] += exp.amount;
  });

  const data = Object.entries(monthMap).map(([month, expense]) => ({
    month,
    expense,
  }));

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Expenses Tracker</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="expense" fill="#3C5FFF" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryBarChart;
