require 'sqlite3'

class DatabaseModel
    def self.init_database() 
        database = SQLite3::Database.new('db/database.db') 
        database.results_as_hash = true
        return database
    end
    @@db = DatabaseModel.init_database()
    
    def self.get_database()
        return @@db
    end
end

# TODO: Separate into seed file