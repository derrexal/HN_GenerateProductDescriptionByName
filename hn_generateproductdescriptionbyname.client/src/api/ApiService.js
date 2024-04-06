const fetchData = async () => {
    try {
        const response = await fetch('URL вашего API');
        if (!response.ok) {
            throw new Error('Ошибка запроса');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return null;
    }
}

export { fetchData };
