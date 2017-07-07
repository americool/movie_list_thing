class CreateJoinTable < ActiveRecord::Migration[5.1]
  def change
    create_join_table :movies, :lists do |t|
      t.index [:movie_id, :list_id]
      t.index [:list_id, :movie_id]
    end
  end
end
