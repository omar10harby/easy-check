import React from 'react';

const brands = [
  { id: 1, emoji: '🍎', name: 'Apple' },
  { id: 2, emoji: '📱', name: 'Samsung' },
  { id: 3, emoji: '📲', name: 'Xiaomi' },
];

function Footer() {
  return (
    <footer className="border-t border-dark-bg py-4 sm:py-6 px-4 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center gap-3 sm:gap-8 text-xs sm:text-sm text-light">
          {/* Copyright */}
          <span className="font-medium ">© 2025 Easy Check Inc.</span>
            
          {/* Brands */}
          <div className="flex items-center gap-3 sm:gap-6">
            {brands.map((brand) => (
              <span key={brand.id} className="font-medium ">
                {brand.emoji} {brand.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;