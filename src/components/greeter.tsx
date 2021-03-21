import React from "react";
import styled from "styled-components";

import selectedTheme from "../lib/theme";

const GreeterContainer = styled.div`
  padding: 2rem 0;
`;

const GreetText = styled.h1`
  font-weight: 900;
  font-size: 3rem;
  margin: 0.5rem 0;
  color: ${selectedTheme.mainColor};
`;

const DateText = styled.h3`
  font-weight: 400;
  font-size: 1rem;
  text-transform: uppercase;
  margin: 0;
  color: ${selectedTheme.accentColor};
`;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * Returns a greeting based on the current time
 * @returns {string} - A greeting
 */
const getGreeting = () => {
  switch (Math.floor(new Date().getHours() / 6)) {
    case 0:
      return "Good night!";
    case 1:
      return "Good morning!";
    case 2:
      return "Good afternoon!";
    case 3:
      return "Good evening!";
    default:
      break;
  }
};

/**
 * Returns the appropriate extension for a number (eg. 'rd' for '3' to make '3rd')
 * @param {number} day - The number of a day within a month 
 * @returns {string} - The extension for that number
 */
const getExtension = (day: number) => {
  let extension = "";

  if ((day > 4 && day <= 20) || (day > 20 && day % 10 >= 4)) {
    extension = "th";
  } else if (day % 10 === 1) {
    extension = "st";
  } else if (day % 10 === 2) {
    extension = "nd";
  } else if (day % 10 === 3) {
    extension = "rd";
  }

  return extension;
};

/**
 * Generates the current date
 * @returns {string} - The current date as a string
 */
const getDateString = () => {
  let currentDate = new Date();

  return (
    weekDayNames[currentDate.getUTCDay()] +
    ", " +
    monthNames[currentDate.getUTCMonth()] +
    " " +
    currentDate.getDate() +
    getExtension(currentDate.getDate()) +
    " " +
    currentDate.getFullYear()
  );
};

/**
 * Renders the Greeter
 */
const Greeter = () => (
  <GreeterContainer>
    <DateText>{getDateString()}</DateText>
    <GreetText>{getGreeting()}</GreetText>
  </GreeterContainer>
);

export default Greeter;
