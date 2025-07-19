import axios from "axios";
export const trainStatus = async (trainNumber: number) => {
    const options = {
        method: 'GET',
        url: 'https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus',
        params: {
            trainNo: trainNumber,
            startDay: '1'
        },
        headers: {
            'x-rapidapi-key': 'a3a86dd44amshcb89a9c08dd8046p1ec6ebjsnfcebd44aa25a',
            'x-rapidapi-host': 'irctc1.p.rapidapi.com'
        }
    }

    try {
        const response = await axios.request(options)
        const resData = response.data.data;

        const details = {
            trainNo: resData.train_number,
            trainName: resData.train_name,
            startDate: resData.train_start_date,
            sourceStn: resData.source_stn_name,
            desStn: resData.dest_stn_name,
            runDays: resData.run_days,
            currentStnCode: resData.current_station_code,
            currentStnName: resData.current_station_name,
            aheadDistance: resData.ahead_distance_text,
            updateStatus: resData.status_as_of,
            platformNum: resData.platform_number,
            arrival: resData.cur_stn_sta,
            departure: resData.cur_stn_std,
            upcomingStn: {
                code: resData.upcoming_stations[0].station_code,
                name: resData.upcoming_stations[0].station_name,
                distanceFromCurrStn: resData.upcoming_stations[0].distance_from_current_station_txt,
                platform: resData.upcoming_stations[0].platform_number,
                eta: resData.upcoming_stations[0].eta,
                etd: resData.upcoming_stations[0].etd
            },
            nextStoppageInfo: {
                name: resData.next_stoppage_info.next_stoppage,
                timeDiff: resData.next_stoppage_info.next_stoppage_time_diff
            },
            currentLocationInfo: {
                message: resData.current_location_info[1].readable_message
            }
        }

        const textSummary = `
       🚆 Train Status Summary

Train ${details.trainNo} - ${details.trainName} started its journey on ${details.startDate}, operating from ${details.sourceStn} to ${details.desStn}.
It runs on: ${details.runDays}.

📍 Current Location
The train is currently at ${details.currentStnName} (${details.currentStnCode}), having covered ${details.aheadDistance}.

    🕒 Arrival Time: ${details.arrival}

    🕓 Departure Time: ${details.departure}

    🛤️ Platform Number: ${details.platformNum}

    ⏱️ Last Updated: ${details.updateStatus}

    📡 Live Update: ${details.currentLocationInfo.message}

🛑 Next Stoppage

    Station: ${details.nextStoppageInfo.name}

    Time Remaining: ${details.nextStoppageInfo.timeDiff}

🔜 Upcoming Station

    Name: ${details.upcomingStn.name} (${details.upcomingStn.code})

    Distance from Current: ${details.upcomingStn.distanceFromCurrStn}

    ETA: ${details.upcomingStn.eta}

    ETD: ${details.upcomingStn.etd}

    Platform: ${details.upcomingStn.platform}
        `

        return textSummary;
    } catch (error) {
        console.error(error);
    }
}