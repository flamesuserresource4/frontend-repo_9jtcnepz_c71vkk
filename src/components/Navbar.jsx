import { Rocket, ShoppingCart, User, Settings } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-slate-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold text-slate-900">
          <Rocket className="h-5 w-5 text-indigo-600" />
          <span>ForgePC</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#hero" className="text-slate-600 hover:text-slate-900">Home</a>
          <a href="#configurator" className="text-slate-600 hover:text-slate-900">Build</a>
          <a href="#why" className="text-slate-600 hover:text-slate-900">Why Us</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-slate-100" aria-label="Settings">
            <Settings className="h-5 w-5 text-slate-700" />
          </button>
          <button className="p-2 rounded-lg hover:bg-slate-100" aria-label="Account">
            <User className="h-5 w-5 text-slate-700" />
          </button>
          <button className="p-2 rounded-lg hover:bg-slate-100" aria-label="Cart">
            <ShoppingCart className="h-5 w-5 text-slate-700" />
          </button>
        </div>
      </nav>
    </header>
  );
}
