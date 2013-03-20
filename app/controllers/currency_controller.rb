class CurrencyController < ApplicationController
  def index
    response.headers['X-Frame-Options'] = ''
    @currencies = ['usd', 'aud', 'cad', 'chf', 'cny', 'dkk', 'eur', 'gbp', 'hkd', 'jpy', 'mxn',
                   'nzd', 'php', 'sek', 'sgd', 'thb', 'zar']
  end
end
