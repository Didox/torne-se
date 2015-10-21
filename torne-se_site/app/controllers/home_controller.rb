class HomeController < ApplicationController

	def index
		@aulas=Aula.all
	end

end


