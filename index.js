try{
    var Library = require('library');
}catch(e) {
    try {
        var Library = require('library-master');
    }catch(e) {
        console.log("ERROR! Please download dependency, library.");
        process.exit();
    }
}
const buyPRTho = require('./buyPRTho');

class fpsBoosterNowGoBuyPingRemover{
    constructor(dispatch) {
        const library = Library(dispatch);

        function sAbnormalityApply(e) {
            let gameId = e.target.toString();
            if(library.entity.players[gameId] && !library.player.isMe(e.target) && !buyPRTho[e.id]) return false;
        }
        dispatch.hook('S_ABNORMALITY_BEGIN', 2, {order: 99999999999}, sAbnormalityApply);
        dispatch.hook('S_ABNORMALITY_REFRESH', 1, {order: 99999999999}, sAbnormalityApply);

        function sAbnormalityEnd(e) {
            let gameId = e.target.toString();
            if(library.entity.players[gameId] && !library.player.isMe(e.target) && !buyPRTho[e.id]) return false;
        }
        dispatch.hook('S_ABNORMALITY_END', 1, {order: 99999999999}, sAbnormalityEnd);
    }
}

module.exports = fpsBoosterNowGoBuyPingRemover;
