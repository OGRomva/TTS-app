import { AudioStore } from "../audio-store";

export const downloadAudioProcess = (instanse: AudioStore) => {
    return function () {
        try {
            const href = URL.createObjectURL(instanse.downloadedFile);
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', `${instanse.downloadedFile.name}.wav`);
            document.body.appendChild(link);
            link.click();
            document.removeChild(link);
            URL.revokeObjectURL(href);
        } catch (e) {
            console.log(e)
        }
    }
}