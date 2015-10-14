require 'rails_helper'

RSpec.describe "aulas/show", type: :view do
  before(:each) do
    @aula = assign(:aula, Aula.create!(
      :titulo => "Titulo",
      :descricao => "Descricao",
      :link_youtube => "Link Youtube"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Titulo/)
    expect(rendered).to match(/Descricao/)
    expect(rendered).to match(/Link Youtube/)
  end
end
