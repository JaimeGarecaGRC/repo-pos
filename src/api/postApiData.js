import React from 'react';
import axios from 'axios';

const postApiData = async (url, postData, setError) => {
    try{
        const { data, status } = await axios.post(url, postData, { withCredentials: true });
        if (status >=200 && status < 300) {
            return data;
        }
    } catch (error) {
        if (error.response) {
            setError(error);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        return;
    }
};

export default postApiData;