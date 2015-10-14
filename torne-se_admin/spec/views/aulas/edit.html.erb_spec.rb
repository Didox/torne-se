require 'rails_helper'

RSpec.describe "aulas/edit", type: :view do
  before(:each) do
    @aula = assign(:aula, Aula.create!(
      :titulo => "MyString",
      :descricao => "MyString",
      :link_youtube => "MyString"
    ))
  end

  it "renders the edit aula form" do
    render

    assert_select "form[action=?][method=?]", aula_path(@aula), "post" do

      assert_select "input#aula_titulo[name=?]", "aula[titulo]"

      assert_select "input#aula_descricao[name=?]", "aula[descricao]"

      assert_select "input#aula_link_youtube[name=?]", "aula[link_youtube]"
    end
  end
end
