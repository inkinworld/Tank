var Style ={};
Style.tank = 64;
Style.tankSpeed = Style.tank/16;
Style.tile = Style.tank;
Style.canvas = Style.tank*13;
Style.bullet = Style.tank/4;
Style.bulletSpeed = Style.tankSpeed * 2;
Style.boom = Style.tank * 1.8;


var Type = {};
Type.tank_hero = 0;
Type.tank_army = 1;
Type.tile_tile = 0;
Type.tile_iron = 1; 