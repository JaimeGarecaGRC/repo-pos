import axios from 'axios';

const  deleteApiData = async (url, setError) => {
        try {
            const { data, status } = await axios.delete(url, { withCredentials: true });
            console.log(status);
            console.log(data);
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

export default deleteApiData;