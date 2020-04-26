# -*- coding:utf-8 -*-

import os

class ReNamer:
    def __init__(self):
        self.en = {'A': '\U0001D4D0', 'B': '\U0001D4D1', 'C': '\U0001D4D2', 'D': '\U0001D4D3', 'E': '\U0001D4D4',
                  'F': '\U0001D4D5', 'G': '\U0001D4D6', 'H': '\U0001D4D7', 'I': '\U0001D4D8', 'J': '\U0001D4D9',
                  'K': '\U0001D4DA', 'L': '\U0001D4DB', 'M': '\U0001D4DC', 'N': '\U0001D4DD', 'O': '\U0001D4DE',
                  'P': '\U0001D4DF', 'Q': '\U0001D4E0', 'R': '\U0001D4E1', 'S': '\U0001D4E2', 'T': '\U0001D4E3',
                  'U': '\U0001D4E4', 'V': '\U0001D4E5', 'W': '\U0001D4E6', 'X': '\U0001D4E7', 'Y': '\U0001D4E8',
                  'Z': '\U0001D4E9', 'a': '\U0001D4EA', 'b': '\U0001D4EB', 'c': '\U0001D4EC', 'd': '\U0001D4ED',
                  'e': '\U0001D4EE', 'f': '\U0001D4EF', 'g': '\U0001D4F0', 'h': '\U0001D4F1', 'i': '\U0001D4F2',
                  'j': '\U0001D4F3', 'k': '\U0001D4F4', 'l': '\U0001D4F5', 'm': '\U0001D4F6', 'n': '\U0001D4F7',
                  'o': '\U0001D4F8', 'p': '\U0001D4F9', 'q': '\U0001D4FA', 'r': '\U0001D4FB', 's': '\U0001D4FC',
                  't': '\U0001D4FD', 'u': '\U0001D4FE', 'v': '\U0001D4FF', 'w': '\U0001D500', 'x': '\U0001D501',
                  'y': '\U0001D502', 'z': '\U0001D503'}

    def get_name(self, oldname):
        newName = ''
        for letter in oldname:
            change = False
            for i in self.en:
                if letter == i:
                    newName += self.en[i]
                    change = True
                    break
            if not change:
                newName += letter

        return newName

    def change_title(self, path):
        with open(path, 'r', encoding="utf-8") as file:
            content = file.readlines()
        output = ""
        for line in content:
            if content.index(line) == 1:
                title = line.replace("\n", "").split("title: ")[-1]
                newTitle = self.get_name(title)
                output += "title: {0}\n".format(newTitle)
            else:
                output += line
        with open(path, 'w', encoding="utf-8") as newFile:
            newFile.write(output)

    def rename_files(self, fileTypes, newTitle=False, changeFileName=True):
        for root, dirs, files in os.walk(source):
            for file in files:
                if os.path.splitext(file)[-1] in fileTypes:
                    if newTitle:
                        self.change_title(os.path.join(root, file))
                    if changeFileName:
                        fileName = os.path.splitext(os.path.split(file)[-1])[0]
                        fileType = os.path.splitext(file)[-1]
                        filePath = os.path.join(root, file)
                        newName = self.get_name(fileName)
                        os.rename(filePath, os.path.join(root, newName + fileType))
                    print("[+] Rename File {0} Success!!!".format(os.path.join(root, file)))
            for dir in dirs:
                if dir not in sourceDirs:
                    dirPath = os.path.join(root, dir)
                    dirName = os.path.split(dirPath)[-1]
                    newName = self.get_name(dirName)
                    os.rename(dirPath, os.path.join(root, newName))
                    print("[+] Rename File {0} Success!!!".format(dirPath))

    def rename_dirs(self, sourceDirs):
        for dir in sourceDirs:
            if "_posts" not in dir and "_drafts" not in dir:
                dirPath = os.path.join(source, dir)
                newName = self.get_name(os.path.split(dirPath)[-1])
                if os.path.dirname(dirPath) == source:
                    sourceDirs[os.path.split(dirPath)[-1]] = newName
                os.rename(dirPath, os.path.join(source, newName))
                print("[+] Rename Dir {0} Success!!!".format(dirPath))
        return sourceDirs

