import { UPLOAD_STATUS } from "types";
import { AudioStore } from "../audio-store"

export const uploadAudioProcess = (instanse: AudioStore) => {
    return function(file: File) {
        instanse.uploadedFile = file;
        instanse.uploadStatus = UPLOAD_STATUS.DONE
    }
}