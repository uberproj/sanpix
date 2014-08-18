require 'test_helper'
require 'util/geocoder'

class GeoCoderTest < ActiveSupport::TestCase
  test "encode returns valid coord" do
    coder = GeoCoder.new
    coord = coder.encode("San Fransisco, CA")
    assert coord.has_key? "lat"
    assert coord.has_key? "lng"
  end

  test "encode invalid address" do
    coder = GeoCoder.new
    assert_raises(GeoException) {
      coder.encode("invalid address")
    }
  end
end
