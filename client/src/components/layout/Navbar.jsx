import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-4 top-3.5 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search datasets..."
          className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative rounded-xl p-2 hover:bg-slate-100">
          <Bell size={22} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="text-right">
          <p className="font-semibold">
            Taiwo Francis
          </p>

          <p className="text-sm text-slate-500">
            Validation Officer
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          T
        </div>
      </div>
    </header>
  );
}