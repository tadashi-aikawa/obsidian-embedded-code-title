// *******************
// Embedded Code Title
// *******************
const settings = {
  substitutionTokenForSpace: undefined,
  titleBackgroundColor: "#1c1c1c",
  titleFontColor: "darkgrey",
};

// Refer https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
function escapeRegExp(str) {
  return str.replace(/[.*+?^=!:${}()|[\]\/\\]/g, "\\$&");
}

// Refer https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_debounce
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
    if (immediate && !timeout) {
      func.apply(context, args);
    }
  };
}

// Avoid multiple executions
const insertFileNamesIntoCodeBlocks = debounce(() => {
  document.querySelectorAll('pre[class*="language-"]').forEach((wrapperElm) => {
    let title;
    const classNames = wrapperElm.querySelector("code").className.split(" ");
    title = classNames.find((x) => x.startsWith(":"))?.replace(":", "");
    if (title === "") {
      title = classNames
        .find((x) => x.startsWith("language-"))
        ?.replace("language-", "");
    }
    if (!title) {
      return;
    }
    if (settings.substitutionTokenForSpace) {
      title = title.replace(
        new RegExp(escapeRegExp(settings.substitutionTokenForSpace), "g"),
        " "
      );
    }

    wrapperElm.style.setProperty("position", "relative", "important");
    wrapperElm.style.setProperty("padding-top", "30px", "important");

    wrapperElm
      .querySelectorAll(".obsidian-embedded-code-title__code-block-title")
      .forEach((x) => x.remove());

    let d = document.createElement("pre");
    d.appendText(title);
    d.className = "obsidian-embedded-code-title__code-block-title";
    d.style.color = settings.titleFontColor;
    d.style.backgroundColor = settings.titleBackgroundColor;
    wrapperElm.prepend(d);
  });
}, 150);

// Insert file names into code blocks when changing a page (updating child DOM list in a preview section).
const target = document.querySelector(".markdown-preview-section");
const observer = new MutationObserver(insertFileNamesIntoCodeBlocks);
observer.observe(target, {
  childList: true,
});

// For initial drawing
setTimeout(insertFileNamesIntoCodeBlocks, 150);
// Depending on the timing, it may not be executed
setTimeout(insertFileNamesIntoCodeBlocks, 1000);
setTimeout(insertFileNamesIntoCodeBlocks, 2000);
setTimeout(insertFileNamesIntoCodeBlocks, 4000);
