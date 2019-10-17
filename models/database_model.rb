require 'sqlite3'

class DatabaseModel
    def self.init_database() 
        return SQLite3::Database.new('../db/database.db') 
    end
    @@db = DatabaseModel.init_database()
    
    def self.get_database()
        return @@db
    end
end

# TODO: Separate into seed file