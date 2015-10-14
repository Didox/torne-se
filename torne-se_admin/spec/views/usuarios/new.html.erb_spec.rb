require 'rails_helper'

RSpec.describe "usuarios/new", type: :view do
  before(:each) do
    assign(:usuario, Usuario.new(
      :nome => "MyString",
      :login => "MyString",
      :senha => "MyString"
    ))
  end

  it "renders new usuario form" do
    render

    assert_select "form[action=?][method=?]", usuarios_path, "post" do

      assert_select "input#usuario_nome[name=?]", "usuario[nome]"

      assert_select "input#usuario_login[name=?]", "usuario[login]"

      assert_select "input#usuario_senha[name=?]", "usuario[senha]"
    end
  end
end
