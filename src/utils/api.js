import  axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTM1MGEyNDdlNmUxYTZiNjNmNWYwMGQyN2IxY2FiZSIsInN1YiI6IjY1ZjA2OTQ3NjZhN2MzMDBjYWRkYzdhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7jlYev3m-Mx6YTsb-Mu9F8gb32O-FwM1zsI5L8e0PNI';

const headers = {
    Authorization : "Bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url , params) => {
    try{
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params,
        })
        return data;
    } catch (err) {
        console.log(err)
        return err;
    }
}