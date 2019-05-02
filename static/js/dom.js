// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },
    loadStatuses: function () {
        dataHandler.getStatuses(function (statuses) {
            dom.getStatusIds(statuses)
        })
    },
    getStatusIds: function (statuses) {
        const columns = document.querySelectorAll(".board-column-title");
        for (let column of columns) {
            for (let status of statuses) {
                if (column.innerHTML.toLowerCase() === status.title) {
                    column.setAttribute("data-status-id", `${status.title}`);
                }
            }
        }

    },
    getBoardTemplate: function (title, id) {
        const template = document.querySelector('#board');
        const clone = document.importNode(template.content, true);
        const boardId = clone.querySelector('.board-template');
        clone.querySelector('.board-title').textContent = title;
        boardId.setAttribute("data-id", `${id}`);
        dom.loadStatuses();

        return clone;
    },
    getCardTemplate: function (title, id) {
        const template = document.querySelector('#card');
        const clone = document.importNode(template.content, true);
        const cardDiv = clone.querySelector('.card');
        clone.querySelector('.card-title').textContent = title;
        cardDiv.setAttribute("data-id", `${id}`);

        return clone;
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardList = document.createElement("section");
        boardList.id = "board";
        for (let board of boards) {
            boardList.appendChild(this.getBoardTemplate(board.title, board.id));
            dom.loadCards(board.id)
        }
        let container = document.querySelector('.board-container');
        container.appendChild(boardList);

    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, function (cards) {
            dom.showCards(cards, boardId)
        })
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        for (let card of cards) {
            const boardDiv = document.querySelector(`[data-id='${card.board_id}']`);
            const columnDiv = boardDiv.querySelector(`[data-status-id='${card.status_id}'`)
            columnDiv.appendChild(this.getCardTemplate(card.title, card.id))

        }
    },
    // here comes more features
};
