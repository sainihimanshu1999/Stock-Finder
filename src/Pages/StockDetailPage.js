import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import finnHub from '../api/finnHub'
import { StockChart } from "../components/StockChart"
import { Stockdata } from "../components/StockData"


const formatData = (data) => {
    return data.t.map((el,index)=>{
        return{
            x: el*1000,
            y: Math.floor(data.c[index])
        }
    })
}


export const StockDetailPage = () => {

    const {symbol} = useParams()
    const [chartData, setChartData] = useState()

    useEffect(()=>{
        const fetchData = async () => {
            const date = new Date()
            const currentTime = Math.floor(date.getTime()/1000)
            let oneDay;

            if (date.getDate() === 6 ){
                oneDay = currentTime - 2*24*60*60;
            } else if(date.getDate() === 0) {
                oneDay = currentTime - 3*24*60*60;
            } else {
                oneDay = currentTime - 24*60*60;
            }
            const oneWeek = currentTime - 24*60*60
            const oneYear = currentTime - 365*24*60*60

            try{
                const responses = await Promise.all([
                    finnHub.get('/stock/candle', {
                    params:
                        {symbol,
                        from : oneDay,
                        to : currentTime ,
                        resolution : 30}
                }),
    
                finnHub.get('/stock/candle', {
                    params:
                        {symbol,
                        from : oneWeek,
                        to : currentTime ,
                        resolution : 60}
                }),
    
                finnHub.get('/stock/candle', {
                    params:
                        {symbol,
                        from : oneYear,
                        to : currentTime ,
                        resolution : "W"}
                })
                ])
                //console.log(responses)
                setChartData({
                    day: formatData(responses[0].data),
                    week: formatData(responses[1].data),
                    year: formatData(responses[2].data)
                })
                console.log(responses)
            }catch(err){
                console.log(err)
            }

            
            
        }

        fetchData()

    },[symbol])

    return <div>
        {chartData && (
            <div>
                <StockChart chartData = {chartData} symbol={symbol}/>
                <Stockdata symbol={symbol}/>
            </div>
        )}
    </div>
}
