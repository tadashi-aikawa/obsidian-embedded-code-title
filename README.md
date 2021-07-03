Obsidian Embedded Code Title Plugin
===================================

This is an Obsidian plugin which can embeds title to code blocks.

**⚠ There is a possibility that this plugin doesn't work someday because it depends on the internal DOM structure of Obsidian.**

![Demo](demo.mp4)

## Use on Obsidian Publish

You can also use it on the published site by Obsidian Publish with `publish.js` and `publish.css`. Please see [my published site](https://minerva.mamansoft.net/Obsidian/Obsidian+Publish%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%81%A7%E3%82%B3%E3%83%BC%E3%83%89%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E3%81%AB%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E5%90%8D%E3%82%92%E5%9F%8B%E3%82%81%E8%BE%BC%E3%82%80) as examples.

### `publish.js`

```js
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

const insertFileNamesIntoCodeBlocks = debounce(() => {
  document.querySelectorAll('pre[class*="language-"]').forEach((wrapperElm) => {
    let fileName = wrapperElm
      .querySelector("code")
      .className.split(" ")
      .find((x) => x.startsWith(":"))
      ?.replace(":", "");
    if (!fileName) {
      return;
    }

    wrapperElm.style.position = "relative";
    wrapperElm.style["padding-top"] = "30px";

    let d = document.createElement("pre");
    d.appendText(fileName);
    d.style.position = "absolute";
    d.style.top = "0";
    d.style.left = "0";
    d.style.padding = "3px";
    d.style.margin = "0";
    d.style["background-color"] = "#1c1c1c";
    d.style.color = "darkgrey";
    d.style["border-radius"] = "0";

    wrapperElm.prepend(d);
  });
}, 150);

const target = document.querySelector(".markdown-preview-section");
const observer = new MutationObserver(insertFileNamesIntoCodeBlocks);
observer.observe(target, {
  childList: true,
});

setTimeout(insertFileNamesIntoCodeBlocks, 600);
```

### `publish.css`

```css
.obsidian-embedded-code-title__code-block-title {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 85% !important;
  padding: 3px !important;
  margin: 0 !important;
  background-color: #1c1c1c !important;
  color: darkgrey !important;
  border-radius: 0 !important;
}
```
