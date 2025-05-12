---
marp: true
theme: default
paginate: true
class: lead
backgroundColor: #f5f5f5
---

<!-- _class: lead -->
<!-- _backgroundImage: url('https://raw.githubusercontent.com/sayyidkhan/sunnysideup/main/docs/img/main-dashboard-web-min.jpg') -->
<!-- _backgroundSize: 95% -->
<!-- _backgroundPosition: bottom right -->
<!-- _backgroundOpacity: 0.35 -->

# SunnySideUp
## Singapore Weather Dashboard

May 2025

---

<!-- _class: lead -->
# Project Overview

![bg right:50% width:100% opacity:0.9](https://raw.githubusercontent.com/sayyidkhan/sunnysideup/main/docs/img/detailed-dashboard-web-min.jpg)

SunnySideUp is a comprehensive weather monitoring application for Singapore.

- 🌡️ Real-time temperature data and forecasts
- 💧 Humidity levels tracking across regions

---

<!-- _class: lead -->
# Key Capabilities

![bg right:43% width:80% opacity:0.9](https://raw.githubusercontent.com/sayyidkhan/sunnysideup/main/docs/img/main-dashboard-mobile-min.jpg)

SunnySideUp delivers essential weather insights:

- ☀️ Solar radiation measurements and predictions
- 🗺️ Interactive map with location-specific weather conditions

---

# Key Features

![bg right:55% 75%](https://raw.githubusercontent.com/sayyidkhan/sunnysideup/main/docs/img/main-dashboard-web-min.jpg)

### Interactive Map  
- Singapore map with weather markers  
- Location-specific forecasts

### Weather Data  
- 10-day forecasts
- Daily humidity analysis
- Solar radiation tracking

<!-- _footer: 'Map view with interactive markers' -->

---

# Data Dashboards

![bg right:40% 80%](https://raw.githubusercontent.com/sayyidkhan/sunnysideup/main/docs/img/detailed-dashboard-web-min.jpg)

### Main Insights Dashboard
- Quick overview of key metrics
- Temperature, humidity, radiation charts
- Performance metrics cards

### Detailed Insights Dashboard
- In-depth location-specific data
- Historical comparisons
- Expanded weather visualizations

<!-- _footer: 'Detailed web dashboard view' -->

---

# Performance Metrics

![bg left:40% 80%](https://raw.githubusercontent.com/sayyidkhan/sunnysideup/main/docs/img/asset-and-today-performance-card-web-min.jpg)

### Solar Radiation Tracking
- Daily cumulative solar radiation collected
- Maximum radiation value per day (MWp)

### Today's Performance
- Average hourly radiation (MWh)
- Real-time current hour values

<!-- _footer: 'Performance metrics cards' -->

---

# Technical Architecture

![bg right:40% 90%](https://raw.githubusercontent.com/sayyidkhan/sunnysideup/main/docs/img/close-dashboard-web-min.jpg)

### Front-End
- React for UI components
- TailwindCSS & NextUI for styling
- React Leaflet for interactive maps

### Data Sources
- Open-Meteo API for weather forecasts
- 10-day forecasts (temperature, humidity)
- Hourly radiation data

<!-- _footer: 'Collapsed dashboard view showing clean design' -->

---

# API Integration

```javascript
// Main weather data fetching function
export const fetchSGMainDailyForecast = async (params = {}) => {
  const response = await axios.get(OPEN_METEO_URL, {
    params: {
      latitude, longitude, timezone,
      daily: ['temperature_2m_max', 'temperature_2m_min'],
      hourly: ['relativehumidity_2m', 'direct_radiation'],
      forecast_days: 10,
    },
  });
  return response.data;
};
```

---

# Map Component

```jsx
<MapContainer 
  center={MAP_CONFIG.DEFAULT_CENTER}
  zoom={MAP_CONFIG.DEFAULT_ZOOM}
  style={{ height: "100vh", width: "100%" }}
>
  <SearchBarAndZoomControls 
    toggleDashboard={toggleDashboard} 
    showDashboard={showDashboard} 
  />
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  
  {/* Location markers */}
  {locations.map((location) => (
    <Marker position={[location.latitude, location.longitude]} />
  ))}
</MapContainer>
```


- Intelligent autocomplete suggestions
- Quick access to frequent locations
- Visual search results on map

<!-- _footer: 'Search interfaces across device sizes' -->

---

# Data Visualization

![bg left:45% 90%](https://raw.githubusercontent.com/sayyidkhan/sunnysideup/main/docs/img/detailed-dashboard-tablet-min.jpg)

### Chart Features
- Temperature charts - min/max daily values
- Humidity percentage tracking
- Solar radiation in MW (megawatts)
- Interactive tooltips & legends

All charts use time-series data with customizable date ranges.

<!-- _footer: 'Tablet view of detailed charts' -->

---

# Future Enhancements

![bg right:35% 80%](https://raw.githubusercontent.com/sayyidkhan/sunnysideup/main/docs/img/close-dashboard-tablet-min.jpg)

- Real-time weather alerts & notifications
- Improved search with autocomplete
- Historical data analysis
- Wind speed & direction visualization
- Rain probability forecasts
- User preferences & favorites

---

<!-- _class: lead -->
<!-- _backgroundImage: url('https://raw.githubusercontent.com/sayyidkhan/sunnysideup/main/docs/img/main-dashboard-web-min.jpg') -->
<!-- _backgroundSize: 90% -->
<!-- _backgroundPosition: center -->
<!-- _backgroundOpacity: 0.25 -->

# Thank You!

**GitHub Repository:** [github.com/sayyidkhan/sunnysideup](https://github.com/sayyidkhan/sunnysideup)

**Live Demo:** [sunnysideup-one.vercel.app](https://sunnysideup-one.vercel.app)
