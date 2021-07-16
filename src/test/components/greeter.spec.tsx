import { render } from "@testing-library/react";
import Greeter, {
  IGreeterProps,
  isBetween,
  getExtension,
} from "../../components/greeter";

const props: IGreeterProps = {
  months: [
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
  ],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  greetings: [
    {
      greeting: "Good night!",
      start: 0,
      end: 6,
    },
    {
      greeting: "Good morning!",
      start: 6,
      end: 12,
    },
    {
      greeting: "Good afternoon!",
      start: 12,
      end: 18,
    },
    {
      greeting: "Good evening!",
      start: 18,
      end: 24,
    },
  ],
  dateformat: "%wd, %m %d%e %y",
};

it("isBetween test", () => {
  expect(isBetween(5, 1, 3)).toBeFalsy;
  expect(isBetween(64, 1, 8)).toBeFalsy;
  expect(isBetween(-1, -5, -3)).toBeFalsy;
  expect(isBetween(4, 4, 4)).toBeTruthy;
  expect(isBetween(3, 1, 8)).toBeTruthy;
  expect(isBetween(-3, -5, -1)).toBeTruthy;
});

it("getExtension test", () => {
  expect(getExtension(0)).toEqual("th");
  expect(getExtension(1)).toEqual("st");
  expect(getExtension(2)).toEqual("nd");
  expect(getExtension(3)).toEqual("rd");
  expect(getExtension(15)).toEqual("th");
});

it("Greeter snapshot test", () => {
  const { asFragment } = render(<Greeter data={props} />);
  expect(asFragment).toMatchSnapshot();
});
