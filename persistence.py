import database_connection

def get_sql_boards():
    return database_connection.execute_select('SELECT * FROM boards;')
