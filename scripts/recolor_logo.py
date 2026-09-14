
"""把 logo.png 做双色互换重着色：
   原：藏青底(#00005E) + 白字(TIFSC 商标)
   新：纸白底(#f5f2ea, 与全站 body 背景同色) + 藏青字
   做法：按 alpha 混合模型精确反解字形覆盖率 c，再合成 c*藏青 + (1-c)*纸白，
   连抗锯齿边缘一起换色，尺寸/比例/像素数完全不动。
"""
from PIL import Image
import shutil, os

SRC = r"C:\Users\mudream\english-camp\src\assets\logo.png"
BAK = r"C:\Users\mudream\english-camp\.backup\logo.original.png"

os.makedirs(os.path.dirname(BAK), exist_ok=True)
if not os.path.exists(BAK):
    shutil.copy2(SRC, BAK)

NAVY  = (0, 0, 94)        # 原底 / 新字色  #00005E
WHITE = (255, 255, 255)   # 原字色
PAPER = (245, 242, 234)   # 新底  --color-paper #f5f2ea

im = Image.open(SRC).convert("RGBA")
W, H = im.size
px = im.load()

def cov(p):
    """反解「白字覆盖率」c: P = c*WHITE + (1-c)*NAVY"""
    cs = []
    for i in (0, 1, 2):
        d = WHITE[i] - NAVY[i]
        if d:
            cs.append((p[i] - NAVY[i]) / d)
    c = sum(cs) / len(cs)
    return 0.0 if c < 0 else (1.0 if c > 1 else c)

changed = 0
for y in range(H):
    for x in range(W):
        r, g, b, a = px[x, y]
        c = cov((r, g, b))
        nr = round(c * NAVY[0] + (1 - c) * PAPER[0])
        ng = round(c * NAVY[1] + (1 - c) * PAPER[1])
        nb = round(c * NAVY[2] + (1 - c) * PAPER[2])
        if (nr, ng, nb) != (r, g, b):
            changed += 1
        px[x, y] = (nr, ng, nb, a)

im.save(SRC, "PNG", optimize=True)
print("尺寸(未变):", im.size, " 改写像素:", changed, "/", W * H)
print("备份:", BAK)
print("新文件字节:", os.path.getsize(SRC))
