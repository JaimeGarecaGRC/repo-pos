import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@routes/App';
import App2 from "@routes/App2";


const container = document.getElementById('app');

// create a root
const root = ReactDOM.createRoot(container);

//render app to root
// root.render(<App/>);
root.render(<App2/>)