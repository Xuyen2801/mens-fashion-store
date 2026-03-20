import React from 'react';
import styles from './InstagramSection.module.css';

const InstagramSection = () => {
    const INSTAGRAM_URL = "https://www.instagram.com/icondenim/"; 

    const instaData = [
        { id: 1, fileName: 'ao_khoac.jpg' },
        { id: 2, fileName: 'ao_thun_do.jpg' },
        { id: 3, fileName: '2_ao_khoac.jpg' },
        { id: 4, fileName: 'co_ao_khhoac.jpg' },
        { id: 5, fileName: 'ao_po_lo.jpg' },
    ];

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>
                FOLLOW INSTAGRAM <span className={styles.handle}>@ICONDENIM</span>
            </h2>
            
            <div className={styles.grid}>
                {instaData.map((item) => (
                    <a 
                        href={INSTAGRAM_URL} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        key={item.id} 
                        className={styles.imageWrapper}
                    >
                        <img 
                            src={`/images/ins/${item.fileName}`} 
                            alt={`Instagram Fashion ${item.id}`} 
                            className={styles.image}
                        />
                        <div className={styles.overlay}>
                            <div className={styles.iconCircle}>
                                <img src="/icon/instagram.png" alt="Icon" className={styles.instaIcon} />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default InstagramSection;