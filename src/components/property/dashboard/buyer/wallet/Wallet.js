import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Pagination from "@/components/property/Pagination";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white text-xs px-3 py-1 rounded-md shadow-lg">
        {payload[0].name}: {payload[0].value}
      </div>
    );
  }
  return null;
};

export default function Wallet() {
  const [transactions, setTransactions] = useState([
    { id: 1, category: "Pharmacy", amount: -14, time: "14 min ago" },
    { id: 2, category: "Money transfer", amount: -100, time: "20 hours ago" },
    {
      id: 3,
      category: "Cinema tickets",
      amount: -26.5,
      time: "13:34 12.06.2020",
    },
    { id: 4, category: "Food market", amount: -34, time: "13:34 12.06.2020" },
  ]);
  const [wallet, setWallet] = useState({
    totalCredits: 50,
    usageHistory: [
      { date: "2025-03-20", contactsUsed: 5 },
      { date: "2025-03-21", contactsUsed: 10 },
      { date: "2025-03-23", contactsUsed: 3 },
    ],
  });
  const planData = [
    {
      _id: 1,
      plan: "Dedicated Expert Plan",
      price: "$1000",
      datePurchased: "25/03/2025",
      planStatus: "Active",
      totalContact: "20",
    },
    {
      _id: 1,
      plan: "Intermediate Plan",
      price: "$1000",
      datePurchased: "25/03/2025",
      planStatus: "Used",
      totalContact: "20",
    },
    {
      _id: 1,
      plan: "Basic Plan",
      price: "$1000",
      datePurchased: "25/03/2025",
      planStatus: "Used",
      totalContact: "20",
    },
  ];

  const totalContacts = 20; // Example total
  const usedContacts = 13; // Example used
  const remainingContacts = totalContacts - usedContacts;

  const data = [
    { name: "Used", value: usedContacts, color: "#0f8363" }, // Blue for used
    { name: "Remaining", value: remainingContacts, color: "#9adecb" }, // Gray for remaining
  ];
  return (
    <div className="min-h-screen font-sans space-y-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-2 md::grid-cols-2 sm:grid-cols-2 gap-6">
        {/* Balance Card */}
        <div className="bg-[#0f8362cd] text-white p-6 rounded-xl shadow-lg ">
          <h2 className="text-xl font-bold text-white ">
            Current Plan details
          </h2>
          <p className="text-3xl font-semibold mt-2">Plan name</p>
          <p className="text-lg">Price</p>
          <p className="mt-4 text-sm">Purchased Date</p>
          <p className="font-mono">823681AFK347293FFF565J</p>
        </div>

        {/* Spending Statistics */}
        <div className="bg-white p-6 rounded-xl shadow-lg ">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Spending Statistics</h2>
          </div>

          <div className="relative justify-self-center">
            <PieChart width={180} height={180}>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                startAngle={90}
                endAngle={-270} // Rounded edges
                paddingAngle={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {/* Tooltip for Hover Effect */}
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
            {/* Centered Total */}
            <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="leading-0">
                <p className="text-2xl font-bold flex flex-col">
                  {totalContacts} <span className="text-sm">TOTAL</span>
                </p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-4 mt-2">
            <div className="flex items-center">
              <span className="w-4 h-4 bg-[#0f8363] rounded-full mr-2"></span>
              <p className="text-sm text-gray-600 mt-3">Used</p>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-[#9adecb] rounded-full mr-2"></span>
              <p className="text-sm text-gray-600 mt-3">Remaining</p>
            </div>
          </div>
        </div>

        {/* Transactions History */}
        {/* <div className="bg-white p-6 rounded-xl shadow-lg md:col-span-1 sm:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Transactions History</h2>
          </div>
          <ul>
            {transactions.map((txn) => (
              <li
                key={txn.id}
                className="flex justify-between py-2 border-b text-gray-700"
              >
                <span>{txn.category}</span>
                <span className="font-semibold">{txn.amount} $</span>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Expenses Classification Chart */}
        {/* <div className="bg-white p-6 rounded-xl shadow-lg md:col-span-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Expenses Classification</h2>
            <button className="bg-gray-200 px-3 py-1 rounded-md">March</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#0f8363" />
              <Bar dataKey="outcome" fill="#f4b400" />
            </BarChart>
          </ResponsiveContainer>
        </div> */}
      </div>
      <div className=" p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Plan History</h2>
        <table className="table-style3 table at-savesearch overflow-x-scroll">
          <thead className="t-head">
            <tr>
              <th scope="col">Plan</th>
              <th scope="col">Amount</th>
              <th scope="col">Date Purchased</th>
              <th scope="col">Plan Status</th>
              <th scope="col">Contacts Credits</th>
            </tr>
          </thead>
          <tbody className="t-body">
            {planData.map((property) => (
              <tr key={property._id} className=" duration-500 hover:shadow-md">
                <th scope="row">
                  <div className="dashboard-style d-xxl-flex align-items-center mb-0">
                    <div className=" py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                      <a href="#">{property.plan}</a>
                    </div>
                  </div>
                </th>
                <td className="vam">{property.price}</td>
                <td className="vam">{property.datePurchased}</td>
                <td className="vam">
                  <span
                    className={`py-1 px-2 font-semibold ${
                      property.planStatus == "Active"
                        ? "text-[#0f8363]"
                        : "text-red-500"
                    }`}
                  >
                    {property.planStatus}
                  </span>
                </td>
                <td className="vam">{property.totalContact}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt30">
          <Pagination />
        </div>
      </div>
    </div>
  );
}
