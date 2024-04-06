import React from 'react';
import { Typography, Box } from '@mui/material';

function SettingsPage() {
    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Страница Настроек
            </Typography>
            <Typography variant="body1">
                Эта страница позволит пользователям изменять настройки своего профиля и другие параметры приложения.
            </Typography>
        </Box>
    );
}

export default SettingsPage;
