import React from "react";
import { Button } from "@mui/material";

interface CustomButtonProps {
    label: string;
    onClick: () => void;
    variant?: "contained" | "outlined" | "text";
    style?: React.CSSProperties;
    disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, variant = "contained", style, disabled = false }) => {
    return (
        <Button
            variant={variant}
            onClick={onClick}
            style={{ ...styles.button, ...style }}
            disabled={disabled}
        >
            {label}
        </Button>
    );
};

const styles = {
    button: {
        backgroundColor: "#FFD700",
        color: "#000",
        fontWeight: 'bold',
        marginTop: '0.2rem',
        width: 'auto',
    },
};

export default CustomButton;