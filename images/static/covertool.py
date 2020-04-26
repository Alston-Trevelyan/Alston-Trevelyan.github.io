import os
from PIL import Image
import json
types = ['.jpg','.png','jpeg','ico','.gif']
root = os.path.abspath(os.path.dirname(__file__))
jsonString = []
for file in os.listdir(os.path.join(root, 'covers')):
	if os.path.splitext(file)[-1] in types:
		imgSize = Image.open(os.path.join(root, 'covers', file)).size
		jsonString.append("{0}.{1} {2}".format(imgSize[0],imgSize[1],file))
jsonString = json.dumps(jsonString, indent=4).encode().decode("unicode_escape")
with open(os.path.join(root, 'coverslist.json'), 'w', encoding="utf-8") as f:
	f.write(jsonString)
