"use client";
import styles from "./VoucherSection.module.css";
import { useEffect, useState } from "react";
import { fetchCollection } from "../../../lib/api";


function VoucherSection(){
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        fetchCollection("voucher")
            .then((data) => {
                const list = Array.isArray(data) ? data[0]?.voucherData ?? data : [];
                setVouchers(Array.isArray(list) ? list : []);
            })
            .catch((error) => console.error("Failed to load vouchers:", error));
    }, []);

    return(
        <section className={styles.section}>

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