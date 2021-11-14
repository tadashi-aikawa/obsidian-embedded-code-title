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

// Avoid multiple executions
const insertFileNamesIntoCodeBlocks = () => {
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
};

insertFileNamesIntoCodeBlocks();
setInterval(insertFileNamesIntoCodeBlocks, 1000);
