import axios from 'axios';
// const KEY = 'AIzaSyDUcvd08NcSI1_Pme08vDsHK6n8scEJ1N4'; // mention your youtube API key here
const KEY = 'AIzaSyDUwSO-w_bMQhoErHnfz8I3eZBP-a-e1BY'
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 10,
        key: KEY
    }
})
