class User < ApplicationRecord
  has_many :lists
  before_save { self.email = email.downcase if email.present? }

  EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :password, presence: true, length: { minimum: 6 }, unless: :password_digest
  validates :password, length: { minimum: 6 }, allow_blank: true

  validates :email,
            presence: true,
            uniqueness: { case_sensitive: false },
            length: { minimum: 3, maximum: 254 },
            format: {with: EMAIL_REGEX}

  has_secure_password

  # def self.from_token_payload payload
  #   # Returns a valid user, `nil` or raise
  #   # e.g.
  #     self.find payload["sub"]
  # end
end
