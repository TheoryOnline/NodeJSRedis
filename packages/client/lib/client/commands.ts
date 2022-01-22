import CLUSTER_COMMANDS from '../cluster/commands';
import * as ACL_CAT from '../commands/ACL_CAT';
import * as ACL_DELUSER from '../commands/ACL_DELUSER';
import * as ACL_GENPASS from '../commands/ACL_GENPASS';
import * as ACL_GETUSER from '../commands/ACL_GETUSER';
import * as ACL_LIST from '../commands/ACL_LIST';
import * as ACL_LOAD from '../commands/ACL_LOAD';
import * as ACL_LOG_RESET from '../commands/ACL_LOG_RESET';
import * as ACL_LOG from '../commands/ACL_LOG';
import * as ACL_SAVE from '../commands/ACL_SAVE';
import * as ACL_SETUSER from '../commands/ACL_SETUSER';
import * as ACL_USERS from '../commands/ACL_USERS';
import * as ACL_WHOAMI from '../commands/ACL_WHOAMI';
import * as ASKING from '../commands/ASKING';
import * as AUTH from '../commands/AUTH';
import * as BGREWRITEAOF from '../commands/BGREWRITEAOF';
import * as BGSAVE from '../commands/BGSAVE';
import * as CLIENT_CACHING from '../commands/CLIENT_CACHING';
import * as CLIENT_GETNAME from '../commands/CLIENT_GETNAME';
import * as CLIENT_GETREDIR from '../commands/CLIENT_GETREDIR';
import * as CLIENT_ID from '../commands/CLIENT_ID';
import * as CLIENT_KILL from '../commands/CLIENT_KILL';
import * as CLIENT_SETNAME from '../commands/CLIENT_SETNAME';
import * as CLIENT_INFO from '../commands/CLIENT_INFO';
import * as CLUSTER_ADDSLOTS from '../commands/CLUSTER_ADDSLOTS';
import * as CLUSTER_FLUSHSLOTS from '../commands/CLUSTER_FLUSHSLOTS';
import * as CLUSTER_INFO from '../commands/CLUSTER_INFO';
import * as CLUSTER_NODES from '../commands/CLUSTER_NODES';
import * as CLUSTER_MEET from '../commands/CLUSTER_MEET';
import * as CLUSTER_RESET from '../commands/CLUSTER_RESET';
import * as CLUSTER_SETSLOT from '../commands/CLUSTER_SETSLOT';
import * as CLUSTER_SLOTS from '../commands/CLUSTER_SLOTS';
import * as COMMAND_COUNT from '../commands/COMMAND_COUNT';
import * as COMMAND_GETKEYS from '../commands/COMMAND_GETKEYS';
import * as COMMAND_INFO from '../commands/COMMAND_INFO';
import * as COMMAND from '../commands/COMMAND';
import * as CONFIG_GET from '../commands/CONFIG_GET';
import * as CONFIG_RESETASTAT from '../commands/CONFIG_RESETSTAT';
import * as CONFIG_REWRITE from '../commands/CONFIG_REWRITE';
import * as CONFIG_SET from '../commands/CONFIG_SET';
import * as DBSIZE from '../commands/DBSIZE';
import * as DISCARD from '../commands/DISCARD';
import * as ECHO from '../commands/ECHO';
import * as FAILOVER from '../commands/FAILOVER';
import * as FLUSHALL from '../commands/FLUSHALL';
import * as FLUSHDB from '../commands/FLUSHDB';
import * as HELLO from '../commands/HELLO';
import * as INFO from '../commands/INFO';
import * as KEYS from '../commands/KEYS';
import * as LASTSAVE from '../commands/LASTSAVE';
import * as LOLWUT from '../commands/LOLWUT';
import * as MEMORY_DOCTOR from '../commands/MEMORY_DOCTOR';
import * as MEMORY_MALLOC_STATS from '../commands/MEMORY_MALLOC-STATS';
import * as MEMORY_PURGE from '../commands/MEMORY_PURGE';
import * as MEMORY_STATS from '../commands/MEMORY_STATS';
import * as MEMORY_USAGE from '../commands/MEMORY_USAGE';
import * as MODULE_LIST from '../commands/MODULE_LIST';
import * as MODULE_LOAD from '../commands/MODULE_LOAD';
import * as MODULE_UNLOAD from '../commands/MODULE_UNLOAD';
import * as MOVE from '../commands/MOVE';
import * as PING from '../commands/PING';
import * as PUBSUB_CHANNELS from '../commands/PUBSUB_CHANNELS';
import * as PUBSUB_NUMPAT from '../commands/PUBSUB_NUMPAT';
import * as PUBSUB_NUMSUB from '../commands/PUBSUB_NUMSUB';
import * as RANDOMKEY from '../commands/RANDOMKEY';
import * as READONLY from '../commands/READONLY';
import * as READWRITE from '../commands/READWRITE';
import * as REPLICAOF from '../commands/REPLICAOF';
import * as RESTORE_ASKING from '../commands/RESTORE-ASKING';
import * as ROLE from '../commands/ROLE';
import * as SAVE from '../commands/SAVE';
import * as SCAN from '../commands/SCAN';
import * as SCRIPT_DEBUG from '../commands/SCRIPT_DEBUG';
import * as SCRIPT_EXISTS from '../commands/SCRIPT_EXISTS';
import * as SCRIPT_FLUSH from '../commands/SCRIPT_FLUSH';
import * as SCRIPT_KILL from '../commands/SCRIPT_KILL';
import * as SCRIPT_LOAD from '../commands/SCRIPT_LOAD';
import * as SHUTDOWN from '../commands/SHUTDOWN';
import * as SWAPDB from '../commands/SWAPDB';
import * as TIME from '../commands/TIME';
import * as UNWATCH from '../commands/UNWATCH';
import * as WAIT from '../commands/WAIT';

