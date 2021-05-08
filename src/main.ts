import { Chromagram } from "./Chromagram";
import { ChordDetector } from "./ChordDetector";

enum RootNotes {
    C = "C",
    CSHARPDFLAT = "C#/Db",
    D = "D",
    DSHARPEFLAT = "D#/Eb",
    E = "E",
    F = "F",
    FSHARPGFLAT = "F#/Gb",
    G = "G",
    GSHARPAFLAT = "G#/Ab",
    A = "A",
    ASHARPBFLAT = "A#/Bb",
    B = "FLAT",
}

const notes = [
    RootNotes.C,
    RootNotes.CSHARPDFLAT,
    RootNotes.D,
    RootNotes.DSHARPEFLAT,
    RootNotes.E,
    RootNotes.F,
    RootNotes.FSHARPGFLAT,
    RootNotes.G,
    RootNotes.GSHARPAFLAT,
    RootNotes.A,
    RootNotes.ASHARPBFLAT,
    RootNotes.B,
];

type Chord = { rootNote: RootNotes; quality: number; interval: number };

export function prettifyChord(
    rootNote: number,
    quality: number,
    interval: number
): Chord {
    return { rootNote: notes[rootNote], quality, interval };
}

/** Performs the chord detection algorithm on the array containing the sound data
      @param audioBuffer Buffer than contains the sound data
      @param sampleRate the sampling frequency
      @param frameSize the input audio frame size
      @returns An array of chords 
    */
export function detectChords(
    audioBuffer: Float64Array | Float32Array,
    sampleRate: number,
    frameSize: number
): Chord[] {
    let chroma_builder = new Chromagram(frameSize, sampleRate);
    let detector = new ChordDetector();
    let frame = new Float64Array(frameSize);
    let chords = [];
    for (let i = 0; i < audioBuffer.length; i = i + frameSize) {
        for (let k = 0; k < frameSize; k++) {
            frame[k] = audioBuffer[i + k];
        }
        chroma_builder.processAudioFrame(frame);
        if (chroma_builder.isReady()) {
            detector.detectChord(chroma_builder.getChromagram());
            chords.push(
                prettifyChord(
                    detector.rootNote,
                    detector.quality,
                    detector.intervals
                )
            );
        }
    }
    return chords;
}

export { ChordDetector, Chromagram };
