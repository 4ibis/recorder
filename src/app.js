import { selectors } from "./constant.js";
import { Recorder } from "./recorder.js";

// todo: better handle mediarecorder error
if (!window.MediaRecorder) {
  throw new Error("window.MediaRecorder is required");
}

var recorder = new Recorder();

document.getElementById(selectors.recordBtn).addEventListener("click", () => {
  recorder.isRecording() ? recorder.stop() : recorder.start();
});
