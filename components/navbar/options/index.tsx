import styles from "./index.module.scss";
import Option from "./option";
export default function options({ selected, onChange }: { selected: string, onChange: (value: string) => void }) {
    return <div className={styles.options}>
        <Option id={"0"} selected={selected} onclick={onChange} logo={"🧻"} />
        <Option id={"1"} selected={selected} onclick={onChange} logo={"🫂"} />
        <Option id={"2"} selected={selected} onclick={onChange} logo={"⚙️"} />
    </div>
}
