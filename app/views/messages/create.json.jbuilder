json.text @message.text
json.image_url @message.image
json.user_name @message.user.name
json.time format_posted_time(@message.created_at)

json.group_id @message.group.id
json.user_id @message.user.id
