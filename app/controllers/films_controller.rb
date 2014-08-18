class FilmsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_film, only: [:show]

  # GET /films.json
  def index
    location_id = params[:location_id]
    filter_key = params[:query]
    if location_id
      @films = Film.where(location: location_id)
    elsif filter_key
      @films = Film.where("title like '%#{filter_key}%'")
    else
      @films = Film.all
    end
  end

  # GET /films/1.json
  def show
  end

  private
  def set_film
    @film = Film.find(params[:id])
  end
    
  def film_params
    params.require(:film).permit(:title, :release_year, :tags)
  end

end
