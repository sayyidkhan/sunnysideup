// Common types used across weather APIs

export interface Location {
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
}

export interface Metadata {
    generation_time_ms: number;
    utc_offset_seconds: number;
}
