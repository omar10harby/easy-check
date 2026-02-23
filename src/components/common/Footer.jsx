import { useState } from "react";
import { Facebook, Instagram } from "lucide-react";
import { Threads, TikTok, Snapchat, XTwitter } from "./BrandIcons";
import PolicyModal from "./PolicyModal";

function Footer() {
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-dark-bg/50 py-4 px-4 bg-primary text-light mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">

            {/* Left: Copyright */}
            <div className="order-3 sm:order-1 text-xs sm:text-sm text-light/80 text-center sm:text-left">
              <span>All rights reserved © Shaikly {new Date().getFullYear()}</span>
            </div>

            {/* Center: Usage Policies */}
            <div className="order-2 ">
              <button
                onClick={() => setIsPolicyModalOpen(true)}
                className="text-light/90 hover:text-light transition-colors hover:underline font-medium"
              >
                Refund & Return Policy
              </button>
            </div>

            {/* Right: Social Media */}
            <div className="order-1 sm:order-3 flex gap-2">
              <a
                href="https://www.facebook.com/share/14WU2pUrz3e/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 hover:bg-light/10 rounded-full transition-all"
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-light hover:text-blue-400" />
              </a>
              <a href="https://www.instagram.com/shaiklly?igsh=Y2xzMzYzOGc2dmRm" target="_blank" rel="noopener noreferrer"
                className="p-1.5 hover:bg-light/10 rounded-full transition-all" aria-label="Instagram">
                <Instagram size={18} className="text-light hover:text-pink-400" />
              </a>
              <a href="https://x.com/shaiklly" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-light/10 rounded-full transition-all" aria-label="X">
                <XTwitter size={18} className="text-light hover:text-gray-300" />
              </a>
              <a href="https://www.threads.com/@shaiklly" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-light/10 rounded-full transition-all" aria-label="Threads">
                <Threads size={18} className="text-light hover:text-gray-300" />
              </a>
              <a href="https://www.tiktok.com/@shaiklly?_r=1&_t=ZS-944CFYizA2C" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-light/10 rounded-full transition-all" aria-label="TikTok">
                <TikTok size={18} className="text-light hover:text-pink-300" />
              </a>
              <a href="https://www.snapchat.com/add/shaiklly?share_id=kuGm5OaBOI8&locale=ar-EG" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-light/10 rounded-full transition-all" aria-label="Snapchat">
                <Snapchat size={18} className="text-light hover:text-yellow-300" />
              </a>
            </div>

          </div>
        </div>
      </footer>

      <PolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
      />
    </>
  );
}

export default Footer;