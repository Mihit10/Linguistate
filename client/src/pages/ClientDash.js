import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';
import { Textarea } from '../components/ui/TextArea';

// Custom AI Chat Icon
const AIChatIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`w-12 h-12 text-[#5D4037] ${className}`}
  >
    <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.935-1.237c.542.418 1.195.237 1.677-.083a5.991 5.991 0 002.135-3.374c.267-.18.49-.443.633-.745.579-1.059.935-2.246.935-3.545 0-3.942-3.134-7.136-7-7.136s-7 3.194-7 7.136c0 1.302.362 2.495.935 3.545.145.302.367.565.633.745a5.986 5.986 0 002.134 3.374c.482.32 1.135.501 1.677.083zM12 18.23c-1.247-1.015-2-2.515-2-4.23 0-2.485 1.79-4.5 4-4.5s4 2.015 4 4.5c0 1.715-.753 3.215-2 4.23V21a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2.77z" clipRule="evenodd" />
  </svg>
);

// Custom Star Icon
const StarIcon = ({ filled, className, onClick }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={filled ? "#5D4037" : "none"}
    stroke="#5D4037"
    strokeWidth="2"
    className={`w-6 h-6 cursor-pointer ${className}`}
    onClick={onClick}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

const ClientDash = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    location: '',
    type: '',
    budgetMin: '',
    budgetMax: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    notes: ''
  });
  const [savedConversations, setSavedConversations] = useState([]);
  const [starredProperties, setStarredProperties] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addProperty = () => {
    if (newProperty.location && newProperty.type) {
      const propertyWithId = {
        ...newProperty,
        id: Date.now()
      };
      setProperties([...properties, propertyWithId]);
      setNewProperty({
        location: '',
        type: '',
        budgetMin: '',
        budgetMax: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        notes: ''
      });
    }
  };

  const toggleStarProperty = (propertyId) => {
    setStarredProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const saveConversation = (property) => {
    setSavedConversations(prev => [...prev, {
      ...property,
      timestamp: new Date().toLocaleString()
    }]);
  };

  return (
    <div className="bg-[#D7CCC8] min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Property Requirements Form */}
        <Card className="bg-[#EFEBE9] shadow-lg border-[#795548] border">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-2xl font-bold text-[#3E2723]">
              Property Requirements
            </CardTitle>
            <div className="relative group">
              <AIChatIcon className="hover:scale-110 transition-transform" />
              <div className="absolute hidden group-hover:block bg-[#BCAAA4] text-[#3E2723] p-2 rounded-lg shadow-lg -top-16 left-1/2 transform -translate-x-1/2">
                Need help? Ask our AI assistant!
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Select 
                value={newProperty.location} 
                onValueChange={(value) => setNewProperty(prev => ({...prev, location: value}))}
              >
                <SelectTrigger className="w-full border-[#795548]">
                  <SelectValue placeholder="Preferred Location" />
                </SelectTrigger>
                <SelectContent>
                  {['Downtown', 'Suburbs', 'Beachfront', 'City Center'].map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={newProperty.type} 
                onValueChange={(value) => setNewProperty(prev => ({...prev, type: value}))}
              >
                <SelectTrigger className="w-full border-[#795548]">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  {['Apartment', 'House', 'Condo', 'Villa'].map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex space-x-2">
                <Input 
                  type="number" 
                  placeholder="Budget Min" 
                  name="budgetMin"
                  value={newProperty.budgetMin}
                  onChange={handleInputChange}
                  className="border-[#795548]"
                />
                <Input 
                  type="number" 
                  placeholder="Budget Max" 
                  name="budgetMax"
                  value={newProperty.budgetMax}
                  onChange={handleInputChange}
                  className="border-[#795548]"
                />
              </div>

              <Input 
                placeholder="Contact Name" 
                name="contactName"
                value={newProperty.contactName}
                onChange={handleInputChange}
                className="border-[#795548]"
              />
              <Input 
                placeholder="Phone Number" 
                name="contactPhone"
                value={newProperty.contactPhone}
                onChange={handleInputChange}
                className="border-[#795548]"
              />
              <Input 
                type="email" 
                placeholder="Email" 
                name="contactEmail"
                value={newProperty.contactEmail}
                onChange={handleInputChange}
                className="border-[#795548]"
              />
              <Textarea 
                placeholder="Additional Notes" 
                name="notes"
                value={newProperty.notes}
                onChange={handleInputChange}
                className="col-span-2 border-[#795548]"
              />
              <Button 
                onClick={addProperty}
                className="col-span-2 bg-[#BCAAA4] text-[#3E2723] hover:bg-[#A1887F]"
              >
                Add Property Requirement
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Property List */}
        <Card className="bg-[#EFEBE9] shadow-lg border-[#795548] border">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#3E2723]">
              My Property Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {properties.map((property) => (
              <div 
                key={property.id} 
                className="flex justify-between items-center p-4 border-b border-[#795548]"
              >
                <div>
                  <div className="font-bold text-[#3E2723]">
                    {property.location} - {property.type}
                  </div>
                  <div className="text-[#4E342E]">
                    Budget: ${property.budgetMin} - ${property.budgetMax}
                  </div>
                  <div className="text-[#4E342E]">
                    Contact: {property.contactName}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <StarIcon 
                    filled={starredProperties.includes(property.id)}
                    onClick={() => toggleStarProperty(property.id)}
                  />
                  <Button 
                    variant="outline"
                    className="bg-[#BCAAA4] text-[#3E2723] hover:bg-[#A1887F]"
                    onClick={() => saveConversation(property)}
                  >
                    Save Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Saved Conversations */}
        <Card className="bg-[#EFEBE9] shadow-lg border-[#795548] border">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#3E2723]">
              Saved Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {savedConversations.map((conversation, index) => (
              <div 
                key={index} 
                className="p-4 border-b border-[#795548]"
              >
                <div className="flex justify-between">
                  <div className="font-bold text-[#3E2723]">
                    {conversation.location} - {conversation.type}
                  </div>
                  <div className="text-[#4E342E] text-sm">
                    {conversation.timestamp}
                  </div>
                </div>
                <div className="text-[#4E342E]">
                  Notes: {conversation.notes || 'No additional notes'}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDash;