import styles from "./VoucherSection.module.css";
import vouchers from "../../../data/voucher";


function VoucherSection(){
    return(
        <section className={styles.section}>
            <h2 className={styles.title}>ƯU ĐÃI KHAI XUÂN</h2>

            <div className={styles.list}>
                {vouchers.map((voucher) =>(
                    <div key={voucher.id} className={styles.card}>
                        <img src={voucher.image} alt={voucher.title} />
                    </div>
                ))}
            </div>
        </section>
    )
}
export default VoucherSection;