interface MapConfig {
    DEFAULT_CENTER: [number, number];
    TIMEZONE: string;
    DEFAULT_ZOOM: number;
    MIN_ZOOM: number;
    MAX_ZOOM: number;
}

// Map related constants
export const MAP_CONFIG: MapConfig = {
    // Singapore coordinates d
    // I have picked this coordinates because it is the center of the country
    // and it is a better coordinate to start with than than the original one provided
    // original coordinates: [1.29, 103.85]
    DEFAULT_CENTER: [1.3521, 103.8198],
    TIMEZONE: 'Asia/Singapore', 
    DEFAULT_ZOOM: 12,
    MIN_ZOOM: 3,
    MAX_ZOOM: 18,
};
