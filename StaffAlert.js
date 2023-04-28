// Updated to api_version = 2.

var screenWidth = mc.displayWidth;
var screenHeight = mc.displayHeight;

var script = registerScript({
    name: 'StaffAlert',
    version: '1.1',
    authors: ['Nerek/Virus']
    
});

script.registerModule({
    name: 'StaffAlert',
    category: 'Misc', 
    description: 'Detect staff members.',
    settings: {
        x: Setting.float({
            name: 'Text Position X',
            min: 0,
            max: screenWidth,
            default: 10
        }),
        y: Setting.float({
            name: 'Text Position Y',
            min: 0,
            max: screenHeight,
            default: 10
        }),
        AutoLobby: Setting.boolean({
            name: 'Auto Lobby',
            default: false
        }),
        debugMode: Setting.boolean({
            name: 'Debug Mode',
            default: false
        })
        
    }

}, function (module) {
    /*
         Here you can add or remove staff members that should be detected. Simply add the staff nicknames,
         and if you want to remove them, just remove the nickname.
         Example: var staffMembers = ['Patata1', 'EazyManco', 'Titulina', etc...];

         ↓  ↓  ↓  
    */

    var staffMembers = ['UserName1', 'UserName2']; 

    var sentToLobby = {};
    
    module.on("render2D", function (event) {
      
        var x = module.settings.x.get();
        var y = module.settings.y.get();
    
        staffMembers.forEach(function(staffMember) {
            if (mc.theWorld.getPlayerEntityByName(staffMember) != null) {
                mc.fontRendererObj.drawStringWithShadow('§b§lStaff: §f' + staffMember, x, y, 0xffffff);
                y += 10;
    
                if (module.settings.AutoLobby.get() && !sentToLobby[staffMember]) {
                    mc.thePlayer.sendChatMessage('/lobby');
                    Chat.print('§b§lStaff: §f' + staffMember);
                    
                    sentToLobby[staffMember] = true;
                } else if (!module.settings.AutoLobby.get() && sentToLobby[staffMember]) {
                    sentToLobby[staffMember] = false;
                }
    
            } else if (sentToLobby[staffMember]) {
                sentToLobby[staffMember] = false;
            }

            if(module.settings.debugMode.get()) {
                Chat.print('§2Detecting');
            }
        });
    });

    script.registerCommand({
        name: "StaffAdd",
        aliases: ["Staff"]
    }, function(command) {
        command.on("execute", function(args) {
            if (args.length > 1) {
                staffMembers.push(args[1]);
                Chat.print("§aUser " + "§b" + args[1] + " §ahas been added to the staff alert list.");
            } else {
                Chat.print("§cPlease provide a username to add.");
            }
        });
    });
    
});
