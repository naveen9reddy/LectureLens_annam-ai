import requests
import json
import re

def generate_mcq_from_text(segment: str):
    prompt = f"""
You are an AI tutor. Based on the following transcript segment, generate 3 multiple-choice questions (MCQs). Each question must have:
- A clear question
- 4 answer options (A, B, C, D)
- The correct answer

Transcript:
\"\"\"
{segment}
\"\"\"

Format the output as JSON like:
[
  {{
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "answer": "A"
  }}
]
"""
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "mistral", "prompt": prompt, "stream": False}
    )
    response.raise_for_status()
    result = response.json()
    
    match = re.search(r"\[\s*{.*}\s*]", result["response"], re.DOTALL)
    if match:
        return json.loads(match.group())
    raise ValueError("Failed to extract questions JSON from response")
