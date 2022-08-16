
class DemoChannel < ApplicationCable::Channel
    def subscribed
      # stream_from "some_channel"
      stream_from "demo_channel"
    end
  
    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
  #    raise NotImplementedError
    end

    def speak(message)
      puts message
      ActionCable.server.broadcast 'demo_channel', message["data"]
    end
  end
  