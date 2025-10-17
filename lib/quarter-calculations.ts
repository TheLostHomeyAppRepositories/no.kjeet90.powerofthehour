import { getHoursBetween, getReadingsYoungerThan } from "./calculations";

export function getElapsedQuarter(timestamp: Date) {
    const time = new Date(timestamp);
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const totalSeconds = minutes * 60 + seconds;
    const quarterLength = 15 * 60;
    const currentQuarter = Math.floor(totalSeconds / quarterLength);
    const elapsedInQuarter = totalSeconds - currentQuarter * quarterLength;
    return elapsedInQuarter / quarterLength;
}

export const getRemainingQuarter = (timestamp: Date) => {
    const totalSeconds = timestamp.getMinutes() * 60 + timestamp.getSeconds();
    const quarterLength = 15 * 60; // 15 minutes in seconds
    const currentQuarter = Math.floor(totalSeconds / quarterLength);
    const quarterStart = currentQuarter * quarterLength;
    const elapsedInQuarter = totalSeconds - quarterStart;
    const remainingInQuarter = quarterLength - elapsedInQuarter;
    return remainingInQuarter / quarterLength;
};

export const isNewQuarter = (newestTimestamp: Date, oldestTimestamp: Date | null) => {
    if (!oldestTimestamp) return true;

    const getQuarter = (date: Date) => Math.floor(date.getMinutes() / 15);

    if (newestTimestamp.getHours() !== oldestTimestamp.getHours()) {
        return true;
    }

    if (getQuarter(newestTimestamp) !== getQuarter(oldestTimestamp)) {
        return true;
    }

    // Safety check: if time difference is 15 min or more
    return (newestTimestamp.getTime() - oldestTimestamp.getTime()) / (1000 * 60 * 15) >= 1;
};

export const predictRemainingQuarter = (referenceReadings: { consumption: number; timestamp: Date }[] = []) => {
    if (referenceReadings.length < 2) return referenceReadings[0]?.consumption || 0;
    let current: { consumption: number; timestamp: Date };
    let previous: { consumption: number; timestamp: Date };
    let wattHours = 0;

    for (let i = 1; i < referenceReadings.length; i++) {
        previous = referenceReadings[i];
        current = referenceReadings[i - 1];
        wattHours += previous.consumption * getHoursBetween(current.timestamp, previous.timestamp);
    }

    const timespan = getHoursBetween(referenceReadings[0].timestamp, referenceReadings[referenceReadings.length - 1].timestamp);
    const averageWattUsage = wattHours / timespan;
    return Math.round((averageWattUsage * getRemainingQuarter(referenceReadings[0].timestamp)) / 4);
};

export const getQuarterPrediction = (
    readings: { consumption: number; timestamp: Date }[] = [],
    number = 5,
    type = 'time'
) => {
    if (readings.length < 1 || number < 1) {
        return 0;
    }

    let referenceReadings: { consumption: number; timestamp: Date }[] = [readings[0]];

    if (type === 'time') {
        referenceReadings = getReadingsYoungerThan(readings, number);
    } else if (type === 'count') {
        referenceReadings = readings.slice(0, number);
    }

    if (referenceReadings.length === 1) {
        return Math.round((referenceReadings[0].consumption * getRemainingQuarter(referenceReadings[0].timestamp)) / 4);
    }
    return predictRemainingQuarter(referenceReadings);
};

export const getPowerAvailableQuarter = (consumptionLimit: number, consumption: number, timestamp: Date) => {
    return ((consumptionLimit - consumption) / getRemainingQuarter(timestamp));
};
