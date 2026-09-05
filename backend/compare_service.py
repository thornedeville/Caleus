import base64
from io import BytesIO
from pathlib import Path

import joblib
import numpy as np
from PIL import Image, ImageDraw

MODEL_PATH = Path(__file__).resolve().parent.parent / "ml" / "model.pkl"

CANVAS_SIZE = 512  # both images get resized to this before tiling, so the grids line up
TILE_SIZE = 64
PATCH_SIZE = 16  # matches the size used when training the classifier

_model = None


def _load_model():
    global _model
    if _model is None:
        _model = joblib.load(MODEL_PATH)
    return _model


def _tiles_from(image):
    canvas = image.convert("RGB").resize((CANVAS_SIZE, CANVAS_SIZE))
    tiles = []
    for top in range(0, CANVAS_SIZE, TILE_SIZE):
        for left in range(0, CANVAS_SIZE, TILE_SIZE):
            tile = canvas.crop((left, top, left + TILE_SIZE, top + TILE_SIZE))
            patch = tile.resize((PATCH_SIZE, PATCH_SIZE))
            tiles.append(np.array(patch).flatten() / 255.0)
    return canvas, np.array(tiles)


def compare_images(bytes_one, bytes_two):
    model = _load_model()

    image_one = Image.open(BytesIO(bytes_one))
    image_two = Image.open(BytesIO(bytes_two))

    _, tiles_one = _tiles_from(image_one)
    canvas_two, tiles_two = _tiles_from(image_two)

    labels_one = model.predict(tiles_one)
    labels_two = model.predict(tiles_two)

    lost = (labels_one == 1) & (labels_two == 0)  # was forest, isn't anymore

    highlight = Image.new("RGBA", canvas_two.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(highlight)

    tiles_per_row = CANVAS_SIZE // TILE_SIZE
    for index, is_lost in enumerate(lost):
        if not is_lost:
            continue
        row, col = divmod(index, tiles_per_row)
        left, top = col * TILE_SIZE, row * TILE_SIZE
        draw.rectangle(
            [left, top, left + TILE_SIZE, top + TILE_SIZE],
            fill=(192, 83, 62, 110),
        )

    overlay = Image.alpha_composite(canvas_two.convert("RGBA"), highlight).convert("RGB")

    buffer = BytesIO()
    overlay.save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode()

    percent_lost = round(100 * lost.sum() / len(lost), 1)

    return f"data:image/png;base64,{encoded}", float(percent_lost)
