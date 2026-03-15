import Link from "next/link";
import Image from "next/image";
import styles from "./mixmatch.module.css";

interface Props{
    image: string;
    title: string;
    link: string;
}

function MixMatchItem({image, title, link}: Props) {
    return(
        <Link href={link} className={styles.item}>
            <div className={styles.imageWrapper}>
                <Image src={image} alt={title} fill className={styles.image}/>
            </div>
            <h3 className={styles.title}>{title}</h3>
        </Link>
    )
}

export default MixMatchItem;