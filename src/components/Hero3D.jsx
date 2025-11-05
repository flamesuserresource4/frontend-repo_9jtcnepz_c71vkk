import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';

export default function Hero3D() {
  const scrollToConfigurator = () => {
    const el = document.getElementById('configurator');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="relative h-[80vh] md:h-[88vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/fcD-iW8YZHyBp1qq/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/90" />

      <div className="relative z-10 mx-auto max-w-7xl h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900">
            Build your dream PC in 3D
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-700">
            Design, customize, and visualize your ultimate gaming rig with an interactive 3D experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={scrollToConfigurator} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-5 py-3 font-medium shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition">
              Start building
              <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#why" className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 px-5 py-3 font-medium border border-slate-200 hover:bg-slate-50 transition">
              Why ForgePC?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
