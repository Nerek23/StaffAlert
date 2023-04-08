var scriptName = "StaffAlert";
var scriptAuthor = "By Virus";
var scriptVersion = 1.0;

function StaffAlertModule() {
    var Lobby = value.createBoolean("AutoHub", true);
    this.getName = function() {
        return "StaffAlert";
    }

    this.getDescription = function() {
        return "StaffAlert pa Universocraft";
    }

    this.getCategory = function() {
        return "Misc";
    }

    var putitas = ["iJulietaARG_", "ImFerchus_Idk", "iMikeJR_", "iPumba_", "iZhunder_", "JuliCarles", "OnlyFernando", "Tauchet", "_iLoriToG_", "_JuPo_", "ImFokuh_Idk", "ImOvee_Idk",  "p3rrit0kawai2323", "iSpitlz_", "9"] 

    this.onUpdate = function() {        
         playerCollection = mc.getNetHandler().getPlayerInfoMap()
         playerCollection.forEach(function(player) {
            putitas.forEach(function(putitas) {
                if (putitas != mc.getSession().getUsername() && putitas == player.getGameProfile().getName()) {
                    if(mc.thePlayer.ticksExisted % 12 == 0) {
                        if(Lobby.get()) {
                            mc.thePlayer.sendChatMessage("/lobby");
                        }

                        chat.print("§5§lStaff: " + "§5§l " + putitas)

                     
                        
    

                    }
                }
            });

         });

    }

    this.addValues = function(virus) {
        virus.add(Lobby);
    }



}

var staffalertModule = new StaffAlertModule();
var staffalertModuleClient;

function onEnable() {
    staffalertModuleClient = moduleManager.registerModule(staffalertModule);
}

function onDisable() {
    moduleManager.unregisterModule(staffalertModuleClient);
}

