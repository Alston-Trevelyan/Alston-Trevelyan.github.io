# -*- coding:utf-8 -*-
import os
import sys
import time

'''
@Author: Alston Trevelyan
@Description: This is a program to get your backgrounds.
'''
sysPath = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
jsPath = os.path.join(sysPath, "themes", 'next', "source", "js", "src", "background.js")
background_path = os.path.join(sysPath, "themes", 'next', "source", "images", "background")

# 设置参数
duration = sys.argv[1] if len(sys.argv) >= 2 else 60000
fade = sys.argv[2] if len(sys.argv) >= 3 else 1500

jsCode = "/* 轮播背景图片 */\n$(function () {\n\t$.backstretch([\n"

for root, dirs, files in os.walk(background_path):
  files = sorted(files, key=lambda file: time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(os.path.getctime(os.path.join(root, file)))))
  for file in files:
    if os.path.splitext(file)[-1].lower() in [".jpg", ".png", ".jpeg"]:
      jsCode += '\t\t"{0}",\n'.format(os.path.join(root, file).replace(os.path.join(sysPath, "themes", "next", "source"), "").replace("\\", '/'))
  count = len(files)

jsCode += '\t], { duration: %s, fade: %s });\n});'%(duration, fade) if len(files) > 1 else '\t]);\n});'
with open(jsPath, 'w', encoding='utf-8') as js:
  js.write(jsCode)