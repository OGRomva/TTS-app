// import Header from './Header/Header';
import { FC, PropsWithChildren } from "react";
import styles from "./Layout.module.scss";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.Layout}>
            <div className={styles.InnerBox}>{children}</div>
        </div>
    );
};
