import styles from "./button.module.scss"

const icons: { [key: string]: any } = {
    leftin: [{ "background-position": "0px -53px" }],
    rightin: [{ "background-position": "0px -53px" }],
}




export default function Button({ title, className, onClick, icon }: { title?: string, className?: string, onClick?: () => void, icon?: string | number } = { icon: "leftin", title: "" }) {
    return <div onClick={onClick} className={styles.body + " " + className} style={icons[icon || ""] ? icons[icon || ""][0] : {}}


    > {title || ""}
    </div >
}