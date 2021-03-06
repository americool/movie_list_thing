class Movie < ApplicationRecord
  has_and_belongs_to_many :list
  validates :rating, numericality: {less_than_or_equal_to: 5, greater_than_or_equal_to: 1 }
  # validates :imdbid, uniqueness: { case_sensitive: false }

  def change_lists(list_ids)
    self.list_ids = list_ids
  end
end
