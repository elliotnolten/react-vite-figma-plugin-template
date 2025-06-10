import styles from "./ErrorState.module.css";

export function ErrorState() {
    return (
        <div className={styles.container}>
            <p className={styles.message}>
                Could not load model. Please try another one.
            </p>
        </div>
    );
}
