require 'rails_helper'

RSpec.describe "aulas/new", type: :view do
  before(:each) do
    assign(:aula, Aula.new(
      :titulo => "MyString",
      :descricao => "MyString",
      :link_youtube => "MyString"
    ))
  end

  it "renders new aula form" do
    render

    assert_select "form[action=?][method=?]", aulas_path, "post" do

      assert_select "input#aula_titulo[name=?]", "aula[titulo]"

      assert_select "input#aula_descricao[name=?]", "aula[descricao]"

      assert_select "input#aula_link_youtube[name=?]", "aula[link_youtube]"
    end
  end
end
