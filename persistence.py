import database_connection

_cache = {}

def clear_cache():
    for k in list(_cache.keys()):
        _cache.pop(k)

def get_sql_boards():
    return database_connection.execute_select('SELECT * FROM boards ORDER BY id DESC;')


def get_statuses():
    return database_connection.execute_select('SELECT * FROM statuses;')


def get_cards():
    return database_connection.execute_select('SELECT * FROM cards;')


def add_new_board(title):
    return database_connection.execute_dml_statement("""INSERT INTO boards (title)
                                                        VALUES (%(title)s) RETURNING *""", dict(title=title))


def update_board_title(title, id):
    return database_connection.execute_dml_statement("""UPDATE boards SET title = %(title)s WHERE id = %(id)s""", dict(title=title,id=id))


def update_card_title(title, id):
    return database_connection.execute_dml_statement("""UPDATE cards SET title = %(title)s WHERE id = %(id)s""", dict(title=title,id=id))