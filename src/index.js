import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider, Group, Button, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import classes from './Demo.module.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
  },
});

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
