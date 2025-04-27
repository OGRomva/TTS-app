import { FC } from "react";
import styles from "./AudioPlayer.module.scss";
import { observer } from "mobx-react-lite";

interface IAudioProps {
    file: File;
}

export const AudioPlayer: FC<IAudioProps> = observer((props) => {
    const href = URL.createObjectURL(props.file);
    return (
        <div className={styles.player}>
            <audio controls>
                <source src={href} type="audio/wav" />
            </audio>
        </div>
    );
});
