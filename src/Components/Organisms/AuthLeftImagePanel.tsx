import React from "react";
import { IconChartBar, IconShieldCheck, IconUsersGroup } from "@tabler/icons-react";
import BrandLogo from "../Brand/BrandLogo";

interface LeftSideLayoutProps {
  bgImage?: string;
  children?: React.ReactNode;
  oneLiner?: string;
}

const features = [
  { icon: IconUsersGroup, title: "Your whole network in one place", text: "Onboard and manage every level, from distributors to retailers." },
  { icon: IconChartBar, title: "Live reports", text: "Track transactions, commissions and wallets as they happen." },
  { icon: IconShieldCheck, title: "Bank-grade security", text: "OTP sign-in and encrypted sessions protect every action." },
];

const LeftSideLayout: React.FC<LeftSideLayoutProps> = ({ children, oneLiner }) => {
  return (
    <div className="hidden lg:flex lg:w-[52%] h-full relative overflow-hidden bg-[#0f172a] text-white flex-col justify-between p-12">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full bg-emerald-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -left-32 h-[460px] w-[460px] rounded-full bg-teal-400/10 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative">
        <BrandLogo tone="light" size={42} subtitle="Admin Console" />
      </div>

      <div className="relative max-w-[520px]">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Fintech distribution platform
        </div>
        <h2 className="mt-5 text-[40px] leading-[1.1] font-extrabold tracking-tight">
          Smarter credit,
          <br />
          <span className="text-emerald-400">simpler control.</span>
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
          {oneLiner || "One console to run your network, funding, schemes and reports."}
        </p>

        <div className="mt-10 flex flex-col gap-5">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <Icon size={20} className="text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-semibold">{title}</div>
                <div className="text-[13px] text-slate-400">{text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative text-xs text-slate-500">
        © {new Date().getFullYear()} Smart Credit Solution. All rights reserved.
      </div>

      {children}
    </div>
  );
};

export default LeftSideLayout;
