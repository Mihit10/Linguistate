import json
import os
from groq import Groq
from dotenv import load_dotenv
load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def summarize_conversation(conversations, requiredLang, broker_language, client_language):
    # Replace with actual API key
    
    # Step 1: Parse JSON and split messages by sender
    # conversations = json.loads(json_data)
    broker_msgs = []
    client_msgs = []
    
    for msg in conversations:
        if msg["sender"] == "mihit":  # Assuming Mihit is the client
            client_msgs.append(msg["text"])
        else:
            broker_msgs.append(msg["text"])
    
    # Step 2: Prepare structured prompts for AI agents
    agent_prompt = f"""
    ### Task:
    Summarize the conversation **strictly based on the content**. Do not add or assume anything. The conversation is between a **real estate broker** and a **client**. The broker speaks in {broker_language}, and the client speaks in {client_language}. Generate a summary in {requiredLang}.  

    ### **Format:**  
    - Use **bullet points** for key details.  
    - Present relevant information like property details, pricing, location, and requirements in a **table**.  
    - Ensure the summary is **clear, direct, and easy to read**.  

    ---

    ### **Summary of Conversation**  

    #### **📌 Key Discussion Points**  
    - 🔹 [Summarized point from conversation]  
    - 🔹 [Summarized point from conversation]  
    - 🔹 [Summarized point from conversation]  

    ---

    #### **🏡 Property Details**  
    | Feature         | Details  |
    |---------------|---------|
    | 🏠 Property Type | [Apartment/Villa/etc.] |
    | 📍 Location | [Location mentioned] |
    | 💰 Price | [Mentioned price] |
    | 📏 Size | [Mentioned size] |
    | 🏗️ Status | [Under Construction/Ready to Move] |

    ---

    #### **📋 Next Steps (If Discussed)**  
    - ✅ [Action item discussed]  
    - ✅ [Action item discussed]  

    🚫 **Do not generate additional information. Only include what is explicitly stated in the conversation.**
    """

    # Step 3: Generate summary using Groq Llama
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a multilingual conversation summarizer."},
            {"role": "user", "content": agent_prompt}
        ],
        model="llama3-70b-8192",
    )

    
    return chat_completion.choices[0].message.content


# Example usage
json_data = [{
    "_id": {
    "$oid": "67c78576a3543508f083d612"
  },
  "room": "60942",
  "sender": "mihit",
  "text": "side",
  "timestamp": {
    "$date": "2025-03-04T22:57:58.695Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c78592a3543508f083d617"
  },
  "room": "60942",
  "sender": "mihit",
  "text": "hello still working",
  "timestamp": {
    "$date": "2025-03-04T22:58:26.855Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7859ba3543508f083d619"
  },
  "room": "60942",
  "sender": "mihit",
  "text": "cannot process me",
  "timestamp": {
    "$date": "2025-03-04T22:58:35.975Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c785f0a3543508f083d61b"
  },
  "room": "60942",
  "sender": "mihit",
  "text": "cannot process me",
  "timestamp": {
    "$date": "2025-03-04T23:00:00.775Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c78603a3543508f083d61e"
  },
  "room": "60942",
  "sender": "mihit",
  "text": "hello",
  "timestamp": {
    "$date": "2025-03-04T23:00:19.174Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7860ca3543508f083d620"
  },
  "room": "60942",
  "sender": "mihit",
  "text": "this is a test for very long messages",
  "timestamp": {
    "$date": "2025-03-04T23:00:28.136Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7860ca3543508f083d621"
  },
  "room": "60942",
  "sender": "mihit",
  "text": "might be very long in English language",
  "timestamp": {
    "$date": "2025-03-04T23:00:28.137Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7860ca3543508f083d622"
  },
  "room": "60942",
  "sender": "mihit",
  "text": "without literature",
  "timestamp": {
    "$date": "2025-03-04T23:00:28.138Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c78b012626914b9be301d9"
  },
  "room": "60942",
  "sender": "Vedh",
  "text": "मैं हिंदी में बोल रहा हूं",
  "timestamp": {
    "$date": "2025-03-04T23:21:37.960Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c78b072626914b9be301db"
  },
  "room": "60942",
  "sender": "Mihit",
  "text": "I am talking in English",
  "timestamp": {
    "$date": "2025-03-04T23:21:43.719Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c78f1dbea8f55cec71558e"
  },
  "room": "60942",
  "sender": "Vedh",
  "text": "hello",
  "timestamp": {
    "$date": "2025-03-04T23:39:09.288Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7c082547c28a3fe215545"
  },
  "room": "60942",
  "sender": "Mihit",
  "text": "hello good morning can you hear me",
  "timestamp": {
    "$date": "2025-03-05T03:09:54.796Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7c088547c28a3fe215547"
  },
  "room": "60942",
  "sender": "Mihit",
  "text": "yes I can hear you how can I ask you",
  "timestamp": {
    "$date": "2025-03-05T03:10:00.916Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7c090547c28a3fe215549"
  },
  "room": "60942",
  "sender": "Vedh",
  "text": "can you hear me over here",
  "timestamp": {
    "$date": "2025-03-05T03:10:08.962Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7c099547c28a3fe21554b"
  },
  "room": "60942",
  "sender": "Vedh",
  "text": "time me properties in Mughal",
  "timestamp": {
    "$date": "2025-03-05T03:10:17.226Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7c0c7547c28a3fe215551"
  },
  "room": "60942",
  "sender": "Vedh",
  "text": "hello this is Mohit",
  "timestamp": {
    "$date": "2025-03-05T03:11:03.878Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7c0cd547c28a3fe215553"
  },
  "room": "60942",
  "sender": "Mihit",
  "text": "yeah I can hear you please tell me",
  "timestamp": {
    "$date": "2025-03-05T03:11:09.794Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67c7c0d2547c28a3fe215555"
  },
  "room": "60942",
  "sender": "Vedh",
  "text": "very good",
  "timestamp": {
    "$date": "2025-03-05T03:11:14.678Z"
  },
  "__v": 0
}]  # Replace with actual JSON string
summary = summarize_conversation(json_data, "en", "mr-IN", "en-IN")
print(summary)
