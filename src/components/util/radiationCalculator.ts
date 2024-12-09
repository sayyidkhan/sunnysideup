/**
 * Calculates the average megawatts per hour from the total daily megawatts
 * @param totalMegaWatts - Total megawatts for the day
 * @returns Average megawatts per hour
 */
export function getTodayAverageMegaWatts(totalMegaWatts: number): number {
    const averageMegaWatts = Number((totalMegaWatts / 24).toFixed(2));
    return averageMegaWatts;
}

/**
 * Formats the ISO date string by removing the 'T' and adding proper spacing
 * @param isoDate - ISO date string
 * @returns Formatted date string
 */
export function formatDateTime(isoDate: string): string {
    return isoDate.replace('T', ' ');
}
