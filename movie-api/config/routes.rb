Rails.application.routes.draw do
  resources :movies
  resources :lists do
    get :show_movies
  end
  post 'user_token' => 'user_token#create'
  resources :users do
    get :show_lists
  end

  match 'users/get_user' => 'users#get_user', :via => :post
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
