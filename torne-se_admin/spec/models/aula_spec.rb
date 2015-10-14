require 'rails_helper'

RSpec.describe Aula, type: :model do
  describe "instancia da classe aula" do
    it "atributos" do
      aula = described_class.new
      expect(aula.respond_to?(:titulo)).to be true
      expect(aula.respond_to?(:descricao)).to be true
      expect(aula.respond_to?(:link_youtube)).to be true
      expect(aula.respond_to?(:created_at)).to be true
      expect(aula.respond_to?(:updated_at)).to be true
    end
  end
end

