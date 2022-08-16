import React from "react";
import { render } from "react-dom";
import ActionCable from "actioncable";


class Document extends React.Component {
    
  constructor(props) {
    super(props);
    this.cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    this.subscribe = () => {
        this.channel = this.cable.subscriptions.create(
            {
                channel: 'DemoChannel',
            },
            {
                connected: this.connected,
                disconnected: this.disconnected,
                received: this.received,
                rejected: this.rejected,
                speak: this.speak,
            }
        );
    };
    this.unsubscribe = () => {
        this.channel.unsubscribe()
    };

    this.state = { name: "Enter Some text" , notify: {} , message: ''};
  }

  received = (data) => {
    console.log("Connect");
    this.setState({message: data})

  //  this.props.onUpdate(data);
};

connected = () => {
    console.log(`Tracking connection`);
};

speak = () => {
    this.channel.perform("speak", "Mohan")
    console.log(`Speaking connection`);
};

disconnected = () => {
    console.warn(`Tracking disconnected.`);
};

rejected = () => {
    console.warn('Tracking rejected');
};


  componentDidMount(){
    // const notify = this.cable.subscriptions.create(
    //     {
    //       channel: "DemoChannel"
    //     },
    //     {
    //       connected: () => {
    //         // Connect the Room For Two way Communication
    //         console.log("Connected with room");
    //       },
    //       received: async (messages) => {
    //         // Recived the message from cabel
    //         console.log("recieved message from action cabel", messages);
    //        // setMessage(messages);
    //       },
    //       speak: () => {
    //         // Connect the Room For Two way Communication
    //         this.perform("speak")
    //         console.log("Speaking");
    //       },
    //       return() {
    //         // Disabled or Remove the Connection
    //         notify && this.cable.subscriptions.remove(notify);
    //       },
    //     }
    //   );
     
    //  this.setState({ notify: notify })
  }

  render() {
    return (
    <div>
        {this.subscribe()}
        <h2>{this.state.name}</h2>
        <textarea value={this.state.message} onChange={(e) =>  {this.setState({message: e.target.value}); this.channel.perform('speak', {data: e.target.value}); }} />    
    </div>
    );
  }
}

export default Document;