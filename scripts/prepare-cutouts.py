import io
import os
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageOps
from rembg import new_session, remove

root = Path(__file__).resolve().parent.parent
output = root / 'public/photos/catalog'
os.environ.setdefault('OMP_NUM_THREADS', '2')
session = new_session('isnet-general-use')
sources = {
    'xg936n': 'https://static.tildacdn.com/tild3466-3939-4438-b739-383436303237/936n.jpg',
    'epb-tbm': 'https://static.global-ce.com/upload/upfs/202301/30/f_1675056450655547.jpg',
    'xg8125wh': 'https://static.tildacdn.com/tild6436-6139-4161-b064-626164613938/img_8978.jpg',
}
for name, source in sources.items():
    if len(sys.argv) > 1 and name not in sys.argv[1:]:
        continue
    raw = source.read_bytes() if isinstance(source, Path) else subprocess.check_output(['curl', '-fLs', '--max-time', '40', source])
    source_image = Image.open(io.BytesIO(raw)).convert('RGBA')
    source_image.thumbnail((1800, 1400))
    image = remove(source_image, session=session)
    bounds = image.getchannel('A').point(lambda value: 255 if value > 64 else 0).getbbox()
    if not bounds:
        raise RuntimeError(f'No subject detected: {name}')
    image = ImageOps.contain(image.crop(bounds), (1000, 720), Image.Resampling.LANCZOS)
    canvas = Image.new('RGB', (1000, 720), 'white')
    canvas.paste(image, ((1000 - image.width) // 2, (720 - image.height) // 2), image)
    canvas.save(output / f'{name}.webp', 'WEBP', quality=90)
    print('Prepared cutout:', name, flush=True)
