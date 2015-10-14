require 'rails_helper'

RSpec.describe Usuario, type: :model do
  describe "instancia da classe aula" do
  	it "atributos" do
  		aula = described_class.new
		expect(aula.respond_to?(:nome)).to be true
		expect(aula.respond_to?(:login)).to be true
		expect(aula.respond_to?(:senha)).to be true
		expect(aula.respond_to?(:created_at)).to be true
		expect(aula.respond_to?(:updated_at)).to be true
  	end
  end
end
