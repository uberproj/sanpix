json.array!(@films) do |film|
  json.extract! film, :id, :title, :release_year, :tags, :location
  json.url film_url(film, format: :json)
end
