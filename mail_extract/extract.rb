require 'rest_client'
require 'byebug'
emails = RestClient.get 'https://scorching-fire-3573.firebaseio.com/emails.json'
emails = JSON.parse(emails)

s_emails = []

csv_header = "Email;First Name;Last Name\n"

emails.each do |k,v|
  puts "------------------------------------------"
  puts v['nome']
  puts v['email']
  s_emails.push(v['email'])
  puts "------------------------------------------"

  csv_header += "#{v['nome']};#{v['email']};\n"
end

puts s_emails.join(", ")

File.write('email.csv', csv_header)
