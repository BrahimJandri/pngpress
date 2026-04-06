from fastapi import FastAPI, UploadFile, File
from PIL import Image
import io
from fastapi.responses import Response

app = FastAPI()


@app.post("/compress")
async def compress_png(file: UploadFile = File(...)):
    # 1. Load the image from the uploaded bytes
    input_bytes = await file.read()
    img = Image.open(io.BytesIO(input_bytes))

    # 2. Perform the compression
    output_buffer = io.BytesIO()
    # 'optimize=True' tells Pillow to reduce the file size as much as possible
    # without losing quality (lossless).
    img.save(output_buffer, format="PNG", optimize=True)

    # 3. Return the new image
    return Response(content=output_buffer.getvalue(), media_type="image/png")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)