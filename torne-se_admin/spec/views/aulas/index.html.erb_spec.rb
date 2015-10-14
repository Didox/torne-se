require 'rails_helper'

RSpec.describe "aulas/index", type: :view do
  before(:each) do
    assign(:aulas, [
      Aula.create!(
        :titulo => "Titulo",
        :descricao => "Descricao",
        :link_youtube => "Link Youtube"
      ),
      Aula.create!(
        :titulo => "Titulo",
        :descricao => "Descricao",
        :link_youtube => "Link Youtube"
      )
    ])
  end

  it "renders a list of aulas" do
    render
    assert_select "tr>td", :text => "Titulo".to_s, :count => 2
    assert_select "tr>td", :text => "Descricao".to_s, :count => 2
    assert_select "tr>td", :text => "Link Youtube".to_s, :count => 2
  end
end
