# 按 shot.mjs 选择器模式写出的 <png>.rect.json 精确裁剪局部（坐标与截图同一时刻测得，不会漂）
# 用法: python scripts/crop.py <shot.png> [out.png] [额外边距px]
import json
import sys
from pathlib import Path

from PIL import Image

png = Path(sys.argv[1])
out = Path(sys.argv[2]) if len(sys.argv) > 2 else png.with_name(png.stem + '-crop.png')
extra = int(sys.argv[3]) if len(sys.argv) > 3 else 0

side = png.with_suffix('.rect.json')
r = json.loads(side.read_text(encoding='utf-8'))
dpr = float(r.get('dpr', 1))
pad = float(r.get('pad', 16)) + extra

im = Image.open(png)
box = (
    max(0, int(round((r['x'] - pad) * dpr))),
    max(0, int(round((r['y'] - pad) * dpr))),
    min(im.width, int(round((r['x'] + r['w'] + pad) * dpr))),
    min(im.height, int(round((r['y'] + r['h'] + pad) * dpr))),
)
im.crop(box).save(out)
print(f'裁剪 {box[2] - box[0]}x{box[3] - box[1]} -> {out}  (原图 {im.width}x{im.height}, dpr={dpr})')
