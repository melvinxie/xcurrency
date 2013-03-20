class CurrencyController < ApplicationController
  def index
    @currencies = ['usd', 'aud', 'cad', 'chf', 'cny', 'dkk', 'eur', 'gbp', 'hkd', 'jpy', 'mxn',
                   'nzd', 'php', 'sek', 'sgd', 'thb', 'zar']
  end
end
