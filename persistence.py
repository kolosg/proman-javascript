import database_connection

_cache = {}

def clear_cache():
    for k in list(_cache.keys()):
        _cache.pop(k)

def get_sql_boards():
    return database_connection.execute_select('SELECT * FROM boards;')


def get_statuses():
    return database_connection.execute_select('SELECT * FROM statuses;')


def get_cards():
    return database_connection.execute_select('SELECT * FROM cards;')
