import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import 'antd/dist/antd.css';
import dotenv from 'dotenv';
import App from './App';
import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/utils';

dotenv.config();

const client = new ApolloClient({
    link: createUploadLink({
        uri: 'http://localhost:5000/graphql',
        credentials: 'include',
    }),
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <Suspense fallback="loading">
        <ApolloProvider client={client}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </ApolloProvider>
    </Suspense>,
    document.getElementById('root'),
);
