class LocationsController < ApplicationController
  before_action :set_location, only: [:show]

  def index
    bounds = location_params[:bounds]
    if bounds
      @locations = nearby
    else
      @locations = Location.all
    end
  end

  def show
  end

  def nearby
    bounds = params[:bounds].split(',')
    Location.where("lat > #{bounds[0]} and lat < #{bounds[2]} and lng > #{bounds[1]} and lng < #{bounds[3]}")
  end

  private
  def set_location
    @location = Location.find(params[:id])
  end

  def location_params
    params.permit(:bounds)
  end
    
end
