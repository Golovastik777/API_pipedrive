import express from 'express';
import cors from 'cors';
import { createTask } from './client/createTask.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.send('О как');
});

// Маршрут для создания задачи
app.post('/createTask', async (req, res) => {
    const { person_id, expected_close_date, title, value } = req.body;
    
    // Лог для отладки
    console.log("Полученные данные:", req.body);

    if (!person_id || !expected_close_date || !title || !value) {
        return res.status(400).json({ message: 'Все поля обязательны' });
    }

    try {
        const taskData = await createTask({
            person_id,
            expected_close_date,
            title,
            value
        });
        console.log("Созданная задача:", taskData);
        return res.status(201).json(taskData);
    } catch (error) {
        console.error("Ошибка:", error.message);
        return res.status(500).json({ message: 'Ошибка при создании задачи', error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});