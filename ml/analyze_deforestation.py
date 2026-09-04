"""
Data analysis: global deforestation trends.

Source: Our World in Data / UN FAO, downloaded directly as a CSV.
No API key, no login, just a public file.
"""

import pandas as pd
import matplotlib.pyplot as plt

CSV_URL = "https://ourworldindata.org/grapher/annual-deforestation.csv?v=1&csvType=full&useColumnShortNames=false"

df = pd.read_csv(CSV_URL, storage_options={"User-Agent": "Caleus project/1.0"})
print(f"{len(df)} rows loaded")
print(f"columns: {list(df.columns)}")

# exclude continents, income-group aggregates, and the world total so the
# "top countries" ranking only shows actual countries
AGGREGATES = {
    "World", "Africa", "Asia", "Europe", "North America", "South America", "Oceania",
    "European Union (27)", "High-income countries", "Low-income countries",
    "Lower-middle-income countries", "Upper-middle-income countries",
}
countries = df[~df["Entity"].isin(AGGREGATES)]

# --- chart 1: top 10 countries in the most recent year available ---
latest_year = countries["Year"].max()
latest = countries[countries["Year"] == latest_year]
top10 = latest.sort_values("Deforestation", ascending=False).head(10)

print(f"\ntop 10 countries by deforestation in {latest_year}:")
print(top10[["Entity", "Deforestation"]].to_string(index=False))

plt.figure(figsize=(10, 6))
plt.barh(top10["Entity"][::-1], top10["Deforestation"][::-1] / 1000)
plt.xlabel("Deforestation (thousand hectares)")
plt.title(f"Top 10 countries by deforestation, {latest_year}")
plt.tight_layout()
plt.savefig("output/top10_countries.png", dpi=150)
print("saved output/top10_countries.png")

# --- chart 2: trend over time for a few well known deforestation hotspots ---
watch_list = ["Brazil", "Indonesia", "Democratic Republic of Congo", "Paraguay"]
trend = countries[countries["Entity"].isin(watch_list)]

plt.figure(figsize=(10, 6))
for entity, group in trend.groupby("Entity"):
    group = group.sort_values("Year")
    plt.plot(group["Year"], group["Deforestation"] / 1000, marker="o", label=entity)

plt.xlabel("Year")
plt.ylabel("Deforestation (thousand hectares)")
plt.title("Deforestation trend by country")
plt.legend()
plt.tight_layout()
plt.savefig("output/trend_by_country.png", dpi=150)
print("saved output/trend_by_country.png")

# --- chart 3: world total over time ---
world = df[df["Entity"] == "World"].sort_values("Year")

plt.figure(figsize=(10, 6))
plt.plot(world["Year"], world["Deforestation"] / 1_000_000, marker="o", color="firebrick")
plt.xlabel("Year")
plt.ylabel("Deforestation (million hectares)")
plt.title("World deforestation over time")
plt.tight_layout()
plt.savefig("output/world_trend.png", dpi=150)
print("saved output/world_trend.png")