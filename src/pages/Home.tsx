import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import {useState, useEffect} from 'react';

const Home: React.FC = () => {
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
  let list:string[] = [];
  const [counter, setCounter] = useState(0);
  const [started, setStarted] = useState(false);

  const [isRunning, setIsRunning] = useState(false);
  const [color, setColor] = useState("red");
  let intervalId: any, intervalId2: any;
  useEffect(() => {
    if (counter % 2) {
      setColor("red");
    } else {
      setColor("blue");
    }
  }, [counter]);


  const startLoop = () => {
    setStarted(true);
    intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1);
    intervalId2 = setInterval(() => {
      list = [...list, generateRandomText(200000, started)];
    }, 1);
    setTimeout(()=>{
      setStarted(false);
      clearInterval(intervalId); clearInterval(intervalId2);
      list = [];
    }, 30000);  
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Marghoob Ahmad - 191ADB066</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color={color==='red'?'primary':'secondary'}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{position: 'absolute',
  left:'50%' ,
  top:'50%',
  transform: 'translate(-50%, -50%)'}}>
          <IonButton onClick={startLoop} color="tertiary">{started?'Started':'Start'}</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
