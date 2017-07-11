class ListsController < ApplicationController
  before_action :set_list, only: [:show, :update, :destroy]

  # GET /lists
  def index
    @lists = List.all

    render json: @lists
  end

  # GET /lists/1
  def show
    render json: @list
  end

  def show_movies
    @list = List.find(params[:list_id])
    render json: @list.movies
  end

  def get_lists_with_movie
    render json: List.joins(:movies).where(movies: {imdbid: params[:imdbid]})
  end

  # POST /lists
  def create
    @list = List.new(list_params)

    if @list.save
      render json: @list, status: :created, location: @list
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /lists/1
  def update
    if @list.update(list_params)
      render json: @list
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end

  def add_movie_to_list
    duplicates = List.joins(:movies).where(movies: {id: params[:movie_id]}).where(lists: {id: params[:list_id]})
    list = List.find(params[:list_id])
    movie = Movie.find(params[:movie_id])
    if !duplicates.present?
      list.movies << movie
    end
      movie.update(rating: params[:rating])
    render json: list.movies
  end

  # def adjust_lists
  #   @data = params[:data]
  #   @movie = Movie.where(imdbid: params[:imdbid])
  #   puts "the movie"
  #   puts json: @movie
  #   @data.each do |key, value|
  #     puts key
  #     if key != "rating"
  #       @list = List.find(key)
  #       if value
  #         puts "adding"
  #         puts json: @list
  #         if @list.movies.include?(@movie)
  #           @list.movies << movie
  #         end
  #       else
  #         puts "removing"
  #         puts json: @list
  #         @list.movies.delete(@movie)
  #       end
  #     else
  #       puts "rating"
  #       @movie.update(rating: value)
  #     end
  #   end
  # end
  def delete_movie
    @movie = Movie.find(params[:movie_id])
    @list = List.find(params[:list_id])

    @list.movies.delete(@movie)
  end
  # DELETE /lists/1
  def destroy
    @list.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_list
      @list = List.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def list_params
      params.require(:list).permit(:title, :user_id )
    end
end
