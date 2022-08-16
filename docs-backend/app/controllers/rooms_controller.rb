class RoomsController < ApplicationController
    
    def index
        rooms = Room.all
        render json: rooms
    end

    def create
        room = Room.find_by(name: params[:name]) || Room.create(room_params)
        ActionCable.server.broadcast 'demo_channel', "I am from demo channel"
    end

    def room_params
        params.require(:room).permit(:name, :age)
    end

end
