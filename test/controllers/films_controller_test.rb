require 'test_helper'

class FilmsControllerTest < ActionController::TestCase

  setup do
    @film = films(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
  end
  
  test "should get index with location id" do
    get :index, :location_id => 1
    assert_response :success
  end

  test "should get index with filter" do
    get :index, :query => "san"
    assert_response :success
  end

end
