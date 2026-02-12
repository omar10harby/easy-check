



function Footer() {
  return (
    <footer className="border-t border-dark-bg/50 py-4 sm:py-6 px-4 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center gap-3 sm:gap-8 text-[10px] sm:text-sm text-light">
          {/* Copyright */}
          <span className="font-medium ">All rights reserved © Shaikly {new Date().getFullYear()}  </span>

          {/* Brands */}

        </div>
      </div>
    </footer>
  );
}

export default Footer;