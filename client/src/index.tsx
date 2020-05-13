import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import 'antd/dist/antd.css';
import dotenv from 'dotenv';
import App from './App';
import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/utils';
import { ApolloLink } from 'apollo-boost';
import { notification } from 'antd';

dotenv.config();

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
    if (networkError && networkError.message.includes('400')) {
        notification.error({
            message: 'Error 400',
            description: networkError.message,
        });
    }
});

const uploadLink = createUploadLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'include',
});

const link = ApolloLink.from([errorLink, uploadLink]);

const client = new ApolloClient({
    link,
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
