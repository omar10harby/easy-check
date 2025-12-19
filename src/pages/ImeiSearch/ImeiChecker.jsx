import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Smartphone, AlertCircle, CheckCircle, Zap, Shield, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function ImeiChecker() {
  const navigate = useNavigate();
  const [imei, setImei] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  // TODO: Replace with actual auth state and services from Redux
  const isAuthenticated = true;
  const userBalance = 0; // Change to test insufficient balance
  
  const services = [
    {
      id: 1,
      name: 'iPhone Official Unlock (Global)',
      icon: '📱',
      time: '1-24 Hours',
      success: '99%',
      price: 50.00,
      features: ['iCloud Status', 'Carrier Info', 'Warranty Check']
    },
    {
      id: 2,
      name: 'Samsung FRP Unlock',
      icon: '📲',
      time: '2-48 Hours',
      success: '95%',
      price: 35.00,
      features: ['FRP Status', 'Network Lock', 'Model Details']
    },
    {
      id: 3,
      name: 'Universal IMEI Check',
      icon: '🔍',
      time: 'Instant',
      success: '100%',
      price: 20.00,
      features: ['Blacklist Status', 'Basic Info', 'Fast Results']
    }
  ];

  const handleImeiChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only numbers
    if (value.length <= 15) {
      setImei(value);
    }
  };

  const handleSearchClick = () => {
    if (!selectedService) {
      alert('Please select a service');
      return;
    }
    if (imei.length !== 15) {
      alert('IMEI must be exactly 15 digits');
      return;
    }

    // Logic from checklist: Day 11
    if (!isAuthenticated) {
      // Guest → Redirect to checkout
      navigate('/checkout', { state: { imei, serviceId: selectedService.id } });
    } else {
      // Logged-in user
      if (userBalance >= selectedService.price) {
        // Sufficient balance → Perform check
        console.log('Performing IMEI check...');
        // TODO: dispatch(performImeiCheck({ imei, serviceId }))
        // navigate(`/result/${result.id}`);
      } else {
        // Insufficient balance → Redirect to checkout
        navigate('/checkout', { state: { imei, serviceId: selectedService.id } });
      }
    }
  };

  const insufficientBalance = isAuthenticated && selectedService && userBalance < selectedService.price;

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decoration - Same as Homepage */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#e5fb34] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-[#073e1d] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#e5fb34] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-2xl mx-auto relative">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#073e1d] transition-colors font-medium">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#181818] font-semibold">New Search</span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-[#181818] mb-3 tracking-tight">
              Check IMEI / Serial
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Select a service and enter your device details to search.
            </p>
          </div>

          {/* Service Selection */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-[#181818] mb-3">
              Service
            </label>
            <div className="relative">
              <button
                onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl hover:border-[#e5fb34] transition-all focus:outline-none focus:border-[#e5fb34] focus:ring-4 focus:ring-[#e5fb34]/20"
              >
                {selectedService ? (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedService.icon}</span>
                    <div className="text-left">
                      <p className="font-bold text-[#181818]">{selectedService.name}</p>
                      <p className="text-xs text-gray-500">
                        Time: {selectedService.time} • Success: {selectedService.success}
                      </p>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 font-medium">Select a service</span>
                )}
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isServiceDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsServiceDropdownOpen(false)}
                  ></div>
                  <div className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => {
                          setSelectedService(service);
                          setIsServiceDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 text-left"
                      >
                        <span className="text-2xl">{service.icon}</span>
                        <div className="flex-1">
                          <p className="font-bold text-[#181818]">{service.name}</p>
                          <p className="text-xs text-gray-500">
                            Time: {service.time} • Success: {service.success}
                          </p>
                        </div>
                        <span className="font-bold text-[#073e1d]">{service.price.toFixed(2)} EGP</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* IMEI Input */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-[#181818] mb-3">
              IMEI Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={imei}
                onChange={handleImeiChange}
                placeholder="356938035664380"
                className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl font-mono text-lg tracking-widest text-gray-400 focus:text-[#181818] focus:outline-none focus:border-[#e5fb34] focus:ring-4 focus:ring-[#e5fb34]/20 transition-all"
                maxLength={15}
              />
              <span className="absolute right-4 bottom-4 text-xs font-semibold text-gray-400">
                {imei.length}/15
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <Info className="w-4 h-4" />
              <span className="text-right flex-1">للحصول على IMEI اطلب #06#*</span>
            </div>
          </div>

          {/* Insufficient Balance Warning */}
          {insufficientBalance && (
            <div className="mb-6 flex items-start gap-3 px-5 py-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-[#181818] text-sm mb-1">Insufficient Balance</p>
                <p className="text-sm text-gray-600">
                  Your current balance is {userBalance.toFixed(2)} EGP. You need {selectedService.price.toFixed(2)} EGP.
                </p>
              </div>
              <Link
                to="/add-credit"
                className="text-sm font-bold text-[#181818] underline hover:text-[#073e1d] transition-colors whitespace-nowrap"
              >
                Add Funds
              </Link>
            </div>
          )}

          {/* Search Button */}
          <button
            onClick={handleSearchClick}
            disabled={!selectedService || imei.length !== 15}
            className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-[#073e1d] hover:bg-[#0a5428] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black text-lg rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:hover:scale-100"
          >
            <span>Search Now</span>
            {selectedService && (
              <>
                <span className="text-[#e5fb34]">|</span>
                <span className="text-[#e5fb34]">{selectedService.price.toFixed(2)} EGP</span>
              </>
            )}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">Official Source</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">Instant Result</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">Secure Check</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImeiChecker;