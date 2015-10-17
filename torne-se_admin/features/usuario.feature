# language: pt

Funcionalidade: Usuario
  Como usuario da parte administrativa desejo cadastrar um novo usuario

  @javascript
  Cenario: ver a lista de usuarios
    Dado que eu tenha usuarios cadastrados na base de dados
    Entao eu devo ver uma lista de usuarios
    E um botao editar, ver, excluir