import logo from './logo.svg';
import './App.css';
import { ActionCableConsumer } from 'react-actioncable-provider';
import  { useState, useEffect } from 'react';
import ActionCable from "actioncable";


function App() {

  const CableApp = {};
  CableApp.cable = ActionCable.createConsumer('ws://localhost:3000/cable');
  const [connection, setConection] = useState("");
  const [message, setMessage] = useState(""); 

  useEffect(() => {
    const notify = CableApp.cable.subscriptions.create(
      {
        channel: "DemoChannel"
      },
      {
        connected: () => {
          // Connect the Room For Two way Communication
          console.log("Connected with room");
        },
        received: async (messages) => {
          // Recived the message from cabel
          console.log("recieved message from action cabel", messages);
          setMessage(messages);
        },
        speak: () => {
          // Connect the Room For Two way Communication
          this.perform("speak")
          console.log("Speaking");
        },
        return() {
          // Disabled or Remove the Connection
          notify && CableApp.cable.subscriptions.remove(notify);
        },
      }
    );
    setConection(notify);
  }, []);

  return (
    <div className="App">
      {/* <ActionCableConsumer
         channel={{channel: 'DemoChannel'}}
         onReceived={(response) => {
          setMessage(response)
         }} 
         speak={() => "Hello Hellow"}
      /> */}
      <textarea value={message} onChange={(e) =>  {setMessage(e.target.value); connection.speak()}} />
    </div>
  );
}

export default App;
