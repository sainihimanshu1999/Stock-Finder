import axios from 'axios';


const TOKEN = "cgbt49hr01qispgnlbc0cgbt49hr01qispgnlbcg"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params : {
        token:TOKEN
    }
})