import React, { createContext, useContext, useState } from 'react';

interface Signer {
    name: string;
    status: string;
    order: string;
}

export interface File {
    nim: string;
    studentName: string;
    title: string;
    date: string;
    status: string;
    pdfUrl: string;
    submittedBy: "user";
    origin: "admin";
    signers?: Signer[];
}

interface FilesContextType {
    files: File[];
    addFile: (newFile: File) => void;
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);

export const FilesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [files, setFiles] = useState<File[]>([]);

    const addFile = (newFile: File) => {
        setFiles(prevFiles => [...prevFiles, newFile]);
    };

    return (
        <FilesContext.Provider value={{ files, addFile }}>
            {children}
        </FilesContext.Provider>
    );
};

export const useFiles = () => {
    const context = useContext(FilesContext);
    if (!context) {
        throw new Error('useFiles must be used within a FilesProvider');
    }
    return context;
};