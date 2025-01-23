import styles from "./styles.module.css";

export default function Em({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <span className={styles["em"]}>{children}</span>;
}
