import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceSelector from '../../features/ImeiSearch/Serviceselector';
import ImeiInput from '../../features/ImeiSearch/Imeiinput';
import SearchButton from '../../features/ImeiSearch/Searchbutton';

import { mockServices } from '../../features/ImeiSearch/Mockservices';
function ImeiChecker() {
  const navigate = useNavigate();
  const [imei, setImei] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  // TODO: Replace with actual auth state from Redux
  const isAuthenticated = true;
  const userBalance = 0; 
  
  const services = mockServices; // TODO: get services from Redux or API

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

    if (!isAuthenticated) {
      // Guest → Redirect to checkout with Kashier
       console.log("Redirecting to Kashier checkout...")
    } else {
      // Logged-in user
      if (userBalance >= selectedService.price) {
        // Sufficient balance → Perform check
        console.log('Performing IMEI check...');
        // TODO: dispatch(performImeiCheck({ imei, serviceId }))
        // navigate(`/result/${result.id}`);
      }else{
        navigate('/add-credit')
      }
    }
  };

  const isSearchDisabled = !selectedService || imei.length !== 15;

  return (
    <div className="  md:py-10  px-4 sm:px-6 lg:px-8">
    
      <div className=" relative">

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100 p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-dark mb-3 tracking-tight">
              Check IMEI / Serial
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Select a service and enter your device details to search.
            </p>
          </div>

       <div className='flex flex-col gap-3'>
          {/* Service Selection */}
          <ServiceSelector
            selectedService={selectedService}
            services={services}
            isOpen={isServiceDropdownOpen}
            onToggle={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
            onSelect={setSelectedService}
            onClose={() => setIsServiceDropdownOpen(false)}
          />

          {/* IMEI Input */}
          <ImeiInput
            value={imei}
            onChange={handleImeiChange}
          />

          {/* Search Button */}
          <SearchButton
            onClick={handleSearchClick}
            disabled={isSearchDisabled}
            selectedServicePrice={selectedService?.price}
          />
       </div>


        </div>
      </div>
    </div>
  );
}

export default ImeiChecker;