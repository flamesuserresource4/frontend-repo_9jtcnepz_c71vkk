export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
        <p>© {new Date().getFullYear()} ForgePC. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#hero" className="hover:text-slate-900">Top</a>
          <a href="#configurator" className="hover:text-slate-900">Build</a>
          <a href="#why" className="hover:text-slate-900">Why Us</a>
        </div>
      </div>
    </footer>
  );
}
