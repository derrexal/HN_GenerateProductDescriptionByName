import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Input, FormControl, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { validateNotEmptyAndLength } from '../utils/validator';
import { fetchDataAsync } from '../features/dataSlice';
import ModalComponent from "../components/ui/Modal.jsx";

function HomePage() {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // Добавлено для хранения сообщения об ошибке
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { status, items, error: fetchError } = useSelector((state) => state.data ?? {});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const modalData = {
        mainKey: "mainCategory",
        tertiaryKey: "tertiaryCategory",
        categories: [
            { key: "mainCategory", value: "Главная категория" },
            { key: "secondaryCategory", value: "Второстепенная 1" },
            { key: "secondaryCategory", value: "Второстепенная 2" },
            { key: "secondaryCategory", value: "Второстепенная 3" },
            { key: "tertiaryCategory", value: "Третьестепенная 1" },
            { key: "tertiaryCategory", value: "Третьестепенная 2" },
            { key: "tertiaryCategory", value: "Третьестепенная 3" },
            { key: "tertiaryCategory", value: "Третьестепенная 4" },
            { key: "tertiaryCategory", value: "Третьестепенная 5" },
        ]
    };
    
    const handleInputChange = (event) => {
        const validationResult = validateNotEmptyAndLength(event.target.value);
        setInputValue(event.target.value);
        setError(!validationResult.isValid);
        setErrorMessage(validationResult.message); // Обновление сообщения об ошибке
    };

    const handleButtonClick = () => {
        const validationResult = validateNotEmptyAndLength(inputValue);
        if (!validationResult.isValid) {
            setError(true);
            setErrorMessage(validationResult.message); // Обновление сообщения об ошибке
            return;
        }
        dispatch(fetchDataAsync());
    };

    const handleOpenModal = () => {
        const validationResult = validateNotEmptyAndLength(inputValue, 3); // Аналогично используем валидацию для значения инпута
        if (!validationResult.isValid) {
            setError(true);
            setErrorMessage(validationResult.message);
            return;
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleApply = (data) => {
        dispatch(fetchDataAsync(data)); // Отправляем выбранные данные на бэкенд
        handleCloseModal(); // Закрываем модальное окно
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // Занимает всю высоту видимой области браузера
                width: '100%', // Занимает всю ширину видимой области браузера (обычно не требуется)
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                    gap: isMobile ? 2 : 0,
                }}
            >
                <FormControl variant="filled" sx={{ width: isMobile ? '80%' : 300 }}>
                    <Input
                        id="component-filled"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Введите что-нибудь"
                        sx={{ height: '56px', bgcolor: 'background.paper' }}
                        error={error}
                    />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        handleButtonClick();
                        handleOpenModal();
                    }}
                    sx={{
                        height: '56px',
                        width: isMobile ? '80%' : 'auto',
                        ml: isMobile ? 0 : '-1px',
                    }}
                >
                    Получить данные
                </Button>
                <ModalComponent
                    open={isModalOpen}
                    handleClose={handleCloseModal}
                    onApply={handleApply}
                    data={modalData}
                />
                {error && (
                    <Box sx={{ display: 'flex', position: 'absolute', top: '100%', width: '100%' }}>
                        <Typography color="error" textAlign="center">{errorMessage}</Typography>
                    </Box>
                )}
            </Box>
            {status === 'loading' && <Typography sx={{ mt: 2 }}>Загрузка...</Typography>}
            {status === 'failed' && <Typography color="error" sx={{ mt: 2 }}>{fetchError}</Typography>}
        </Box>
    );
}

export default HomePage;
