import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { DatesRangeValue } from "@mantine/dates";
import { Skeleton, Tooltip } from "@mantine/core";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  IconAlertTriangle,
  IconArrowDownLeft,
  IconArrowRight,
  IconArrowUpRight,
  IconBolt,
  IconBuildingStore,
  IconCalendar,
  IconChartBar,
  IconClockHour4,
  IconCoin,
  IconCreditCard,
  IconReceipt2,
  IconRefresh,
  IconTrendingUp,
  IconTrophy,
  IconUserCheck,
  IconUserExclamation,
  IconUserPlus,
  IconUserX,
  IconWallet,
  type Icon,
} from "@tabler/icons-react";
import { useAppDispatch } from "../../Redux/hooks";
import { Dashboard_Api } from "../../Redux/Features/Auth/Thunk";
import CustomDateRangePicker from "../../Components/Atoms/CustomDateRangePicker";
import { DateRangeLabel, getLabelFromRange, getRangeFromLabel } from "../../Utils/dateRangeUtils";
import { filterSidebarByPermissions } from "../../Utils/filterSidebarByPermissions";

/* ---------------------------------------------------------------- helpers */

const toNumber = (value: unknown): number => {
  if (typeof value === "number") return value;
  const n = Number(String(value ?? "").replace(/[₹,\s]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

/** Full Indian format: 10,78,000 */
const formatFull = (n: number, money: boolean) =>
  `${money ? "₹" : ""}${n.toLocaleString("en-IN", { maximumFractionDigits: money ? 2 : 0 })}`;

/** Short Indian format: ₹10.78 L, ₹1.2 Cr */
const formatShort = (n: number, money: boolean) => {
  const abs = Math.abs(n);
  const unit = abs >= 1e7 ? [1e7, " Cr"] : abs >= 1e5 ? [1e5, " L"] : abs >= 1e3 ? [1e3, " K"] : null;
  const text = unit
    ? `${(n / (unit[0] as number)).toLocaleString("en-IN", { maximumFractionDigits: 2 })}${unit[1]}`
    : n.toLocaleString("en-IN", { maximumFractionDigits: money ? 2 : 0 });
  return `${money ? "₹" : ""}${text}`;
};

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

type Tone = "emerald" | "sky" | "indigo" | "amber" | "rose" | "violet" | "slate";

const TONES: Record<Tone, string> = {
  emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  sky: "bg-sky-50 text-sky-600 ring-sky-100",
  indigo: "bg-indigo-50 text-indigo-600 ring-indigo-100",
  amber: "bg-amber-50 text-amber-600 ring-amber-100",
  rose: "bg-rose-50 text-rose-600 ring-rose-100",
  violet: "bg-violet-50 text-violet-600 ring-violet-100",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
};

/** How each card from the API is shown. Keys are the API labels. */
const CARD_META: Record<string, { title: string; icon: Icon; tone: Tone; link?: string; hint?: string }> = {
  "PRODUCT VOLUME": { title: "Product Volume", icon: IconChartBar, tone: "sky", hint: "Business done across all products" },
  "PENDING TRANSACTION": { title: "Pending Transactions", icon: IconClockHour4, tone: "amber", link: "/report/pending-transaction", hint: "Waiting for a final status" },
  "APPROVED USERS": { title: "Approved Members", icon: IconUserCheck, tone: "emerald", link: "/management/user/onboarded", hint: "Onboarded in your network" },
  "PENDING USERS": { title: "Pending Approvals", icon: IconUserExclamation, tone: "amber", link: "/management/user/pending", hint: "Applications to review" },
  "REJECTED USERS": { title: "Rejected Applications", icon: IconUserX, tone: "rose", link: "/management/user/rejected", hint: "Applications declined" },
  "PREPAID BALANCE": { title: "Prepaid Balance", icon: IconWallet, tone: "emerald", hint: "Available prepaid wallet" },
  "POSTPAID BALANCE": { title: "Postpaid Balance", icon: IconCreditCard, tone: "indigo", hint: "Available postpaid limit" },
  "TRANSACTING RETAILER COUNT": { title: "Active Retailers", icon: IconBuildingStore, tone: "violet", hint: "Retailers who transacted" },
  "RETAILERS CREATED": { title: "Retailers", icon: IconUserPlus, tone: "violet", hint: "Retailers in your network" },
  "FUND TRANSFERRED": { title: "Fund Transferred", icon: IconArrowUpRight, tone: "sky", hint: "Sent to your network" },
  "FUND RECEIVED": { title: "Fund Received", icon: IconArrowDownLeft, tone: "emerald", hint: "Received into your wallet" },
  "COMMISSION EARNED": { title: "Commission Earned", icon: IconCoin, tone: "amber", hint: "Your earnings in this period" },
};

/** Shortcuts shown when the user has access to them (order = priority). */
const QUICK_ACTIONS = [
  "Network Creation",
  "Pending Approvals",
  "Wallet Credit / Debit",
  "Prefund Approvals",
  "Transaction History",
  "Scheme List",
];

type ApiCard = { label: string; value: unknown; prefix?: string };

/** Numbers shown inside the hero (first 4 the API returns, in this order). */
const HERO_STATS = [
  "PREPAID BALANCE",
  "POSTPAID BALANCE",
  "PRODUCT VOLUME",
  "TRANSACTING RETAILER COUNT",
  "COMMISSION EARNED",
  "FUND RECEIVED",
  "FUND TRANSFERRED",
  "RETAILERS CREATED",
];

/* ------------------------------------------------------------------ page */

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DatesRangeValue>(getRangeFromLabel("Last 7 Days"));
  const [selectedLabel, setSelectedLabel] = useState<DateRangeLabel>("Last 7 Days");

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const displayName = userInfo?.name || userInfo?.userName || userInfo?.username || userInfo?.hierarchyId || "";

  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  const dashboardDataReq = async () => {
    if (!selectedDate) return;
    const [fromDate, toDate] = selectedDate;
    if (!fromDate || !toDate) return;
    try {
      setIsLoading(true);
      const payload = {
        fromDate: moment(fromDate).format("YYYY-MM-DD"),
        toDate: moment(toDate).format("YYYY-MM-DD"),
        hierarchyId: userInfo?.hierarchyId || "",
      };
      const response = await dispatch(Dashboard_Api(payload)).unwrap();
      setDashboardData(response.data);
    } catch (error: any) {
      toast.error(error?.message || "Error Fetching Dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSelectedLabel(getLabelFromRange(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    dashboardDataReq();
  }, [selectedDate]);

  /* ------------------------------------------------------- derived data */

  const cards: ApiCard[] = dashboardData?.cards || [];
  const cardValue = (label: string) => toNumber(cards.find((c) => c.label === label)?.value);
  const hasCard = (label: string) => cards.some((c) => c.label === label);

  const headline = cardValue("TRANSACTION VOLUME");
  const heroStats = HERO_STATS.filter(hasCard).slice(0, 4);
  const tiles = cards.filter((c) => c.label !== "TRANSACTION VOLUME" && !heroStats.includes(c.label));

  // Product-wise business: volume (bar graph) + count (line graph), merged by product
  const products = useMemo(() => {
    const map = new Map<string, { product: string; volume: number; count: number }>();
    (dashboardData?.barGraphData || []).forEach((r: any) => {
      const key = r.product ?? "Other";
      map.set(key, { product: key, volume: toNumber(r.volume), count: map.get(key)?.count ?? 0 });
    });
    (dashboardData?.lineGraphData || []).forEach((r: any) => {
      const key = r.product ?? "Other";
      const row = map.get(key) ?? { product: key, volume: 0, count: 0 };
      map.set(key, { ...row, count: toNumber(r.transaction) });
    });
    return [...map.values()].sort((a, b) => b.volume - a.volume || b.count - a.count);
  }, [dashboardData]);
  const productTotal = products.reduce((s, p) => s + p.volume, 0);
  const txnTotal = products.reduce((s, p) => s + p.count, 0);
  const maxVolume = Math.max(1, ...products.map((p) => p.volume));

  // Monthly trend (white label / network roles)
  const trend = (dashboardData?.graphData || []).map((r: any) => ({
    month: moment(r.month, "YYYY-MM").format("MMM YY"),
    value: toNumber(r.value),
  }));
  const topMembers: { id: string; totalBusiness: string }[] = dashboardData?.tableData || [];

  const pendingUsers = cardValue("PENDING USERS");

  // Things that need action
  const pendingTxn = cardValue("PENDING TRANSACTION");
  const alerts = [
    pendingTxn > 0 && {
      text: `${pendingTxn} transaction${pendingTxn > 1 ? "s" : ""} pending`,
      link: "/report/pending-transaction",
    },
    pendingUsers > 0 && {
      text: `${pendingUsers} application${pendingUsers > 1 ? "s" : ""} waiting for approval`,
      link: "/management/user/pending",
    },
  ].filter(Boolean) as { text: string; link: string }[];

  // Quick actions the user is allowed to open
  const quickActions = useMemo(() => {
    const role = userInfo?.role || userInfo?.hierarchyId?.split("-")[1] || "";
    const permissions = (userInfo?.permissions || "").split(",").map((p: string) => p.trim()).filter(Boolean);
    const allowed = new Map<string, string>();
    const walk = (items: any[]) =>
      items?.forEach((i) => {
        if (!i) return;
        if (i.link) allowed.set(i.label, i.link);
        if (i.links) walk(i.links);
      });
    walk(filterSidebarByPermissions(role, permissions) as any[]);
    return QUICK_ACTIONS.filter((l) => allowed.has(l)).map((label) => ({ label, link: allowed.get(label)! }));
  }, []);

  const loading = isLoading && !dashboardData;

  /* -------------------------------------------------------------- render */

  return (
    <div className="flex flex-col gap-5 pb-6">
      {/* HERO: headline number first */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#123b35] to-[#047857] p-6 text-white shadow-lg md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-teal-300/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-200">
              {greeting()}
              {displayName ? `, ${displayName}` : ""}
            </p>
            <h1 className="mt-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/70">
              Transaction volume · {selectedLabel}
            </h1>
            {loading ? (
              <Skeleton height={52} width={260} mt={10} radius="md" />
            ) : (
              <Tooltip label={formatFull(headline, true)} position="bottom-start">
                <div className="mt-2 text-[44px] font-extrabold leading-none tracking-tight md:text-[56px]">
                  {formatShort(headline, true)}
                </div>
              </Tooltip>
            )}
            <p className="mt-3 flex items-center gap-1.5 text-sm text-white/75">
              <IconTrendingUp size={16} className="text-emerald-300" />
              {products.length
                ? `${txnTotal.toLocaleString("en-IN")} transaction${txnTotal === 1 ? "" : "s"} across ${products.length} product${products.length > 1 ? "s" : ""}`
                : "Business done by your network in this period"}
            </p>
          </div>

          <div className="flex w-full items-center gap-2 lg:w-auto">
            <div className="w-full rounded-xl bg-white/10 p-1.5 ring-1 ring-white/15 backdrop-blur lg:w-72">
              <CustomDateRangePicker
                placeholder="Select date range"
                size="sm"
                shortcuts
                minDate={sixMonthsAgo}
                maxDate={today}
                value={selectedDate}
                onChange={(val: DatesRangeValue) => setSelectedDate(val)}
                required
                leftIcon={<IconCalendar size={16} />}
              />
            </div>
            <Tooltip label="Refresh">
              <button
                type="button"
                onClick={dashboardDataReq}
                aria-label="Refresh dashboard"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 transition hover:bg-white/20"
              >
                <IconRefresh size={18} className={isLoading ? "animate-spin" : ""} />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Mini stats inside the hero */}
        <div className="relative mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {heroStats
            .map((label) => {
              const card = cards.find((c) => c.label === label)!;
              const n = toNumber(card.value);
              return {
                label: CARD_META[label]?.title ?? label,
                value: card.prefix === "₹" ? formatShort(n, true) : n.toLocaleString("en-IN"),
              };
            })
            .map((s: any) => (
              <div key={s.label} className="rounded-xl bg-white/[0.07] px-4 py-3 ring-1 ring-white/10">
                <div className="text-[11px] font-medium uppercase tracking-wide text-white/60">{s.label}</div>
                <div className="mt-0.5 text-lg font-bold">{loading ? "…" : s.value}</div>
              </div>
            ))}
        </div>
      </section>

      {/* NEEDS ATTENTION */}
      {alerts.length > 0 && (
        <section className="flex flex-col gap-2 md:flex-row">
          {alerts.map((a) => (
            <button
              key={a.link}
              type="button"
              onClick={() => navigate(a.link)}
              className="group flex flex-1 items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left transition hover:border-amber-300 hover:bg-amber-100/70"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <IconAlertTriangle size={18} />
              </span>
              <span className="flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-amber-700">Needs attention</span>
                <span className="block text-sm font-semibold text-slate-800">{a.text}</span>
              </span>
              <span className="flex items-center gap-1 text-sm font-semibold text-amber-700">
                Review <IconArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          ))}
        </section>
      )}

      {/* KPI TILES */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} height={118} radius="lg" />)
          : tiles.map((card) => {
              const meta = CARD_META[card.label] ?? {
                title: card.label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
                icon: IconReceipt2,
                tone: "slate" as Tone,
              };
              const money = card.prefix === "₹";
              const n = toNumber(card.value);
              const TileIcon = meta.icon;
              const Wrapper: any = meta.link ? "button" : "div";
              return (
                <Wrapper
                  key={card.label}
                  {...(meta.link ? { type: "button", onClick: () => navigate(meta.link!) } : {})}
                  className={`group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition ${
                    meta.link ? "hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md" : ""
                  }`}
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${TONES[meta.tone]}`}>
                    <TileIcon size={24} stroke={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-medium text-slate-500">{meta.title}</span>
                    <Tooltip label={formatFull(n, money)} disabled={!money || n < 1000}>
                      <span className="mt-0.5 block truncate text-[26px] font-bold leading-tight text-slate-900">
                        {money ? formatShort(n, true) : n.toLocaleString("en-IN")}
                      </span>
                    </Tooltip>
                    {meta.hint && <span className="mt-1 block text-xs text-slate-400">{meta.hint}</span>}
                  </span>
                  {meta.link && (
                    <IconArrowUpRight size={18} className="text-slate-300 transition group-hover:text-emerald-500" />
                  )}
                </Wrapper>
              );
            })}
      </section>

      {/* INSIGHTS */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Business by product (admin) or monthly trend (network roles) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          {products.length > 0 || !trend.length ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Business by product</h2>
                  <p className="text-xs text-slate-500">Ranked by amount · {selectedLabel}</p>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Total</div>
                  <div className="text-base font-bold text-slate-900">{formatShort(productTotal, true)}</div>
                </div>
              </div>

              {products.length === 0 ? (
                <div className="flex h-48 flex-col items-center justify-center gap-2 text-sm text-slate-400">
                  <IconChartBar size={32} stroke={1.5} />
                  {loading ? "Loading…" : "No transactions in this period"}
                </div>
              ) : (
                <ul className="mt-5 flex flex-col gap-4">
                  {products.map((p, i) => {
                    const share = productTotal ? (p.volume / productTotal) * 100 : 0;
                    return (
                      <Tooltip
                        key={p.product}
                        label={`${p.product}: ${formatFull(p.volume, true)} · ${p.count.toLocaleString("en-IN")} transactions`}
                        position="top-start"
                      >
                        <li className="cursor-default">
                          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                            <span className="flex items-center gap-2 font-semibold text-slate-800">
                              <span className="w-5 text-xs font-bold text-slate-400">{i + 1}</span>
                              {p.product}
                            </span>
                            <span className="whitespace-nowrap text-slate-500">
                              <span className="font-bold text-slate-900">{formatShort(p.volume, true)}</span>
                              <span className="ml-2 text-xs">{share.toFixed(1)}% · {p.count.toLocaleString("en-IN")} txn{p.count === 1 ? "" : "s"}</span>
                            </span>
                          </div>
                          <div className="ml-7 h-2.5 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                              style={{ width: `${Math.max((p.volume / maxVolume) * 100, p.volume > 0 ? 2 : 0)}%` }}
                            />
                          </div>
                        </li>
                      </Tooltip>
                    );
                  })}
                </ul>
              )}
            </>
          ) : (
            <>
              <h2 className="text-base font-bold text-slate-900">Business trend</h2>
              <p className="text-xs text-slate-500">Last 4 months</p>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} width={64} tick={{ fill: "#64748b", fontSize: 12 }} tickFormatter={(v) => formatShort(v, true)} />
                    <ChartTooltip formatter={(v: any) => [formatFull(toNumber(v), true), "Business"]} cursor={{ stroke: "#94a3b8", strokeDasharray: "4 4" }} />
                    <Area type="monotone" dataKey="value" stroke="#059669" strokeWidth={2} fill="url(#trendFill)" dot={{ r: 4, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 5 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {topMembers.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
                <IconTrophy size={18} className="text-amber-500" /> Top performers
              </h2>
              <ul className="mt-3 divide-y divide-slate-100">
                {topMembers.map((m, i) => (
                  <li key={m.id} className="flex items-center justify-between py-2 text-sm">
                    <span className="flex items-center gap-2 font-medium text-slate-700">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">{i + 1}</span>
                      {m.id}
                    </span>
                    <span className="font-bold text-slate-900">{m.totalBusiness}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {quickActions.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
                <IconBolt size={18} className="text-emerald-500" /> Quick actions
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {quickActions.map((a) => (
                  <button
                    key={a.label}
                    type="button"
                    onClick={() => navigate(a.link)}
                    className="flex items-center justify-between gap-1 rounded-xl border border-slate-200 px-3 py-2.5 text-left text-[13px] font-semibold text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {a.label}
                    <IconArrowRight size={14} className="shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
