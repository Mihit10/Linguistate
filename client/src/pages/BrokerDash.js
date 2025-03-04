import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

// SVG Icons
const BudgetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const PropertyTypeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const SummaryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
    <line x1="8" y1="16" x2="16" y2="16"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.669.15-.197.297-.768.966-.941 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.608.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.085 12.085 0 0 0-.574-.01c-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.214 3.074.149.198 2.096 3.2 5.078 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.005-1.413.247-.694.247-1.289.172-1.413-.075-.124-.272-.198-.57-.347m-5.421 7.421h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.232-.375a9.861 9.861 0 0 1-1.516-5.26c0-5.445 4.418-9.863 9.862-9.863 2.645 0 5.131 1.03 7 2.898a9.825 9.825 0 0 1 2.863 7c0 5.445-4.418 9.863-9.863 9.863m8.382-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const BrokerDash = () => {
  const [transcription, setTranscription] = useState([
    { id: 1, text: "Hi there, I'm looking for a 2-bedroom apartment.", sender: 'client' },
    { id: 2, text: "Great! Can you tell me more about your budget and preferred location?", sender: 'broker' }
  ]);

  const customerCriteria = [
    { icon: <BudgetIcon />, text: "Budget: ₹50L - ₹1Cr" },
    { icon: <LocationIcon />, text: "Preferred Locality: Andheri, Mumbai" },
    { icon: <PropertyTypeIcon />, text: "Property Type: 2BHK Apartment" },
    { icon: <BudgetIcon />, text: "Rent: ₹30K - ₹50K/month" },
    { icon: <LocationIcon />, text: "Nearby Schools & Markets Required" }
  ];

  const [propertySuggestions, setPropertySuggestions] = useState([
    {
      id: 1,
      image: '/api/placeholder/300/200',
      price: '₹75 Lakhs',
      details: '2 BHK | 1,200 sq ft | Modern Kitchen'
    },
    {
      id: 2,
      image: '/api/placeholder/300/200',
      price: '₹92 Lakhs',
      details: '2 BHK | 1,350 sq ft | Balcony View'
    },
    {
      id: 3,
      image: '/api/placeholder/300/200',
      price: '₹85 Lakhs',
      details: '2 BHK | 1,100 sq ft | Terrace Access'
    },
    {
      id: 4,
      image: '/api/placeholder/300/200',
      price: '₹1.05 Cr',
      details: '2 BHK | 1,500 sq ft | Premium Amenities'
    }
  ]);

  return (
    <div 
      className="min-h-screen p-6 bg-[#F5F0E6] flex flex-col"
      style={{ 
        fontFamily: "'Inter', sans-serif",
        position: 'relative'
      }}
    >
      <style>{`
        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 4));
          }
        }
        .carousel-container {
         width: 115vw; /* Full viewport width */
          margin-left: calc(-50vw + 50%); /* Center the carousel */
          margin-right: calc(-50vw + 50%);
          overflow: hidden;
        }
        .cards-section {
          margin: 0;
          padding: 20px 0;
          display: flex;
          animation: carousel 20s linear infinite;
        }
        .card {
          flex: 0 0 300px;
          margin-right: 20px;
        }
        .carousel-container:hover .cards-section {
          animation-play-state: paused;
        }
      `}</style>

      <div className="grid grid-cols-12 gap-6 flex-grow">
        {/* Left Side: Real-Time Chat */}
        <div className="col-span-8 grid grid-rows-2 gap-6">
          {/* Transcription Section */}
          <Card 
            className="bg-white shadow-lg rounded-xl overflow-hidden"
            style={{ borderColor: '#8B4513' }}
          >
            <CardHeader 
              className="bg-[#D2B48C] text-[#5D4037] p-4"
            >
              <CardTitle className="text-xl font-bold">
                Real-Time Transcription
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 overflow-y-auto max-h-[300px]">
              <div className="space-y-3">
                {transcription.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'client' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div 
                      className="max-w-[70%] p-3 rounded-xl"
                      style={{
                        backgroundColor: msg.sender === 'client' ? '#F5F0E6' : '#8B4513',
                        color: msg.sender === 'client' ? '#5D4037' : 'white'
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Property Suggestions Carousel */}
          <div className="carousel-container">
            <div className="cards-section">
              {[...propertySuggestions, ...propertySuggestions].map((property, index) => (
                <Card 
                  key={index} 
                  className="card bg-white shadow-lg rounded-xl overflow-hidden"
                >
                  <img 
                    src={property.image} 
                    alt="Property" 
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 
                        className="text-xl font-bold"
                        style={{ color: '#8B4513' }}
                      >
                        {property.price}
                      </h3>
                      <Button
                        className="bg-[#27AE60] text-white"
                      >
                        Send Details
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">{property.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Customer Preferences */}
        <div className="col-span-4">
          <Card 
            className="bg-white shadow-lg rounded-xl mb-6"
            style={{ borderColor: '#8B4513' }}
          >
            <CardHeader 
              className="bg-[#D2B48C] text-[#5D4037] p-4"
            >
              <CardTitle className="text-xl font-bold">
                Customer Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-3">
                {customerCriteria.map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-center gap-3 text-[#5D4037]"
                  >
                    <span className="text-[#8B4513]">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section: Calendar and Conversation Summary */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Meeting Scheduler */}
        <Card 
          className="bg-white shadow-lg rounded-xl"
          style={{ borderColor: '#8B4513' }}
        >
          <CardHeader 
            className="bg-[#D2B48C] text-[#5D4037] p-4 flex items-center"
          >
            <CalendarIcon className="mr-3 text-[#8B4513]" />
            <CardTitle className="text-xl font-bold">
              Schedule Meeting
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div 
                  key={day} 
                  className="p-2 rounded hover:bg-[#D2B48C] cursor-pointer"
                >
                  {day}
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-4 bg-[#8B4513] text-white"
            >
              Book Slot
            </Button>
          </CardContent>
        </Card>

        {/* Conversation Summary */}
        <Card 
          className="bg-white shadow-lg rounded-xl"
          style={{ borderColor: '#8B4513' }}
        >
          <CardHeader 
            className="bg-[#D2B48C] text-[#5D4037] p-4 flex items-center"
          >
            <SummaryIcon className="mr-3 text-[#8B4513]" />
            <CardTitle className="text-xl font-bold">
              Conversation Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <textarea 
              className="w-full h-40 p-2 border rounded"
              placeholder="Auto-generated summary will appear here..."
              style={{ 
                backgroundColor: '#F5F0E6',
                borderColor: '#8B4513',
                color: '#5D4037'
              }}
            />
            <Button 
              className="w-full mt-4 bg-[#8B4513] text-white"
            >
              Generate Summary
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrokerDash;