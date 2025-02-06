import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Mengimpor ikon pencarian

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <div style={styles.container}>
            <TextField
                variant="outlined"
                placeholder="Cari file..."
                value={searchTerm}
                onChange={onSearchChange}
                style={styles.input}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        margin: '0.5rem 1rem',
    },
    input: {
        flex: 1,
        margin: '1rem',
        backgroundColor: '#ffffff',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ccc',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#aaa',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#888',
        },
    },
};

export default SearchBar;