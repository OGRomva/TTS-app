import { makeAutoObservable } from "mobx";
import { DOWNLOAD_STATUS, UPLOAD_STATUS } from "types";
import {
    downloadAudioProcess,
    generateAudioProcess,
    uploadAudioProcess,
} from "./actions";

export class AudioStore {
    constructor() {
        makeAutoObservable(this);
        this.generateAudio = generateAudioProcess(this);
        this.downloadAudio = downloadAudioProcess(this);
        this.uploadFile = uploadAudioProcess(this);
    }

    uploadedFile: File = {} as File;
    uploadStatus: UPLOAD_STATUS = UPLOAD_STATUS.UNDEFINED;
    downloadedFile: File = {} as File;
    downloadedStatus: DOWNLOAD_STATUS = DOWNLOAD_STATUS.UNDEFINED;
    text: string = '';

    generateAudio: () => Promise<void>;
    uploadFile: (file: File) => void;
    downloadAudio: () => void;

    setText(text: string) {
        this.text = text
    } 
}
