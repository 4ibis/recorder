import { iconDownloadSVG } from "./constant.js";

export var resolveMediaRecorderOptions = () => {
  let result;
  const audioTypes = ["audio/webm", "audio/ogg", "audio/wav", "audio/mp4"];
  audioTypes.forEach((type) => {
    if (window.MediaRecorder.isTypeSupported(type)) {
      console.log("TypeSupported: ", type);
      result = { mimeType: type };
    }
  });
  if (!result) {
    throw Error("AudioTypeSupportError: known audio types are not supported");
  }
  // todo: fix never type
  return result;
};

export function log(...args) {
  if (window.DEBUG_MODE) {
    const _args = [...args];
    console.log("app:log", ..._args);
  }
}

export var createHTML = (url, name) => {
  var download = name.replace(" #", "_");
  return `
    <li>
      <div>
        <span>${name}</span>
        <audio src="${url}" controls preload></audio>
        <a href="${url}" tabindex="0" download="${download}">${iconDownloadSVG}</a>
      </div>
    </li>
  `;
};
