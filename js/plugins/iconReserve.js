var Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages = function() {
    Scene_Boot_loadSystemImages.call(this);
    var iconList = ["default_empty","default_unkown","gold","icon_frame_sprite","item_frame_bronze","item_frame_golden","item_frame_legendary","item_frame_silver","item_frame_unique","jbe_templar_knight","jb_templar_knight","jb_warrior","portrait_frame","state_10","state_11","state_12","state_13","state_14","state_15","state_17","state_18","state_19","state_1","state_20","state_21","state_22","state_23","state_24","state_25","state_26","state_27","state_28","state_2","state_3","state_4","state_5","state_6","state_7","state_8","state_9","state_death_sentence","type_anemos","type_blow","type_erebus","type_gee","type_heal","type_hydor","type_magic","type_phos","type_physical","type_pyros","type_shoot","type_slash","type_statechange","type_thrust"];
    iconList.map(function(iconName) {
        ImageManager.reserveBitmap('img/icons/', iconName);
    });
};