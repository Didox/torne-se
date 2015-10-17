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