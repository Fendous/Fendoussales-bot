interface AudioRecorderType {
  chunks: Blob[];
  recorder: MediaRecorder | null;
  mediaStream: MediaStream | null; // Add mediaStream to manage tracks
  start: () => void;
  pause: () => void;
  stop: () => Promise<any>;
}

export const audioRecorder: AudioRecorderType = {
  chunks: [],
  recorder: null,
  mediaStream: null,
  start: function () {
    console.log("Recording audio...");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.mediaStream = stream; // Store the media stream
          this.recorder = new MediaRecorder(stream);
          this.recorder.ondataavailable = (e) => {
            this.chunks.push(e.data);
          };
          this.recorder.start();
        })
        .catch((err) => {
          console.error(`The following getUserMedia error occurred: ${err}`);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  },
  pause: function () {
    if (this.recorder?.state === "recording") {
      console.log("Recording paused");
      this.recorder?.pause();
    } else {
      console.log("No active recording");
    }
  },
  stop: function () {
    return new Promise<any>((resolve) => {
      if (this.recorder) {
        this.recorder.onstop = () => {
          console.log("Recorder stopped");
          const blob = new Blob(this.chunks, {
            type: "audio/mp3; codecs=opus",
          });
          const audioURL = window.URL.createObjectURL(blob);
          const file = new File([blob], "recording.mp3", {
            type: "audio/mp3",
          });

          this.chunks = []; // Reset the chunks array after creating the URL

          // Stop all tracks in the media stream
          this.mediaStream?.getTracks().forEach((track) => track.stop());
          this.mediaStream = null;

          resolve({ audioURL: audioURL, audioFile: file });
        };
        this.recorder.stop();
      } else {
        resolve(undefined);
      }
    });
  },
};

export const getTextFromAudio = async (file: File) => {
  const formData = new FormData();
  formData.append("audioFile", file);

  const response = await fetch("/api/speech-to-text", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch text from audio");
  }

  const data = await response.json();

  return data;
};
