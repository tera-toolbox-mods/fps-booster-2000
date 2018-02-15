var Library
for (let md of ["library", "library-master"]) {
    try {
       Library = require(md);
       break
    }
    catch (err) {
        console.error(err+"[FPS Booster] ERROR! Can't find dependency library. Stopped!");
        process.exit()
    }
}
const abn = require('./abnormals');

class fpsBooster {
    constructor(dispatch) {

        const library = Library(dispatch);

        function sAbnormalityApply(e) {
            let gameId = e.target.toString();
            if (library.entity.players[gameId] && !library.player.isMe(e.target) && !abn[e.id]) return false;
        }
        dispatch.hook('S_ABNORMALITY_BEGIN', 2, { order: 99999999999 }, sAbnormalityApply);
        dispatch.hook('S_ABNORMALITY_REFRESH', 1, { order: 99999999999 }, sAbnormalityApply);

        function sAbnormalityEnd(e) {
            let gameId = e.target.toString();
            if (library.entity.players[gameId] && !library.player.isMe(e.target) && !abn[e.id]) return false;
        }
        dispatch.hook('S_ABNORMALITY_END', 1, { order: 99999999999 }, sAbnormalityEnd);
    }
}

module.exports = fpsBooster;
