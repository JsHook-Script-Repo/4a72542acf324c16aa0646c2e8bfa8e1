export function start(){
    var id_101 = false,id_102 = false,id_103 = false,id_104 = 10,id_105 = true,id_106 = true;
    if( typeof common != 'undefined'){
        common.modmenu('云图计划', [
            {
                'id': '9001',
                'type': 'webview',
                'data': '<center><p style="color: white;line-height: 18px;"><b>Mod Author <img src="https://ads-video-qn.xiaohongshu.com/recruit/5afd4cdff05b36f9efd4d84895d58047ef080a1d" width="18" height="18" style="border-radius: 50%;vertical-align: middle;"> FlxSNX</b></p></center>',
            },
            {
                'id': '101',
                'type': 'switch',
                'title': '战术技能无消耗',
                'enable': id_101
            },
            {
                'id': '105',
                'type': 'switch',
                'title': '所有技能无CD',
                'enable': id_105
            },
            {
                'id': '106',
                'type': 'switch',
                'title': '无限终极技能量',
                'enable': id_106
            },
            {
                'id': '103',
                'type': 'switch',
                'title': '无敌',
                'enable': id_103
            },
            {
                'id': '102',
                'type': 'switch',
                'title': '倍攻',
                'enable': id_102
            },
            {
                'id': '104',
                'type': 'input',
                'title': '伤害倍数',
                'val': id_104
            }
        ], function (data) {
            switch(data.id){
                case '101':
                    id_101 = data.val;
                    break;
                case '102':
                    id_102 = data.val;
                    break;
                case '103':
                    id_103 = data.val;
                    break;
                case '104':
                    id_104 = parseInt(data.val);
                    break;
                case '105':
                    id_105 = data.val;
                    break;
                case '106':
                    id_106 = data.val;
                    break;
                default: 
                    common.toast("什么也没有发生");
            }
        });
    }
    

    Il2Cpp.perform(() => {
        console.log(Il2Cpp.unityVersion);
        var lib = Il2Cpp.Domain.assembly("Assembly-CSharp").image;


        // 无敌倍攻
        lib.class('BattleCharacterEntity').method('GetDamage').implementation = function(damage, shieldCostDmg, hurtHealType, sender, skill, hurtType, isShowText){
            let belong = this.method('get_belong').invoke().field('value__').value;
            let sendbelong = sender.method('get_belong').invoke().field('value__').value;
            // console.log(sendbelong);
            if(belong == 1){
                if(id_103)damage = 0;hurtType = 6;
            }else if(sendbelong == 1){
                if(id_102)damage = damage * id_104;
            }
            this.method('GetDamage').invoke(damage, shieldCostDmg, hurtHealType, sender, skill, hurtType, isShowText);
        }

        // 战术技能无消耗
        lib.class('Table.BattleSkillCfg').method('get_PlayerMpCost').implementation = function(){
            if(id_101)return 0;
            return this.method('get_PlayerMpCost').invoke();
        }

        // 战术技能&终极技无CD
        lib.class('Table.BattleSkillCfg').method('get_CdTime').implementation = function(){
            if(id_105)return 0;
            return this.method('get_CdTime').invoke();
        }

        lib.class('BattleUltSkill').method('get_UltMp').implementation = function(){
            if(id_106)return this.field('MaxUltMp').value;
            return this.method('get_UltMp').invoke();
        }
    });
}
