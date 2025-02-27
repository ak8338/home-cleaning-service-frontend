// src/pages/Booking.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';

function Booking() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialService = queryParams.get('service') || '';

  const [selectedService, setSelectedService] = useState(initialService);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showBanner, setShowBanner] = useState(false); // Track if the banner is visible

  const serviceOptions = [
    'Basic Cleaning',
    'Deep Cleaning',
    'Move-In/Move-Out Cleaning',
  ];

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Display the success banner when booking is placed
    setShowBanner(true);

    // Optionally, hide the banner after a few seconds
    setTimeout(() => {
      setShowBanner(false);
    }, 1000); // Banner will disappear after 5 seconds
  };

  return (
    <div className="booking-container">
      {showBanner && (
        <div className="success-banner">
          Order placed successfully!
        </div>
      )}
      
      <h2>Book Your Cleaning Service</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        
        {/* Full Name */}
        <label htmlFor="full-name">Full Name</label>
        <input
          type="text"
          id="full-name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        
        {/* Phone Number */}
        <label htmlFor="phone-number">Phone Number</label>
        <input
          type="tel"
          id="phone-number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="123-456-7890"
          required
        />
        
        {/* Address */}
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        
        {/* Service Type Dropdown */}
        <label htmlFor="service-type">Select Service Type</label>
        <select
          id="service-type"
          value={selectedService}
          onChange={handleServiceChange}
          required
        >
          <option value="">Choose a service</option>
          {serviceOptions.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        
        {/* Date and Time Picker */}
        <label htmlFor="date">Select Date and Time</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          required
        />

        {/* Submit Button */}
        <button type="submit" className="submit-button">Proceed to Booking</button>
      </form>
    </div>
  );
}

export default Booking;
