require 'sqlite3'

db = SQLite3::Database.new('db/database.db') 
db.execute('DROP TABLE IF EXISTS comments')
db.execute('CREATE TABLE comments (   
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        type VARCHAR(32),
        message TEXT NOT NULL
        )'
)

db.execute('DROP TABLE IF EXISTS forks')
db.execute('CREATE TABLE forks (   
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    git_id INTEGER UNIQUE NOT NULL
    )'
)

db.execute('DROP TABLE IF EXISTS users')
db.execute('CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(32), 
        password_hash VARCHAR(64), 
        permissions INTEGER
        )'
)

db.execute('DROP TABLE IF EXISTS comment_fork_relations')
db.execute('CREATE TABLE comment_fork_relations (
            comment_id INTEGER NOT NULL,
            fork_id INTEGER NOT NULL /*, 
            FOREIGN KEY (comment_id)
                REFERENCES comments (id),
            FOREIGN KEY (fork_id)
                REFERENCES forks (id)*/
        )'
)