class CreateAulas < ActiveRecord::Migration
  def change
    create_table :aulas do |t|
      t.string :titulo
      t.string :descricao
      t.string :link_youtube

      t.timestamps null: false
    end
  end
end
