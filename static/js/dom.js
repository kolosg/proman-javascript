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

        // add event listener on board title to be editable
        this.addEventListenerOnBoardTitle()

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
            const columnDiv = boardDiv.querySelector(`[data-status-id='${card.status_id}'`);
            columnDiv.appendChild(this.getCardTemplate(card.title, card.id))

        }
    },
    addNewBoardEventListener: function () {
        let addNewBoardButton = document.getElementsByClassName("add-new-board-button");
        addNewBoardButton[0].addEventListener("click", this.addNewBoardClickHandler)
    },


    addNewBoardClickHandler: function () {
        dataHandler.addNewBoard(function (newCardTitle) {
            dom.showBoard(newCardTitle);
        })

    },

    addEventListenerOnBoardTitle: function () {
        const boardTitles = document.getElementsByClassName('board-title');
        console.log(boardTitles)
        for (let boardTitle of boardTitles) {
            boardTitle.addEventListener('click', this.boardTitleClickHandler)
        }
    },

    boardTitleClickHandler: function () {
        this.contentEditable = 'true';
        this.id = 'contenteditable';
        const title = this.innerHTML;
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (evt.key === 'Escape') {
                const boardTitle = document.getElementById('contenteditable');
                boardTitle.innerHTML = title;
                boardTitle.contentEditable = 'false';
                boardTitle.id = 'noteditable';


            }
    };

    },

    showBoard: function (newCardTitle) {
        let boardList = document.createElement("div");
        boardList.id ="board";

        boardList.appendChild(this.getBoardTemplate(newCardTitle[1], newCardTitle[0]));


        let container = document.getElementsByTagName('section')[0];
        ///container.appendChild(boardList);

        container.insertAdjacentElement("afterbegin", boardList);

        // add event listener on board title to be editable
        this.addEventListenerOnBoardTitle()

    },
    // here comes more features
};
