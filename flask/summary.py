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
    model = genai.GenerativeModel("gemini-1.5-pro-latest")  # Using Gemini Pro model
    response = model.generate_content(agent_prompt)

    # Step 4: Return formatted summary
    return response.text



# Example usage
json_data = [{
  "_id": {
    "$oid": "67c7cc0c22d6cf82ecdcd609"
  },
  "room": "123456",
  "sender": "broker",
  "text": "તમારું નામ શું છે",
  "textEnglish": "What is your name",
  "timestamp": {
    "$date": "2025-03-05T03:59:08.867Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7cc0f22d6cf82ecdcd60b"
  },
  "room": "123456",
  "sender": "client",
  "text": "हॅलो",
  "textEnglish": "Hello",
  "timestamp": {
    "$date": "2025-03-05T03:59:11.130Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7cc1122d6cf82ecdcd60d"
  },
  "room": "123456",
  "sender": "client",
  "text": "माझं नाव माहित आहे",
  "textEnglish": "My name is known",
  "timestamp": {
    "$date": "2025-03-05T03:59:13.965Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7cc1422d6cf82ecdcd60f"
  },
  "room": "123456",
  "sender": "broker",
  "text": "તમે કેમ છો",
  "textEnglish": "How are you",
  "timestamp": {
    "$date": "2025-03-05T03:59:16.316Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7cc1822d6cf82ecdcd611"
  },
  "room": "123456",
  "sender": "client",
  "text": "मी खूप चांगला आहे तुम्ही बोला",
  "textEnglish": "I am fine you talk",
  "timestamp": {
    "$date": "2025-03-05T03:59:20.731Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7cc1c22d6cf82ecdcd613"
  },
  "room": "123456",
  "sender": "broker",
  "text": "? હું પણ એકદમ ઠીક",
  "textEnglish": "I'm also perfectly fine",
  "timestamp": {
    "$date": "2025-03-05T03:59:24.418Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7cc2222d6cf82ecdcd615"
  },
  "room": "123456",
  "sender": "client",
  "text": "तर मला एक प्रॉपर्टी बघायची होती वन बीएचके",
  "textEnglish": "But I wanted to see a property one BHK",
  "timestamp": {
    "$date": "2025-03-05T03:59:30.346Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7cc2922d6cf82ecdcd617"
  },
  "room": "123456",
  "sender": "broker",
  "text": "તમને ત્યારે જોવી છે પ્રોપર્ટી",
  "textEnglish": "You have to see the property then",
  "timestamp": {
    "$date": "2025-03-05T03:59:37.435Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7cc2c22d6cf82ecdcd619"
  },
  "room": "123456",
  "sender": "client",
  "text": "बघायची आहे",
  "textEnglish": "Want to see",
  "timestamp": {
    "$date": "2025-03-05T03:59:40.438Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7cc3222d6cf82ecdcd61b"
  },
  "room": "123456",
  "sender": "broker",
  "text": "તમારું બજેટ શું છે",
  "textEnglish": "What is your budget",
  "timestamp": {
    "$date": "2025-03-05T03:59:46.877Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7cc3822d6cf82ecdcd61d"
  },
  "room": "123456",
  "sender": "client",
  "text": "माझं बजेट दीड ते दोन करोड पर्यंत आहे",
  "textEnglish": "My budget is up to one and a half to two crores",
  "timestamp": {
    "$date": "2025-03-05T03:59:52.058Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7cc3d22d6cf82ecdcd61f"
  },
  "room": "123456",
  "sender": "broker",
  "text": "તમને ડર જોઈએ છે",
  "textEnglish": "You should be feared",
  "timestamp": {
    "$date": "2025-03-05T03:59:57.521Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7cc4322d6cf82ecdcd621"
  },
  "room": "123456",
  "sender": "client",
  "text": "फक्त चांगली असायला पाहिजे",
  "textEnglish": "It should just be good",
  "timestamp": {
    "$date": "2025-03-05T04:00:03.242Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7cc5322d6cf82ecdcd623"
  },
  "room": "123456",
  "sender": "broker",
  "text": "છે એ વન બીએચકે છે",
  "textEnglish": "Is Van BHKE",
  "timestamp": {
    "$date": "2025-03-05T04:00:19.933Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7cc5b22d6cf82ecdcd625"
  },
  "room": "123456",
  "sender": "client",
  "text": "प्लॅन करूया एक दिवस",
  "textEnglish": "Let's plan for a day",
  "timestamp": {
    "$date": "2025-03-05T04:00:27.330Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7cc6a22d6cf82ecdcd627"
  },
  "room": "123456",
  "sender": "client",
  "text": "ठीक आहे चालेल",
  "textEnglish": "That's fine, will manage",
  "timestamp": {
    "$date": "2025-03-05T04:00:42.566Z"
  },
  "__v": 0
}]

summary_client = summarize_conversation_client(
    conversations=json_data,  
    broker_language="Gu-IN", 
    client_language="mr-IN"
)

# Print summary in Markdown format
# print(summary_client)


summary_broker = summarize_conversation_broker(
    conversations=json_data,  
    broker_language="Gu-IN", 
    client_language="mr-IN"
)

# Print summary in Markdown format
# print(summary_broker)

# models = genai.list_models()
# for model in models:
#     print(model.name)