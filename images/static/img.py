import os
import shutil
types = ['.jpg','.png','jpeg','ico','.gif']
newdir = os.path.abspath(os.path.dirname(__file__))
for root, dirs, files in os.walk("./images"):
	for file in files:
		filetype = os.path.splitext(file)[-1]
		if filetype in types:
			filename = os.path.split(file)[-1].replace(" ",'')
			shutil.move(os.path.join(root, file), os.path.join(newdir, filename))