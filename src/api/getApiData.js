import React from 'react';
import axios from 'axios';

const getApiData = async (url, setError) => {
    try {
        const { data, status } = await axios.get(url, { withCredentials: true });
        
        if (status >= 200 && status < 300) {
            return data;
        }
    } catch (error) {
        if (error.response) {
            setError(error)
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        return;
    }
};

export default getApiData;