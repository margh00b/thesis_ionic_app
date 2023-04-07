import './ExploreContainer.css';
import {useState, useEffect} from 'react';


interface ContainerProps { }

const ExploreContainer: any = () => {
  function generateRandomText(n: any, running: any) {
    if(!running)
      return '';
    const chunkSize = 10000; // generate the string in chunks of 10000 characters
    const chunks = Math.ceil(n / chunkSize);
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < chunks; i++) {
      if(!running)
        return '';
      let chunk = "";
      for (let j = 0; j < chunkSize && (i * chunkSize + j) < n; j++) {
        chunk += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      result += chunk;
    }
    return result;
    
  }
  const [list, setList] = useState<string[]>([]);
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [color, setColor] = useState("red");

  useEffect(() => {
    if(!isRunning){
      return;
    }
    if (counter % 2) {
      setColor("red");
    } else {
      setColor("blue");
    }
    // setList((r) => [...r, generateRandomText(20000, isRunning)]);
  }, [counter]);

  useEffect(() => {
    if(!isRunning){
      return;
    }
    setList((list: string[]) => [...list, generateRandomText(200000, isRunning)]);
  }, [counter2]);
  useEffect(() => {
    let intervalId: any;
    let intervalId2: any;
    if (isRunning) {
      intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 0);
      intervalId2 = setInterval(() => {
        setCounter2((prevCounter) => prevCounter + 1);
      }, 250);
    }

    return () => {clearInterval(intervalId); clearInterval(intervalId2);};
  }, [isRunning]);

  const startLoop = () => setIsRunning(true);

  const stopLoop = () => setIsRunning(false);
  return (
  <div style={{flex:1, backgroundColor: color  }}>
    <button onClick={startLoop}>Start Loop</button>
    <button onClick={stopLoop}>Stop Loop</button>
  </div>)
}
export default ExploreContainer;
