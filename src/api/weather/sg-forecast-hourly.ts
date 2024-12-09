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
  radiation_current_hour: number;
  radiation_peak_hour: number;
  radiation_sum: number;
}

export const fetchSGHourlyRadiationForecast = async (): Promise<RadiationResponse> => {
  try {
    // Get today's date in Singapore timezone
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
    
    // Format date as YYYY-MM-DD for API request
    const formattedDate = `${year}-${month}-${day}`;

    // Format full datetime
    const formattedDateTime = `${formattedDate}T${timePart}`;

    const response = await axios.get<OpenMeteoResponse>(
      `https://api.open-meteo.com/v1/forecast?latitude=1.29&longitude=103.85&hourly=direct_radiation&timezone=Asia%2FSingapore&start_date=${formattedDate}&end_date=${formattedDate}`
    );

    const { time, direct_radiation } = response.data.hourly;
    const timezone_abbreviation = response.data.timezone_abbreviation;

    // Get current hour from Singapore time (0-23)
    const currentHour = new Date(sgDateTime).getHours();
    
    // For debugging
    console.log('API Response first few times:', time.slice(0, 5));
    console.log('Current hour (0-23):', currentHour);
    console.log('Total hours in response:', time.length);

    // Format as HH:00 (00:00 to 23:00)
    const formattedTime = currentHour.toString().padStart(2, '0') + ':00';

    // Ensure we have data for the current hour
    if (currentHour >= time.length) {
      console.warn('Current hour exceeds available data points');
    }

    // Filter data to ensure we only use today's readings
    // Since both the API data and currentHour are 0-based indexed, we can use currentHour directly
    const todayReadings = direct_radiation.slice(0, currentHour + 1);

    // Find current hour's radiation (using 0-based index)
    const currentRadiation = direct_radiation[currentHour] || 0;

    // Find peak radiation from today's readings only
    const peakRadiation = Math.max(...todayReadings.map(value => value || 0));

    // Calculate total radiation from today's readings only
    const totalRadiation = todayReadings.reduce((sum, value) => sum + (value || 0), 0);

    return {
      last_updated_date: formattedDateTime,
      last_updated_time: formattedTime,
      timezone_abbreviation,
      radiation_current_hour: currentRadiation,
      radiation_peak_hour: peakRadiation,
      radiation_sum: totalRadiation
    };
  } catch (error) {
    console.error('Error fetching radiation data:', error);
    throw error;
  }
};
