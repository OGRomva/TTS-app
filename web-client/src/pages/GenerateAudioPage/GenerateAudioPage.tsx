import { AudioPlayer, Loader } from "components";
import styles from "./GenerateaudioPage.module.scss";
import { useStore } from "context";
import { observer } from "mobx-react-lite";
import { DOWNLOAD_STATUS, UPLOAD_STATUS } from "types";

export const GenerateAudioPage = observer(() => {
    const { audioStore } = useStore();

    const uploadFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length !== 1) {
            event.target.files = {} as FileList;
            alert("Please, select only one file!");
            audioStore.uploadStatus = UPLOAD_STATUS.UNDEFINED;
        }

        audioStore.uploadFile(event.target.files[0]);
    };

    const changeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) {
            alert("The field text is required! Please? fill this");
        }
        audioStore.setText(event.target.value);
    };

    const generateAudioHandler = () => {
        audioStore.generateAudio();
    };

    const downloadFileHandler = () => {
        audioStore.downloadAudio();
    };

    return (
        <div className={styles.GenerateAudioPage}>
            <div className={styles.UploadLayout}>
                <div className={styles.UploadInput}>
                    <label>Семпл голоса, формат wav, моно, 20khz</label>
                    <input
                        type="file"
                        accept="audio/wav"
                        onChange={uploadFileHandler}
                    />
                </div>
                {audioStore.uploadStatus === UPLOAD_STATUS.DONE && (
                    <AudioPlayer file={audioStore.uploadedFile}></AudioPlayer>
                )}
            </div>
            <div className={styles.TextInput}>
                <div className={styles.InputTextLayout}>
                    <label>Текст для озвучки</label>
                    <input type="textarea" onChange={changeTextHandler} />
                </div>
                <button onClick={generateAudioHandler}>
                    Сгенерировать аудиофайл
                </button>
            </div>
            <div className={styles.DownloadLayout}>
                {audioStore.downloadedStatus === DOWNLOAD_STATUS.LOADING && (
                    <Loader />
                )}
                {audioStore.downloadedStatus === DOWNLOAD_STATUS.DONE && (
                    <AudioPlayer file={audioStore.downloadedFile}></AudioPlayer>
                )}
                {audioStore.downloadedStatus === DOWNLOAD_STATUS.DONE && (
                    <button onChange={downloadFileHandler}>
                        Скачать аудиофайл
                    </button>
                )}
            </div>
        </div>
    );
});
