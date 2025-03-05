import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../components/ui/Card';
import { Button } from '../components/ui/Button';
// import { Calendar } from '../components/ui/Calendar';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/TextArea';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import Markdown from 'react-markdown'

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`w-6 h-6 text-[#5D4037] ${className}`}
  >
    <path d="M17.472 14.382c-.468-.342-.97-.623-1.277-.84a14.576 14.576 0 0 1-1.563-1.151c-.495-.422-.739-1.004-.739-1.602 0-.598.244-1.18.739-1.602a14.58 14.58 0 0 1 1.563-1.151c.307-.217.809-.498 1.277-.84.207-.151.472-.172.692-.051.219.121.365.363.365.625v6.719c0 .262-.146.504-.365.625-.22.121-.485.1-.692-.051zM24 12c0 6.627-5.373 12-12 12-2.175 0-4.238-.577-6.024-1.623L0 24l2.717-7.529A11.87 11.87 0 0 1 12 0c6.627 0 12 5.373 12 12zm-12 1h-2v2h2v-2zm2-4.5C14 7.015 12.985 6 11.5 6S9 7.015 9 8.5V9h2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5v1h-1a1.5 1.5 0 0 0-1.5 1.5V12h4v-1.5a1.5 1.5 0 0 0-1.5-1.5z"/>
  </svg>
);

// Custom Close Icon Component
const CloseIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`w-6 h-6 ${className}`}
  >
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

// Custom Check Icon Component
const CheckIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`w-6 h-6 ${className}`}
  >
    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
  </svg>
);

// Sample input data
const initialCallData = {
  clientName: "Gargi",
  clientBackground: "Young professional looking to invest in real estate, interested in first-time homebuyer programs",
  discussedProducts: [
    "First-time homebuyer mortgage",
    "Investment property loan"
  ],
  clientPreferences: {
    budget: "₹1.5cr - ₹2cr",
    preferredLocations: ["Downtown", "Suburban areas"],
    timeframe: "6-12 months"
  }
};

