import json
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini API Key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def summarize_conversation_client(conversations, broker_language, client_language):
    requiredLang = client_language
    # Step 1: Split messages by sender
    broker_msgs = []
    client_msgs = []

    for msg in conversations:
        if msg["sender"] == "client":  # Assuming "client" is the customer
            client_msgs.append(msg["text"])
        else:
            broker_msgs.append(msg["text"])

    # Step 2: Prepare structured prompt
    agent_prompt = f"""
### Task:
Summarize the conversation **strictly based on the content**. Do not add or assume anything.  
- The **broker** speaks in {broker_language}.  
- The **client** speaks in {client_language}.  
- Generate the summary in strictly **{requiredLang}** language.
- ** all the details of the conversation, including the property type, location, price, and requirements shall be in {requiredLang} language. **

### **Conversation Details**  
#### **🔹 Broker’s Messages:**  
{chr(10).join(broker_msgs)}

#### **🔹 Client’s Messages:**  
{chr(10).join(client_msgs)}

---

### **Summary Format:**  
1️⃣ **Bullet points** for key discussion topics.  
2️⃣ **Table format** for property details, price, and requirements.  
3️⃣ **Next steps** if any actions were discussed.  

🚫 **Do not add any extra details. Stick strictly to the conversation content.**  

---

### **📌 Key Discussion Points**  
- 🔹 [Summarized point from conversation]  
- 🔹 [Summarized point from conversation]  
- 🔹 [Summarized point from conversation]  

---

### **🏡 Property Details these titles in {requiredLang} as well**  
| Feature         | Details  |
|---------------|---------|
| 🏠 Property Type | [Apartment/Villa/etc.] |
| 📍 Location | [Location mentioned] |
| 💰 Price | [Mentioned price] |
| 📏 Size | [Mentioned size] |
| 🏗️ Status | [Under Construction/Ready to Move] |

---

### **📋 Next Steps (If Discussed)**  
- ✅ [Action item discussed]  
- ✅ [Action item discussed]  

🚫 **Only include what is explicitly stated in the conversation.**
"""

    # Step 3: Generate summary using Google Gemini
    model = genai.GenerativeModel("gemini-1.5-pro-latest")  # Using Gemini Pro model
    response = model.generate_content(agent_prompt)
    print('model used')

    # Step 4: Return formatted summary
    return response.text


def summarize_conversation_broker(conversations, broker_language, client_language):
    requiredLang = broker_language
    # Step 1: Split messages by sender
    broker_msgs = []
    client_msgs = []

    for msg in conversations:
        if msg["sender"] == "client":  # Assuming "client" is the customer
            client_msgs.append(msg["text"])
        else:
            broker_msgs.append(msg["text"])

    # Step 2: Prepare structured prompt
    agent_prompt = f"""
### 🔹 Task: Generate a Broker-Focused Summary  
Summarize the conversation **strictly based on content**. **Do not add or assume anything.**  

- **Broker Language:** {broker_language}  
- **Client Language:** {client_language}  
- **Generate Summary in:** {requiredLang}  
- ** all the details of the conversation, including the property type, location, price, and requirements shall be in {requiredLang} language. **

📌 **Broker’s Priority:** Highlight property details, client preferences, and required actions.  

---

### **📞 Conversation Details**  
#### **🔹 Broker’s Messages:**  
{chr(10).join(broker_msgs)}  

#### **🔹 Client’s Messages:**  
{chr(10).join(client_msgs)}  

---

### **📌 Quick Summary for Broker**  
1️⃣ **Client’s Requirements**  
- 🔹 **Property Type:** [Apartment/Villa/etc.]  
- 🔹 **Location Preference:** [Client’s preferred location]  
- 🔹 **Budget Range:** [Mentioned budget]  
- 🔹 **Size Preference:** [Mentioned size]  
- 🔹 **Other Preferences:** [Specific features if mentioned]  

2️⃣ **Client’s Interest & Concerns**  
- 🔹 **Interested in [Property Name/Type] at [Location]**  
- 🔹 **Concerns:** [Any objections/questions client raised]  

3️⃣ **Final Decision & Action Items**  
- ✅ **Client wants a site visit?** [Yes/No] (Date: [If mentioned])  
- ✅ **Next Follow-up Date:** [If discussed]  
- ✅ **Additional Info Required:** [Any pending details the broker needs to provide]  

🚫 **Strictly summarize what was discussed—no assumptions.**
"""
    # Step 3: Generate summary using Google Gemini
    model = genai.GenerativeModel("gemini-2.0-flash")  # Using Gemini Pro model
    response = model.generate_content(agent_prompt)
    print('model used')

    # Step 4: Return formatted summary
    return response.text



