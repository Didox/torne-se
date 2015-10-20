# language: pt

Funcionalidade: Aula
  Como usuario da parte administrativa desejo cadastrar uma aula

  Cenario: cadastrar uma aula
  	Dado que eu esteja na pagina de cadastro de aulas
  	E desejo preencher os campos e salvar
  	Entao essa aula deve aparecer em listar

  @javascript
  Cenario: ver a lista de aulas
    Dado que eu tenha aulas cadastradas na base de dados
    Entao eu devo ver uma lista de aulas
    E um botao editar, ver, excluir