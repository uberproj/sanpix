require 'net/http'

class DataLoader
  def load(maxresult)
    url = "https://data.sfgov.org/api/views/yitu-d5am/rows.json?accessType=DOWNLOAD"
    response_text = Net::HTTP.get_response(URI.parse(url)).body
    
    results = JSON.parse(response_text)
    films = results["data"]
    counter = 0
    results["data"].each do |item|
      if not item[10]
        next
      end

      film = {
        :title => item[8],
        :release_year => item[9].to_i,
        :address => item[10] + ", CA",
        :tags => item[12..-1].select { |x| x } * "|"
      }
      yield film

      counter = counter + 1
      break if counter >= maxresult and maxresult != 0
      if counter % 5 == 0
        sleep 1
      end
    end

    counter
  end
end
