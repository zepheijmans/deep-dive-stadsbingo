export class LocationUtils {
  static isOpen(openingHours: number, closingHours: number): boolean {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return currentMinutes >= openingHours && currentMinutes < closingHours;
  }

  static formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  static timeUntil(openingHours: number, closingHours: number): number {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (currentMinutes < openingHours) {
      const minutesUntilOpen = openingHours - currentMinutes;
      return minutesUntilOpen;
    } else if (currentMinutes < closingHours) {
      const minutesUntilClose = closingHours - currentMinutes;
      return minutesUntilClose;
    } else {
      return 0;
    }
  }

  static getOpeningTimes(openingHours: number, closingHours: number): { openingTime: string, closingTime: string } {
    return {
      openingTime: formatTime(openingHours),
      closingTime: formatTime(closingHours),
    };
  }
}

export const isOpen = LocationUtils.isOpen;
export const formatTime = LocationUtils.formatTime;
export const timeUntil = LocationUtils.timeUntil;
export const getOpeningTimes = LocationUtils.getOpeningTimes;