import { userMediaConstrains } from "./constant.js";
import { RecordsList } from "./records-list.js";
import { log, resolveMediaRecorderOptions } from "./utils.js";

var controls = document.querySelector(".controls");
var toggleRecording = () => controls.classList.toggle("recording");

var showRecords = () =>
  document.querySelector(".records").classList.remove("d-none");

function App() {
  this.records = new RecordsList();
  var hasResults = false;

  this.onStart = () => {
    console.log("onStart");
    toggleRecording();
  };

  this.onStop = () => {
    console.log("onStop : file :", this.file);
    this.records.add(this.file);
    toggleRecording();
    if (!hasResults) {
      hasResults = true;
      showRecords();
    }
  };

  this.onError = (error) => {
    console.error(error);
  };
}

export class Recorder extends App {
  mediaRecorder;
  mediaRecorderOptions = resolveMediaRecorderOptions();
  recordedChunks = [];
  stream;
  timeSlice = 200;
  file;

  isRecording() {
    return this.mediaRecorder?.state === "recording";
  }

  start() {
    this.clean();
    navigator.mediaDevices
      .getUserMedia(userMediaConstrains)
      .then((stream) => {
        this.stream = stream;
        this.mediaRecorder = new MediaRecorder(
          stream,
          this.mediaRecorderOptions
        );
        this.addListeners();
        this.mediaRecorder.start(this.timeSlice);
        this.onStart();
      })
      .catch((error) => {
        this.onError(error);
      });
  }

  stop() {
    log("recorder.stop");
    this.mediaRecorder.stop();
    this.file = new Blob(this.recordedChunks, {
      type: this.mediaRecorderOptions.mimeType,
    });
    this.onStop();
  }

  clean() {
    log("recorder.restart()");
    this.file = null;
    this.recordedChunks = [];
  }

  addListeners() {
    // default window.MediaRecorder events
    this.mediaRecorder.ondataavailable = (event) => {
      log("recorder.onData");
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };
    this.mediaRecorder.onstop = () => {
      log("recorder.onStop");
      this.stream.getAudioTracks().forEach((track) => track.stop());
    };
  }
}
