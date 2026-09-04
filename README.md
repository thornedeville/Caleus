# Caleus

A full stack web app with a FastAPI backend and a React (Vite) frontend.

## Project structure

```
Caleus/
  backend/
    main.py            FastAPI app
    requirements.txt
  frontend/
    src/
      App.jsx
      main.jsx
      index.css
    index.html
    package.json
```

## Backend setup

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at http://localhost:8000

## Frontend setup

Open a second terminal:

```
cd frontend
npm install
npm run dev
```

Frontend runs at http://localhost:5173
