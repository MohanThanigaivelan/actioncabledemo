class RoomsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "rooms_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
#    raise NotImplementedError
  end

  def speak(message)
    puts "ubodfijpafa"
    ActionCable.server.broadcast 'demo_channel', message
  end

end
