import { createContext, useState } from "react";

export const WatchListContext  = createContext()

export const WatchListContextProvider = (props) => {

    const [watchList, setwatchList] = useState(['GOOGL','MSFT','AMZN'])

    const addStock = (stock) => {
        if(watchList.indexOf(stock)=== -1){
            setwatchList([...watchList,stock])
        }
    }

    const deleteStock = (stock) => {
        setwatchList(watchList.filter((el)=>{
            return el !== stock
        }))
    }



    return <WatchListContext.Provider value = {{watchList, addStock, deleteStock }}>
        {props.children}
    </WatchListContext.Provider>
}