import React from 'react';
import styled from 'styled-components';

import selectedTheme from './themeManager';

const GreeterContainer = styled.div`
    padding: 2rem 0 2rem 0;
`;

const GreetText = styled.h1`
    font-family: Roboto, sans-serif;
    font-weight: 900;
    font-size: 45px;
    margin: 0.5rem 0 0.5rem 0;
    color: ${selectedTheme.mainColor};
`;

const DateText = styled.h3`
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 15px;
    text-transform: uppercase;
    margin: 0;
    color: ${selectedTheme.accentColor};
`;

const getGreeting = () => {
    // Maybe add some expandability for different greetings?
    return 'Hello World!';
};

const getExtension = day => {
    let extension = '';

    if ((day > 4 && day <= 20) || (day > 20 && day % 10 >= 4)) {
        extension = 'th';
    } else if (day % 10 === 1) {
        extension = 'st';
    } else if (day % 10 === 2) {
        extension = 'nd';
    } else if (day % 10 === 3) {
        extension = 'rd';
    }

    return extension;
};

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const weekDayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const getDateString = () => {
    let currentDate = new Date();

    return (
        weekDayNames[currentDate.getUTCDay()] +
        ', ' +
        monthNames[currentDate.getUTCMonth()] +
        ' ' +
        currentDate.getDate() +
        getExtension(currentDate.getDate()) +
        ' ' +
        currentDate.getFullYear()
    );
};

const Greeter = () => {
    let date = getDateString();
    let greeting = getGreeting();

    return (
        <GreeterContainer>
            <DateText>{date}</DateText>
            <GreetText>{greeting}</GreetText>
        </GreeterContainer>
    );
};

export default Greeter;
