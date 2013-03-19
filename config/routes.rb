Currency::Application.routes.draw do
  root to: 'currency#index'
  get 'currency/index'

  offline = Rack::Offline.configure do
    cache '/'
    cache '/favicon.ico'
    cache '/apple-touch-icon.png'
    cache 'http://code.jquery.com/mobile/1.3.0/jquery.mobile-1.3.0.min.css'
    cache 'http://code.jquery.com/jquery-1.8.2.min.js'
    cache 'http://code.jquery.com/mobile/1.3.0/jquery.mobile-1.3.0.min.js'
    public_path = Rails.public_path
    Dir[public_path.join('assets/*.{js,css,,png}')].each do |file|
      cache Pathname.new(file).relative_path_from(public_path)
    end
    network '*'
  end
  get '/application.manifest' => offline

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root to: 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
