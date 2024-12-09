import axios from 'axios';

interface OpenMeteoResponse {
  hourly: {
    time: string[];
    direct_radiation: number[];
  };
  hourly_units: {
    direct_radiation: string;
  };
  timezone_abbreviation: string;
}

interface RadiationResponse {
  last_updated_date: string;
  last_updated_time: string;
  timezone_abbreviation: string;
  radiation: number;
  radiation_sum: number;
}

export const fetchHourlyForecast = async (): Promise<RadiationResponse> => {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const response = await axios.get<OpenMeteoResponse>(
      `https://api.open-meteo.com/v1/forecast?latitude=1.29&longitude=103.85&hourly=direct_radiation&timezone=Asia%2FSingapore&start_date=${formattedDate}&end_date=${formattedDate}`
    );

    const { time, direct_radiation } = response.data.hourly;
    const timezone_abbreviation = response.data.timezone_abbreviation;

    // Get current datetime in Singapore time
    const sgDateTime = new Date().toLocaleString('en-US', { 
      timeZone: 'Asia/Singapore',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    // Parse the datetime components
    const [datePart, timePart] = sgDateTime.split(', ');
    const [month, day, year] = datePart.split('/');
    
    // Format date as YYYY-MM-DD
    const formattedDateTime = `${year}-${month}-${day}T${timePart}`;
    
    // Get current hour and format as HH:00
    const currentHour = new Date(sgDateTime).getHours();
    const formattedTime = currentHour.toString().padStart(2, '0') + ':00';

    // Find current hour's radiation
    const currentRadiation = direct_radiation[currentHour] || 0;

    // Calculate total radiation for the day
    const totalRadiation = direct_radiation.reduce((sum, value) => sum + (value || 0), 0);

    return {
      last_updated_date: formattedDateTime,
      last_updated_time: formattedTime,
      timezone_abbreviation,
      radiation: currentRadiation,
      radiation_sum: totalRadiation
    };
  } catch (error) {
    console.error('Error fetching radiation data:', error);
    throw error;
  }
};
