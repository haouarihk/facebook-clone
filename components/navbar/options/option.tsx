import styles from "./option.module.scss"

export default function Option({ selected, logo, id, onclick }: { selected: string, logo: string, id: string, onclick: (id: string) => void }) {
    const className = selected === id ? " " + styles.selected : "";
    return (
        <button onClick={(e) => onclick(id)} className={styles.option + className}> {logo}</button >
    );
}