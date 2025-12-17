import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ChevronDown, Search, CreditCard, LogOut, Settings, Menu, X, Wallet } from 'lucide-react';

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // TODO: Replace with actual auth state from Redux
  const isAuthenticated =true; // Change to false to test guest view
  const user = {
    name: 'Ahmed Mohamed',
    balance: 150.50,
    role: 'admin' // or 'user'
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out...');
  };

  return (
    <>
    
    <nav className="absolute md:sticky top-0 left-0 right-0 z-50 bg-white/95 md:bg-white backdrop-blur-sm md:backdrop-blur-none border-b border-gray-200 md:shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-[#181818] p-2 rounded-lg group-hover:bg-[#073e1d] transition-colors">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#e5fb34]" />
            </div>
            <span className="text-lg md:text-xl font-bold text-[#181818]">IMEI Check</span>
          </Link>

          {/* Desktop: Guest View */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-3">
              <button className="px-6 py-2 text-sm font-bold bg-[#e5fb34] text-[#181818] rounded-lg hover:bg-[#d4ea23] transition-all shadow-md hover:shadow-lg">
                Login
              </button>
            </div>
          )}

          {/* Desktop: User View */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-4">
              {/* Balance Display */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                <Wallet className="w-4 h-4 text-[#073e1d]" />
                <span className="text-sm font-semibold text-[#181818]">
                  {user.balance.toFixed(2)} EGP
                </span>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                >
                  <div className="w-8 h-8 bg-[#073e1d] rounded-full flex items-center justify-center">
                    <span className="text-[#e5fb34] text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#181818]">{user.name}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsDropdownOpen(false)}
                    ></div>

                    {/* Dropdown Content */}
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                      <Link
                        to="/search-history"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Search className="w-4 h-4 text-[#073e1d]" />
                        <span>Search History</span>
                      </Link>

                      <Link
                        to="/payment-history"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <CreditCard className="w-4 h-4 text-[#073e1d]" />
                        <span>Payment History</span>
                      </Link>

                      <Link
                        to="/add-credit"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Wallet className="w-4 h-4 text-[#073e1d]" />
                        <span>Add Credit</span>
                      </Link>

                      <div className="my-2 border-t border-gray-200"></div>

                      {/* Admin Link - Only for admin users */}
                      {user.role === 'admin' && (
                        <>
                          <Link
                            to="/admin"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <Settings className="w-4 h-4 text-[#073e1d]" />
                            <span>Admin Panel</span>
                          </Link>
                          <div className="my-2 border-t border-gray-200"></div>
                        </>
                      )}

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#181818] hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          {/* Mobile Header */}
          <div className="flex justify-between items-center h-16 px-4 border-b border-gray-200">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-[#181818] p-2 rounded-lg">
                <Shield className="w-5 h-5 text-[#e5fb34]" />
              </div>
              <span className="text-lg font-bold text-[#181818]">IMEI Check</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#181818] hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Mobile Menu Content */}
          <div className="px-4 py-6 space-y-4 overflow-y-auto bg-white shadow-md ">
            {/* Mobile: Guest View */}
            {!isAuthenticated && (
              <button className="w-full px-4 py-3 text-sm font-bold bg-[#e5fb34] text-[#181818] rounded-lg hover:bg-[#d4ea23] transition-all shadow-md">
                Login
              </button>
            )}

            {/* Mobile: User View */}
            {isAuthenticated && (
              <>
                {/* User Info Card */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#073e1d] rounded-full flex items-center justify-center">
                      <span className="text-[#e5fb34] text-lg font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#181818]">{user.name}</p>
                      {user.role === 'admin' && (
                        <span className="text-xs text-[#073e1d] font-medium">Admin</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200">
                    <Wallet className="w-4 h-4 text-[#073e1d]" />
                    <span className="text-sm font-semibold text-[#181818]">
                      Balance: {user.balance.toFixed(2)} EGP
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    to="/search-history"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Search className="w-5 h-5 text-[#073e1d]" />
                    <span>Search History</span>
                  </Link>

                  <Link
                    to="/payment-history"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <CreditCard className="w-5 h-5 text-[#073e1d]" />
                    <span>Payment History</span>
                  </Link>

                  <Link
                    to="/add-credit"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Wallet className="w-5 h-5 text-[#073e1d]" />
                    <span>Add Credit</span>
                  </Link>

                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="w-5 h-5 text-[#073e1d]" />
                      <span>Admin Panel</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
    </>
  );
}

export default NavBar;