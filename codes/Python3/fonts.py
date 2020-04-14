# -*- coding:utf-8 -*-
import os

help = \
'''
@Author: Alston Trevelyan
@Description: This is a program to get your fonts.
@Use: 在博客根目录下创建任意一个文件夹将此程序放入,运行即可;
      注：需在/themes/next/source/fonts中放入字体文件,支持.eot, .ttf, .otf, .woff, .woff2, .svg
          可放入fonts下的多层文件夹
'''
print(help)

sysPath = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
stylPath = os.path.join(sysPath, "themes", 'next', "source", "css", "main.styl")
cssPath = os.path.join(sysPath, "themes", 'next', "source", "css", "_fonts")
source = os.path.join(sysPath, "themes", 'next', "source", "fonts")
fontTypes = [".ttf", '.otf', '.svg', ".woff", ".woff2", ".eot"]

fonts = {}
fontNames = []
cssCode = '@charset "UTF-8";\n\n@font-face {\n'

cssFooter = "}"

for root, dirs, files in os.walk(source):
    for file in files:
        if os.path.splitext(file)[-1].lower() in fontTypes:
            fontPath = os.path.join(root, file)
            fontName = os.path.splitext(os.path.split(file)[-1])[0]
            if fontName not in fontNames:
                fontNames.append(fontName)
                fonts[fontName] = [fontPath]
            else:
                fonts[fontName].append(fontPath)

with open(stylPath, 'r', encoding="utf-8") as styl:
    content = styl.readlines()
exists = False
for line in content:
    if '@import "/_fonts/fonts.styl";' in line:
        exists = True
if not exists:
    with open(stylPath, 'a', encoding="utf-8") as styl:
        styl.write("\n\n// Fonts\n")
        styl.write('// --------------------------------------------------\n')
        styl.write('@import "/_fonts/fonts.styl";')

importPath = os.path.join(cssPath, "fonts.styl")
styl = open(importPath, 'w', encoding='utf-8')

for fontName, fontPaths in fonts.items():
    print("\nFontName: " + fontName + "\n\tFormat: ", end="")
    css_path = os.path.join(cssPath, fontName + ".css")
    for fontPath in fontPaths:
        print(os.path.splitext(fontPath)[-1], end=", ")

    with open(css_path, mode="w", encoding="utf-8") as css:
        css.write(cssCode)
        css.write('\tfont-family: "{0}";\n'.format(fontName))
        css.write('\tsrc: local("{0}"), url("{1}");\n'.format(fontName, fontPaths[0].replace(source + "\\", "../../fonts/").replace("\\", '/')))
        if len(fontPaths) > 1:
            for fontPath in fontPaths[1:]:
                css.write('\t\t' + 'local("{0}"), url("{1}");\n'.format(fontName, fontPath.replace(source + "\\", "../../fonts/").replace("\\", '/')))
        css.write(cssFooter)
    styl.write('@import "/{0}";\n'.format(os.path.split(css_path)[-1]))
styl.close()