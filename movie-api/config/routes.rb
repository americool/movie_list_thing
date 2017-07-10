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
  match 'lists/add_movie_to_list' => 'lists#add_movie_to_list', :via => :post
  match 'lists/get_lists_with_movie' => 'lists#get_lists_with_movie', :via => :post
  match 'lists/adjust_lists' => 'lists#adjust_lists', :via => :post
  match 'movies/change_lists' => 'movies#change_lists', :via => :post
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
