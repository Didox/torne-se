json.array!(@aulas) do |aula|
  json.extract! aula, :id, :titulo, :descricao, :link_youtube
  json.url aula_url(aula, format: :json)
end
