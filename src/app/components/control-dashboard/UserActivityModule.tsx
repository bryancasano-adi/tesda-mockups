import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LogIn, Users, FileDown } from "lucide-react";
import { StatCard, ChartCard, DataTable, ActionButton, exportToExcel } from "./PagePrimitives";
import { loginsByDay, loginsByUser, dailyActiveUsers } from "./sharedData";

export function UserActivityModule() {
  const totalLogins = loginsByDay.reduce((s, d) => s + d.logins, 0);

  function handleExport() {
    exportToExcel(
      ["#", "User Email", "Total Logins"],
      loginsByUser.map((r, i) => [i + 1, r.email, r.logins]),
      "logins_by_user",
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-4">
        <StatCard
          label="Total Logins"
          value={totalLogins}
          sub="All users, this period"
          color="#16a34a"
          Icon={LogIn}
        />
        <StatCard
          label="Unique Users"
          value={loginsByUser.length}
          sub="Distinct accounts"
          color="#1976d2"
          Icon={Users}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ChartCard
          title="User Logins Per Day"
          subtitle="Login count by calendar day"
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={loginsByDay} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Bar
                dataKey="logins"
                fill="#16a34a"
                radius={[4, 4, 0, 0]}
                name="Logins"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Daily Active Users" subtitle="Unique users per day">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyActiveUsers} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Bar
                dataKey="users"
                fill="#f57c00"
                radius={[4, 4, 0, 0]}
                name="Unique Users"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard
        title="Logins by User"
        subtitle="Individual login counts"
        action={
          <ActionButton onClick={handleExport} variant="outline" size="sm">
            <FileDown size={13} /> Export Excel
          </ActionButton>
        }
      >
        <DataTable
          columns={[
            {
              key: "#",
              header: "#",
              render: (_, i) => (
                <span style={{ color: "#94a3b8" }}>{i + 1}</span>
              ),
            },
            {
              key: "email",
              header: "User Email",
              render: (row) => (
                <span className="font-medium" style={{ color: "#0f172a" }}>
                  {row.email}
                </span>
              ),
            },
            {
              key: "logins",
              header: "Total Logins",
              align: "right",
              render: (row) => (
                <span className="font-bold" style={{ color: "#1976d2" }}>
                  {row.logins}
                </span>
              ),
            },
          ]}
          rows={loginsByUser}
          keyExtractor={(_, i) => i}
        />
      </ChartCard>
    </div>
  );
}
