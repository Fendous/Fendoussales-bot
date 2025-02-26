import requests

def getModelResponse(query):
    modelType = "deepseek-r1-distill-qwen-7b"
    apiUrl = "http://localhost:1234/v1/completions"

    payload = {
        "model": modelType,
        "prompt": query,
        "max_tokens": 100
    }

    response = requests.post(apiUrl, json=payload)

    return response.json()["choices"][0]["text"]

