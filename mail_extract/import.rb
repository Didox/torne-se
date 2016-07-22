require 'capybara'
require 'rest_client'
require 'byebug'

@emails = RestClient.get 'https://scorching-fire-3573.firebaseio.com/emails.json'
@emails = JSON.parse(@emails)

@session = Capybara::Session.new(:selenium)
user = ENV["user"]
pass = ENV["pass"]
@session.visit("https://us12.admin.mailchimp.com")

@session.within("#login-form") do
  @session.fill_in('username', :with => user)
  @session.fill_in('password', :with => pass)
  sleep(1)
  @session.find(".button-large.p0.size1of1.hide-mobile").click
end

sleep(3)

def confere_and_find_emailchimp
  emailchimp = []
  emails_chimp_100
  if(@emails.size.to_i > @quantidade_mailchimp.to_i)
    @session.all(".table-contents .profile-view a").each do |link|
      emailchimp << link.text.downcase.strip
    end
    @session.all(".button-small[title=Next]")[0].click
    sleep(3)
    @session.all(".table-contents .profile-view a").each do |link|
      emailchimp << link.text.downcase.strip
    end
  end
  return emailchimp
end

def cadastra(text_emails)
  @emails_novos = []
  @emails.each do |k,v|
    unless(text_emails.include?(v['email'].downcase.strip))
      @session.visit("https://us12.admin.mailchimp.com/lists/members/add?id=34953")
      @session.within("#add-member-form") do
        begin
          @session.fill_in('MERGE0', :with => v['email'])
          @session.fill_in('MERGE1', :with => v['nome'])
          if(@session.find("#optin-confirm")[:checked] != "true")
            sleep(3)
            @session.find("#optin-confirm").click
            sleep(1)
          end
          @session.find(".button.p0").click
          @session.visit("https://us12.admin.mailchimp.com")
          @emails_novos << v
        rescue;end
      end
    end
  end

  csv_header = "Email;First Name;Last Name\n"
  @emails.each do |k,v|
    csv_header += "#{v['nome']};#{v['email']};\n"
  end
  File.write('email_backup.csv', csv_header)

  File.write('email_novos.txt', @emails_novos);
  emails_chimp_100
end

def emails_chimp_100
  @session.visit("https://us12.admin.mailchimp.com/lists/members/?id=34953#p:1-s:200")
  sleep(5)
  @quantidade_mailchimp = @session.find(".sub-count").text.to_i
end

text_emails = confere_and_find_emailchimp
#text_emails = File.read('email_backup.csv') rescue ""

new_email = false
unless text_emails.empty?
  @emails.each do |k,v|
    unless(text_emails.include?(v['email'].downcase.strip))
      new_email = true
    end
  end
end

# emails_novos = "";
# @emails.map{|key,val| key}.each do |e| 
#   emails_novos += (!text_emails.include?(e) ? e : '' )
# end
# byebug

if new_email
  cadastra(text_emails)
end

puts "======================== QUANTIDADE DE EMAILS #{@emails.size} =========================="
puts "======================== QUANTIDADE DE MAILCHIMP #{@quantidade_mailchimp} =========================="


#emails - subscribe: daviconed2015@gmail.com.br - Davi Conde Silva
