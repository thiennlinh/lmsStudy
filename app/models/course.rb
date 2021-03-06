class Course < ApplicationRecord
  belongs_to :user
  mount_uploader :image, CourseImageUploader

  has_many :course_categories, dependent: :destroy
  has_many :categories, through: :course_categories, dependent: :destroy
  has_many :user_courses, dependent: :destroy
  has_many :review_courses, dependent: :destroy
  has_many :rates, dependent: :destroy
  has_many :lessons, dependent: :destroy
  has_many :users, through: :user_courses

  validates :user_id, :title, :overview, :description, presence: true

  accepts_nested_attributes_for :course_categories, allow_destroy: true
  accepts_nested_attributes_for :lessons, allow_destroy: true
end
