import React, { useRef, useState } from "react";
import { Button, TextField, MenuItem, Card, CardContent, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AppLayout from "../../components/AppLayout";
import { useNavigate } from "react-router-dom";
import { useFiles } from "../../../src/FileContext";
import { File as FileType } from "../../../src/FileContext"

// Tipe data
interface Signer {
    name: string;
    status: string;
    order: string;
}

interface SignatureRequestPageProps {
    userRole: string[];
    onCreateRequest: (request: any) => void;
}

const SignerRow = ({ signer, index, onChange, onRemove }: {
    signer: Signer;
    index: number;
    onChange: (index: number, field: keyof Signer, value: string) => void;
    onRemove: (index: number) => void;
}) => (
    <div style={styles.horizontalContainer}>
        <label style={styles.horizontalLabel}>
            Nama Penandatangan
            <TextField
                select
                variant="standard"
                size="small"
                value={signer.name}
                onChange={(e) => onChange(index, "name", e.target.value)}
                style={styles.input}
            >
                <MenuItem value="dosen1">Dosen 1</MenuItem>
                <MenuItem value="dosen2">Dosen 2</MenuItem>
                <MenuItem value="dosen3">Dosen 3</MenuItem>
            </TextField>
        </label>
        <label style={styles.horizontalLabel}>
            Status Penandatangan
            <input
                type="text"
                value={signer.status}
                onChange={(e) => onChange(index, "status", e.target.value)}
                placeholder="Contoh: Dosen Pembimbing"
                style={styles.input}
            />
        </label>
        <label style={styles.horizontalLabel}>
            Urutan Penandatangan
            <input
                type="text"
                value={signer.order}
                onChange={(e) => onChange(index, "order", e.target.value)}
                placeholder="Masukkan urutan penandatangan"
                style={styles.input}
            />
        </label>
        {index > 0 && (
            <Button onClick={() => onRemove(index)} style={styles.hapusButton}>
                🗑️
            </Button>
        )}
    </div>
);

const SignatureRequestPage: React.FC<SignatureRequestPageProps> = ({ userRole, onCreateRequest }) => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { addFile } = useFiles();

    const [fileName, setFileName] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [signers, setSigners] = useState<Signer[]>([{ name: "", status: "", order: "" }]);

    const handleFileUpload = () => fileInputRef.current?.click();
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFileName(event.target.files[0].name);
        }
    };
    const handleFileRemove = () => setFileName("");

    const handleSignerChange = (index: number, field: keyof Signer, value: string) => {
        const updatedSigners = [...signers];
        updatedSigners[index][field] = value;
        setSigners(updatedSigners);
    };

    const handleAddSigner = () => setSigners([...signers, { name: "", status: "", order: "" }]);
    const handleRemoveSigner = (index: number) => index > 0 && setSigners(signers.filter((_, i) => i !== index));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!fileName || !selectedDate || signers.some((s) => !s.name || !s.status || !s.order)) {
            alert("Silakan lengkapi semua informasi.");
            return;
        }

        const newRequest: FileType = {
            nim: "123456", // Ganti dengan data yang sesuai
            studentName: "Nama Mahasiswa", // Ganti dengan data yang sesuai
            title: fileName,
            date: new Date().toISOString(),
            status: "Waiting to be sign",
            pdfUrl: "/path/to/file.pdf",
            submittedBy: "user",
            origin: "admin",
            signers,
        };

        addFile(newRequest);
        onCreateRequest(newRequest);
        alert("Pengajuan telah dibuat!");
        navigate(userRole.includes("user") ? "/dashboard" : "/dashboard-admin");
    };

    return (
        <AppLayout userRole={userRole.join(", ")}>
            <div style={styles.container}>
                <Card style={styles.card}>
                    <CardContent>
                        <Typography variant="h5" style={styles.title}>
                            Ajuan Penandatanganan
                        </Typography>
                        <form style={styles.form} onSubmit={handleSubmit}>
                            <label style={styles.label}>
                                Nama File
                                <input
                                    type="text"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    style={styles.input}
                                    placeholder="Masukkan Nama File"
                                />
                            </label>
                            <label style={styles.label}>
                                Tanggal Pengajuan File
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={selectedDate}
                                        onChange={(newValue) => setSelectedDate(newValue)}
                                        slotProps={{
                                            textField: { variant: "standard", size: "small", style: styles.input },
                                        }}
                                    />
                                </LocalizationProvider>
                            </label>
                            {signers.map((signer, index) => (
                                <SignerRow
                                    key={index}
                                    signer={signer}
                                    index={index}
                                    onChange={handleSignerChange}
                                    onRemove={handleRemoveSigner}
                                />
                            ))}
                            <Button onClick={handleAddSigner} style={styles.addButton}>
                                +
                            </Button>
                            <label style={styles.label}>
                                Upload File
                                {fileName ? (
                                    <div style={styles.fileContainer}>
                                        <Typography style={styles.fileName}>{fileName}</Typography>
                                        <Button
                                            onClick={handleFileRemove}
                                            variant="text"
                                            style={styles.removeButton}
                                        >
                                            x
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <Button
                                            variant="contained"
                                            onClick={handleFileUpload}
                                            style={styles.uploadButton}
                                        >
                                            Pilih File
                                        </Button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept=".pdf"
                                            hidden
                                            onChange={handleFileChange}
                                        />
                                    </>
                                )}
                            </label>
                            <Button type="submit" style={styles.button}>
                                Submit
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
        flexDirection: "column" as 'column',
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
        padding: "2rem",
    },
    card: {
        width: "100%",
        maxWidth: "600px",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#FFFFFF",
    },
    title: {
        fontSize: "1.5rem",
        marginBottom: "1.5rem",
        fontWeight: "bold",
        textAlign: "center" as 'center',
    },
    form: {
        display: "flex",
        flexDirection: "column" as 'column',
        width: "100%",
    },
    label: {
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column" as 'column',
    },
    horizontalContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "1rem",
        flexWrap: "wrap" as 'wrap',
    },
    horizontalLabel: {
        flex: 1,
        marginRight: "1rem",
        display: "flex",
        flexDirection: "column" as 'column',
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
    addButton: {
        height: "35px",
        marginTop: "1rem",
        marginBottom: "1rem",
        backgroundColor: "#F7D217",
        color: "#212529",
        borderRadius: "10px",
        border: "1px solid #000",
        cursor: "pointer",
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
    hapusButton: {
        padding: "0.2rem",
        borderRadius: "30px",
        marginTop: "1.5rem",
        marginLeft: "0.5rem",
        border: "1px solid #000",
        backgroundColor: "transparent",
        cursor: "pointer",
    },
    removeButton: {
        padding: "0.2rem",
        borderRadius: "30px",
        border: "1px solid #000",
        color: "#FF0000",
        marginLeft: "auto",
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
        maxWidth: "100px",
        width: "100%",
        alignSelf: "center",
    },
};

export default SignatureRequestPage;