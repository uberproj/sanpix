require 'util/geocoder'

class Location < ActiveRecord::Base
  has_many :films

  after_validation(on: :create) do
    geocoder = GeoCoder.new
    coord = geocoder.encode(self.address)
    self.lat = coord["lat"]
    self.lng = coord["lng"]
  end
end
