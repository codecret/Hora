import dayjs from "dayjs";
import { useEffect } from "react";
import { useState } from "react";

export const convertMinutesTo24hoursTime = (totalMinutes) => {
  // Convert minutes to 24 hours
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Ensure that hours and minutes are formatted with leading zeros if needed
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Combine hours and minutes into a time string
  const time = `${formattedHours}:${formattedMinutes}`;

  return time;
};

export const convert24hoursToMinutesTime = (timeIn24Hours) => {
  // save number of minutes as an integer field.
  // For example, 8:30 will be converted as 8 hour * 60 minutes + 30 minutes = 510 minutes. Save 510 as an number in MongoDB.
  const hours = timeIn24Hours.hour();
  const minutes = timeIn24Hours.minute();
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const combineDateAndTime = (date, time) => {
  const startDateParts = date.split("T");
  const startTimeConvertedToHours = convertMinutesTo24hoursTime(time);
  let startDateTimeCombined = `${startDateParts[0]}T${startTimeConvertedToHours}`; // Split the endDate into date and time parts
  startDateTimeCombined = dayjs(startDateTimeCombined).tz(
    "Europe/Istanbul",
    true
  );
  return startDateTimeCombined;
};

// regular expression to match the last four digits
export const getLastFourDigits = (str) => {
  const digits = str.replace(/\D/g, "");
  return digits.slice(-4);
};
