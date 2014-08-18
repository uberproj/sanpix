require 'test_helper'
require 'util/geocoder'
require 'util/dataloader'

class DataLoaderTest < ActiveSupport::TestCase
  test "films should have valid address" do
    geocoder = GeoCoder.new
    loader = DataLoader.new
    loader.load(10) do |film|
      begin
        loc = geocoder.encode(film[:address])
        print "#{loc}, #{film[:location]}\n"
      rescue => detail
        print "#{film[:location]} cannot be encoded, #{detail}\n"
      end
    end
  end
end