export default {
    ...CLUSTER_COMMANDS,
    ACL_CAT,
    aclCat: ACL_CAT,
    acl_cat: ACL_CAT,
    ACL_DELUSER,
    aclDelUser: ACL_DELUSER,
    acl_deluser: ACL_DELUSER,
    ACL_GENPASS,
    aclGenPass: ACL_GENPASS,
    acl_genpass: ACL_GENPASS,
    ACL_GETUSER,
    aclGetUser: ACL_GETUSER,
    acl_getuser: ACL_GETUSER,
    ACL_LIST,
    aclList: ACL_LIST,
    acl_list: ACL_LIST,
    ACL_LOAD,
    aclLoad: ACL_LOAD,
    acl_load: ACL_LOAD,
    ACL_LOG_RESET,
    aclLogReset: ACL_LOG_RESET,
    acl_log_reset: ACL_LOG_RESET,
    ACL_LOG,
    aclLog: ACL_LOG,
    acl_log: ACL_LOG,
    ACL_SAVE,
    aclSave: ACL_SAVE,
    acl_save: ACL_SAVE,
    ACL_SETUSER,
    aclSetUser: ACL_SETUSER,
    acl_setuser: ACL_SETUSER,
    ACL_USERS,
    aclUsers: ACL_USERS,
    acl_users: ACL_USERS,
    ACL_WHOAMI,
    aclWhoAmI: ACL_WHOAMI,
    acl_whoami: ACL_WHOAMI,
    ASKING,
    asking: ASKING,
    AUTH,
    auth: AUTH,
    BGREWRITEAOF,
    bgRewriteAof: BGREWRITEAOF,
    bgrewriteaof: BGREWRITEAOF,
    BGSAVE,
    bgSave: BGSAVE,
    bgsave: BGSAVE,
    CLIENT_CACHING,
    clientCaching: CLIENT_CACHING,
    client_caching: CLIENT_CACHING,
    CLIENT_GETNAME,
    clientGetName: CLIENT_GETNAME,
    client_getname: CLIENT_GETNAME,
    CLIENT_GETREDIR,
    clientGetRedir: CLIENT_GETREDIR,
    client_getredir: CLIENT_GETREDIR,
    CLIENT_ID,
    clientId: CLIENT_ID,
    client_id: CLIENT_ID,
    CLIENT_KILL,
    clientKill: CLIENT_KILL,
    client_kill: CLIENT_KILL,
    CLIENT_SETNAME,
    clientSetName: CLIENT_SETNAME,
    client_setname: CLIENT_SETNAME,
    CLIENT_INFO,
    clientInfo: CLIENT_INFO,
    client_info: CLIENT_INFO,
    CLUSTER_ADDSLOTS,
    clusterAddSlots: CLUSTER_ADDSLOTS,
    cluster_addslots: CLUSTER_ADDSLOTS,
    CLUSTER_FLUSHSLOTS,
    clusterFlushSlots: CLUSTER_FLUSHSLOTS,
    cluster_flushslots: CLUSTER_FLUSHSLOTS,
    CLUSTER_INFO,
    clusterInfo: CLUSTER_INFO,
    cluster_info: CLUSTER_INFO,
    CLUSTER_NODES,
    clusterNodes: CLUSTER_NODES,
    cluster_nodes: CLUSTER_NODES,
    CLUSTER_MEET,
    clusterMeet: CLUSTER_MEET,
    cluster_meet: CLUSTER_MEET,
    CLUSTER_RESET,
    clusterReset: CLUSTER_RESET,
    cluster_reset: CLUSTER_RESET,
    CLUSTER_SETSLOT,
    clusterSetSlot: CLUSTER_SETSLOT,
    cluster_setslot: CLUSTER_SETSLOT,
    CLUSTER_SLOTS,
    clusterSlots: CLUSTER_SLOTS,
    cluster_slots: CLUSTER_SLOTS,
    COMMAND_COUNT,
    commandCount: COMMAND_COUNT,
    command_count: COMMAND_COUNT,
    COMMAND_GETKEYS,
    commandGetKeys: COMMAND_GETKEYS,
    command_getkeys: COMMAND_GETKEYS,
    COMMAND_INFO,
    commandInfo: COMMAND_INFO,
    command_info: COMMAND_INFO,
    COMMAND,
    command: COMMAND,
    CONFIG_GET,
    configGet: CONFIG_GET,
    config_get: CONFIG_GET,
    CONFIG_RESETASTAT,
    configResetStat: CONFIG_RESETASTAT,
    config_resetastat: CONFIG_RESETASTAT,
    CONFIG_REWRITE,
    configRewrite: CONFIG_REWRITE,
    config_rewrite: CONFIG_REWRITE,
    CONFIG_SET,
    configSet: CONFIG_SET,
    config_set: CONFIG_SET,
    DBSIZE,
    dbSize: DBSIZE,
    dbsize: DBSIZE,
    DISCARD,
    discard: DISCARD,
    ECHO,
    echo: ECHO,
    FAILOVER,
    failover: FAILOVER,
    FLUSHALL,
    flushAll: FLUSHALL,
    flushall: FLUSHALL,
    FLUSHDB,
    flushDb: FLUSHDB,
    flushdb: FLUSHDB,
    HELLO,
    hello: HELLO,
    INFO,
    info: INFO,
    KEYS,
    keys: KEYS,
    LASTSAVE,
    lastSave: LASTSAVE,
    lastsave: LASTSAVE,
    LOLWUT,
    lolwut: LOLWUT,
    MEMORY_DOCTOR,
    memoryDoctor: MEMORY_DOCTOR,
    memory_doctor: MEMORY_DOCTOR,
    'MEMORY_MALLOC-STATS': MEMORY_MALLOC_STATS,
    memoryMallocStats: MEMORY_MALLOC_STATS,
    'memory_malloc-stats': MEMORY_MALLOC_STATS,
    MEMORY_PURGE,
    memoryPurge: MEMORY_PURGE,
    memory_purge: MEMORY_PURGE,
    MEMORY_STATS,
    memoryStats: MEMORY_STATS,
    memory_stats: MEMORY_STATS,
    MEMORY_USAGE,
    memoryUsage: MEMORY_USAGE,
    memory_usage: MEMORY_USAGE,
    MODULE_LIST,
    moduleList: MODULE_LIST,
    module_list: MODULE_LIST,
    MODULE_LOAD,
    moduleLoad: MODULE_LOAD,
    module_load: MODULE_LOAD,
    MODULE_UNLOAD,
    moduleUnload: MODULE_UNLOAD,
    module_unload: MODULE_UNLOAD,
    MOVE,
    move: MOVE,
    PING,
    ping: PING,
    PUBSUB_CHANNELS,
    pubSubChannels: PUBSUB_CHANNELS,
    pubsub_channels: PUBSUB_CHANNELS,
    PUBSUB_NUMPAT,
    pubSubNumPat: PUBSUB_NUMPAT,
    pubsub_numpat: PUBSUB_NUMPAT,
    PUBSUB_NUMSUB,
    pubSubNumSub: PUBSUB_NUMSUB,
    pubsub_numsub: PUBSUB_NUMSUB,
    RANDOMKEY,
    randomKey: RANDOMKEY,
    randomkey: RANDOMKEY,
    READONLY,
    readonly: READONLY,
    READWRITE,
    readwrite: READWRITE,
    REPLICAOF,
    replicaOf: REPLICAOF,
    replicaof: REPLICAOF,
    'RESTORE-ASKING': RESTORE_ASKING,
    restoreAsking: RESTORE_ASKING,
    'restore-asking': RESTORE_ASKING,
    ROLE,
    role: ROLE,
    SAVE,
    save: SAVE,
    SCAN,
    scan: SCAN,
    SCRIPT_DEBUG,
    scriptDebug: SCRIPT_DEBUG,
    script_debug: SCRIPT_DEBUG,
    SCRIPT_EXISTS,
    scriptExists: SCRIPT_EXISTS,
    script_exists: SCRIPT_EXISTS,
    SCRIPT_FLUSH,
    scriptFlush: SCRIPT_FLUSH,
    script_flush: SCRIPT_FLUSH,
    SCRIPT_KILL,
    scriptKill: SCRIPT_KILL,
    script_kill: SCRIPT_KILL,
    SCRIPT_LOAD,
    scriptLoad: SCRIPT_LOAD,
    script_load: SCRIPT_LOAD,
    SHUTDOWN,
    shutdown: SHUTDOWN,
    SWAPDB,
    swapDb: SWAPDB,
    swapdb: SWAPDB,
    TIME,
    time: TIME,
    UNWATCH,
    unwatch: UNWATCH,
    WAIT,
    wait: WAIT,
};
