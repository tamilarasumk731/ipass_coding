class City < ApplicationRecord
	belongs_to :country

	validates_presence_of :name
	validates_presence_of :url
	validates_presence_of :country_id
end
