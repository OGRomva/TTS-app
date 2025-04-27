import { makeAutoObservable } from "mobx";
import { AudioStore } from "stores/audio-store";

export class RootStore {
    constructor() {
        makeAutoObservable(this);
        this.audioStore = new AudioStore();
    }

    audioStore: AudioStore;
}
