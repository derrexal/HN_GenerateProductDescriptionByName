import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Убираем BrowserRouter
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
    return (
        <Container maxWidth="lg">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Container>
    );
}

export default App;
