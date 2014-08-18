require 'test_helper'

class LocationsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get nearby" do
    get :index, :bounds => "37.5,-100.3,37.8,-100.0"
    assert_response :success
  end

end
