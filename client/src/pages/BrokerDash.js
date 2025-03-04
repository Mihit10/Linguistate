import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

// Mock icons (since we can't use external libraries)
const BudgetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const PropertyTypeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
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

  const [keyDetails, setKeyDetails] = useState({
    budget: '$250,000 - $350,000',
    location: 'Downtown Area',
    propertyType: '2-Bedroom Apartment'
  });

  const [propertySuggestions, setPropertySuggestions] = useState([
    {
      id: 1,
      image: '/api/placeholder/300/200',
      price: '$275,000',
      details: '2 BD | 1,200 sq ft | Modern Kitchen'
    },
    {
      id: 2,
      image: '/api/placeholder/300/200',
      price: '$329,000',
      details: '2 BD | 1,350 sq ft | Balcony View'
    }
  ]);

  const [smartReplySuggestions, setSmartReplySuggestions] = useState([
    "Would you like to schedule a virtual tour?",
    "I have a few properties that match your criteria.",
    "Can you tell me more about your must-have features?"
  ]);

  return (
    <div 
      className="min-h-screen p-4 flex flex-col"
      style={{ 
        backgroundColor: '#F5F7FA',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div className="grid grid-cols-12 gap-4 flex-grow">
        {/* Transcription Section */}
        <div 
          className="col-span-7 bg-white rounded-xl shadow-md p-4 overflow-y-auto"
          style={{ 
            maxHeight: '70vh',
            backgroundColor: '#FFFFFF',
            borderColor: '#2D89FF'
          }}
        >
          <h2 
            className="text-xl font-bold mb-4"
            style={{ color: '#2D89FF' }}
          >
            Real-Time Transcription
          </h2>
          <div className="space-y-3">
            {transcription.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'client' ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className="max-w-[70%] p-3 rounded-xl"
                  style={{
                    backgroundColor: msg.sender === 'client' ? '#F5F7FA' : '#2D89FF',
                    color: msg.sender === 'client' ? '#333333' : 'white'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Details Section */}
        <div className="col-span-5 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle 
                className="text-lg flex items-center"
                style={{ color: '#2D89FF' }}
              >
                <BudgetIcon className="w-6 h-6 mr-2" />
                Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{keyDetails.budget}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle 
                className="text-lg flex items-center"
                style={{ color: '#2D89FF' }}
              >
                <LocationIcon className="w-6 h-6 mr-2" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{keyDetails.location}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle 
                className="text-lg flex items-center"
                style={{ color: '#2D89FF' }}
              >
                <PropertyTypeIcon className="w-6 h-6 mr-2" />
                Property Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{keyDetails.propertyType}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Property Suggestions */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {propertySuggestions.map((property) => (
          <Card key={property.id}>
            <img 
              src={property.image} 
              alt="Property" 
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 
                  className="text-xl font-bold"
                  style={{ color: '#2D89FF' }}
                >
                  {property.price}
                </h3>
                <Button
                  className="flex items-center"
                  style={{
                    backgroundColor: '#27AE60',
                    color: 'white'
                  }}
                >
                  <WhatsAppIcon className="w-5 h-5 mr-2" />
                  Send
                </Button>
              </div>
              <p className="text-sm text-gray-600">{property.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Smart Reply Suggestions */}
      <div 
        className="mt-4 p-4 rounded-xl"
        style={{ 
          backgroundColor: '#FFD166',
          color: '#333333'
        }}
      >
        <h3 
          className="text-lg font-bold mb-3"
          style={{ color: '#2D89FF' }}
        >
          Smart Reply Suggestions
        </h3>
        <div className="space-y-2">
          {smartReplySuggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full text-left justify-start"
              style={{
                backgroundColor: 'white',
                color: '#333333',
                borderColor: '#2D89FF'
              }}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrokerDash;