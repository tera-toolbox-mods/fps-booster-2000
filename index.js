const BLOCK_OPTIONS = { order: 10000 };

const PACKETS_TO_BLOCK = [
  'S_RESET_CHARM_STATUS', 
  'S_PARTY_MEMBER_QUEST_DATA', 
  'S_UNICAST_FLOATING_CASTLE_INFO',
  'S_UNICAST_FLOATING_CASTLE_NAMEPLATE',
  'S_PARTY_MATCH_LINK',
  'S_UPDATE_ACHIEVEMENT_PROGRESS',
  'S_ITEM_CUSTOM_STRING',
  'S_LOAD_ACHIEVEMENT_LIST'
];

const BLOCK_PACKETS_IF_SAME_AS_PREVIOUS = [
  'S_VIEW_PARTY_INVITE',
  'S_PLAYER_CHANGE_ALL_PROF',
  'S_F2P_PremiumUser_Permission',
  'S_WEAK_POINT'
];

class FpsBooster{
    constructor(dispatch) {
        let enabled = true;
        let previous_packets = {};
      
        const library = dispatch.require.library;
        
        function BLOCK_ABNORMALITY_FROM_PLAYERS(e) {
            return !(enabled && library.entity.players[e.target.toString()]);
        }
        
        function BLOCK_THIS_PACKET() {
            return !enabled;
        }
        
        const BLOCK_IF_SAME_AS_PREVIOUS = (name, code, data) => {
            let ret = !(enabled && previous_packets[name] === data);
            previous_packets[name] = data;
            return ret;
        };

        dispatch.command.add('fb', ()=> {
            enabled = !enabled;
            dispatch.command.message(`FPS-Booster enabled: ${enabled.toString()}`);
        });

        dispatch.hook('S_ABNORMALITY_BEGIN', 3, BLOCK_OPTIONS, BLOCK_ABNORMALITY_FROM_PLAYERS);
        dispatch.hook('S_ABNORMALITY_REFRESH', 1, BLOCK_OPTIONS, BLOCK_ABNORMALITY_FROM_PLAYERS);
        dispatch.hook('S_ABNORMALITY_END', 1, BLOCK_OPTIONS, BLOCK_ABNORMALITY_FROM_PLAYERS);
        
        for(let name of PACKETS_TO_BLOCK) dispatch.hook(name, 'raw', BLOCK_OPTIONS, BLOCK_THIS_PACKET);
        
        for(let name of BLOCK_PACKETS_IF_SAME_AS_PREVIOUS) dispatch.hook(name, 'raw', BLOCK_OPTIONS, BLOCK_IF_SAME_AS_PREVIOUS.bind(null, name));
    }
}

module.exports = FpsBooster;
