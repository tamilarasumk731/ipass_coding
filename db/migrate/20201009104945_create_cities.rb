class CreateCities < ActiveRecord::Migration[6.0]
  def change
    create_table :cities do |t|
      t.string 		:name, null: false
      t.string 		:url,  null: false
      t.timestamps
    end
  end
end