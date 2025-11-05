import { useMemo, useState } from 'react';
import { Cpu, HardDrive, MemoryStick, Monitor, Box, Power, DollarSign } from 'lucide-react';

const CATEGORIES = [
  {
    key: 'cpu',
    label: 'CPU',
    icon: Cpu,
    options: [
      { id: 'ryzen5', name: 'AMD Ryzen 5 7600', price: 219, watt: 65 },
      { id: 'ryzen7', name: 'AMD Ryzen 7 7800X3D', price: 399, watt: 120 },
      { id: 'i5', name: 'Intel Core i5-13600K', price: 319, watt: 125 },
      { id: 'i7', name: 'Intel Core i7-14700K', price: 429, watt: 125 },
    ],
  },
  {
    key: 'gpu',
    label: 'Graphics Card',
    icon: Monitor,
    options: [
      { id: 'rtx4070', name: 'NVIDIA GeForce RTX 4070', price: 549, watt: 200 },
      { id: 'rtx4080', name: 'NVIDIA GeForce RTX 4080', price: 999, watt: 320 },
      { id: 'rx7800', name: 'AMD Radeon RX 7800 XT', price: 499, watt: 260 },
      { id: 'rx7900', name: 'AMD Radeon RX 7900 XTX', price: 999, watt: 355 },
    ],
  },
  {
    key: 'ram',
    label: 'Memory',
    icon: MemoryStick,
    options: [
      { id: '16gb', name: '16GB (2x8) DDR5 6000', price: 79, watt: 10 },
      { id: '32gb', name: '32GB (2x16) DDR5 6000', price: 129, watt: 12 },
      { id: '64gb', name: '64GB (2x32) DDR5 5600', price: 239, watt: 14 },
    ],
  },
  {
    key: 'storage',
    label: 'Storage',
    icon: HardDrive,
    options: [
      { id: '1tb', name: '1TB NVMe Gen4 SSD', price: 89, watt: 6 },
      { id: '2tb', name: '2TB NVMe Gen4 SSD', price: 149, watt: 6 },
      { id: '4tb', name: '4TB NVMe Gen4 SSD', price: 289, watt: 6 },
    ],
  },
  {
    key: 'case',
    label: 'Case',
    icon: Box,
    options: [
      { id: 'mesh', name: 'ATX Mesh Airflow', price: 109, watt: 0 },
      { id: 'compact', name: 'mATX Compact', price: 89, watt: 0 },
      { id: 'silent', name: 'ATX Silent', price: 139, watt: 0 },
    ],
  },
  {
    key: 'psu',
    label: 'Power Supply',
    icon: Power,
    options: [
      { id: '650w', name: '650W 80+ Gold', price: 99, watt: 0 },
      { id: '750w', name: '750W 80+ Gold', price: 119, watt: 0 },
      { id: '850w', name: '850W 80+ Gold', price: 139, watt: 0 },
      { id: '1000w', name: '1000W 80+ Platinum', price: 199, watt: 0 },
    ],
  },
];

function CategoryCard({ label, Icon, value, onChange, options }) {
  return (
    <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-5 w-5 text-indigo-600" />
        <h3 className="font-semibold text-slate-900">{label}</h3>
      </div>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name} — ${opt.price}
          </option>
        ))}
      </select>
    </div>
  );
}

function Summary({ selections }) {
  const { total, wattage, breakdown, recommendedPsu } = useMemo(() => {
    let total = 0;
    let wattage = 0;
    const breakdown = [];

    CATEGORIES.forEach((cat) => {
      const picked = cat.options.find((o) => o.id === selections[cat.key]);
      if (picked) {
        total += picked.price;
        wattage += picked.watt;
        breakdown.push({ label: cat.label, name: picked.name, price: picked.price });
      }
    });

    // Add 40% headroom for PSU recommendation
    const recommendedWatt = Math.ceil(wattage * 1.4 / 50) * 50;
    let recommendedPsu = '650W';
    if (recommendedWatt > 900) recommendedPsu = '1000W';
    else if (recommendedWatt > 800) recommendedPsu = '850W';
    else if (recommendedWatt > 700) recommendedPsu = '750W';

    return { total, wattage, breakdown, recommendedPsu };
  }, [selections]);

  return (
    <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-slate-900">Summary</h4>
        <div className="flex items-center gap-2 text-slate-700">
          <DollarSign className="h-4 w-4" />
          <span className="text-lg font-bold">${total.toLocaleString()}</span>
        </div>
      </div>
      <ul className="space-y-2 text-sm">
        {breakdown.length === 0 && (
          <li className="text-slate-500">Select components to see your build summary.</li>
        )}
        {breakdown.map((item) => (
          <li key={item.label} className="flex items-center justify-between">
            <span className="text-slate-700">{item.label}: {item.name}</span>
            <span className="font-medium text-slate-900">${item.price}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="p-3 rounded-xl bg-white border border-slate-200">
          <p className="text-slate-600">Estimated draw</p>
          <p className="font-semibold text-slate-900">{wattage}W</p>
        </div>
        <div className="p-3 rounded-xl bg-white border border-slate-200">
          <p className="text-slate-600">Recommended PSU</p>
          <p className="font-semibold text-slate-900">{recommendedPsu}</p>
        </div>
      </div>
      <button className="mt-5 w-full rounded-xl bg-indigo-600 text-white py-3 font-medium hover:bg-indigo-500 transition">
        Add to cart
      </button>
    </div>
  );
}

export default function PCConfigurator() {
  const [selections, setSelections] = useState({});

  const setPart = (key, value) => setSelections((s) => ({ ...s, [key]: value }));

  return (
    <section id="configurator" className="relative py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Configure your build
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Choose high-performance components and see pricing and power recommendations update in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.key}
                label={cat.label}
                Icon={cat.icon}
                value={selections[cat.key] || ''}
                onChange={(val) => setPart(cat.key, val)}
                options={cat.options}
              />)
            )}
          </div>
          <div>
            <Summary selections={selections} />
          </div>
        </div>

        <div id="why" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            title: 'Handpicked performance',
            desc: 'Curated parts from trusted brands for elite gaming and creation.',
          }, {
            title: 'Real-time insights',
            desc: 'Live pricing, power estimates, and compatibility guidance.',
          }, {
            title: 'Built your way',
            desc: 'Tweak every detail and export your parts list with one click.',
          }].map((f, i) => (
            <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50">
              <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
              <p className="text-slate-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