const Summarizer = () => {
  const [callData, setCallData] = useState(initialCallData);
  const [selectedDate, setSelectedDate] = useState(dayjs()); 
  const [selectedTime, setSelectedTime] = useState('');
  const [followupMessage, setFollowupMessage] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [value, setValue] = React.useState(dayjs('2022-04-17'));

  // AI-generated summary function (simulated)
  const SummaryComponent = () => (
    <div className="w-full">
      <div className="mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">📌 ब्रोकर के लिए त्वरित सारांश</h2>
        <div className="markdown">
          
          <h3 className="text-xl font-semibold text-blue-800 mb-3">ग्राहक की आवश्यकताएं</h3>
          <ul className="list-disc pl-5 mb-4 text-gray-700">
            <li> <strong>संपत्ति का प्रकार:</strong> घर</li>
            <li> <strong>स्थान प्राथमिकता:</strong> मलाड</li>
            <li> <strong>बजट सीमा:</strong> दो करोड़</li>
            <li> <strong>आकार प्राथमिकता:</strong> दो या तीन कमरे</li>
          </ul>
  
          <h3 className="text-xl font-semibold text-blue-800 mb-3">ग्राहक की रुचि और चिंताएं</h3>
          <ul className="list-disc pl-5 mb-4 text-gray-700">
            <li> मलाड में संपत्ति में रुचि</li>
          </ul>
  
          <h3 className="text-xl font-semibold text-blue-800 mb-3">अंतिम निर्णय और कार्रवाई आइटम</h3>
          <ul className="list-disc pl-5 mb-4 text-gray-700">
            <li>✅ <strong>ग्राहक साइट पर आना चाहता है?</strong> हाँ (दिनांक: शुक्रवार, रविवार को 2 बजे मिलने का समय था लेकिन ब्रोकर की बहन की शादी के कारण शुक्रवार को मिलने की बात हुई)</li>
            <li>✅ <strong>अगली फॉलो-अप तिथि:</strong> शुक्रवार</li>
            <li>✅ <strong>अतिरिक्त जानकारी आवश्यक:</strong> कोई नहीं</li>
          </ul>
        </div>
      </div>
    </div>
  );
  
  

  // WhatsApp message generator
  const generateWhatsAppMessage = () => {
    return `Hi ${callData.clientName}, following up on our recent discussion about your home buying journey. I've prepared some initial insights on first-time homebuyer programs. When would be a good time to review these details?`;
  };

  const handleMarkAsCompleted = () => {
    setIsCompleted(true);
  };

  return (
    <div className="bg-[#D7CCC8] min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* AI Summary Card */}
        <Card className="bg-[#EFEBE9] shadow-lg border-[#795548] border">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#3E2723]">
              Call Summary: {callData.clientName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <pre className="whitespace-pre-wrap text-[#4E342E]"><Markdown>{generateSummary()}</Markdown></pre> */}
            <SummaryComponent />
          </CardContent>
        </Card>

        {/* Follow-up Scheduler */}
        <Card className="bg-[#EFEBE9] shadow-lg border-[#795548] border w-full max-w-md mx-auto">
  <CardHeader>
    <CardTitle className="text-xl font-semibold text-[#3E2723] text-center">
      Follow-up Scheduler
    </CardTitle>
  </CardHeader>
  <CardContent className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
    <div className="w-full md:w-1/2">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={(newValue) => {
            setValue(newValue);
            setSelectedDate(newValue);
          }}
          className="w-full"
          sx={{
            '& .MuiPickersCalendarHeader-root': {
              color: '#3E2723',
            },
            '& .MuiDayCalendar-weekContainer': {
              justifyContent: 'center',
            },
            '& .MuiButtonBase-root': {
              color: '#3E2723',
            },
            '& .Mui-selected': {
              backgroundColor: '#795548 !important',
              color: '#EFEBE9 !important',
            }
          }}
        />
      </LocalizationProvider>
    </div>
    <div className="w-full md:w-1/2 flex flex-col space-y-4">
      <Input 
        type="time" 
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        className="w-full border-[#795548] focus:border-[#795548] focus:ring-[#795548]"
      />
      <Button 
        variant="outline" 
        className="w-full bg-[#BCAAA4] text-[#3E2723] hover:bg-[#A1887F] transition-colors duration-300"
      >
        Schedule Reminder
      </Button>
    </div>
  </CardContent>
</Card>

        {/* WhatsApp Follow-up */}
        <Card className="bg-[#EFEBE9] shadow-lg border-[#795548] border">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#3E2723] flex items-center">
              <WhatsAppIcon className="mr-2" /> WhatsApp Follow-up
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={followupMessage || generateWhatsAppMessage()}
              onChange={(e) => setFollowupMessage(e.target.value)}
              className="w-full min-h-[120px] border-[#795548]"
            />
            <Button 
              variant="outline" 
              className="w-full bg-[#BCAAA4] text-[#3E2723] hover:bg-[#A1887F]"
            >
              Send WhatsApp Message
            </Button>
          </CardContent>
        </Card>

        {/* Completion Actions */}
        <div className="flex space-x-4">
          <Button 
            variant="destructive" 
            className="flex-1 bg-[#FFCDD2] text-[#B71C1C] hover:bg-[#FFEBEE]"
            onClick={() => setIsCompleted(false)}
          >
            <CloseIcon className="mr-2 text-[#B71C1C]" /> Cancel
          </Button>
          <Button 
            variant="default" 
            className="flex-1 bg-[#C8E6C9] text-[#1B5E20] hover:bg-[#E8F5E9]"
            onClick={handleMarkAsCompleted}
          >
            <CheckIcon className="mr-2 text-[#1B5E20]" /> 
            {isCompleted ? 'Case Closed' : 'Mark as Completed'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Summarizer;