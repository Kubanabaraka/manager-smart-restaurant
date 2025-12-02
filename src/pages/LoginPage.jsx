import React from "react";
import { ChefHat, Users, Receipt, UserCheck, LogIn } from "lucide-react";
import { Button, TextField } from "../components/ui";

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-black/60 md:flex-row">
        <div className="relative flex flex-1 flex-col justify-between bg-gradient-to-br from-brand-500 via-orange-500 to-rose-500 px-8 py-8 text-white">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <ChefHat className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                Manager Console
              </p>
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
              MANAGER SMART RESTAURANT
            </h1>
            <p className="mt-3 max-w-xs text-sm text-white/80">
              Monitor today&apos;s performance, control your digital menu, and
              empower your team in real-time.
            </p>
          </div>
          <div className="mt-6 text-[11px] text-white/80">
            <p className="font-semibold">Shift Insights</p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
              <div className="flex items-center gap-2 rounded-2xl bg-black/15 px-3 py-2">
                <Users className="h-4 w-4 text-white/70" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/70">
                    Live tables
                  </p>
                  <p className="text-lg font-semibold">12</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-black/15 px-3 py-2">
                <Receipt className="h-4 w-4 text-white/70" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/70">
                    Avg. ticket
                  </p>
                  <p className="text-lg font-semibold">$28.40</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-black/15 px-3 py-2">
                <UserCheck className="h-4 w-4 text-white/70" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/70">
                    Waiters online
                  </p>
                  <p className="text-lg font-semibold">5</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center bg-slate-950/60 px-6 py-8 sm:px-8">
          <div className="mx-auto w-full max-w-sm">
            <h2 className="text-lg font-semibold tracking-tight text-white">
              Manager Login
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Use your manager email and secure PIN. Demo values are prefilled
              for prototype.
            </p>

            <form className="mt-6 space-y-4">
              <TextField
                label="Email"
                type="email"
                autoComplete="email"
                defaultValue="olivia.manager@example.com"
                className="text-white"
              />
              <TextField
                label="PIN"
                type="password"
                autoComplete="current-password"
                defaultValue="1234"
              />

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-950 text-brand-500 focus:ring-brand-500/40"
                  />
                  <span>Remember this device</span>
                </label>
                <button
                  type="button"
                  className="text-[11px] font-medium text-orange-300 hover:text-white"
                >
                  Forgot PIN?
                </button>
              </div>

              <div className="pt-3">
                <Button type="submit" className="w-full justify-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Enter manager console
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
