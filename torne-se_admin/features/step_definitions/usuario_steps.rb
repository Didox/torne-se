Dado(/^que eu tenha usuarios cadastrados na base de dados$/) do
  logar_usuario
  10.times do |i|
    Usuario.create( nome: "teste#{i}", login: "teste#{i}", senha: "teste#{i}")
  end
end

Entao(/^eu devo ver uma lista de usuarios$/) do
  page.visit("/usuarios")
  expect(page.all("table tr").size > 1).to be true
end

Entao(/^um botao editar, ver, excluir$/) do
  expect(page.all("table tr td a.btn.btn-xs.btn-info").size > 1).to be true
  expect(page.all("table tr td a.btn.btn-xs.btn-warning").size > 1).to be true
  expect(page.all("table tr td a.btn.btn-xs.btn-danger").size > 1).to be true
end

Dado(/^que eu esteja na pagina de cadastro de usuario$/) do
  logar_usuario
  page.visit( "/usuarios/new")
end

Dado(/^preencho os campos e clico em salvar$/) do
  fill_in("usuario[nome]", with: "usuarioteste")
  fill_in("usuario[login]", with: "usuarioteste")
  fill_in("usuario[senha]", with: "usuarioteste")
  page.find(".btn-success").click
end

Entao(/^esse dado deve aparecer na listagem$/) do
  expect(page.find(".nome").text).to match(/usuarioteste/)
  expect(page.find(".login").text).to match(/usuarioteste/)
  expect(page.find(".senha").text).to match(/usuarioteste/)
end

Dado(/^que eu tenha um usuario cadastrado$/) do
  logar_usuario
  Usuario.create( nome: "teste", login: "teste", senha: "teste")
  page.visit("/usuarios")

end

Dado(/^clico para editar esse usuario$/) do
  page.all("table tbody tr .btn-warning")[1].click
end

Dado(/^altero nome login e senha$/) do
  fill_in("usuario[nome]", with: "teste1")
  fill_in("usuario[login]", with: "teste1")
  fill_in("usuario[senha]", with: "teste1")
end

Dado(/^clico em salvar$/) do
  page.find(".btn-success").click
end

Entao(/^devo ter o dado alterado$/) do
  expect(page.find(".nome").text).to match(/teste1/)
  expect(page.find(".login").text).to match(/teste1/)
  expect(page.find(".senha").text).to match(/teste1/) 
end

Dado(/^na listagem clico em excluir$/) do
  @qtd=page.all("table tr").size
  page.evaluate_script('window.confirm = function() { return true; }')
  page.all(".btn-danger")[1].click
end

Entao(/^nao devo ter mais usuario$/) do
  expect(page.all("table tr").size < @qtd).to be true
end
















