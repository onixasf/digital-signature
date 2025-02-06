import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface AppLayoutProps {
    children: React.ReactNode;
    userRole: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, userRole }) => {
    return (
        <div style={styles.layout}>
            <Header userRole={userRole} /> {/* Kirim userRole ke Header */}
            <main style={styles.main}>{children}</main>
            <Footer />
        </div>
    );
};

const styles = {
    layout: {
        display: "flex",
        flexDirection: "column" as React.CSSProperties["flexDirection"],
        minHeight: "100vh",
    },
    main: {
        flex: 1,
        padding: "2rem",
        backgroundColor: "#FFFBE5",
    },
};

export default AppLayout;