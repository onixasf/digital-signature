import React from "react";

interface FileCardProps {
    title: string;
    date: string;
    status: string;
    onClick: () => void;
    onSubmitToNextRole?: () => void;
    onViewPdf?: () => void; // Tambahkan properti ini
    submitted: boolean;
}

const FileCard: React.FC<FileCardProps> = ({
    title,
    date,
    status,
    onClick,
    onSubmitToNextRole,
    onViewPdf,
    submitted,
}) => {
    const getStatusStyle = () => {
        switch (status) {
            case "Waiting to be sign":
                return { backgroundColor: "#6C757D", color: "#FFF" };
            case "Signed":
                return { backgroundColor: "#212529", color: "#FFF" };
            case "Completed":
                return { backgroundColor: "#212529", color: "#F7D217" };
            default:
                return { backgroundColor: "#E0E0E0", color: "#000" };
        }
    };

    return (
        <div style={styles.card} onClick={onClick}>
            <div>
                <h3 style={styles.title}>{title}</h3>
                <p>{date}</p>
            </div>
            <div style={styles.statusContainer}>
                <span style={{ ...styles.status, ...getStatusStyle() }}>
                    {status}
                </span>

                {/* Tampilkan tombol jika fungsi `onViewPdf` diberikan */}
                {onViewPdf && (
                    <button
                        style={{ ...styles.pdfButton }}
                        onClick={(e) => {
                            e.stopPropagation(); // Mencegah klik pada card utama
                            onViewPdf();
                        }}
                    >
                        Lihat PDF
                    </button>
                )}

                {/* Tampilkan tombol jika status adalah "Signed" */}
                {status === "Signed" && onSubmitToNextRole && (
                    <button
                        style={{
                            ...styles.submitButton,
                            backgroundColor: submitted ? "#6C757D" : "#F7D217",
                            color: submitted ? "#FFF" : "#212529",
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onSubmitToNextRole();
                        }}
                    >
                        {submitted ? "Submitted" : "Ajukan ke Tahap Berikutnya"}
                    </button>
                )}
            </div>
        </div>
    );
};

const styles = {
    card: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem 2rem",
        margin: "1rem 2rem",
        backgroundColor: "#FFF",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "transform 0.2s",
    },
    title: {
        margin: "0",
    },
    statusContainer: {
        display: "flex",
        alignItems: "center",
    },
    status: {
        padding: "0.5rem 1rem",
        borderRadius: "10px",
        fontWeight: "bold",
    },
    pdfButton: {
        marginLeft: "0.5rem",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        backgroundColor: "#007BFF",
        color: "#FFF",
    },
    submitButton: {
        marginLeft: "0.5rem",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
    },
};

export default FileCard;