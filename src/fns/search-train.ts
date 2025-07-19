import axios from "axios";

export const searchTrain = async (trainNumber: number) => {
    const options = {
        method: 'GET',
        url: 'https://irctc1.p.rapidapi.com/api/v1/searchTrain',
        params: { query: trainNumber },
        headers: {
            'x-rapidapi-key': 'a3a86dd44amshcb89a9c08dd8046p1ec6ebjsnfcebd44aa25a',
            'x-rapidapi-host': 'irctc1.p.rapidapi.com'
        }
    }

    try {
        const response = await axios.request(options);
        console.log(response.data);
        const trainName = response.data.data[0].train_name

        return `${trainNumber}-${trainName}`
    } catch (error) {
        console.error(error);
    }
}