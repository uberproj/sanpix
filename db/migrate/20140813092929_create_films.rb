class CreateFilms < ActiveRecord::Migration
  def change
    create_table :films do |t|
      t.string :title
      t.integer :release_year

      t.string :tags

      t.references :location

      t.timestamps
    end
  end
end
