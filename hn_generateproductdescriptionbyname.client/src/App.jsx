import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Убираем BrowserRouter
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import HomePage from './pages/HomePage.jsx';
import AnalysisPage from './pages/AnalysisPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
    return (
        <Container maxWidth="lg">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Tender Hack App
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/analysis">Analysis</Button>
                    <Button color="inherit" component={Link} to="/settings">Settings</Button>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/analysis" element={<AnalysisPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Container>
    );
}

export default App;
