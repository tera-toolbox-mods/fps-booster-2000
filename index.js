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
        const IfYouBuyPrRightNowIllGibYouSomeUwU = (e) => !library.entity.players[e.target.toString()];

        dispatch.hook('S_ABNORMALITY_BEGIN', 2, {order: 99999999999}, IfYouBuyPrRightNowIllGibYouSomeUwU);
        dispatch.hook('S_ABNORMALITY_REFRESH', 1, {order: 99999999999}, IfYouBuyPrRightNowIllGibYouSomeUwU);
        dispatch.hook('S_ABNORMALITY_END', 1, {order: 99999999999}, IfYouBuyPrRightNowIllGibYouSomeUwU);

        /*dispatch.hook('S_ABNORMALITY_BEGIN', 2, {order: 9999999999}, (e) => { console.log(`started abnormality: ${e.id}`) });
        dispatch.hook('S_ABNORMALITY_REFRESH', 1, {order: 9999999999}, (e) => { console.log(`refreshed abnormality: ${e.id}`) });
        dispatch.hook('S_ABNORMALITY_END', 1, {order: 9999999999}, (e) => { console.log(`ended abnormality: ${e.id}`) });

        dispatch.hook('S_ABNORMALITY_BEGIN', 2, {order: 999999999999}, (e) => { console.log(`Allowed start abnormality: ${e.id}`) });
        dispatch.hook('S_ABNORMALITY_REFRESH', 1, {order: 999999999999}, (e) => { console.log(`Allowed refresh abnormality: ${e.id}`) });
        dispatch.hook('S_ABNORMALITY_END', 1, {order: 999999999999}, (e) => { console.log(`Allowed end abnormality: ${e.id}`) });*/

    }
}

module.exports = fpsBoosterNowGoBuyPingRemover;
