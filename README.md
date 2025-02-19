# Weather App

A modern weather application built with Next.js and TypeScript that provides real-time weather information. The app features a clean, responsive design built with Tailwind CSS and offers comprehensive weather data through the WeatherAPI.com integration.

## Features

- **Real-time Weather Data**: Get current weather conditions instantly
- **Geolocation Support**: Automatic weather detection based on user's location
- **Search Functionality**: Look up weather by city or location name
- **Comprehensive Weather Metrics**:
  - Temperature in both Celsius and Fahrenheit
  - Humidity levels
  - Wind speed and direction
  - UV index
  - "Feels like" temperature
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Error Handling**: Robust error management for API and geolocation issues

## Tech Stack

- **Frontend Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **API Integration**: WeatherAPI.com for reliable weather data
- **State Management**: React's built-in hooks
- **Development Tools**: ESLint, PostCSS

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [WeatherAPI.com](https://www.weatherapi.com/) API key

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AtulPrakash1492/weather-app.git
cd weather-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

1. Create a `.env.local` file in the root directory
2. Add your WeatherAPI.com API key and base URL:

```env
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
NEXT_PUBLIC_WEATHER_API_BASE_URL=http://api.weatherapi.com/v1
```

To get an API key:
1. Sign up for a free account at [WeatherAPI.com](https://www.weatherapi.com/)
2. Navigate to your dashboard
3. Copy your API key

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
weather-app/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout component
│   │   ├── page.tsx      # Main weather display page
│   │   └── globals.css   # Global styles
│   ├── services/         # API and service functions
│   │   └── weather.ts    # Weather API integration
│   └── types/           # TypeScript type definitions
│       └── weather.ts    # Weather-related types
├── public/              # Static files
└── ... configuration files
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm start` - Runs the built application
- `npm test` - Runs the test suite

## Error Handling

The application includes comprehensive error handling for various scenarios:
- API connection issues
- Geolocation permission denials
- Invalid location searches
- Missing API configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
