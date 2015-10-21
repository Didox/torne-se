class Aula < ActiveRecord::Base
  validates :titulo, :presence => true
  validates :descricao, :presence => true
  validates :link_youtube, :presence => true
end
