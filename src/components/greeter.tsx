import styled from "styled-components";

const GreeterContainer = styled.div`
  padding: 2rem 0;
`;

const GreetText = styled.h1`
  font-weight: 900;
  font-size: 3rem;
  margin: 0.5rem 0;
  color: ${(props) => props.theme.mainColor};
`;

const DateText = styled.h3`
  font-weight: 400;
  font-size: 1rem;
  text-transform: uppercase;
  margin: 0;
  color: ${(props) => props.theme.accentColor};
`;

export interface IGreeterComponentProps {
  data: IGreeterProps;
}

export interface IGreeterProps {
  months: Array<string>;
  days: Array<string>;
  greetings: Array<IGreetingProps>;
  dateformat: string;
}

interface IGreetingProps {
  greeting: string;
  start: number;
  end: number;
}

/**
 * Checks if a number is between two numbers
 * @param {number} a number that's supposed to be checked
 * @param {number} b minimum
 * @param {number} c maximum
 */
export const isBetween = (a: number, b: number, c: number): boolean =>
  a >= b && a <= c;

/**
 * Returns a greeting based on the current time
 * @param {Array<IGreetingProps>} greetings a list of greetings with start and end date
 * @returns {string} a greeting
 */
export const getGreeting = (greetings: Array<IGreetingProps>): string => {
  let hours = Math.floor(new Date().getHours());
  let result = "";

  greetings.forEach((greeting) => {
    if (isBetween(hours, greeting.start, greeting.end))
      result = greeting.greeting;
  });

  return result;
};

/**
 * Returns the appropriate extension for a number (eg. 'rd' for '3' to make '3rd')
 * @param {number} day number of a day within a month
 * @returns {string} extension for that number
 */
export const getExtension = (day: number) => {
  let extension = "";

  if (day % 10 === 1) {
    extension = "st";
  } else if (day % 10 === 2) {
    extension = "nd";
  } else if (day % 10 === 3) {
    extension = "rd";
  } else if (isBetween(day, 4, 20) || (day > 20 && day % 10 >= 4)) {
    extension = "th";
  }

  return extension;
};

/**
 * Generates the current date
 * @param {string} format format of the date string
 * @returns {string} current date as a string
 */
export const getDateString = (
  weekdays: Array<string>,
  months: Array<string>,
  format: string,
) => {
  let currentDate = new Date();

  let weekday = weekdays[currentDate.getUTCDay()];
  let day = currentDate.getDate();
  let month = months[currentDate.getUTCMonth()];
  let extension = getExtension(day);
  let year = currentDate.getFullYear();

  return format
    .replace("%wd", weekday)
    .replace("%d", day.toString())
    .replace("%e", extension)
    .replace("%m", month)
    .replace("%y", year.toString());
};

/**
 * Renders the Greeter
 * @param {IGreeterComponentProps} data required greeter data
 * @returns {React.ReactNode} the greeter
 */
const Greeter = ({ data }: IGreeterComponentProps) => (
  <GreeterContainer>
    <DateText>
      {getDateString(data.days, data.months, data.dateformat)}
    </DateText>
    <GreetText>{getGreeting(data.greetings)}</GreetText>
  </GreeterContainer>
);

export default Greeter;
