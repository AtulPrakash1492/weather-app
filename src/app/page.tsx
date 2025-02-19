'use client';

import { useEffect, useState } from 'react';
import { WeatherData } from '@/types/weather';
import { getCurrentWeather, getUserLocation } from '@/services/weather';
import { FaTrash } from 'react-icons/fa';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [favorites, setFavorites] = useState<WeatherData[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('weatherFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = () => {
    if (!weather) return;
    const exists = favorites.some(fav => fav.location.name === weather.location.name);
    if (!exists) {
      const newFavorites = [...favorites, weather];
      setFavorites(newFavorites);
      localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (cityName: string) => {
    const newFavorites = favorites.filter(fav => fav.location.name !== cityName);
    setFavorites(newFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
  };

  useEffect(() => {
    async function fetchWeather() {
      try {
        const location = await getUserLocation();
        const weatherData = await getCurrentWeather(location);
        setWeather(weatherData);
        setError(null);
      } catch (err) {
        setIsSearchMode(true);
        setError('Please enter a location to get weather information');
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const weatherData = await getCurrentWeather(searchQuery);
      setWeather(weatherData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCA1NiAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTYgMjhMMjggMjhMMjggMEw1NiAwTDU2IDI4WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-10"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-white text-center mb-8 animate-fade-in">Weather Dashboard</h1>
        
        <form onSubmit={handleSearch} className="mb-8 transform transition-all duration-300 ease-in-out hover:scale-[1.02]">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location..."
              className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 shadow-lg text-gray-800 placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300 disabled:opacity-50"
              disabled={!searchQuery.trim()}
            >
              Search
            </button>
          </div>
        </form>

        {error ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all hover:scale-[1.02] border border-white/20 max-w-md mx-auto">
            <p className="text-gray-700 text-center">{error}</p>
          </div>
        ) : weather ? (
          <div 
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all hover:scale-[1.02] border border-white/20"
            onDoubleClick={addToFavorites}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-800">{weather.location.name}</h1>
                <p className="text-gray-600">{weather.location.country}</p>
                <p className="text-gray-500">{weather.location.localtime}</p>
                
                <div className="flex items-center space-x-4">
                  <span className="text-6xl font-bold text-gray-800">
                    {Math.round(weather.current.temp_c)}°C
                  </span>
                  <span className="text-2xl text-gray-600">
                    / {Math.round(weather.current.temp_f)}°F
                  </span>
                </div>
                
                <p className="text-xl text-gray-700">{weather.current.condition.text}</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl transform transition-all duration-300 hover:scale-105">
                    <p className="text-sm text-blue-600">Feels Like</p>
                    <p className="text-2xl font-semibold text-blue-800">
                      {Math.round(weather.current.feelslike_c)}°C
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-xl transform transition-all duration-300 hover:scale-105">
                    <p className="text-sm text-purple-600">Humidity</p>
                    <p className="text-2xl font-semibold text-purple-800">
                      {weather.current.humidity}%
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-xl transform transition-all duration-300 hover:scale-105">
                    <p className="text-sm text-green-600">Wind Speed</p>
                    <p className="text-2xl font-semibold text-green-800">
                      {weather.current.wind_kph} km/h
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-xl transform transition-all duration-300 hover:scale-105">
                    <p className="text-sm text-yellow-600">UV Index</p>
                    <p className="text-2xl font-semibold text-yellow-800">
                      {weather.current.uv}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {favorites.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Favorite Cities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((fav) => (
                <div
                  key={fav.location.name}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-4 relative group"
                >
                  <button
                    onClick={() => removeFromFavorites(fav.location.name)}
                    className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash />
                  </button>
                  <h3 className="text-xl font-semibold text-gray-800">{fav.location.name}</h3>
                  <p className="text-gray-600">{fav.location.country}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-800">
                      {Math.round(fav.current.temp_c)}°C
                    </span>
                    <span className="text-gray-600">
                      {fav.current.condition.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}