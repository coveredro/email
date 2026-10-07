# Cut product cut-outs (alpha) out of the old draft renders (drafts/variant-a-640.png), for offline previews only.
# usage: python3 research/preview-crop.py research/preview-images
from PIL import Image, ImageDraw
import numpy as np, sys, os
OUT = sys.argv[1]
A = Image.open('drafts/variant-a-640.png').convert('RGB')
L, R = (51, 310), (330, 588)
rects = {
 'dark.png': (A, L, 1957, 2278), 'titan.png': (A, R, 1957, 2278),
 'negru_mat.png': (A, L, 2453, 2774), 'black_titan.png': (A, R, 2453, 2774),
 'negru_mat_95624e23-a169-476e-9935-f8fb196dee76.png': (A, L, 3182, 3503),
 'sk_transparent_d777e951-0376-4cf6-9796-10374c3e18ca.png': (A, R, 3182, 3503),
 'splash_8efdf64c-ffd7-472c-af26-39ce7cc196ca.png': (A, L, 3678, 3999),
 'honey_9497cee7-e8ed-44ac-b7b7-6483887fe764.png': (A, R, 3678, 3999),
 'ultramatte.png': (A, (51, 201), 4441, 4652),
 'Final_iPhonduosilvere17ProMaxFullWrapSkinDesignMockupFrontBackandSide.png': (A, (51, 201), 4681, 4892),
 'duopink.png': (A, (51, 201), 4921, 5132),
}
os.makedirs(OUT, exist_ok=True)
for name, (im, (x0, x1), y0, y1) in rects.items():
    c = im.crop((x0 + 2, y0 + 36, x1 - 2, y1 - 2)).convert('RGBA')
    w, h = c.size
    MARK = (255, 0, 255, 255)
    seeds = [(x, 0) for x in range(0, w, 6)] + [(x, h - 1) for x in range(0, w, 6)] + [(0, y) for y in range(0, h, 6)] + [(w - 1, y) for y in range(0, h, 6)]
    for s in seeds:
        p = c.getpixel(s)
        if p != MARK and min(p[:3]) > 200:
            ImageDraw.floodfill(c, s, MARK, thresh=22)
    a = np.array(c)
    bg = (a[:, :, 0] == 255) & (a[:, :, 1] == 0) & (a[:, :, 2] == 255)
    a[bg] = (0, 0, 0, 0)
    rgb = a[:, :, :3].astype(int)
    ph = ~bg & ((rgb.min(axis=2) < 170) | (rgb.max(axis=2) - rgb.min(axis=2) > 30))
    rr = np.where(ph.sum(axis=1) > 12)[0]; cc = np.where(ph.sum(axis=0) > 12)[0]
    runs = np.split(cc, np.where(np.diff(cc) > 3)[0] + 1); cc = max(runs, key=len)
    a = a[max(rr.min() - 2, 0):rr.max() + 3, max(cc.min() - 2, 0):cc.max() + 3]
    # Pad back to the real image's 2:3 frame at the size it was shown, so previews keep the real proportions.
    ph_img = Image.fromarray(a)
    W = 180 if x1 - x0 > 200 else 112
    frame = Image.new('RGBA', (W, W * 3 // 2), (0, 0, 0, 0))
    frame.paste(ph_img, ((W - ph_img.width) // 2, (W * 3 // 2 - ph_img.height) // 2), ph_img)
    frame.save(os.path.join(OUT, name))
    print(name, frame.size)
