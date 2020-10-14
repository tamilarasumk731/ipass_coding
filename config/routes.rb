Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "cities#index"

  resources :cities, only: [:index, :show] do 
  	collection do
  		get "/:country", to: "cities#get_city_by_country"
  	end
  end

end