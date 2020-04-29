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
        info: '24px',
    },
    boxShadow: {},
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
