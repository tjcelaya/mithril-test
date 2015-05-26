# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150211034304) do

  create_table "accesses", force: true do |t|
    t.integer  "user_id"
    t.string   "session_id"
    t.integer  "board_id",   null: false
    t.boolean  "can_edit",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "accesses", ["user_id", "board_id"], name: "index_accesses_on_user_id_and_board_id", unique: true, using: :btree

  create_table "attachments", force: true do |t|
    t.string   "title",             null: false
    t.integer  "card_id",           null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
  end

  add_index "attachments", ["card_id"], name: "index_attachments_on_card_id", using: :btree

  create_table "boards", force: true do |t|
    t.string   "title",                            null: false
    t.integer  "visibility", limit: 2, default: 0, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
    t.string   "ancestry"
  end

  add_index "boards", ["ancestry"], name: "index_boards_on_ancestry", using: :btree

  create_table "cards", force: true do |t|
    t.string   "title",                      null: false
    t.text     "body"
    t.boolean  "completed",  default: false, null: false
    t.integer  "user_id"
    t.integer  "board_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "cards", ["user_id", "board_id"], name: "index_cards_on_user_id_and_board_id", unique: true, using: :btree

  create_table "comments", force: true do |t|
    t.text     "body",                       null: false
    t.integer  "user_id",                    null: false
    t.integer  "card_id",                    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "ancestry"
    t.integer  "ancestry_depth", default: 0
  end

  add_index "comments", ["ancestry"], name: "index_comments_on_ancestry", using: :btree
  add_index "comments", ["user_id", "card_id"], name: "index_comments_on_user_id_and_card_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.integer  "default_board_id"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
