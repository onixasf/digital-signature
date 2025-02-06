import React, { useRef, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import AppLayout from "../../components/AppLayout";
import { useNavigate, useLocation } from "react-router-dom";

const DataSignatureRequestPageKajur: React.FC = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const location = useLocation();
    const { file } = location.state || { file: {} };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setFileName(selectedFile.name);
        }
    };

    const status = file?.status;

    const isSignable = status === "Waiting to be sign";
    const isCompleted = status === "Completed";
    const buttonLabel = isSignable ? "Tanda Tangani" : "Unduh";

    const handleButtonClick = () => {
        if (isSignable) {
            alert("Dokumen berhasil ditandatangani.");
        } else {
            navigate("/pdf-viewer");
        }
    };

    return (
        <AppLayout userRole="kajur">
            <div style={styles.container}>
                <Card style={styles.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2" style={styles.title}>
                            Ajuan Penandatanganan (Dosen)
                        </Typography>
                        <form style={styles.form}>
                            <label style={styles.label}>
                                Nama File
                                <input type="text" placeholder="Nama file" style={styles.input} readOnly />
                            </label>
                            <label style={styles.label}>
                                Tanggal Pengajuan File
                                <input type="text" placeholder="Tanggal file dibuat" style={styles.input} readOnly />
                            </label>
                            <div style={styles.horizontalContainer}>
                                <label style={styles.horizontalLabel}>
                                    Nama Penandatangan
                                    <input type="text" placeholder="Siti Nurbayanah, MT" style={styles.input} readOnly />
                                </label>
                                <label style={styles.horizontalLabel}>
                                    Status Penandatangan
                                    <input type="text" placeholder="Dosen Pembimbing" style={styles.input} readOnly />
                                </label>
                                <label style={styles.horizontalLabel}>
                                    Urutan Penandatangan
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <input type="text" placeholder="1" style={styles.input} readOnly />
                                        {isSignable ? (
                                            <span style={styles.crossmark}>✔️</span>
                                        ) : isCompleted ? (
                                            <span style={styles.checkmark}>✔️</span>
                                        ) : null}
                                    </div>
                                </label>
                            </div>
                            <div style={styles.horizontalContainer}>
                                <label style={styles.horizontalLabel}>
                                    Nama Penandatangan
                                    <input type="text" placeholder="Kepala Jurusan" style={styles.input} readOnly />
                                </label>
                                <label style={styles.horizontalLabel}>
                                    Status Penandatangan
                                    <input type="text" placeholder="Kepala Jurusan" style={styles.input} readOnly />
                                </label>
                                <label style={styles.horizontalLabel}>
                                    Urutan Penandatangan
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <input type="text" placeholder="2" style={styles.input} readOnly />
                                        {isSignable ? (
                                            <span style={styles.crossmark}>✖️</span>
                                        ) : isCompleted ? (
                                            <span style={styles.checkmark}>✔️</span>
                                        ) : null}
                                    </div>
                                </label>
                            </div>
                            <label style={styles.label}>
                                {fileName ? (
                                    <div style={styles.fileContainer}>
                                        <Typography style={styles.fileName}>{fileName}</Typography>
                                    </div>
                                ) : (
                                    <>
                                        <Button variant="contained" style={styles.uploadButton}>
                                            Nama File Terkirim
                                        </Button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept=".pdf"
                                            style={styles.fileInput}
                                            hidden
                                            onChange={handleFileChange}
                                        />
                                    </>
                                )}
                            </label>
                            <Button
                                type="button"
                                variant="contained"
                                onClick={handleButtonClick}
                                style={styles.button}
                            >
                                {buttonLabel}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as React.CSSProperties["flexDirection"],
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
        padding: "2rem",
    },
    card: {
        width: "100%",
        maxWidth: "auto",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#FFFFFF",
    },
    title: {
        fontSize: "1.5rem",
        marginBottom: "1.5rem",
        fontWeight: "bold",
        textAlign: "center" as React.CSSProperties["textAlign"],
    },
    form: {
        display: "flex",
        flexDirection: "column" as React.CSSProperties["flexDirection"],
        width: "100%",
    },
    label: {
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column" as React.CSSProperties["flexDirection"],
    },
    horizontalContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "1rem",
        flexWrap: "wrap" as React.CSSProperties["flexWrap"],
    },
    horizontalLabel: {
        flex: 1,
        marginRight: "1rem",
        display: "flex",
        flexDirection: "column" as React.CSSProperties["flexDirection"],
        minWidth: "200px",
    },
    input: {
        padding: "0.7rem",
        borderRadius: "10px",
        border: "1px solid #000",
        marginTop: "0.5rem",
        backgroundColor: "#FFFBE5",
        color: "#212529",
    },
    uploadButton: {
        marginTop: "0.5rem",
        backgroundColor: "#FFFBE5",
        color: "#000",
        borderRadius: "10px",
        border: "1px solid #000",
        fontWeight: "bold",
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
        marginBottom: "0.5rem",
        maxWidth: "200px",
        width: "100%",
        alignSelf: "center",
    },
    checkmark: {
        marginLeft: "10px",
        fontSize: "20px",
        color: "green",
    },
    crossmark: {
        marginLeft: "10px",
        fontSize: "20px",
        color: "red",
    },
    fileInput: {
        display: "none",
    },
    fileContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "0.5rem",
    },
    fileName: {
        color: "#212529",
        fontStyle: "italic",
    },
    '@media (max-width: 600px)': {
        horizontalContainer: {
            flexDirection: "column",
            alignItems: "flex-start",
        },
        horizontalLabel: {
            marginRight: "0",
            marginBottom: "1rem",
        },
    },
};

export default DataSignatureRequestPageKajur;