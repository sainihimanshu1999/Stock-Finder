import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {StockDetailPage} from './Pages/StockDetailPage';
import {StockOverviewPage} from './Pages/StockOverviewPage'
import { WatchListContextProvider } from './context/watchListContext';

function App() {
  return (
    <main className='container'>
      <WatchListContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<StockOverviewPage/>}/>
          <Route path='/detail/:symbol' element = {<StockDetailPage/>}/>
        </Routes>
      </BrowserRouter>
      </WatchListContextProvider>
    </main>
      
    
  );
}

export default App;

/* api key cgbt49hr01qispgnlbc0cgbt49hr01qispgnlbcg*/