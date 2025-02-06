import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FilesProvider } from "../src/FileContext";
import UserPage from './pages/mahasiswa/UserPage';
import AdminPage from './pages/admin/AdminPage';
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/mahasiswa/Dashboard";
import SignatureRequestPage from "./pages/mahasiswa/SignReq";
import PdfViewer from './pages/mahasiswa/pdf';
import QRScan from './pages/mahasiswa/QRScan';
import DataSignatureRequestPage from "./pages/mahasiswa/DataSignReq";
import DashboardAdmin from "./pages/admin/DashboardA";
import DataSignatureRequestPageAdmin from "./pages/admin/DataSignReqA";
import DashboardDosen from "./pages/dosen/DashboardD";
import DataSignatureRequestPageDosen from "./pages/dosen/DataSignReqD";
import DashboardKajur from "./pages/kajur/DashboardK";
import DataSignatureRequestPageKajur from "./pages/kajur/DataSignReqK";

const App: React.FC = () => {
  const userRole = ["admin", "user"];

  const handleCreateRequest = (request: any) => {
    console.log("Request created:", request);
    // Logika untuk menangani permintaan yang dibuat
  };

  return (
    <FilesProvider>
      <Router>
        <Routes>
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/signature-request"
            element={
              <SignatureRequestPage
                userRole={userRole}
                onCreateRequest={handleCreateRequest}
              />
            }
          />
          <Route path="/qr-scan" element={<QRScan />} />
          <Route path="/data-sign" element={<DataSignatureRequestPage />} />
          <Route path="/pdf-viewer" element={<PdfViewer />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/data-sign-req-admin" element={<DataSignatureRequestPageAdmin />} />
          <Route path="/dashboard-dosen" element={<DashboardDosen />} />
          <Route path="/data-sign-req-dosen" element={<DataSignatureRequestPageDosen />} />
          <Route path="/dashboard-kajur" element={<DashboardKajur />} />
          <Route path="/data-sign-req-kajur" element={<DataSignatureRequestPageKajur />} />
        </Routes>
      </Router>
    </FilesProvider>
  );
};

export default App;