class Decrypter:
    def __init__(self):
        self.en = {'\U0001D4D0': 'A', '\U0001D4D1': 'B', '\U0001D4D2': 'C', '\U0001D4D3': 'D', '\U0001D4D4': 'E',
                  '\U0001D4D5': 'F', '\U0001D4D6': 'G', '\U0001D4D7': 'H', '\U0001D4D8': 'I', '\U0001D4D9': 'J',
                  '\U0001D4DA': 'K', '\U0001D4DB': 'L', '\U0001D4DC': 'M', '\U0001D4DD': 'N', '\U0001D4DE': 'O',
                  '\U0001D4DF': 'P', '\U0001D4E0': 'Q', '\U0001D4E1': 'R', '\U0001D4E2': 'S', '\U0001D4E3': 'T',
                  '\U0001D4E4': 'U', '\U0001D4E5': 'V', '\U0001D4E6': 'W', '\U0001D4E7': 'X', '\U0001D4E8': 'Y',
                  '\U0001D4E9': 'Z', '\U0001D4EA': 'a', '\U0001D4EB': 'b', '\U0001D4EC': 'c', '\U0001D4ED': 'd',
                  '\U0001D4EE': 'e', '\U0001D4EF': 'f', '\U0001D4F0': 'g', '\U0001D4F1': 'h', '\U0001D4F2': 'i',
                  '\U0001D4F3': 'j', '\U0001D4F4': 'k', '\U0001D4F5': 'l', '\U0001D4F6': 'm', '\U0001D4F7': 'n',
                  '\U0001D4F8': 'o', '\U0001D4F9': 'p', '\U0001D4FA': 'q', '\U0001D4FB': 'r', '\U0001D4FC': 's',
                  '\U0001D4FD': 't', '\U0001D4FE': 'u', '\U0001D4FF': 'v', '\U0001D500': 'w', '\U0001D501': 'x',
                  '\U0001D502': 'y', '\U0001D503': 'z'}

    def decrypt_name(self, curName):
        newName = ''
        for letter in curName:
            change = False
            for i in self.en:
                if letter == i:
                    newName += self.en[i]
                    change = True
                    break
            if not change:
                newName += letter
        return newName

    def decrypt_title(self, path):
        with open(path, 'r', encoding="utf-8") as file:
            content = file.readlines()
        output = ""
        for line in content:
            if content.index(line) == 1:
                title = line.replace("\n", "").split("title: ")[-1]
                newTitle = self.decrypt_name(title)
                output += "title: {0}\n".format(newTitle)
            else:
                output += line
        with open(path, 'w', encoding="utf-8") as newFile:
            newFile.write(output)

    def decrypt_files(self, fileTypes, newTitle=True, changeFileName=False):
        for root, dirs, files in os.walk(source):
            for file in files:
                if os.path.splitext(file)[-1] in fileTypes:
                    if newTitle:
                        self.decrypt_title(os.path.join(root, file))
                    if changeFileName:
                        fileName = os.path.splitext(os.path.split(file)[-1])[0]
                        fileType = os.path.splitext(file)[-1]
                        filePath = os.path.join(root, file)
                        newName = self.decrypt_name(fileName)
                        os.rename(filePath, os.path.join(root, newName + fileType))
                    print("[+] Rename File {0} Success!!!".format(os.path.join(root, file)))
            for dir in dirs:
                if dir not in sourceDirs:
                    if changeFileName:
                        dirPath = os.path.join(root, dir)
                        dirName = os.path.split(dirPath)[-1]
                        newName = self.decrypt_name(dirName)
                        os.rename(dirPath, os.path.join(root, newName))
                        print("[+] Rename File {0} Success!!!".format(dirPath))

    def decrypt_dirs(self, sourceDirs):
        for dir in sourceDirs:
            if "_posts" not in dir and "_drafts" not in dir:
                dirPath = os.path.join(source, dir)
                newName = self.decrypt_name(os.path.split(dirPath)[-1])
                if os.path.dirname(dirPath) == source:
                    sourceDirs[os.path.split(dirPath)[-1]] = newName
                os.rename(dirPath, os.path.join(source, newName))
                print("[+] Rename Dir {0} Success!!!".format(dirPath))
        return sourceDirs

def get_dirs():
    sourceDirs = {}
    for dir in os.listdir(source):
        sourceDirs[os.path.split(dir)[-1]] = ''
    return sourceDirs

def rewrite_config(sourceDirs, rename):
    themePath = os.path.join(root, "themes", "next", "_config.yml")
    with open(themePath, 'r', encoding="utf-8") as config:
        content = config.readlines()
    output = ""
    for line in content:
        change = False
        for dir in sourceDirs:
            if "  {0}: ".format(dir) in line:
                if rename:
                    output += "  {0}: /{0}/𝓲𝓷𝓭𝓮𝔁.html\n".format(sourceDirs[dir])
                else:
                    output += "  {0}: /{0}/\n".format(sourceDirs[dir])
                del sourceDirs[dir]
                change = True
                break
        if not change:
            output += line

    with open(themePath, "w", encoding="utf--8") as newConfig:
        newConfig.write(output)

def run_namer(sourceDirs):
    namer = ReNamer()
    namer.rename_files(fileTypes=fileTypes, newTitle=False, changeFileName=True)
    sourceDirs = namer.rename_dirs(sourceDirs=sourceDirs)
    rewrite_config(sourceDirs=sourceDirs, rename=True)

def run_decrypter(sourceDirs):
    decrypter = Decrypter()
    decrypter.decrypt_files(fileTypes=fileTypes, newTitle=True, changeFileName=False)
    sourceDirs = decrypter.decrypt_dirs(sourceDirs=sourceDirs)
    rewrite_config(sourceDirs=sourceDirs, rename=False)



if __name__ == "__main__":
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    source = os.path.join(root, "source")
    fileTypes = [".md"]
    sourceDirs = get_dirs()
    run_namer(sourceDirs=sourceDirs)
    # run_decrypter(sourceDirs=sourceDirs)



'''
注意：
os.path.split(dir)会返回[前面文件夹名, 当前文件夹名]
而os.path.splitext(dir)会返回[输入文件夹路径, ""]
使用时需要删除本地关于博客运行的所有进程，否则会出现如下报错：
    PermissionError: [WinError 5] 拒绝访问。:...
我把代码放在博客根目录下的Tools文件夹,根据需要将root更改即可
'''



