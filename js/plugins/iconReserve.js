var Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages = function() {
    Scene_Boot_loadSystemImages.call(this);
    var iconList = ["default_empty","default_unknown","gold","icon_frame_sprite","item_frame_bronze","item_frame_golden","item_frame_legendary","item_frame_silver","item_frame_unique","it_head_cap","it_heal_potion","it_mana_potion","it_pi_rophia","it_sk_templar_knight","it_sp_synthesizer","it_wp_silver_sword","it_wp_staff","it_wp_wood_sword","jb_bishop","jbe_bishop","jbe_holy_knight","jbe_templar_knight","jbe_tricker","jb_holy_knight","jb_templar_knight","jb_tricker","jb_warrior","piece_frame_bronze","piece_frame_golden","piece_frame_legendary","piece_frame_silver","portrait_frame","state_10","state_11","state_12","state_13","state_14","state_15","state_17","state_18","state_19","state_1","state_20","state_21","state_22","state_24","state_25","state_26","state_27","state_28","state_2","state_4","state_5","state_6","state_7","state_8","state_9","state_blind","state_cri_up","state_death_sentence","state_eva_up","state_hit_up","state_mdf_down","state_mdf_up","state_mdm_up","state_pdf_down","state_pdf_up","state_pdm_up","state_shield","state_slash_assist_up","state_spd_up","type_anemos","type_blow","type_erebus","type_gee","type_heal","type_hydor","type_magic","type_passive","type_phos","type_physical","type_pyros","type_shoot","type_slash","type_statechange","type_thrust"];
    iconList.map(function(iconName) {
        ImageManager.reserveBitmap('img/icons/', iconName);
    });
};