from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import compare_service
import deforestation

app = FastAPI(title="Caleus")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/hello")
def hello():
    return {"message": "Hello from the Caleus backend"}


@app.get("/api/countries")
def countries():
    return {"countries": deforestation.list_countries()}


@app.get("/api/trend/{country}")
def trend(country: str):
    result = deforestation.get_trend(country)
    if result is None:
        raise HTTPException(status_code=404, detail=f"No data for {country}")
    return result


@app.post("/api/compare")
async def compare(image_one: UploadFile = File(...), image_two: UploadFile = File(...)):
    bytes_one = await image_one.read()
    bytes_two = await image_two.read()

    overlay, percent_lost = compare_service.compare_images(bytes_one, bytes_two)

    return {"overlay": overlay, "percentLost": percent_lost}
