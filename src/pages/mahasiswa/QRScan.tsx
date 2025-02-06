import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import AppLayout from "../../components/AppLayout";

interface Signer {
    name: string;
    status: string;
    order: string;
    signed: boolean;
}

const QRScan: React.FC = () => {
    const [signers] = useState<Signer[]>([
        { name: "Dosen 1", status: "Dosen Pembimbing", order: "Signed", signed: true }
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Pengajuan telah dibuat!");
    };

    return (
        <AppLayout userRole="user">
            <div style={styles.container}>
                <Card style={styles.card}>
                    <CardContent>
                        <Card style={styles.cardvalid}>
                            <Typography style={styles.validText}>
                                VALID
                            </Typography>
                        </Card>
                        <Typography variant="h5" component="h2" style={styles.title}>
                            Nama File
                        </Typography>
                        <form style={styles.form} onSubmit={handleSubmit}>
                            <label style={styles.label}>
                                Jenis File
                            </label>
                            <label style={styles.label}>
                                Tanggal Pengajuan
                            </label>
                            {signers.map((signer, index) => (
                                <div key={index} style={styles.horizontalContainer}>
                                    <label style={styles.horizontalLabel}>
                                        Nama Penandatangan
                                        <input
                                            type="text"
                                            value={signer.name}
                                            readOnly
                                            style={styles.input}
                                        />
                                    </label>
                                    <label style={styles.horizontalLabel}>
                                        Status Penandatangan
                                        <input
                                            type="text"
                                            value={signer.status}
                                            readOnly
                                            style={styles.input}
                                        />
                                    </label>
                                    <label style={styles.horizontalLabel}>
                                        Tanggal Ditandatangani
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type="date"
                                                value={signer.order}
                                                readOnly
                                                style={styles.input}
                                            />
                                            {/* Tanda centang */}
                                            {signer.signed && (
                                                <span style={styles.checkmark}>✔️</span>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            ))}
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
    cardvalid: {
        maxWidth: "auto",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#F7D217",
        marginBottom: "1rem",
    },
    validText: {
        color: "#212529",
        fontSize: "1.5rem",
        fontWeight: "bold",
        margin: "0.5rem",
        textAlign: "center" as React.CSSProperties["textAlign"],
    },
    title: {
        fontSize: "1.2rem",
        marginBottom: "1rem",
        fontWeight: "bold",
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
    checkmark: {
        marginLeft: '10px',
        fontSize: '20px',
    },
};

export default QRScan;