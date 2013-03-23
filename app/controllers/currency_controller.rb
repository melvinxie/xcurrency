class CurrencyController < ApplicationController
  def index
    @currencies = ActiveSupport::OrderedHash.new
    @currencies['Americas'] = ['usd', 'cad', 'mxn', 'brl', 'cop']
    @currencies['Europe/Middle East/Africa'] =
        ['eur', 'gbp', 'chf', 'nok', 'sek', 'dkk', 'rub', 'zar', 'ils', 'aed']
    @currencies['Asia'] =
        ['jpy', 'cny', 'hkd', 'inr', 'myr', 'sgd', 'krw', 'twd', 'aud', 'nzd']
    puts @currencies.values.flatten.map{|c| 'USD' + c.upcase}.join(',')
  end
end
