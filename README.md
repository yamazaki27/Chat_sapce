# README

* Ruby version

* System dependencies

* Configuration


* Database creation

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index|
|email|text|null: false, add_index|
|password|text|null: false|
### Association
- has_many :groups
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|text|null: false, add_index|
### Assotiation
- has_many :users
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|text|
|user_id|integer|foreign_key: true|
|group_id|integer|foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group


* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
