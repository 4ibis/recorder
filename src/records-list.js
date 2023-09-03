import { createHTML } from "./utils.js";

export function RecordsList() {
  this.results = new Set();
  var index = 0;

  this.play = (url) => this.player.playPause(url);

  this.add = (file) => {
    var url = URL.createObjectURL(file);
    this.results.add(url, file);

    var html = createHTML(url, `Record #${++index}`);
    document
      .getElementById("recordsList")
      .insertAdjacentHTML("beforeend", html);
  };
}
