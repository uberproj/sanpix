class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.float :lat
      t.float :lng
      t.string :address
      t.string :facts

      t.timestamps
    end
  end
end
