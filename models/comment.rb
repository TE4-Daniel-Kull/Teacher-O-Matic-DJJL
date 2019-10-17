require 'sqlite3'
require_relative 'database_model.rb'

class Comment
    def initialize(_id, _type, _message)
        @id = _id
        @type = _type
        @message = _message
    end

    def self.all 
        db = DatabaseModel.get_database
        result = db.execute('SELECT * FROM comments')
        return list_to_obj(result)
    end

    def self.list_to_obj(results)
        result_objs = results.map {|x| Comment.to_obj(x)}
        return result_objs
    end

    def self.to_obj(result)
        return Comment.new(result[0], result[1], result[2])
    end

    def self.create(fork_id, type, message)
        db = DatabaseModel.get_database()
        db.execute('INSERT INTO comments (type, message) VALUES(?, ?)', [type, message])
        new_comment_id = db.execute('SELECT id FROM comments 
                    ORDER BY id DESC')[0][0]
        
        db.execute('INSERT INTO comment_fork_relations (comment_id, fork_id) VALUES(?, ?)', [new_comment_id, fork_id])
    end

    def self.delete(id)
        db = DatabaseModel.get_database()
        db.execute('DELETE FROM comments WHERE id = ?', [id])
        db.execute('DELETE FROM comment_fork_relations WHERE comment_id = ?', [id])
    end

    def self.update(id, type, message)
        db = DatabaseModel.get_database()
        db.execute("UPDATE comments SET type = $1, message = $2 WHERE id = $3", [type, message, id])
      end
end
