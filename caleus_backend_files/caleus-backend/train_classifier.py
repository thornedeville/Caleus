"""
ML: forest vs. non-forest image classifier.

Dataset: EuroSAT RGB - real Sentinel-2 satellite image patches, labeled by
land cover type. Download and extract first:
https://zenodo.org/records/7711810/files/EuroSAT_RGB.zip?download=1

Expected layout after extracting:
ml/data/EuroSAT_RGB/Forest/...
ml/data/EuroSAT_RGB/AnnualCrop/...
ml/data/EuroSAT_RGB/Pasture/...
(10 folders total)

Each image gets shrunk down and flattened into a list of numbers - each
pixel's red/green/blue value becomes one feature. A random forest then
learns which pixel patterns tend to show up in forest vs everything else.
"""

import random
from pathlib import Path

import numpy as np
from PIL import Image
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt

DATA_DIR = Path("data/EuroSAT_RGB")
IMAGE_SIZE = 16  # shrink each image before flattening, keeps training fast
FOREST_COUNT = 600
NON_FOREST_COUNT = 600  # spread evenly across the other 9 classes
RANDOM_SEED = 42

random.seed(RANDOM_SEED)


def load_images(folder, limit):
    paths = list(folder.glob("*.jpg"))
    random.shuffle(paths)
    paths = paths[:limit]
    images = []
    for path in paths:
        img = Image.open(path).convert("RGB").resize((IMAGE_SIZE, IMAGE_SIZE))
        images.append(np.array(img).flatten() / 255.0)
    return images


class_folders = sorted(p for p in DATA_DIR.iterdir() if p.is_dir())
print(f"found classes: {[p.name for p in class_folders]}")

non_forest_per_class = NON_FOREST_COUNT // (len(class_folders) - 1)

X = []
y = []
for folder in class_folders:
    if folder.name == "Forest":
        limit = FOREST_COUNT
        label = 1
    else:
        limit = non_forest_per_class
        label = 0

    images = load_images(folder, limit)
    X.extend(images)
    y.extend([label] * len(images))
    print(f"  {folder.name}: {len(images)} images loaded")

X = np.array(X)
y = np.array(y)
print(f"\ntotal: {len(X)} images ({int(y.sum())} forest, {len(y) - int(y.sum())} not forest)")

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=RANDOM_SEED, stratify=y
)

model = RandomForestClassifier(n_estimators=200, random_state=RANDOM_SEED)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print("\n" + classification_report(y_test, y_pred, target_names=["not forest", "forest"]))

cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(5, 5))
plt.imshow(cm, cmap="Blues")
plt.xticks([0, 1], ["not forest", "forest"])
plt.yticks([0, 1], ["not forest", "forest"])
plt.xlabel("predicted")
plt.ylabel("actual")
plt.title("Confusion matrix")
for i in range(2):
    for j in range(2):
        plt.text(j, i, cm[i, j], ha="center", va="center")
plt.tight_layout()
plt.savefig("output/confusion_matrix.png", dpi=150)
print("saved output/confusion_matrix.png")
