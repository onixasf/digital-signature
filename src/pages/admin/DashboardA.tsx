import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import SearchBar from "../../components/ui/SearchBar";
import FileCard from "../../components/ui/FileCard";
import AppLayout from "../../components/AppLayout";
import { useNavigate } from "react-router-dom";
import { useFiles } from "../../FileContext";

// Pastikan tipe yang digunakan sesuai dengan kebutuhannya
interface File {
    nim: string;
    studentName: string;
    title: string;
    date: string;
    status: string;
    pdfUrl: string;
}

const DashboardAdmin: React.FC = () => {
    const navigate = useNavigate();
    const { files } = useFiles();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [activeSection, setActiveSection] = useState<string>("ajuan");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () => {
        console.log("Searching for:", searchTerm);
    };

    // Pastikan untuk menggunakan tipe yang benar
    const filteredFiles = files.filter((file) => file.origin === "admin");

    const handleViewPdf = (pdfUrl: string) => {
        navigate("/pdf-viewer", { state: { pdfUrl } });
    };

    const handleFileClick = (file: File) => {
        navigate("/data-sign-req-admin", { state: { file } });
    };

    return (
        <AppLayout userRole="admin">
            <div style={styles.container}>
                <div style={styles.buttonContainer}>
                    <Button
                        variant="contained"
                        style={{
                            ...styles.button,
                            backgroundColor: activeSection === "ajuan" ? "#212529" : "#F7D217",
                            color: "#FFFFFF",
                            fontWeight:"bold",
                        }}
                        onClick={() => setActiveSection("ajuan")}
                    >
                        Ajuan Admin
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                            ...styles.button,
                            backgroundColor: activeSection === "monitoring" ? "#212529" : "#F7D217",
                            color: "#FFFFFF",
                            fontWeight:"bold",
                        }}
                        onClick={() => setActiveSection("monitoring")}
                    >
                        Monitoring Ajuan
                    </Button>
                </div>
                <div style={styles.content}>
                    {activeSection === "ajuan" && (
                        <>
                            <Typography variant="h4" style={styles.title}>Ajuan Admin</Typography>
                            <div style={styles.fileList}>
                                {filteredFiles.length === 0 ? (
                                    <Typography style={styles.noData}>Belum ada pengajuan.</Typography>
                                ) : (
                                    filteredFiles.map((file, index) => (
                                        <FileCard
                                            key={index}
                                            title={file.title}
                                            date={file.date}
                                            status={file.status}
                                            submitted={false}
                                            onClick={() => handleFileClick(file)}
                                        />
                                    ))
                                )}
                            </div>
                        </>
                    )}
                    {activeSection === "monitoring" && (
                        <>
                            <Typography variant="h4" component="h1" style={styles.title}>
                                Ajuan Masuk
                            </Typography>
                            <SearchBar
                                searchTerm={searchTerm}
                                onSearchChange={handleSearchChange}
                                onSearchSubmit={handleSearchSubmit}
                            />
                            <TableContainer component={Paper} style={styles.tableContainer}>
                                <Table>
                                    <TableHead>
                                        <TableRow style={styles.headerRow}>
                                            <TableCell style={styles.headerCell}>NIM</TableCell>
                                            <TableCell style={styles.headerCell}>Nama Mahasiswa</TableCell>
                                            <TableCell style={styles.headerCell}>Nama File</TableCell>
                                            <TableCell style={styles.headerCell}>Lihat File</TableCell>
                                            <TableCell style={styles.headerCell}>Status File</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredFiles.map((file, index) => (
                                            <TableRow key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                                <TableCell>{file.nim}</TableCell>
                                                <TableCell>{file.studentName}</TableCell>
                                                <TableCell>{file.title}</TableCell>
                                                <TableCell>
                                                    <Button variant="outlined" onClick={() => handleViewPdf(file.pdfUrl)}>
                                                        Lihat
                                                    </Button>
                                                </TableCell>
                                                <TableCell>{file.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        height: '100vh',
    },
    buttonContainer: {
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
        marginBottom: '1rem',
    },
    button: {
        margin: '0 1rem',
        flex: 1,
        maxWidth: '150px',
    },
    content: {
        flex: 1,
        padding: '2rem',
        backgroundColor: '#FFFBE5',
        overflowY: 'auto' as 'auto',
    },
    title: {
        marginBottom: "1rem",
        fontWeight: "bold",
        fontSize: "20px",
        textAlign: "center" as 'center',
    },
    fileList: {
        flex: 1,
        marginTop: "2rem",
        marginBottom: "1rem",
        justifyContent: 'center',
    },
    tableContainer: {
        marginTop: "1rem",
        overflowX: 'auto' as 'auto',
    },
    headerRow: {
        backgroundColor: "#FFFF",
    },
    headerCell: {
        fontWeight: "bold",
    },
    evenRow: {
        backgroundColor: "#f2f2f2",
    },
    oddRow: {
        backgroundColor: "#ffffff",
    },
    noData: {
        textAlign: "center" as "center",
        fontStyle: "italic",
        color: "#555",
        marginTop: "1rem",
    },
};

export default DashboardAdmin;