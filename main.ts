import { Plugin } from "obsidian";

export default class MyPlugin extends Plugin {
  insertFileNamesIntoCodeBlocks() {
    this.app.workspace.containerEl
      .querySelectorAll<HTMLPreElement>('pre[class*="language-"]')
      .forEach((wrapperElm) => {
        let fileName = wrapperElm
          .querySelector("code")
          .className.split(" ")
          .find((x) => x.startsWith(":"))
          ?.replace(":", "");
        if (!fileName) {
          return;
        }

        wrapperElm.style.position = "relative";
        wrapperElm.style.paddingTop = "30px";

        wrapperElm
          .querySelectorAll(".obsidian-embedded-code-title__code-block-title")
          .forEach((x) => x.remove());

        let d = document.createElement("pre");
        d.appendText(fileName);
        d.className = "obsidian-embedded-code-title__code-block-title";
        wrapperElm.prepend(d);
      });
  }

  async onload() {
    console.log("loading Embedded Code Title plugin");

    let observer: MutationObserver;

    this.app.workspace.onLayoutReady(() => {
      const observe = () => {
        observer?.disconnect();
        observer = new MutationObserver(() =>
          this.insertFileNamesIntoCodeBlocks()
        );

        const targets = this.app.workspace.containerEl.querySelectorAll(
          ".markdown-preview-section"
        );
        targets.forEach((t) => {
          observer.observe(t, {
            childList: true,
          });
        });

        this.insertFileNamesIntoCodeBlocks();
      };

      this.app.workspace.on("layout-change", () => {
        observe();
      });

      observe();
    });
  }
}
