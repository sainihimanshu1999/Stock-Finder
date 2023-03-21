import { useState,useEffect } from "react";
import finHub from "../api/finHub";

export const StockList = () => {

    const [stock, setStock] = useState();
    const [watchList, setwatchList] = useState(['GOOGL','MSFT','AMZN']);

    useEffect(()=>{
        let isMounted = true
        const fetchData = async () => {
            try{
                const response = await finHub.get('/quote' , {
                    params : {
                        symbol: 'MSFT'
                    }
                })
                if (isMounted){
                    setStock(response.data)
                }
                
                console.log(response)
            }catch(err){

            } 
        }
        fetchData()

        return () => (isMounted=false)
    },[])

    return <div>Stock List</div>
}