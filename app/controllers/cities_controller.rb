class CitiesController < ApplicationController

  def index
  	@country_list = Country.pluck(:name)
    @countries = Country.all
    @cities = []
    @country_list.each do |country|
      country = Country.find_by(name: country)
      cities = country.cities.pluck(:name, :url)
      @cities << {country: country.name, cities: cities}
    end
    @country_list.unshift("All")

    respond_to do |format|
      format.html
      format.json { render json: {countries_list: @country_list, cities: @cities} }
    end

  end

  def show
  end


  def get_city_by_country
  	country = Country.find_by(name: params[:country])

  	cities = country.cities.pluck(:name, :url)
  	respond_to do |format|
      format.json { render json: {country: country.name, cities: cities} }
    end

  end

end