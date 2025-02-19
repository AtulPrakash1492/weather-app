import { WeatherData, GeoLocation, WeatherError } from '@/types/weather';

export async function getCurrentWeather(location: GeoLocation | string): Promise<WeatherData> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL;

    if (!apiKey) throw new Error('Weather API key is not configured');
    if (!baseUrl) throw new Error('Weather API base URL is not configured');

    const query = typeof location === 'string' 
      ? location 
      : `${location.latitude},${location.longitude}`;

    const response = await fetch(
      `${baseUrl}/current.json?key=${apiKey}&q=${query}`,
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (!response.ok) {
      const error: WeatherError = await response.json();
      throw new Error(error.message || 'Failed to fetch weather data');
    }

    const data = await response.json();
    if (!data || !data.location || !data.current) {
      throw new Error('Invalid weather data format received');
    }

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
}

export function getUserLocation(): Promise<GeoLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error('Unable to retrieve your location'));
      }
    );
  });
}