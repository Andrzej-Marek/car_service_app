import { ThemedCssFunction } from 'styled-components';
import { css } from 'styled-components';

const sizes = {
    xs: 480,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
};

// Iterate through the sizes and create a media template
export const media = (Object.keys(sizes) as (keyof typeof sizes)[]).reduce((acc, label) => {
    acc[label] = (first: any, ...interpolations: any[]) => css`
        @media (min-width: ${sizes[label]}px) {
            ${css(first, ...interpolations)}
        }
    `;

    return acc;
}, {} as { [key in keyof typeof sizes]: ThemedCssFunction<typeof sizes> });
