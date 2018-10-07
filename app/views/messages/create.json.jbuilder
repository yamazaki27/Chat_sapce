json.text @message.text
json.image_url @message.image.url
json.user_name @message.user.name
json.time format_posted_time(@message.created_at)
