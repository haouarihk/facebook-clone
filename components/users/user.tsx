
import styles from "./user.module.scss"
export default function User({ id, hideName }: { id: string | null, hideName?: boolean }) {
    return <div className={styles.body}>
        <img className={styles.image} src={`https://www.gravatar.com/avatar/${id}?s=100`} />
        {!hideName ? <h1 className={styles.name}>text user</h1> : ""}
    </div>
}