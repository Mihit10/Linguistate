import os
from groq import Groq
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def refine_and_translate(text, brokerLanguage, clientLanguage):
    """
    Corrects transcription errors (internally) and translates the text meaningfully.
    
    Parameters:
    - text (str): Transcribed conversation.
    - brokerLanguage (str): Source language (e.g., "mr-IN" for Marathi).
    - clientLanguage (str): Target language (e.g., "hi-IN" for Hindi).

    Returns:
    - str: Translated text ONLY (no extra formatting).
    """

    prompt = f"""
    Translate the following text from {brokerLanguage} to {clientLanguage}. 
    - Ensure meaning is preserved exactly.
    - Do NOT add explanations, notes, or extra formatting.
    - The output should contain ONLY the translated text—nothing else.

    Text: "{text}"
    """

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a strict translation assistant. Your output must be only the translated text, without any extra words."},
                {"role": "user", "content": prompt}
            ],
            model="llama-3.3-70b-versatile",
        )

        # Ensure stripping to remove unintended newlines or spaces
        return chat_completion.choices[0].message.content.strip()

    except Exception as e:
        print("Error:", e)
        return text  # If error, return original text as fallback

# ================== TESTING ==================
if __name__ == "__main__":
    # Example: Marathi to Hindi
    conversation = "तुम्हाला कोणत्या भागात घर पाहिजे आहे? बजेट किती आहे?"
    broker_language = "mr-IN"
    client_language = "en-IN"

    translated_text = refine_and_translate(conversation, broker_language, client_language)
    print(translated_text)  # Should output: "तुम्हें किस इलाके में घर चाहिए? बजट कितना है?"
