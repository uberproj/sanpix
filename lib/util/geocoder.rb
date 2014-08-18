require 'net/http'
require 'json'

class GeoException < StandardError
end

class GeoCoder
  def initialize()
    @baseurl = "https://maps.googleapis.com/maps/api/geocode/json?address="
  end

  def encode(addr)
    url = URI.encode("#{@baseurl}#{addr}")
    response_text = Net::HTTP.get_response(URI.parse(url)).body
    results = JSON.parse response_text

    raise GeoException, response_text if results["status"] != "OK"
    geocode = results["results"][0]["geometry"]["location"]
    geocode
  end
end
