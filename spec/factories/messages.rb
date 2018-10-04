FactoryGirl.define do
  factory :message do
    text Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/yama.jpeg")
    user
    group
  end
end
