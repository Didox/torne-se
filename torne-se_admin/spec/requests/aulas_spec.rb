require 'rails_helper'

RSpec.describe "Aulas", type: :request do
  describe "GET /aulas" do
    it "works! (now write some real specs)" do
      get aulas_path
      expect(response).to have_http_status(200)
    end
  end
end
