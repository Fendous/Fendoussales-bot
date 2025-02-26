from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from VectorQuery import queryModel
from database import insert_document

app = FastAPI()

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to the  Next.js domain
    allow_credentials=True,
    allow_methods=["*"], # Change this post and get later  
    allow_headers=["*"],
)

class UserQuery(BaseModel):
    text: str

class File(BaseModel):
    text: str

@app.post("/queryModel")
def sendQueryTomodel(query: UserQuery):
    response = queryModel(query.text)
    return {"processed_text": response}


@app.post("/insertDoc")
def insertFileToDataBase(file: File):
    insert_document(file.text)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)  # Runs on port 8000