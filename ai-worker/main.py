from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "Compression Engine Online"}