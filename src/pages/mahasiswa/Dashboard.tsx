import React, { useState } from "react";
import SearchBar from "../../components/ui/SearchBar";
import FileCard from "../../components/ui/FileCard";
import AppLayout from "../../components/AppLayout";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFiles } from "../../../src/FileContext";

interface File {
    title: string;
    date: string;
    status: string;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { files } = useFiles(); // Ambil files dari context
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredFiles = files.filter((file) => file.submittedBy === "user");
    const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);

    const currentFiles = filteredFiles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleBack = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <AppLayout userRole="user">
            <div style={styles.dashboard}>
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={(event) => setSearchTerm(event.target.value)}
                    onSearchSubmit={() => console.log("Searching for:", searchTerm)}
                />
                <div style={styles.fileList}>
                    {currentFiles.map((file: File, index: number) => (
                        <FileCard
                            key={index}
                            title={file.title}
                            date={file.date}
                            status={file.status}
                            submitted={false}
                            onClick={() => navigate("/data-sign", { state: { file } })}
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
        justifyContent: 'space-between',
        marginTop: '1rem',
    },
    leftButton: {
        backgroundColor: '#212529',
        color: '#F7D217',
    },
    rightButton: {
        backgroundColor: '#F7D217',
        color: '#212529',
    },
    buttonText: {
        margin: '0 0.5rem',
        fontWeight: '600',
    },
    paginationContainer: {
        display: 'flex',
        marginTop: '1rem',
        justifyContent: 'center',
    },
    arrow: {
        fontSize: '1.2em',
    },
};

export default Dashboard;