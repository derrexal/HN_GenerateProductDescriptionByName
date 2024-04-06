// src/pages/HomePage.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import { fetchDataAsync } from '../features/dataSlice';

function HomePage() {
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        dispatch(fetchDataAsync());
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            flexDirection="column"
            gap={2}
        >
            <Input label="Введите название товара" />
            <Button onClick={handleButtonClick}>Получить данные</Button>
        </Box>
    );
}

export default HomePage;
