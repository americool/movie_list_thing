class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new
    @user.email = params[:user][:email]
    @user.password = params[:user][:password]
    @user.password_confirmation = params[:user][:password_confirmation]

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def get_user
    payload = params[:payload]
    decoded_token = JWT.decode payload, Rails.application.secrets.secret_key_base, true, { :algorithm => 'HS256' }
    current_user = User.find((decoded_token[0])['sub'])
    render json: current_user
  end

  def show_lists
    @user = User.find(params[:user_id])
    render json: @user.lists
  end

  def show_lists_details
    @user = User.find(params[:user_id])
    @lists = @user.lists
    array = []
    @lists.each do |list|
      if list.movies.count == 0
        avg = "N/A"
      else
        avg = list.movies.average(:rating).round(2)
      end
      array << [list, list.movies.count, avg ]
    end
    render json: array
  end


  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.fetch(:user, {})
    end
end
