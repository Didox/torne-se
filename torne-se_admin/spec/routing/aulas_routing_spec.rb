require "rails_helper"

RSpec.describe AulasController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/aulas").to route_to("aulas#index")
    end

    it "routes to #new" do
      expect(:get => "/aulas/new").to route_to("aulas#new")
    end

    it "routes to #show" do
      expect(:get => "/aulas/1").to route_to("aulas#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/aulas/1/edit").to route_to("aulas#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/aulas").to route_to("aulas#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/aulas/1").to route_to("aulas#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/aulas/1").to route_to("aulas#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/aulas/1").to route_to("aulas#destroy", :id => "1")
    end

  end
end
