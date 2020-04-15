import json
import os

# 获取emoji代码数据
def get_emojis():
    import requests
    import parsel
    from urllib.request import urlretrieve

    if not os.path.exists("./unavailable_emojis"):
        os.mkdir("./unavailable_emojis")

    session = requests.Session()
    sel = parsel.Selector(session.get("https://www.webfx.com/tools/emoji-cheat-sheet/").text)
    session.close()
    uls = sel.xpath("//ul[contains(@id, 'emoji')]")
    name = ''
    emojis = {}
    for ul in uls:
        type = ul.xpath("./attribute::id").extract_first().replace("emoji-", "").title()
        emojis[type] = {}
        lis = ul.xpath("./li/div")
        for li in lis:
            src = li.xpath("./span[@class='emoji']/attribute::data-src").extract_first()
            name = os.path.splitext(os.path.split(src)[-1])[0]
            allowed = True
            for un_emoji in un_emojis:
                if un_emoji == name:
                    allowed = False
                    break
            if allowed:
                emoji = li.xpath("string(.)").extract_first().replace("\n", '')
                emojis[type][emoji] = emoji
            else:
                link = 'https://www.webfx.com/tools/emoji-cheat-sheet/' + src
                urlretrieve(link, "./unavailable_emojis/" + name + '.png')

    data = json.dumps(emojis, indent=4)
    with open("emojis.json", 'w') as js:
        js.write(data)

# 写入md文章
def write():
    with open("emojis.json", 'r') as js:
        emojis = json.load(js)
    md = open(".\\emoji代码对照表.md", 'w', encoding="utf-8")
    content = "---\ntitle: emoji代码对照表\ndate: 2020-03-29 13:17:16\ntags:\n  - writing\n---\n\n:heart::heart::heart:\n<!-- more -->\n\n"
    content += "[json数据](/codes/Json/emojis.json)\n"
    content += '[不可用的 `emoji` 代码的json数据](/codes/Json/unavailable_emojis.json)\n\n'
    id = 1
    for type, items in emojis.items():
        content += '\n## {0}\n'.format(type)
        count = 0
        for emoji, code in items.items():
            content += "<span class='emoji' id='em_{0}'>{1} `{2}` </span>  ".format(id, emoji, code)
            if count == 3:
                content += "\n"
                count = 0
            count += 1
            id += 1
    content += "\n## Unavailable Emojis Code :disappointed:\n"
    id = 1
    for type, items in unavailable_emojis.items():
        content += '\n## {0}\n'.format(type)
        count = 0
        for emoji, code in items.items():
            content += '<img class="nofancybox" src="{0}"><span class="un_em_{1}"> `{2}` </span>  '.format('/_posts/𝓮𝓶𝓸𝓳𝓲代码对照表/images/𝓾𝓷𝓪𝓿𝓪𝓲𝓵𝓪𝓫𝓵𝓮_𝓮𝓶𝓸𝓳𝓲𝓼/' + emoji.replace(":", '') + '.png', id, code)
            id += 1
            if count == 3:
                content += '\n'
                count = 0
            count += 1
    content += '\n# 更多的Unicode表情\n'
    content += '[Copy](https://www.emojicopy.com/)\n'
    md.write(content)
    md.close()

if __name__ == "__main__":
    with open("unavailable_emojis.json", 'r') as js:
        unavailable_emojis = json.load(js)
    un_emojis = []
    for lists in unavailable_emojis.values():
        for item in lists.keys():
            un_emojis.append(item.replace(":", ''))
    #get_emojis()
    write()
