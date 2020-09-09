class CategoriesController < ApplicationController
  before_action :load_category, only: [:show]
  before_action :set_search, only: [:show]
  skip_before_action :authenticate_user!, only: [:index, :show]

  def show
    @courses = @category.courses
  end

  private

  def set_search
    @q = Category.ransack params[:q]
    @categories = @q.result
  end

  def load_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name)
  end
end
