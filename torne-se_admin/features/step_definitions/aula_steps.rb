Dado(/^que eu esteja na pagina de cadastro de aulas$/) do
  logar_usuario
  page.visit( "/aulas/new")
end

Dado(/^desejo preencher os campos e salvar$/) do
  fill_in("aula[titulo]", with: "aulateste")
  fill_in("aula[descricao]", with: "aulateste")
  fill_in("aula[link_youtube]", with: "aulateste")
  page.find(".btn-success").click
end

Entao(/^essa aula deve aparecer em listar$/) do
  expect(page.find(".titulo").text).to match(/aulateste/)
  expect(page.find(".descricao").text).to match(/aulateste/)
  expect(page.find(".link_youtube").text).to match(/aulateste/)
end

Dado(/^que eu tenha aulas cadastradas na base de dados$/) do
  logar_usuario
  10.times do |i|
  	Aula.create( titulo: "teste#{i}", descricao: "teste#{i}", link_youtube: "teste#{i}")
  end

end

Entao(/^eu devo ver uma lista de aulas$/) do
	page.visit("/aulas")
	expect(page.all("table tr").size > 1).to be true
end

Dado(/^que eu tenha uma aula cadastrada$/) do
    logar_usuario
  Aula.create( titulo: "teste", descricao: "teste", link_youtube: "teste")
  page.visit("/aulas")
end

Dado(/^clico para editar essa aula$/) do
  page.all("table tbody tr td .btn-warning")[0].click
end

Dado(/^altero titulo, descricao e link_youtube$/) do
  fill_in("aula[titulo]", with: "teste1")
  fill_in("aula[descricao]", with: "teste1")
  fill_in("aula[link_youtube]", with: "teste1")  
end

Dado(/^clico em salvar aula$/) do
  page.find(".btn-success").click
end

Entao(/^devo ter a aula alterada$/) do
  expect(page.find(".titulo").text).to match(/teste1/)
  expect(page.find(".descricao").text).to match(/teste1/)
  expect(page.find(".link_youtube").text).to match(/teste1/) 
end

Dado(/^na listagem clico em excluir aula$/) do
  @qtd=page.all("table tr").size
  page.evaluate_script('window.confirm = function() { return true; }')
  page.all(".btn-danger")[0].click
end

Entao(/^nao devo ter mais aula$/) do
  expect(page.all("table tr").size < @qtd).to be true
end













