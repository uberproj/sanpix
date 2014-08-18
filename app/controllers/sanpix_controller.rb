require 'util/geocoder'
require 'util/dataloader'

class SanpixController < ApplicationController
  def index
  end

  # GET /sanpix/init
  def init
    loader = DataLoader.new
    geocoder = GeoCoder.new
    counter = loader.load(200) do |item|
      begin
        coord = geocoder.encode(item[:address])
        existing_location = Location.where(lat: coord["lat"], lng: coord["lng"]).first
        if (not existing_location)
          existing_location = Location.new(item.slice(:address))
          existing_location.save
        end
        
        Rails.logger.info existing_location
        
        film = Film.new(item.except(:address))
        film.location_id = existing_location.id
        film.save
      rescue Exception => e
        Rails.logger.info e
      end
    end
    
    render plain: "#{counter} films imported"
  end

end
