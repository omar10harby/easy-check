import { Lock, Cloud, ShieldCheck, Clock3 } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: ShieldCheck,
    label: 'Global Blacklist',
    description: 'Instantly spot stolen or blocked devices with live database checks.',
    accent: 'bg-emerald-300/15 text-emerald-200',
  },
  {
    id: 2,
    icon: Lock,
    label: 'Carrier & Activation Lock',
    description: 'See SIM, network, and activation status before you buy or sell.',
    accent: 'bg-amber-300/15 text-amber-100',
  },
  {
    id: 3,
    icon: Cloud,
    label: 'iCloud & Warranty',
    description: 'Confirm iCloud pairing and warranty timelines in one scan.',
    accent: 'bg-sky-300/15 text-sky-100',
  },
  {
    id: 4,
    icon: Clock3,
    label: 'Results in Seconds',
    description: 'Optimized flows keep lookups fast, even on mobile data.',
    accent: 'bg-light/10 text-light',
  },
];

function FeaturePills() {
  return (
    <div className="grid gap-3 sm:gap-4 mt-10 grid-cols-1 sm:grid-cols-2">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="flex items-start gap-3 px-4 sm:px-5 py-3 bg-light/10 backdrop-blur-sm border border-light/15 rounded-2xl shadow-lg hover:bg-light/15 transition-all cursor-default"
        >
          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${feature.accent}`}>
            <feature.icon className="w-5 h-5" />
          </div>
          <div className="text-left space-y-1">
            <p className="text-sm sm:text-base font-semibold text-light">
              {feature.label}
            </p>
            <p className="text-xs sm:text-sm text-light/70 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeaturePills;
