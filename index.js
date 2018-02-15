const Library = require('library');
const buyPRTho = require('./buyPRTho');

class fpsBoosterNowGoBuyPingRemover{
    constructor(dispatch) {
        const library = Library(dispatch);

        function sAbnormalityApply(e) {
            let gameId = e.target.toString();
            if(library.entity.players[gameId] && !library.player.isMe(e.gameId) && buyPRTho[e.id]) return false;
        }
        dispatch.hook('S_ABNORMALITY_BEGIN', 2, {order: 99999999999}, sAbnormalityApply);
        dispatch.hook('S_ABNORMALITY_REFRESH', 1, {order: 99999999999}, sAbnormalityApply);

        function sAbnormalityEnd(e) {
            let gameId = e.target.toString();
            if(library.entity.players[gameId] && !library.player.isMe(e.gameId) && buyPRTho[e.id]) return false;
        }
        dispatch.hook('S_ABNORMALITY_END', 1, {order: 99999999999}, sAbnormalityEnd);
    }
}

module.exports = fpsBoosterNowGoBuyPingRemover;
