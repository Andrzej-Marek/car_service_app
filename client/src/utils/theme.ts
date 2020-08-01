import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const theme = {
    color: {
        primaryDark: '#001529',
        background: '#F0F2F5',
        white: '#fff',
        black: '#000',
        greyText: '#B4B4B4',
        lightBlue: '#58AFFF',
        red: '#FF4D4F',
        green: '#52C423',
    },
    font: {},
    fontSize: {
        small: '12px',
        normal: '14px',
        icon: '18px',
        info: '22px',
        iconBig: '26px',
    },
    boxShadow: {
        md: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    margin: {
        small: '5px',
        normal: '10px',
        big: '20px',
    },
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
