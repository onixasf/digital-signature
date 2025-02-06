import React from "react";
import logo from "../assets/LOGO KP IF.png";

const Footer: React.FC = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.logoContainer}>
                    <img src={logo} alt="Logo IF" style={styles.logo} />
                    <div style={styles.titles}>
                        <h4 style={styles.title}>Teknik Informatika</h4>
                        <h4 style={styles.subtitle}>Universitas Islam Negeri Sunan Gunung Djati</h4>
                    </div>
                </div>
                <p>Jalan A.H Nasution No. 105, Cipadung, Cibiru, Kota Bandung, Jawa Barat 40614</p>
                <hr style={styles.separator} />
                <p>&copy; Copyright 2025 by Teknik Informatika, Onixa Shafa Putri Wibowo & Siti Nurbayanah</p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: "#F7D217",
        color: "#212529",
        padding: "2rem",
        position: "relative" as const,
        bottom: 0,
    },
    container: {
        maxWidth: "2000px",
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'stretch',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        overflow: 'visible',
        flex: '1 1 auto',
    },
    titles: {
        marginLeft: '1rem',
    },
    logo: {
        height: '4em',
        marginRight: '0.2rem',
    },
    title: {
        margin: "0",
        fontSize: "1.2rem",
        fontWeight: "500",
    },
    subtitle: {
        margin: "0",
        fontSize: "1.2rem",
        fontWeight: "500",
    },
    separator: {
        width: "100%",
        border: "none",
        borderTop: "1px solid #212529",
        margin: "1rem 0",
    },
};

export default Footer;