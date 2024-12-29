import { nesFrame } from "@/nes";
import { mathBetween } from "@/utils/math";

let audioCtx = new AudioContext();
let scriptProcessor: ScriptProcessorNode;
let gain = 1;
const audioBuffering = 512;
const sampleCount = 4 * 1024;
const sampleMask = sampleCount - 1;
const audioSamplesL = new Float32Array(sampleCount);
const audioSamplesR = new Float32Array(sampleCount);
let audioWriteCursor = 0;
let audioReadCursor = 0;

function audioRemain() {
  return (audioWriteCursor - audioReadCursor) & sampleMask;
}

function onAudioSample(left: number, right: number) {
  audioSamplesL[audioWriteCursor] = left;
  audioSamplesR[audioWriteCursor] = right;
  audioWriteCursor = (audioWriteCursor + 1) & sampleMask;
}

function getSampleRate() {
  if (!window.AudioContext) {
    return 44100;
  }
  const myCtx = new window.AudioContext();
  const sampleRate = myCtx.sampleRate;
  myCtx.close();

  return sampleRate;
}

function audioFrame() {
  audioCtx = new AudioContext();
  scriptProcessor = audioCtx.createScriptProcessor(audioBuffering, 0, 2);
  scriptProcessor.onaudioprocess = (event: AudioProcessingEvent) => {
    const dst = event.outputBuffer;
    const len = dst.length;
    if (audioRemain() < audioBuffering) {
      nesFrame();
    }
    const dstL = dst.getChannelData(0);
    const dstR = dst.getChannelData(1);
    for (let i = 0; i < len; i++) {
      const srcIdx = (audioReadCursor + i) & sampleMask;
      dstL[i] = audioSamplesL[srcIdx] * gain;
      dstR[i] = audioSamplesR[srcIdx] * gain;
    }

    audioReadCursor = (audioReadCursor + len) & sampleMask;
  };
  scriptProcessor.connect(audioCtx.destination);
}

function audioStop() {
  scriptProcessor.disconnect(audioCtx.destination);
  scriptProcessor.onaudioprocess = null;
  scriptProcessor = {} as ScriptProcessorNode;

  if ("close" in audioCtx) {
    audioCtx.close();
  }
}

/**
 * 🎮: Pause
 */
function suspend() {
  audioCtx.suspend();
}

/**
 * 🎮: Play
 */
function resume() {
  audioCtx.resume();
}

function setGain(n: number) {
  gain = mathBetween(n, 0, 100) / 100;
}

export {
  onAudioSample,
  nesFrame,
  audioFrame,
  audioStop,
  getSampleRate,
  setGain,
  suspend,
  resume,
};
