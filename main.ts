import { App, Plugin, PluginSettingTab, Setting } from "obsidian";

interface Settings {
  substitutionTokenForSpace: string;
}

const DEFAULT_SETTINGS: Settings = {
  substitutionTokenForSpace: undefined,
};

// Refer https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^=!:${}()|[\]\/\\]/g, "\\$&");
}

export default class EmbeddedCodeTitlePlugin extends Plugin {
  settings: Settings;

  insertFileNamesIntoCodeBlocks(el: HTMLElement) {
    const wrapperElm = el.querySelectorAll("pre").item(0);
    if (!wrapperElm) {
      return;
    }

    const settings = this.settings;

    let title;
    const classNames = wrapperElm.querySelector("code").className.split(":");
    title = classNames?.[1];

    // ---------------------------------------------------------
    // Enable to use same codes since here for Obsidian Publish
    // ---------------------------------------------------------
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

    wrapperElm.style.position = "relative";
    wrapperElm.style.paddingTop = "30px";

    wrapperElm
      .querySelectorAll(".obsidian-embedded-code-title__code-block-title")
      .forEach((x) => x.remove());

    let d = document.createElement("pre");
    d.appendText(title);
    d.className = "obsidian-embedded-code-title__code-block-title";
    wrapperElm.prepend(d);
  }

  async onload() {
    console.log("loading Embedded Code Title plugin");
    await this.loadSettings();
    this.addSettingTab(new EmbeddedCodeTitleTab(this.app, this));

    this.registerMarkdownPostProcessor((el) =>
      this.insertFileNamesIntoCodeBlocks(el)
    );
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class EmbeddedCodeTitleTab extends PluginSettingTab {
  plugin: EmbeddedCodeTitlePlugin;

  constructor(app: App, plugin: EmbeddedCodeTitlePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Substitution token for space")
      .setDesc("The token which substitutes to space.")
      .addText((tc) =>
        tc
          .setPlaceholder("Enter a token")
          .setValue(this.plugin.settings.substitutionTokenForSpace)
          .onChange(async (value) => {
            this.plugin.settings.substitutionTokenForSpace = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
