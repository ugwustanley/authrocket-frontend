import {useState, useEffect} from 'react'
import './App.css';
import Routes from './routes/routes'

function App() {
   const [width , setWidth] = useState()
  function screenWidth(){
    setInterval(() => {
    
      const hasWindow = typeof window !== 'undefined';
      const width = hasWindow ? window.innerWidth : null;
      // console.log(width)
      setWidth(width)
    }, 1000);
  }
  useEffect(() => { 
    screenWidth() 
  }, [])

  if( width < 800) {
    return <p className="text-center p-5 mt-5">This application is not available on small screens</p>
  }
  return (
    <div className="App">
         <Routes />
    </div>
  );
}

export default App;

