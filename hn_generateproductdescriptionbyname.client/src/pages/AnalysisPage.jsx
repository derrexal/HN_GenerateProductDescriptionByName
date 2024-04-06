import React from 'react';
import { Typography, Box } from '@mui/material';

function AnalysisPage() {
    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Страница Анализа
            </Typography>
            <Typography variant="body1">
                Здесь будет размещена информация и функционал, связанный с анализом данных.
            </Typography>
        </Box>
    );
}

export default AnalysisPage;
