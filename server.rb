class Server < Sinatra::Base

    # def initialize
    #     super
    #     #@db = SQLite3::Database.new('db/company.db')
    #    # @db.results_as_hash = true
    # end
   
    # before do
    #     #content_type :json    
    #     #headers 'Access-Control-Allow-Origin' => '*', 
    #     #    'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']  
    # end
    
    # set :protection, false

    get '/' do 
        erb :index
    end

#     get '/slow' do
#         content_type :json
#         sleep 2
#         return {result: 'slow'}.to_json
#     end

#     get '/app' do
#         erb :api
#     end

#     #CRUD-interface med JS
    
#     #index
#     get '/api/employees' do 
#         content_type :json
#        # @db.execute('SELECT * FROM employees').to_json
#     end

#     #show
#     get '/api/employees/:id' do
#         content_type :json
#         #@db.execute('SELECT * FROM employees WHERE id = ?', params['id']).first.to_json
#     end

#     #new
#     get '/api/employees/new' do
#         content_type :json
#         {fields: [{name:  'text'},
#                   {email: 'text'},
#                   {phone: 'tel'},
#                   {department_id: 'number'},
#                   {img:  'image'}]}.to_json
#     end

#     #edit
#     get '/api/employees/:id/edit' do
#         content_type :json
#         result = @db.execute('SELECT * FROM employees WHERE id = ?', params['id']).first
#         {employee: result,
#          fields: [
#              {name: 'name',          type: 'text',   value: result['name']},
#              {name: 'email',         type: 'text',   value: result['email']},
#             {name: 'phone',         type: 'tel',    value: result['phone']},
#             {name: 'department_id', type: 'number', value: result['department_id']},
#             {name: 'img',           type: 'img',    value: result['img']}]}.to_json
#     end

#     #update
#     patch '/api/employees/:id' do
#         content_type :json
#         result = @db.execute('UPDATE employees 
#                               SET name=?, email=?, phone=?, department_id=?, img=?
#                               WHERE id = ?',
#                               [params['name'], params['email'], params['phone'], params['department_id'], params['img'], params['id']])
#         return {result: 'success'}.to_json                             
#     end

#     #create
#     post '/api/employes/' do
#         content_type :json
#         result = @db.execute('INSERT into employees (name, email, phone, department_id, img) 
#                               VALUES (?,?,?,?,?)',
#                               params['name'], params['email'], params['phone'], params['department_id'], params['img'])
#         return {result: 'success'}.to_json        
#     end

#     #destroy 
#     delete '/api/employees/:id' do
#         content_type :json
#         result = @db.execute('DELET FROM users WHERE id = ?', params['id'])
#     end




end