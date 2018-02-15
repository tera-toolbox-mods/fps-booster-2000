const abn = require('./abnormals');
const debug = false;

class fpsBooster {
    constructor(dispatch) {
        this.gameId;
        this.players = {};
        this.vehicleEx = null;


        dispatch.hook('S_LOAD_TOPO', 'raw', () => {
            this.vehicleEx = null;
            this.players = {};
            if (debug) console.log('S_LOAD_TOPO');
        });

        dispatch.hook('S_ABNORMALITY_BEGIN', 2, { order: 1000 }, (event) => {
            let res = this.players[event.target.toString()] && !this.isMe(event.target) && !abn[event.id]
            if (debug) console.log(`S_ABNORMALITY_BEGIN for ${event.target} with id ${event.id}  blocked ${res}`);
            if (res) return false;

        });
        dispatch.hook('S_ABNORMALITY_REFRESH', 1, { order: 1000 }, (event) => {
            let res = this.players[event.target.toString()] && !this.isMe(event.target) && !abn[event.id]
            if (debug) console.log(`S_ABNORMALITY_REFRESH for ${event.target} with id ${event.id} blocked ${res}`);
            if (res) return false;

        });

        dispatch.hook('S_ABNORMALITY_END', 1, { order: 1000 }, (event) => {
            let res = this.players[event.target.toString()] && !this.isMe(event.target) && !abn[event.id]
            if (debug) console.log(`S_ABNORMALITY_END for ${event.target} with id ${event.id}  blocked ${res}`);
            if (res) return false;

        });

        dispatch.hook('S_LOGIN', 9, (event) => {
            this.gameId = event.gameId;
        });

        dispatch.hook('S_SPAWN_USER', 11, (event) => {
            if (debug) console.log(`S_SPAWN_USER for ${event.gameId}`);
            if (!this.players[event.gameId.toString()]) {
                this.players[event.gameId.toString()] = true;
                if (debug) console.log('added')
            }
        });

        dispatch.hook('S_DESPAWN_USER', 3, (event) => {
            if (debug) console.log(`S_DESPAWN_USER for ${event.gameId}`);
            if (this.players[event.gameId.toString()]) {
                delete this.players[event.gameId.toString()]
                if (debug) console.log('removed')
            }
        });

        dispatch.hook('S_MOUNT_VEHICLE_EX', 1, event => {
            if (event.target.equals(this.gameId)) this.vehicleEx = event.vehicle
        });

        dispatch.hook('S_UNMOUNT_VEHICLE_EX', 1, event => {
            if (event.target.equals(this.gameId)) this.vehicleEx = null
        });
    }

    //Check gameId(cid)
    isMe(id) {
        return this.gameId.equals(id) || this.vehicleEx && this.vehicleEx.equals(id)
    }
}

module.exports = fpsBooster;
