json.array! @messages do |message|
  json.id message.id
  json.text message.text
  json.image_url message.image_url
  json.user_name message.user.name
  json.time format_posted_time(message.created_at)
end
