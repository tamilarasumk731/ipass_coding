class Country < ApplicationRecord
	has_many :cities, dependent: :destroy

	validates_presence_of :name
	validates_presence_of :url
end
