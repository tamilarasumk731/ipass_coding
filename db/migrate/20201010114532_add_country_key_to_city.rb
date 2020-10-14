class AddCountryKeyToCity < ActiveRecord::Migration[6.0]
  def up
  	add_reference :cities, :country
  	add_column 	  :countries, :url, :string
  end

  def down
  	remove_reference :cities, :country
  	remove_column 	 :countries, :url
  end
end
