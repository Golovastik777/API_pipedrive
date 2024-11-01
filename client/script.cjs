document.getElementById('taskForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const person_id = document.getElementById('person_id').value;
    const expected_close_date = document.getElementById('expected_close_date').value;
    const value = document.getElementById('value').value;
    const title = document.getElementById('title').value;

    const responseMessage = document.getElementById('responseMessage');

    if (!title) {
        responseMessage.textContent = "Поле 'Описание' обязательно для заполнения!";
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/createTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                person_id,
                expected_close_date,
                title,
                value
            })
        });

        const data = await response.json();

        if (response.ok) {
            responseMessage.textContent = "Задача успешно создана!";
        } else {
            responseMessage.textContent = "Ошибка при создании задачи: " + data.message;
        }
    } catch (error) {
        console.log('Ошибка:', error);
        responseMessage.textContent = "Ошибка сети: " + error.message;
    }
});