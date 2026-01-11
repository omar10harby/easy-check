import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import logoImage from '../../assets/grayscale_transparent_nobuffer.webp'
function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className=" p-2 rounded-lg text-main-green transition-colors">
        <img src={logoImage} alt="" className='w-36'/>
      </div>
    </Link>
  );
}

export default Logo;