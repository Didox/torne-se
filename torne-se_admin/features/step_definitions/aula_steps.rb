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