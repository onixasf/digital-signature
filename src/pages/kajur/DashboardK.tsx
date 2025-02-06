import React, { useState } from "react";
import SearchBar from "../../components/ui/SearchBar";
import FileCard from "../../components/ui/FileCard";
import { Button, Dialog, DialogContent } from "@mui/material";
import AppLayout from "../../components/AppLayout";
import { useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface File {
    title: string;
    date: string;
    status: string;
    pdfUrl: string;
}

const DashboardKajur: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const files: File[] = [
        {
            title: "Nama File 1",
            date: "11 Januari 2025",
            status: "Waiting to be sign",
            pdfUrl: "/path/to/pdf1.pdf",
        },
        {
            title: "Nama File 1",
            date: "16 Januari 2025",
            status: "Completed",
            pdfUrl: "/path/to/pdf3.pdf",
        },
    ];

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(files.length / itemsPerPage);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchSubmit = () => {
        console.log("Searching for:", searchTerm);
    };

    const handleFileClick = (file: File) => {
        navigate("/data-sign-req-kajur", { state: { file } });
    };

    const filteredFiles = files
        .filter(file => file.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            // Prioritize "Waiting to be sign" status
            if (a.status === "Waiting to be sign" && b.status !== "Waiting to be sign") {
                return -1;
            }
            if (a.status !== "Waiting to be sign" && b.status === "Waiting to be sign") {
                return 1;
            }
            return 0; // Maintain original order for others
        });

    // Calculate current files based on pagination
    const currentFiles = filteredFiles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleBack = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // const handlePageClick = (pageNumber: number) => {
    //     setCurrentPage(pageNumber);
    // };

    const handleViewPdf = (pdfUrl: string) => {
        navigate("/pdf-viewer", { state: { pdfUrl } });
    };

    const handleClosePreview = () => {
        setIsPreviewOpen(false);
        setSelectedFile(null);
    };

    return (
        <AppLayout userRole="kajur">
            <div style={styles.dashboard}>
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    onSearchSubmit={handleSearchSubmit}
                />
                <div style={styles.fileList}>
                    {currentFiles.map((file) => (
                        <FileCard
                        submitted={false}
                        {...file}
                        onClick={() => handleFileClick(file)}
                        onViewPdf={() => handleViewPdf(file.pdfUrl)}
                    />                    
                    ))}
                </div>
                <div style={styles.buttonContainer}>
                    <Button
                        variant="contained"
                        style={styles.leftButton}
                        onClick={handleBack}
                        disabled={currentPage === 1}
                    >
                        <span style={styles.arrow}>←</span>
                        <span style={styles.buttonText}>Back</span>
                    </Button>
                    <Button
                        variant="contained"
                        style={styles.rightButton}
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                    >
                        <span style={styles.buttonText}>Next</span>
                        <span style={styles.arrow}>→</span>
                    </Button>
                </div>
                <div style={styles.paginationContainer}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            onClick={() => setCurrentPage(index + 1)}
                            style={{
                                margin: '0 0.5rem',
                                backgroundColor: currentPage === index + 1 ? '#F7D217' : 'white',
                                color: currentPage === index + 1 ? '#212529' : 'black',
                            }}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Dialog untuk pratinjau PDF */}
            <Dialog open={isPreviewOpen} onClose={handleClosePreview} maxWidth="lg" fullWidth>
                <DialogContent style={{ padding: 0 }}>
                    {selectedFile && (
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                            <Viewer fileUrl={selectedFile.pdfUrl} />
                        </Worker>
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
};

const styles = {
    dashboard: {
        padding: "2rem",
        backgroundColor: "#FFFBE5",
        minHeight: "100vh",
        display: 'flex',
        flexDirection: 'column' as React.CSSProperties["flexDirection"],
        justifyContent: 'space-between',
    },
    fileList: {
        flex: 1,
        overflowY: 'auto' as 'auto',
    },
    buttonContainer: {
        display: 'flex',
        padding: "1rem 0",
        gap: '1rem',
        marginTop: 'auto',
        alignSelf: "center",
    },
    leftButton: {
        backgroundColor: '#212529',
        color: '#F7D217',
        borderRadius: '12px 0 0 12px',
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
    },
    rightButton: {
        backgroundColor: '#F7D217',
        color: '#212529',
        borderRadius: '0 12px 12px 0',
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
    },
    buttonText: {
        margin: '0 0.5rem',
        fontWeight: '600',
    },
    arrow: {
        fontSize: '1.2em',
    },
    paginationContainer: {
        display: 'flex',
        marginTop: '1rem',
        padding: '1rem 0',
        overflowX: 'auto' as 'auto',
        whiteSpace: 'nowrap',
        width: '100%',
        maxWidth: '100%',
        flexwrap: 'nowrap',
    },
};

export default DashboardKajur;