# Obsidian Embedded Code Title Plugin

[![release](https://img.shields.io/github/release/tadashi-aikawa/obsidian-embedded-code-title.svg)](https://github.com/tadashi-aikawa/obsidian-embedded-code-title/releases/latest)
![downloads](https://img.shields.io/github/downloads/tadashi-aikawa/obsidian-embedded-code-title/total)

This is an [Obsidian] plugin which can embeds title to code blocks.

**⚠ There is a possibility that this plugin doesn't work someday because it depends on the internal DOM structure of Obsidian.**

![Demo](https://raw.githubusercontent.com/tadashi-aikawa/obsidian-embedded-code-title/master/resource/demo.gif)

## 🖋 Examples

### No file name

````markdown
```python
def main():
    pass
```
````

↓

![img.png](https://raw.githubusercontent.com/tadashi-aikawa/obsidian-embedded-code-title/master/resource/img.png)

### No file name but show a language name

````markdown
```python:
def main():
    pass
```
````

↓

![img_1.png](https://raw.githubusercontent.com/tadashi-aikawa/obsidian-embedded-code-title/master/resource/img_1.png)

### With a file name

````markdown
```python:main.py
def main():
    pass
```
````

↓

![img_2.png](https://raw.githubusercontent.com/tadashi-aikawa/obsidian-embedded-code-title/master/resource/img_2.png)

### With a file name includes half spaces

If you configure as the follows.

![img_4.png](https://raw.githubusercontent.com/tadashi-aikawa/obsidian-embedded-code-title/master/resource/img_4.png)

Then

````markdown
```python:main\sincludes\sspace.py
def main():
    pass
```
````

↓

![img_3.png](https://raw.githubusercontent.com/tadashi-aikawa/obsidian-embedded-code-title/master/resource/img_3.png)

## 🌍 Use on Obsidian Publish

If [you can use a custom domain on Obsidian Publish], you can also use features of this plugin on the published site by Obsidian Publish with `publish.js` and `publish.css.` You can download `publish.js` and `publish.css` on the [Latest release page]. Please see [my published site] as examples.

[you can use a custom domain on Obsidian Publish]: https://help.obsidian.md/Licenses+%26+add-on+services/Obsidian+Publish#Custom+domain
[Latest release page]: https://github.com/tadashi-aikawa/obsidian-embedded-code-title/releases/latest
[my published site]: https://minerva.mamansoft.net/Obsidian/Obsidian+Publish%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%81%A7%E3%82%B3%E3%83%BC%E3%83%89%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E3%81%AB%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E5%90%8D%E3%82%92%E5%9F%8B%E3%82%81%E8%BE%BC%E3%82%80

## 🖥️ For developers

### Development

```console
task init
task dev
```

### Release

```
task release VERSION=1.2.3
```

[Obsidian]: https://obsidian.md/
[Task]: https://taskfile.dev/#/
