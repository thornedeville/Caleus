import pandas as pd

CSV_URL = "https://ourworldindata.org/grapher/annual-deforestation.csv?v=1&csvType=full&useColumnShortNames=false"

# same aggregates excluded in ml/analyze_deforestation.py, kept in sync here
AGGREGATES = {
    "World", "Africa", "Asia", "Europe", "North America", "South America", "Oceania",
    "European Union (27)", "High-income countries", "Low-income countries",
    "Lower-middle-income countries", "Upper-middle-income countries",
}

_cache = None


def _load():
    global _cache
    if _cache is None:
        df = pd.read_csv(CSV_URL, storage_options={"User-Agent": "Caleus project/1.0"})
        _cache = df[~df["Entity"].isin(AGGREGATES)]
    return _cache


def list_countries():
    df = _load()
    return sorted(df["Entity"].unique().tolist())


def get_trend(country):
    df = _load()
    rows = df[df["Entity"] == country].sort_values("Year")

    if rows.empty:
        return None

    series = [
        {"year": int(year), "value": round(value / 1000, 1)}
        for year, value in zip(rows["Year"], rows["Deforestation"])
    ]

    peak = rows.loc[rows["Deforestation"].idxmax()]
    latest = rows.iloc[-1]
    average = rows["Deforestation"].mean() / 1000

    stats = [
        {"label": "Latest year", "value": str(int(latest["Year"]))},
        {"label": "Latest loss", "value": f"{latest['Deforestation'] / 1000:.1f}k ha"},
        {"label": "Peak year", "value": str(int(peak["Year"]))},
        {"label": "Average loss", "value": f"{average:.1f}k ha/yr"},
    ]

    return {"country": country, "series": series, "stats": stats}
