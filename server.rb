require_relative 'models/database_model.rb'
require_relative 'models/comment.rb'

class Server < Sinatra::Base
    before do
        #content_type :json    
        headers 'Access-Control-Allow-Origin' => '*', 
                'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']  
    end
    set :protection, false


    get '/' do 
        erb :index
    end

    # Show all
    get '/api/comments' do
        return Comment.all().to_json
    end

    # Update
    put '/api/comments' do
        body = JSON.parse(request.body.read)
        id = body['id']
        type = body['type']
        message = body['message']

        Comment.update(id, type, message)
    end

    # Create
    post '/api/comments' do
        puts "It works"
        body = JSON.parse(request.body.read)
        fork_id = body['fork_id']
        type = body['type']
        message = body['message']

        Comment.create(fork_id, type, message)
        return "ok".to_json
    end

    # Delete
    delete '/api/comments' do 
        body = JSON.parse(request.body.read)
        id = body['id']

        Comment.delete(id)
    end

    # Show comments from git_id
    get '/api/fork_comments/:git_id' do
        git_id = params['git_id']
        p git_id.to_i
        fork_id = Comment.get_fork_id(git_id.to_i)
        p fork_id
        comments = Comment.get(fork_id).to_json
        p comments

        return comments
    end
end

# GET ALL COMMENTS
# let newPath = window.location.origin.concat('/api/comments');
# const response = await fetch(newPath)
# const jsonResponse = await response.json()

# UPDATE COMMENT
# let newPath = window.location.origin.concat('/api/comments');
# let id = 13
# let type = '101'
# let message = "IT IS AWSOME!"
# const response = await fetch(newPath, {
#     method: 'PUT',
#     body: JSON.stringify({id: id, type: type, message: message}),
# });

# CREATE COMMENT
# let newPath = window.location.origin.concat('/api/comments');
# let fork_id = 1
# let type = '101'
# let message = "Well done my booi!"
# const response = await fetch(newPath, {
#     method: 'POST',
#     body: JSON.stringify({fork_id: fork_id, type: type, message: message}),
# });

# DELETE COMMENT
# let newPath = window.location.origin.concat('/api/comments');
# let id = 13
# const response = await fetch(newPath, {
#     method: 'DELETE',
#     body: JSON.stringify({id: id}),
# });

# GET COMMENTS FROM GIT ID
# let newPath = window.location.origin.concat('/api/fork_comments');
# let git_id = 0
# const response = await fetch(newPath + "/" + git_id)

# 







# # UPDATE
# put "/api/employees/:id" do 
#     body = JSON.parse(request.body.read)
#     @db.execute("UPDATE employees SET name=?, phone=? WHERE id = ?", [body["name"], body["phone"], body["id"]])
#     return "ok"
# end

# # CREATE
# post "/api/employees/:id" do 
#     body = JSON.parse(request.body.read)
#     @db.execute("INSERT INTO employees(name, phone) VALUES(?, ?)", [body["name"], body["phone"], body["id"]])
#     return "ok"
# end

# # DESTROY
# delete "/api/employees/:id" do
#     body = JSON.parse(request.body.read)
#     result = @db.execute("DELETE FROM employees WHERE id = ?", [body["id"]])
#     return "ok"
# end