import { flow } from "mobx";
import { AudioStore } from "../audio-store";
import { DOWNLOAD_STATUS, GenerateAudioRequest, UPLOAD_STATUS } from "types";
import { AudioService } from "services";

export const generateAudioProcess = (instanse: AudioStore) => {
    return flow(function* () {
        try {
            if (
                instanse.uploadStatus === UPLOAD_STATUS.UNDEFINED
            ) {
                throw new Error("The audio sample was not uploaded!");
            }

            if (instanse.text.length === 0) {
                throw new Error("The text can not to be empty!");
            }

            instanse.downloadedStatus = DOWNLOAD_STATUS.LOADING;

            const request: GenerateAudioRequest = {
                text: instanse.text,
                voiceSample: instanse.uploadedFile,
            };

            const data = yield AudioService.getAudio(request);

            instanse.downloadedFile = data
            instanse.downloadedStatus = DOWNLOAD_STATUS.DONE
        } catch (err) {
            console.log(err);
            instanse.downloadedStatus = DOWNLOAD_STATUS.FAILED
        }
    });
};
