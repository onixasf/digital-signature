import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LOGO KP IF.png";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/dashboard");
    };
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.leftPanel}>
                    <div style={styles.logoContainer}>
                        <img src={logo} alt="Logo IF" style={styles.logo} />
                    </div>
                </div>
                <div style={styles.rightPanel}>
                    <h2 style={styles.title}>Login</h2>
                    <form style={styles.form} onSubmit={handleLogin}>
                        <label style={styles.label}>
                            NIM/NIP
                            <input type="text" placeholder="Masukkan NIM/NIP Anda" style={styles.input} />
                        </label>
                        <label style={styles.label}>
                            Password
                            <input type="password" placeholder="Masukkan password Anda" style={styles.input} />
                        </label>
                        <button type="submit" style={styles.button}>Masuk</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#FFFBE5",
        padding: "0 1rem",
    },
    card: {
        display: "flex",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "90%",
        maxWidth: "700px",
    },
    leftPanel: {
        flex: 1,
        backgroundColor: "#F7D217",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem",
        borderRadius: '0 18px 18px 0',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        overflow: 'visible',
    },
    logo: {
        height: 'auto',
        marginRight: '0.2rem',
        maxWidth: '90%',
    },
    rightPanel: {
        flex: 1,
        display: "flex",
        flexDirection: "column" as React.CSSProperties["flexDirection"],
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        marginLeft: "-20px",
        backgroundColor: "#FFFF",
    },
    title: {
        fontSize: "2rem",
        marginBottom: "1.5rem",
    },
    form: {
        display: "flex",
        flexDirection: "column" as React.CSSProperties["flexDirection"],
        width: "100%",
        maxWidth: "300px",
    },
    label: {
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column" as React.CSSProperties["flexDirection"],
    },
    input: {
        padding: "0.5rem",
        borderRadius: "10px",
        border: "1px solid #000",
        marginTop: "0.5rem",
        backgroundColor: "#FFFBE5",
        color: "#212529",
    },
    button: {
        padding: "0.5rem",
        borderRadius: "10px",
        border: "none",
        backgroundColor: "#F7D217",
        color: "#212529",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        marginTop: "1rem",
        marginBottom: "1.5rem",
        maxWidth: "100px",
        width: "100%",
        alignSelf: "center",
    },
    '@media (max-width: 600px)': {
        title: {
            fontSize: window.innerWidth < 600 ? "1.5rem" : "2rem",
        },
        button: {
            fontSize: window.innerWidth < 600 ? "0.9rem" : "1rem",
        },
    }
};

export default LoginPage;