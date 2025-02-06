import React from "react";
import logo from "../assets/LOGO KP IF.png";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/ui/Button";

interface HeaderProps {
    userRole: string;
}

const Header: React.FC<HeaderProps> = ({ userRole }) => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        if (userRole === "user") {
            navigate("/dashboard");
        } else if (userRole === "admin") {
            navigate("/dashboard-admin");
        } else if (userRole === "dosen") {
            navigate("/dashboard-dosen");
        } else if (userRole == "kajur"){
            navigate("/dashboard-kajur");
        }
    };

    return (
        <header style={styles.header}>
            <div style={styles.yellowSection}></div>
            <div style={styles.whiteSection}>
                <div style={{ ...styles.logoContainer, cursor: 'pointer' }} onClick={handleLogoClick}>
                    <img src={logo} alt="Logo IF" style={styles.logo} />
                    <div>
                        <span style={styles.title}>TEKNIK</span>
                        <span style={styles.title}>INFORMATIKA</span>
                    </div>
                </div>
                {userRole === 'user' && (
                    <CustomButton
                        label="Ajukan Penandatanganan"
                        onClick={() => navigate("/signature-request", { state: { userRole: ["user"] } })}
                    />
                )}
                {userRole === 'admin' && (
                    <CustomButton
                        label="Ajukan Penandatanganan"
                        onClick={() => navigate("/signature-request", { state: { userRole: ["admin"] } })}
                    />
                )}
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: "block",
    },
    yellowSection: {
        height: '35px',
        backgroundColor: '#F7D217',
        color: '#242424',
    },
    whiteSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 5rem',
        backgroundColor: '#ffffff',
        flexWrap: 'wrap' as React.CSSProperties["flexWrap"],
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        overflow: 'visible',
        flex: '1 1 auto',
    },
    logo: {
        height: '4em',
        marginRight: '0.2rem',
    },
    title: {
        display: 'block',
        fontSize: '1.3em',
        fontWeight: '600',
    },
};

export default Header;