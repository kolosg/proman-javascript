from flask import Flask, render_template, url_for, request
from util import json_response
import persistence
import data_handler
import json

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return persistence.get_sql_boards()


@app.route("/get-statuses")
@json_response
def get_statuses():

    return persistence.get_statuses()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


@app.route('/add-new-board', methods=["GET", "POST"])
@json_response
def add_new_board():

    title = request.get_json()['title']


    return data_handler.add_new_board(title)


@app.route('/update-board-title', methods=["GET", "POST"])
@json_response
def update_board_title():
    data_handler.update_board_title(request.get_json()["newtitle"], request.get_json()["boardid"])
    pass


@app.route('/update-card-title', methods=["GET", "POST"])
@json_response
def update_card_title():
    data_handler.update_card_title(request.get_json()["newtitle"], request.get_json()["cardid"])
    pass


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
