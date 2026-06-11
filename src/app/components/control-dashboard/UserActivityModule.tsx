import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LogIn, Users, FileDown, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { StatCard, ChartCard, DataTable, ActionButton, exportToExcel } from "./PagePrimitives";
import { loginsByDay, loginsByUser, dailyActiveUsers } from "./sharedData";

const LOGINS_PER_PAGE = 5;

export function UserActivityModule() {
  const totalLogins = loginsByDay.reduce((s, d) => s + d.logins, 0);

  const [loginSearch, setLoginSearch] = useState("");
  const [loginPage, setLoginPage] = useState(1);

  const filteredLogins = loginsByUser.filter((r) =>
    r.email.toLowerCase().includes(loginSearch.toLowerCase()),
  );
  const loginPageCount = Math.max(1, Math.ceil(filteredLogins.length / LOGINS_PER_PAGE));
  const pagedLogins = filteredLogins.slice(
    (loginPage - 1) * LOGINS_PER_PAGE,
    loginPage * LOGINS_PER_PAGE,
  );

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
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#94a3b8" }}
              />
              <input
                type="text"
                value={loginSearch}
                onChange={(e) => {
                  setLoginSearch(e.target.value);
                  setLoginPage(1);
                }}
                placeholder="Search by email..."
                className="pl-8 pr-3 py-1.5 border border-[#e2e8f0] rounded-xl text-[12px] w-48 focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] transition-colors"
                style={{ color: "#334155" }}
              />
            </div>
            <ActionButton onClick={handleExport} variant="outline" size="sm">
              <FileDown size={13} /> Export Excel
            </ActionButton>
          </div>
        }
      >
        <DataTable
          columns={[
            {
              key: "#",
              header: "#",
              render: (_, i) => (
                <span style={{ color: "#94a3b8" }}>
                  {(loginPage - 1) * LOGINS_PER_PAGE + i + 1}
                </span>
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
          rows={pagedLogins}
          keyExtractor={(row) => row.email}
        />

        {/* Pagination */}
        {loginPageCount > 1 && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f1f5f9]">
            <p className="text-[12px]" style={{ color: "#94a3b8" }}>
              Showing{" "}
              {filteredLogins.length === 0
                ? 0
                : (loginPage - 1) * LOGINS_PER_PAGE + 1}
              –{Math.min(loginPage * LOGINS_PER_PAGE, filteredLogins.length)}{" "}
              of {filteredLogins.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLoginPage((p) => Math.max(1, p - 1))}
                disabled={loginPage === 1}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e2e8f0] bg-white disabled:opacity-40 hover:bg-[#f8fafc] transition-colors cursor-pointer disabled:cursor-default"
              >
                <ChevronLeft size={13} style={{ color: "#475569" }} />
              </button>
              <span className="text-[12px] px-2" style={{ color: "#475569" }}>
                {loginPage} / {loginPageCount}
              </span>
              <button
                onClick={() =>
                  setLoginPage((p) => Math.min(loginPageCount, p + 1))
                }
                disabled={loginPage === loginPageCount}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e2e8f0] bg-white disabled:opacity-40 hover:bg-[#f8fafc] transition-colors cursor-pointer disabled:cursor-default"
              >
                <ChevronRight size={13} style={{ color: "#475569" }} />
              </button>
            </div>
          </div>
        )}
      </ChartCard>
    </div>
  );
}
