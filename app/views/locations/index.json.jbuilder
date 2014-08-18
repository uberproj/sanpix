json.array!(@locations) do |location|
  json.extract! location, :id, :lat, :lng, :address, :facts
  json.url location_url(location, format: :json)
end
