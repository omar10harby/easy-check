import { Lock } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: 'dot',
    label: 'Global Blacklist',
  },
  {
    id: 2,
    icon: 'lock',
    label: 'Carrier Lock',
  },
  {
    id: 3,
    icon: 'icloud',
    label: 'iCloud Status',
  },
];

function FeaturePills() {
  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'dot':
        return <div className="w-2 h-2 bg-main-green rounded-full" />;
      case 'lock':
        return <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-main-green" />;
      case 'icloud':
        return (
          <svg className="w-3 h-3 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
            <path
              d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
              fill="#ff9500"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4  mt-10 px-4">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow"
        >
          {renderIcon(feature.icon)}
          <span className="text-xs sm:text-sm font-medium text-dark">
            {feature.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default FeaturePills;