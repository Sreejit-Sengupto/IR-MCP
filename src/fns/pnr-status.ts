import axios from "axios";

export const getPNRStatus = async (pnr: number) => {
    const options = {
        method: 'GET',
        url: 'https://irctc1.p.rapidapi.com/api/v3/getPNRStatus',
        params: {
            pnrNumber: pnr
        },
        headers: {
            'x-rapidapi-key': 'a3a86dd44amshcb89a9c08dd8046p1ec6ebjsnfcebd44aa25a',
            'x-rapidapi-host': 'irctc1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);

        const resData = {
            pnr: response.data.data.Pnr,
            train_number: response.data.data.TrainNo,
            train_name: response.data.data.TrainName,
            data_of_journy: response.data.data.Doj,
            from: response.data.data.From,
            to: response.data.data.To,
            reservation_upto: response.data.data.ReservationUpto,
            boarding_point: response.data.data.BoardingPoint,
            class: response.data.data.Class,
            chart_prepared: response.data.data.ChartPrepared,
            boarding_station_name: response.data.data.BoardingStationName,
            reservation_upto_name: response.data.data.ReservationUptoName,
            passenger_count: response.data.data.PassengerCount,
            passenger_status: response.data.data.PassengerStatus.map((item: any) => ({
                prediction_percentage: item.PredictionPercentage,
                ticket_status: item.ConfirmTktStatus,
                coach: item.Coach,
                berth: item.Berth,
                booking_status: item.BookingStatus,
                current_status: item.CurrentStatus
            })),
            depature_time: response.data.data.DepartureTime,
            arrival_time: response.data.data.ArrivalTime,
            coach_position: response.data.data.CoachPosition,
            rating: response.data.data.Rating,
            food_rating: response.data.FoodRating,
            punctuality_rating: response.data.data.PunctualityRating,
            cleanliness_rating: response.data.data.ClealinessRating,
            duration: response.data.data.Duration
        }

        const textSummary = `
📌 PNR Status Summary

🚆 Train: ${resData.train_name} (${resData.train_number})
📅 Date of Journey: ${resData.data_of_journy}
🛤️ From: ${resData.from} → To: ${resData.to}
📍 Boarding Point: ${resData.boarding_point} (${resData.boarding_station_name})
🎯 Reservation Upto: ${resData.reservation_upto} (${resData.reservation_upto_name})
💺 Class: ${resData.class}
📋 Chart Prepared: ${resData.chart_prepared ? 'Yes' : 'No'}

🕒 Departure Time: ${resData.depature_time}
🕓 Arrival Time: ${resData.arrival_time}
⏱️ Duration: ${resData.duration}
🚪 Coach Position: ${resData.coach_position}

⭐ Ratings:
- Overall: ${resData.rating ?? 'N/A'}
- Food: ${resData.food_rating ?? 'N/A'}
- Punctuality: ${resData.punctuality_rating ?? 'N/A'}
- Cleanliness: ${resData.cleanliness_rating ?? 'N/A'}

👥 Passengers (${resData.passenger_count}):
${resData.passenger_status.map((p: any, i: number) => `
  👤 Passenger ${i + 1}:
  - Booking Status: ${p.booking_status}
  - Current Status: ${p.current_status}
  - Coach: ${p.coach || 'N/A'}, Berth: ${p.berth || 'N/A'}
  - Prediction: ${p.prediction_percentage ?? 'N/A'}%
`).join('\n')}
`.trim();


        return textSummary;
    } catch (error) {
        console.error(error);
    }
}