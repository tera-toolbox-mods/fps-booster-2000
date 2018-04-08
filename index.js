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

class fpsBoosterNowGoBuyPingRemover{
    constructor(dispatch) {
        const library = Library(dispatch);
        let enabled = true;
        const IfYouBuyPrRightNowIllGibYouSomeUwU = (e) => !(library.entity.players[e.target.toString()] && enabled);

        library.cmd.add('fb', ()=> {
            enabled = !enabled;
            library.cmd.message(`FPS-Booster enabled: ${enabled.toString()}`);
        });

        dispatch.hook('S_ABNORMALITY_BEGIN', 2, {order: 99999999999}, IfYouBuyPrRightNowIllGibYouSomeUwU);
        dispatch.hook('S_ABNORMALITY_REFRESH', 1, {order: 99999999999}, IfYouBuyPrRightNowIllGibYouSomeUwU);
        dispatch.hook('S_ABNORMALITY_END', 1, {order: 99999999999}, IfYouBuyPrRightNowIllGibYouSomeUwU);
    }
}

module.exports = fpsBoosterNowGoBuyPingRemover;
