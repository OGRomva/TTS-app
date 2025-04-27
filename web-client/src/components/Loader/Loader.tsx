import { FC } from "react";
import styles from "./Loader.module.scss";

interface ILoaderProps {}

export const Loader: FC<ILoaderProps> = (props) => {
    return <div className={styles.Loader}>Loading....</div>;
};
