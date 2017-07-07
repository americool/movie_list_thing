class RemoveListFromMovies < ActiveRecord::Migration[5.1]
  def change
    remove_reference :movies, :list, foreign_key: true
  end
end
