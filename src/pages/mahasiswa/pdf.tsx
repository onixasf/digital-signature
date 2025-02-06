import React from "react";
import AppLayout from "../../components/AppLayout";
import { useLocation } from "react-router-dom";

interface PdfViewerLocationState {
    pdfSrc: string;
    userRole: string[];
}

const PdfViewer: React.FC = () => {
    const location = useLocation();
    const pdfSrc = (location.state as PdfViewerLocationState)?.pdfSrc;
    const userRoles = (location.state as PdfViewerLocationState)?.userRole || [];

    return (
        <AppLayout userRole={userRoles.join(", ")}>
            <div style={styles.container}>
                {pdfSrc ? (
                    <iframe
                        src={pdfSrc}
                        style={styles.pdfViewer}
                        title="PDF Viewer"
                    />
                ) : (
                    <p>PDF tidak tersedia.</p>
                )}
            </div>
        </AppLayout>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
    },
    pdfViewer: {
        width: "80%",
        height: "80%",
        border: "none",
    },
};

export default PdfViewer;