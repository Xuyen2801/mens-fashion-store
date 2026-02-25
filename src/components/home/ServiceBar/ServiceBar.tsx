import ServiceItem from "./ServiceItem";
import styles from "./ServiceBar.module.css";

const services = [
    {
        icon: "/icons/shipping.svg",
        title: "Miễn phí vẫn chuyển",
        desc: "Đơn từ 32k",
    },
    {
        icon: "/icons/return.svg",
        title: "Đổi trả tận nhà",
        desc: "Trong vòng 15 ngày",
    },
    {
        icon: "/icons/cod.svg",
        title: "Hỗ trợ tận nhà",
        desc: "Yên tâm mua sắm"
    },
    {
        icon: "/icons/hotline.svg",
        title: "Hotline: 028.73066.060",
        desc: "Hỗ trợ 8h30-24h00",
    },
];

export default function ServiceBar() {
    return (
        <div className={styles.container}>
            {services.map((item, index) =>(
              <ServiceItem key={index} {...item}/>  
            ))}  
        </div>
    );
}