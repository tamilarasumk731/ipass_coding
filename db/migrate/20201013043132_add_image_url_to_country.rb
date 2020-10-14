class AddImageUrlToCountry < ActiveRecord::Migration[6.0]
  def up
  	add_column :countries, :image_url, :string
  end

  def down
  	remove_column :countries, :image_url
  end
end
