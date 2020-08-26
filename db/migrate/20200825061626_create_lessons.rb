class CreateLessons < ActiveRecord::Migration[6.0]
  def change
    create_table :lessons do |t|
      t.references :course, null: false, foreign_key: true
      t.string :name, null: false
      t.integer :lesson_type, null: false, default: 1
      t.integer :sequence
      t.string :video_url, null: false
      t.integer :check_point, null: false, default: 2

      t.timestamps
    end
  end
end
