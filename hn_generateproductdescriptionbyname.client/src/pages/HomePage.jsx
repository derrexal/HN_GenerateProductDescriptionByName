import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Input, FormControl, Typography, Button, useMediaQuery, useTheme, Paper, Divider } from '@mui/material';
import { validateNotEmptyAndLength } from '../utils/validator';
import { fetchDataAsync } from '../features/dataSlice';
import ModalComponent from "../components/ui/Modal.jsx";


function HomePage() {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedCategory, setSelectedCategory] = useState('');
    const [radioButtonsData, setRadioButtonsData] = useState([]);
    const [selectOptionsData, setSelectOptionsData] = useState([]);

    // Используем useSelector, чтобы получить статус загрузки и данные из Redux store
    const { status, items, error: fetchError } = useSelector((state) => state.data ?? {});
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchDataAsync()); // Загрузка данных при монтировании компонента
    }, [dispatch]);


    const modalData = {
        mainKey: "mainCategory",
        tertiaryKey: "tertiaryCategory",
        categories: [
            {
                key: "mainCategory",
                value: "Главная категория",
                products: ["Главный товар 1", "Главный товар 2", "Главный товар 3", "Главный товар 4", "Главный товар 5"]
            },
            {
                key: "secondaryCategory",
                value: "Второстепенная 1",
                products: ["Второстепенный товар 1.1", "Второстепенный товар 1.2", "Второстепенный товар 1.3", "Второстепенный товар 1.4", "Второстепенный товар 1.5"]
            },
            {
                key: "secondaryCategory",
                value: "Второстепенная 2",
                products: ["Второстепенный товар 2.1", "Второстепенный товар 2.2", "Второстепенный товар 2.3", "Второстепенный товар 2.4", "Второстепенный товар 2.5"]
            },
            {
                key: "secondaryCategory",
                value: "Второстепенная 3",
                products: ["Второстепенный товар 3.1", "Второстепенный товар 3.2", "Второстепенный товар 3.3", "Второстепенный товар 3.4", "Второстепенный товар 3.5"]
            },
            {
                key: "tertiaryCategory",
                value: "Третьестепенная 1",
                products: ["Третьестепенный товар 1.1", "Третьестепенный товар 1.2", "Третьестепенный товар 1.3", "Третьестепенный товар 1.4", "Третьестепенный товар 1.5"]
            },
            {
                key: "tertiaryCategory",
                value: "Третьестепенная 2",
                products: ["Третьестепенный товар 2.1", "Третьестепенный товар 2.2", "Третьестепенный товар 2.3", "Третьестепенный товар 2.4", "Третьестепенный товар 2.5"]
            },
            {
                key: "tertiaryCategory",
                value: "Третьестепенная 3",
                products: ["Третьестепенный товар 3.1", "Третьестепенный товар 3.2", "Третьестепенный товар 3.3", "Третьестепенный товар 3.4", "Третьестепенный товар 3.5"]
            },
            {
                key: "tertiaryCategory",
                value: "Третьестепенная 4",
                products: ["Третьестепенный товар 4.1", "Третьестепенный товар 4.2", "Третьестепенный товар 4.3", "Третьестепенный товар 4.4", "Третьестепенный товар 4.5"]
            },
            {
                key: "tertiaryCategory",
                value: "Третьестепенная 5",
                products: ["Третьестепенный товар 5.1", "Третьестепенный товар 5.2", "Третьестепенный товар 5.3", "Третьестепенный товар 5.4", "Третьестепенный товар 5.5"]
            }
        ]
    };

    const handleInputChange = (event) => {
        const input = event.target.value;
        setInputValue(input);
        const validationResult = validateNotEmptyAndLength(input);

        setError(!validationResult.isValid);
        setErrorMessage(validationResult.message);

        if (!validationResult.isValid) {
            setSuggestions([]);
            return;
        }

        const isExactMatch = modalData.categories.some(category =>
            category.products.some(product => product.toLowerCase() === input.toLowerCase())
        );

        // Если есть точное совпадение, очищаем подсказки
        if (isExactMatch) {
            setSuggestions([]);
        } else {
            let matchedProducts = [];
            let matchedCategories = new Set();

            modalData.categories.forEach(category => {
                category.products.forEach(product => {
                    if (product.toLowerCase().includes(input.toLowerCase())) {
                        matchedProducts.push(`Товар: ${product}`);
                        matchedCategories.add(`Категория: ${category.value}`);
                    }
                });
            });

            if (matchedProducts.length === 0 && matchedCategories.size === 0) {
                setSuggestions(['Вы ввели несуществующий товар или категорию']);
            } else {
                setSuggestions([...matchedProducts, ...Array.from(matchedCategories)]);
            }
        }
    };

    const handleButtonClick = () => {
        const validationResult = validateNotEmptyAndLength(inputValue);
        if (!validationResult.isValid) {
            setError(true);
            setErrorMessage(validationResult.message); // Обновление сообщения об ошибке
            return;
        }

        // Определение категории введенного товара
        let selectedCategory = '';
        modalData.categories.forEach(category => {
            const foundProduct = category.products.find(product => product.toLowerCase() === inputValue.toLowerCase());
            if (foundProduct) {
                selectedCategory = category.value;
            }
        });

        setSelectedCategory(selectedCategory); // Установка выбранной категории

        // Подготовка данных для первой страницы модального окна
        const firstPageData = { mainCategory: [selectedCategory] };

        // Подготовка данных для второй страницы модального окна
        const radioButtonsData = modalData.categories
            .filter(category => category.value !== selectedCategory) // Исключаем выбранную категорию
            .slice(0, 3) // Берем три ближайшие категории
            .map(category => category.value);

        // Подготовка данных для третьей страницы модального окна
        const selectOptionsData = modalData.categories
            .filter(category => category.key === 'tertiaryCategory') // Берем только категории третьего уровня
            .map(category => category.value);

        // Отправка данных на модальное окно
        dispatch(fetchDataAsync(firstPageData)); // Отправляем данные на первую страницу модального окна
        setRadioButtonsData(radioButtonsData); // Устанавливаем данные для радиокнопок на второй странице модального окна
        setSelectOptionsData(selectOptionsData); // Устанавливаем данные для селектбокса на третьей странице модального окна

        // Открытие модального окна
        handleOpenModal();
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

    const handleProductClick = (product) => {
        setInputValue(product);
        setSuggestions([]); // Очищаем подсказки после выбора товара
    };

    const renderSuggestions = () => {
        if (!inputValue.trim()) {
            return null;
        }

        const productsSuggestions = suggestions.filter(s => s.startsWith("Товар:"));
        const categoriesSuggestions = suggestions.filter(s => s.startsWith("Категория:"));

        const hasSuggestions = productsSuggestions.length > 0 || categoriesSuggestions.length > 0;

        return (
            <Box sx={{ position: 'absolute', top: '56px', width: '100%', zIndex: 1 }}>
                {hasSuggestions ? (
                    <Box sx={{ mt: -1 }}>
                        {productsSuggestions.length > 0 && (
                            <Paper sx={{ maxHeight: 200, overflow: 'auto' }}>
                                <Typography sx={{ p: 1, fontWeight: 'bold' }}>Товары:</Typography>
                                {productsSuggestions.map((product, index) => (
                                    <Typography key={index} sx={{ ml: 2, cursor: 'pointer' }} onClick={() => handleProductClick(product.replace("Товар: ", ""))}>
                                        {product.replace("Товар: ", "")}
                                    </Typography>
                                ))}
                            </Paper>
                        )}
                        {categoriesSuggestions.length > 0 && (
                            <Paper sx={{ maxHeight: 200, overflow: 'auto', mt: productsSuggestions.length > 0 ? -1 : 0 }}>
                                <Typography sx={{ p: 1, fontWeight: 'bold', opacity: 0.7 }}>Категории (некликабельно):</Typography>
                                {categoriesSuggestions.map((category, index) => (
                                    <Typography key={index} sx={{ ml: 2, opacity: 0.7 }}>
                                        {category.replace("Категория: ", "")}
                                    </Typography>
                                ))}
                            </Paper>
                        )}
                    </Box>
                ) : (
                    <Paper sx={{ mt: -1, p: 1 }}>
                        <Typography>Вы ввели неправильный товар</Typography>
                    </Paper>
                )}
            </Box>
        );
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
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    mb: 10,
                    fontWeight: 'bold', // Жирный шрифт
                    color: '#000000', // Цвет текста, можно адаптировать под вашу цветовую схему
                    textShadow: '2px 2px 8px rgba(0,0,0,0.2)', // Тень текста для дополнительного эффекта
                    fontFamily: 'Arial, sans-serif', // Шрифт (можно выбрать любой подходящий)
                }}
            >
                Tender Hack
            </Typography>
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
                    onClick={
                        handleButtonClick

                    }
                    sx={{
                        height: '56px',
                        width: isMobile ? '80%' : 'auto',
                        ml: isMobile ? 0 : '-1px',
                    }}
                >
                    Получить данные
                </Button>
                {renderSuggestions()}
                <ModalComponent
                    open={isModalOpen}
                    handleClose={handleCloseModal}
                    onApply={handleApply}
                    data={modalData}
                    selectedCategory={selectedCategory}
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
