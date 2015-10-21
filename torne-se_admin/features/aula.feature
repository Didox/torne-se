# language: pt

Funcionalidade: Aula
  Como usuario da parte administrativa desejo cadastrar uma aula

  Cenario: cadastrar uma aula
  	Dado que eu esteja na pagina de cadastro de aulas
  	E desejo preencher os campos e salvar
  	Entao essa aula deve aparecer em listar

  Cenario: ver a lista de aulas
    Dado que eu tenha aulas cadastradas na base de dados
    Entao eu devo ver uma lista de aulas
    E um botao editar, ver, excluir

  Cenario: atualizar aula
    Dado que eu tenha uma aula cadastrada
    E clico para editar essa aula
    E altero titulo, descricao e link_youtube
    E clico em salvar aula
    Entao devo ter a aula alterada

      @javascript
  Cenario: excluir aula
    Dado que eu tenha uma aula cadastrada
    E na listagem clico em excluir aula
    Entao nao devo ter mais aula