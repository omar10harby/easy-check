import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/grayscale_transparent_nobuffer.webp';

function Logo() {
  return (
    <Link 
      to="/" 
      
      aria-label="Go to homepage - Easy Check"
    >
      <div className="">
        {/* ✅ استخدام الصورة الأصلية مع تحسينات الأداء */}
        <img 
          src={logoImage} 
          alt="Easy Check - Device Verification Service Logo"
          width="144"
          height="40"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          className="w-36 h-auto"
        />
      </div>
    </Link>
  );
}

export default Logo;