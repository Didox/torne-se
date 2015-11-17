require 'rest_client'
require 'byebug'
emails = RestClient.get 'https://scorching-fire-3573.firebaseio.com/emails.json'
emails = JSON.parse(emails)

s_emails = []

emails.each do |k,v|
  puts "------------------------------------------"
  puts v['nome']
  puts v['email']
  s_emails.push(v['email'])
  puts "------------------------------------------"
end

puts s_emails.join(", ")

