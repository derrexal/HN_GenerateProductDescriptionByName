import React, { useState, useEffect } from 'react';
import { Box, Modal, Button, Checkbox, FormControlLabel, FormGroup, Select, MenuItem, Typography, MobileStepper, IconButton, Radio, RadioGroup } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function ModalComponent({ open, handleClose, onApply, data }) {
    const [page, setPage] = useState(0);
    const [checkboxState, setCheckboxState] = useState({});
    const [selectedOption, setSelectedOption] = useState('');
    const [radioValue, setRadioValue] = useState('');

    useEffect(() => {
        if (data) {
            const initialState = {};
            data.categories.forEach(category => {
                initialState[category.value] = false;
            });
            setCheckboxState(initialState);
        }
    }, [data]);

    const handleCheckboxChange = (value) => {
        setCheckboxState(prev => ({ ...prev, [value]: !prev[value] }));
    };

    const resetStates = () => {
        const resetCheckboxState = {};
        Object.keys(checkboxState).forEach(key => {
            resetCheckboxState[key] = false;
        });
        setCheckboxState(resetCheckboxState);
        setSelectedOption('');
        setRadioValue('');
    };

    const handleNext = () => {
        resetStates();
        setPage(current => Math.min(current + 1, maxPages - 1));
    };

    const handlePrev = () => {
        resetStates();
        setPage(current => Math.max(current - 1, 0));
    };

    const handleApply = () => {
        let applyData;
        switch (page) {
            case 0: // Checkbox page
                const selectedCategories = Object.keys(checkboxState).filter(key => checkboxState[key]);
                applyData = { mainCategory: selectedCategories };
                break;
            case 1: // Radio buttons page
                applyData = { secondaryCategory: radioValue };
                break;
            case 2: // Select dropdown page
                applyData = { tertiaryCategory: selectedOption };
                break;
            default:
                applyData = {};
        }
        onApply(applyData);
        handleClose();
    };

    const pages = [
        data && (
            <FormGroup>
                {data.categories.filter(category => category.key === data.mainKey).map(category => (
                    <FormControlLabel
                        key={category.value}
                        control={<Checkbox checked={checkboxState[category.value] || false} onChange={() => handleCheckboxChange(category.value)} name={category.value} />}
                        label={category.value}
                    />
                ))}
            </FormGroup>
        ),
        data && (
            <RadioGroup value={radioValue} onChange={(event) => setRadioValue(event.target.value)}>
                {data.categories.filter(category => category.key !== data.mainKey && category.key !== data.tertiaryKey).map(category => (
                    <FormControlLabel
                        key={category.value}
                        value={category.value}
                        control={<Radio />}
                        label={category.value}
                    />
                ))}
            </RadioGroup>
        ),
        data && (
            <Select fullWidth value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} displayEmpty>
                <MenuItem value=""><em>Выберите опцию</em></MenuItem>
                {data.categories.filter(category => category.key === data.tertiaryKey).map(category => (
                    <MenuItem key={category.value} value={category.value}>{category.value}</MenuItem>
                ))}
            </Select>
        ),
    ];

    const maxPages = pages.filter(Boolean).length;

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper', boxShadow: 24, p: 4,
                width: 500,
                height: 600,
                display: 'flex', flexDirection: 'column',
            }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Страница {page + 1}</Typography>
                {pages[page]}
                <MobileStepper
                    variant="dots"
                    steps={maxPages}
                    position="static"
                    activeStep={page}
                    nextButton={
                        <IconButton size="small" onClick={handleNext} disabled={page === maxPages - 1}>
                            <KeyboardArrowRight />
                        </IconButton>
                    }
                    backButton={
                        <IconButton size="small" onClick={handlePrev} disabled={page === 0}>
                            <KeyboardArrowLeft />
                        </IconButton>
                    }
                    sx={{ flexGrow: 1 }}
                />
                <Button onClick={handleApply} sx={{ mt: 2 }}>
                    Применить
                </Button>
            </Box>
        </Modal>
    );
}

export default ModalComponent;
