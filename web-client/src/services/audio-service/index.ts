import { $api } from "api";
import { AxiosError } from "axios";
import { GenerateAudioRequest, URL_ROUTES } from "types";

export class AudioService {
    static async getAudio(request: GenerateAudioRequest) {
        const formData = new FormData();

        formData.append("text", request.text);
        formData.append("speaker_wav", request.voiceSample);

        const headers = {
            "Content-Type": "multipart/form-data",
        };

        const data = await $api.post(URL_ROUTES.GENERATE_AUDIO, formData, {
            headers: headers,
            responseType: "blob",
        });

        if (data instanceof AxiosError) {
            throw new Error(data.data);
        }

        return data.data;
    }
}