# Example usage
json_data = [{
  "_id": {
    "$oid": "67c80319e4ecbfe6ada08d53"
  },
  "room": "256545",
  "sender": "client",
  "text": "हेलो कैसे हो आप",
  "textEnglish": "Hello how are you",
  "language": "hi-IN",
  "timestamp": {
    "$date": "2025-03-05T07:54:01.605Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c80321e4ecbfe6ada08d55"
  },
  "room": "256545",
  "sender": "broker",
  "text": "હું એકદમ મજામાં તમે કેમ છો",
  "textEnglish": "I am enjoying a lot how are you",
  "language": "gu-IN",
  "timestamp": {
    "$date": "2025-03-05T07:54:09.465Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c8032de4ecbfe6ada08d57"
  },
  "room": "256545",
  "sender": "broker",
  "text": "નયા પ્રોપર્ટી મિલા હૈ",
  "textEnglish": "New Property Found",
  "language": "gu-IN",
  "timestamp": {
    "$date": "2025-03-05T07:54:21.463Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c8032de4ecbfe6ada08d59"
  },
  "room": "256545",
  "sender": "broker",
  "text": "? મેં ભી બઢિયા મેને સુના હૈ આપકો છાને મેં",
  "textEnglish": "મેં ભી બઢિયા મેને સુના હૈ આપકો છાને મેં",
  "language": "en-IN",
  "timestamp": {
    "$date": "2025-03-05T07:54:21.698Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c80339e4ecbfe6ada08d5b"
  },
  "room": "256545",
  "sender": "client",
  "text": "नया फ्लैट मिला है",
  "textEnglish": "Got a new flat",
  "language": "hi-IN",
  "timestamp": {
    "$date": "2025-03-05T07:54:33.853Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c8033ce4ecbfe6ada08d5d"
  },
  "room": "256545",
  "sender": "client",
  "text": "मैं भी बढ़िया मैंने सुना है आपके थाने में",
  "textEnglish": "मैं भी बढ़िया मैंने सुना है आपके थाने में",
  "language": "en-IN",
  "timestamp": {
    "$date": "2025-03-05T07:54:36.245Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c8034ae4ecbfe6ada08d5f"
  },
  "room": "256545",
  "sender": "broker",
  "text": "હા મને એક નવી પ્રોપર્ટી મળી છે",
  "textEnglish": "Yes I have got a new property",
  "language": "gu-IN",
  "timestamp": {
    "$date": "2025-03-05T07:54:50.244Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c8034fe4ecbfe6ada08d61"
  },
  "room": "256545",
  "sender": "broker",
  "text": "તમારું બજેટ શું છે",
  "textEnglish": "What is your budget",
  "language": "gu-IN",
  "timestamp": {
    "$date": "2025-03-05T07:54:55.617Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c80360e4ecbfe6ada08d63"
  },
  "room": "256545",
  "sender": "client",
  "text": "मेरा बजट डेट से 2 करोड़ का है",
  "textEnglish": "My budget is 2 crores from the date",
  "language": "hi-IN",
  "timestamp": {
    "$date": "2025-03-05T07:55:12.366Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c8037ee4ecbfe6ada08d65"
  },
  "room": "256545",
  "sender": "broker",
  "text": "સમાવી",
  "textEnglish": "Inclusion",
  "language": "gu-IN",
  "timestamp": {
    "$date": "2025-03-05T07:55:42.358Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c80380e4ecbfe6ada08d67"
  },
  "room": "256545",
  "sender": "broker",
  "text": "રહેજા અપાર્ટમેન્ટમાં 1.7 કરોડમાં બધું",
  "textEnglish": "રહેજા અપાર્ટમેન્ટમાં 1.7 કરોડમાં બધું",
  "language": "en-IN",
  "timestamp": {
    "$date": "2025-03-05T07:55:44.350Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c80380e4ecbfe6ada08d69"
  },
  "room": "256545",
  "sender": "broker",
  "text": "મારા પાસે તમારી માટે એટ પરફેક્ટ યાદ છે",
  "textEnglish": "I have an absolutely perfect memory for you",
  "language": "en-IN",
  "timestamp": {
    "$date": "2025-03-05T07:55:44.699Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c803a1e4ecbfe6ada08d6b"
  },
  "room": "256545",
  "sender": "client",
  "text": "अरे वह क्या हम सैटरडे को मिलते हैं वह",
  "textEnglish": "अरे वह क्या हम शनिवार को मिलते हैं वह",
  "language": "en-IN",
  "timestamp": {
    "$date": "2025-03-05T07:56:17.412Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c803a2e4ecbfe6ada08d6d"
  },
  "room": "256545",
  "sender": "client",
  "text": "फ्लैट देख सकते हैं",
  "textEnglish": "Can see the flat",
  "language": "hi-IN",
  "timestamp": {
    "$date": "2025-03-05T07:56:18.979Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c803b9e4ecbfe6ada08d6f"
  },
  "room": "256545",
  "sender": "broker",
  "text": "ભાગે તો અમે શનિવારે મળીએ",
  "textEnglish": "ભાગે તો અમે શનિવારે મળીએ",
  "language": "gu-IN",
  "timestamp": {
    "$date": "2025-03-05T07:56:41.937Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c803f7e4ecbfe6ada08d71"
  },
  "room": "256545",
  "sender": "client",
  "text": "ठीक है मिलते हैं",
  "textEnglish": "ठीक है मिलते हैं",
  "language": "hi-IN",
  "timestamp": {
    "$date": "2025-03-05T07:57:43.379Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c803f7e4ecbfe6ada08d73"
  },
  "room": "256545",
  "sender": "client",
  "text": "ठीक है मिलते हैं",
  "textEnglish": "ठीक है मिलते हैं",
  "language": "hi-IN",
  "timestamp": {
    "$date": "2025-03-05T07:57:43.479Z"
  },
  "__v": 0
}]

summary_client = summarize_conversation_client(
    conversations=json_data,  
    broker_language="Gu-IN", 
    client_language="hi-IN"
)

# Print summary in Markdown format
# print(summary_client)


summary_broker = summarize_conversation_broker(
    conversations=json_data,  
    broker_language="Gu-IN", 
    client_language="hi-IN"
)

# Print summary in Markdown format
# print(summary_broker)

# models = genai.list_models()
# for model in models:
#     print(model.name)