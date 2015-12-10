require 'capybara'
require 'rest_client'
require 'byebug'

emails = RestClient.get 'https://scorching-fire-3573.firebaseio.com/emails.json'
emails = JSON.parse(emails)
text_emails = File.read('email_backup.csv') rescue ""

new_email = false
emails.each do |k,v|
  unless(text_emails.include?(v['email']))
    new_email = true
  end
end

if(new_email)
  session = Capybara::Session.new(:selenium)

  user = ENV["user"]
  pass = ENV["pass"]
  session.visit("https://us12.admin.mailchimp.com")

  session.within("#login-form") do
    session.fill_in('username', :with => user)
    session.fill_in('password', :with => pass)
    sleep(1)
    session.find(".button-large.p0.size1of1.hide-mobile").click
  end

  sleep(3)

  puts "======================== QUANTIDADE DE EMAILS #{emails.size} =========================="
  emails.each do |k,v|
    unless(text_emails.include?(v['email']))
      session.visit("https://us12.admin.mailchimp.com/lists/members/add?id=34953")
      session.within("#add-member-form") do
        begin
          session.fill_in('MERGE0', :with => v['email'])
          session.fill_in('MERGE1', :with => v['nome'])
          if(session.find("#optin-confirm")[:checked] != "true")
            sleep(2)
            session.find("#optin-confirm").click
          end
          session.find(".button.p0").click
          session.visit("https://us12.admin.mailchimp.com")
        rescue;end
      end
    end
  end

  csv_header = "Email;First Name;Last Name\n"
  emails.each do |k,v|
    csv_header += "#{v['nome']};#{v['email']};\n"
  end
  File.write('email_backup.csv', csv_header)
end
