import dotenv from 'dotenv';
dotenv.config();


export const createTask = async (json_data) => {
    var url = `https://${process.env.API_ADRESS}.pipedrive.com/v1/deals?api_token=${process.env.API_TOKEN}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json_data) 
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Неизвестная ошибка');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw new Error(`Ошибка при добавлении сделки: ${error.message}`);
    }
};