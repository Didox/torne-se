class LoginController < ApplicationController
	def login
		@mensagem_de_falha = session[:mensagem_de_falha]
	end

	def logar
		login    = params["login"]
		password = params["password"]
		usuario  = Usuario.where(login: login, senha: password)
		if usuario.present? && usuario.size > 0
			session[:mensagem_de_falha] = ""
			cookies[:usuario_logado] = usuario.first.id
			redirect_to root_path
		else
			session[:mensagem_de_falha] = "Usuário ou senha inválida"
			redirect_to login_path
		end
	end

	def logout
		cookies[:usuario_logado] = ""
		redirect_to login_path
	end
end
