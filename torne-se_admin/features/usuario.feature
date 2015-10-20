# language: pt

Funcionalidade: Usuario
  Como usuario da parte administrativa desejo cadastrar um novo usuario

  Cenario: ver a lista de usuarios
    Dado que eu tenha usuarios cadastrados na base de dados
    Entao eu devo ver uma lista de usuarios
    E um botao editar, ver, excluir

  Cenario: cadastrar usuario
    Dado que eu esteja na pagina de cadastro de usuario
    E preencho os campos e clico em salvar
    Entao esse dado deve aparecer na listagem

  Cenario: atualizar usuario
    Dado que eu tenha um usuario cadastrado 
    E clico para editar esse usuario
    E altero nome login e senha
    E clico em salvar
    Entao devo ter o dado alterado

  @javascript
  Cenario: excluir usuario
    Dado que eu tenha um usuario cadastrado
    E na listagem clico em excluir
    Entao nao devo ter mais usuario