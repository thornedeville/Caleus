# Caleus

A full-stack app for reviewing deforestation data and detecting vegetation change between satellite images.

## Features

- **Trends** — browse yearly deforestation data by country (source: Our World in Data)
- **Compare** — upload two satellite images of the same location, get a change overlay highlighting forest loss plus a percentage lost

## Stack

- `backend/` — FastAPI
- `frontend/` — React (Vite)
- `ml/` — data analysis and a RandomForest classifier trained on the EuroSAT RGB dataset, used by the Compare feature

## Project structure

```
Caleus/
  backend/
    main.py              FastAPI app, defines the API routes
    deforestation.py     loads and serves the OWID trend data
    compare_service.py   tiles + classifies uploaded images, builds the overlay
    requirements.txt
  frontend/
    src/
      App.jsx
      main.jsx
      index.css
      components/
      pages/
    index.html
    package.json
  ml/
    analyze_deforestation.py   standalone script, generates trend charts
    train_classifier.py        trains and saves the forest/non-forest model
    requirements.txt
```

## Setup

### 1. Train the classifier

The backend needs a trained model file (`ml/model.pkl`), which isn't included in this repo.

Download the [EuroSAT RGB dataset](https://zenodo.org/records/7711810/files/EuroSAT_RGB.zip?download=1) and extract it to `ml/data/EuroSAT_RGB/`, then:

```
cd ml
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python train_classifier.py
```

This saves `model.pkl` into `ml/`, which the backend loads at runtime.

### 2. Backend

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Runs at `http://localhost:8000`. Interactive API docs at `http://localhost:8000/docs`.

### 3. Frontend

```
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`.

## API

| Endpoint | Method | Description |
|---|---|---|
| `/api/countries` | GET | list of countries with trend data |
| `/api/trend/{country}` | GET | yearly deforestation series and summary stats for a country |
| `/api/compare` | POST | accepts two images (`image_one`, `image_two`), returns a change overlay and percent forest lost |
