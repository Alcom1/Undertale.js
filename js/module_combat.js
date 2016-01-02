// Combat module
"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .combat module and immediately invoke it in an IIFE
app.combat = (function()
{
	console.log("combat.js module loaded");
    
	var combatState;
    var COMBAT_STATE = Object.freeze
	({
		MAIN : 0,     //Main state. State in which one of the four options is to be selected.
		FIGHT : 1,    //State where the player aims.
		ACT : 2,      //State where the player selects an action.
        ITEM : 3,     //State where the player selects an item.
        MERCY : 4,    //State where the player offers mercy or flees.
        SURVIVE : 5,  //State where the player defends themself.
        FLASH : 6,    //State where the player's flash animation occurs, before the combat sequence begins.
        DEATH : 7,    //State where the player's death animation occurs, after death.
        NAME : 8      //State where the player selects an enemy by name.
	});
    
	var menuState;
    var MENU_STATE = Object.freeze
	({
		FIGHT : 1,    //Player has selected to fight.
		ACT : 2,      //Player has selected to act.
        ITEM : 3,     //Player has selected to use an item.
        MERCY : 4,    //Player has selected to offer mercy.
	});
    
    var selectStateEnemy;  //Index of currently selected enemy.
    var selectStateOther;  //Index of currently selected anything else.
    
    var cmenu;        //Menu button display object.
    var cwriter;      //Text display object.
    var cattack;      //Attack display.
    var chp;          //HP display object.
    var bbox;         //Bullet-box object.
    var soul;         //Player's soul object.
    var startPos;     //Starting position 
    var curHP;        //Player current health.
    var maxHP;        //Player max health.
    
    //Options
    var texts;
    var names;
    var acts;
    var items;
    var mercies;
	
	//Init
	function init()
	{
        //Initial states for combat
        combatState = COMBAT_STATE.MAIN;
        menuState = MENU_STATE.FIGHT;
        selectStateEnemy = 0;
        selectStateOther = 0;
        
        //Combat menu
        cmenu = new Cmenu();
        
        //HP display
        chp = new Chp();
        
        //Bullet box
        bbox = new Bbox(320, 320, 574, 140, 1);
        
        //Soul
        startPos = new Vect(310, 309, 0);
		var soulImage = document.getElementById("heart");
		var soulImageDmg = document.getElementById("heart_dmg");
		soul = new Soul(startPos, soulImage, soulImageDmg);
	}
    
    //Initialize with provided canvas.
    function setup(
        ctx, 
        _curHP, 
        _maxHP,
        _texts,
        _names,
        _acts,
        _items,
        _mercies)
    {
        texts = _texts;
        names = _names;
        acts = _acts;
        items = _items;
        mercies = _mercies;
		soul.getCollision(ctx);   //Form collision data for player.
        curHP = _curHP;
        maxHP = _maxHP;
        
        
        cwriter = new Cwriter(
            .75,
            .33,
            .21,
            .033);
        
        cwriter.setText(texts[0]);
        
        cattack = new Cattack();
        cattack.setup();
    }
    
    //Update
	function update(dt)
	{
        //States for the combat sequence.
        switch(combatState)
        {
            case COMBAT_STATE.MAIN:
                cwriter.update(dt);
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT])
                {
                    menuState++;
                    if(menuState > MENU_STATE.MERCY)
                        menuState = MENU_STATE.MERCY;
                    else
                        app.main.sound.playSound("button", true);
                }
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT])
                {
                    menuState--;
                    if(menuState < MENU_STATE.FIGHT)
                        menuState = MENU_STATE.FIGHT;
                    else
                        app.main.sound.playSound("button", true);
                }
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    cwriter.skip();
                }
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
                {
                    combatState = menuState == MENU_STATE.ITEM ? COMBAT_STATE.ITEM : COMBAT_STATE.NAME;
                    selectStateOther = 0;
                    app.main.sound.playSound("button", true);
                    app.main.sound.pauseSound("text"); 
                }
                break;
            case COMBAT_STATE.FIGHT:
            	if(cattack.update(dt) == -1)
                {
                    combatState = COMBAT_STATE.MAIN;
                    cwriter.reset();
                }
                break;
            case COMBAT_STATE.ACT:
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    combatState = COMBAT_STATE.NAME;
                    app.main.sound.playSound("button", true);
                }
                selectStateOther = detectHorizontalSelect(acts[selectStateEnemy], selectStateOther);
                break;
            case COMBAT_STATE.ITEM:
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    combatState = COMBAT_STATE.MAIN;
                    cwriter.reset();
                    app.main.sound.playSound("button", true);
                }
                selectStateOther = detectHorizontalSelect(items, selectStateOther);
                break;
            case COMBAT_STATE.MERCY:
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    combatState = COMBAT_STATE.NAME;
                    app.main.sound.playSound("button", true);
                }
                selectStateOther = detectVerticalSelect(mercies, selectStateOther);
                break;
            case COMBAT_STATE.SURVIVE:
				bbox.transition(dt);
				soul.move(dt);
				soul.limit(bbox.getBound());
                break;
            case COMBAT_STATE.FLASH:
                break;
            case COMBAT_STATE.DEATH:
                break;
            case COMBAT_STATE.NAME:
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
                {
                    combatState = menuState;
                    app.main.sound.playSound("button", true);
                }
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    combatState = COMBAT_STATE.MAIN;
                    cwriter.reset();
                    app.main.sound.playSound("button", true);
                }
                if(combatState == COMBAT_STATE.FIGHT)
                {
                    cattack.setup();
                }
                selectStateEnemy = detectVerticalSelect(names, selectStateEnemy);
                break;
        }
        
        //Tapping mode.
        if(combatState != COMBAT_STATE.SURVIVE)
            myKeys.keydown = [];
	}
    
    //Draw
	function draw(ctx)
	{
        //States for the combat sequence.
        switch(combatState)
        {
            case COMBAT_STATE.MAIN:
				bbox.draw(ctx);
				chp.draw(ctx, curHP, maxHP);
                cmenu.draw(ctx, menuState, MENU_STATE);
                cwriter.drawText(ctx);
                switch(menuState)
                {
                    case MENU_STATE.FIGHT:
				        soul.drawAt(ctx, new Vect(40, 446, 0));
                        break;
                    case MENU_STATE.ACT:
				        soul.drawAt(ctx, new Vect(193, 446, 0));
                        break;
                    case MENU_STATE.ITEM:
				        soul.drawAt(ctx, new Vect(353, 446, 0));
                        break;
                    case MENU_STATE.MERCY:
				        soul.drawAt(ctx, new Vect(508, 446, 0));
                        break;
                }
                break;
            case COMBAT_STATE.FIGHT:
				bbox.draw(ctx);
				chp.draw(ctx, curHP, maxHP);
                cmenu.draw(ctx, 0, MENU_STATE);
                cattack.draw(ctx);
                break;
            case COMBAT_STATE.ACT:
				bbox.draw(ctx);
				chp.draw(ctx, curHP, maxHP);
                cmenu.draw(ctx, 0, MENU_STATE);
                cwriter.drawMenu(ctx, acts[selectStateEnemy], menuState, MENU_STATE);
				soul.drawAt(ctx, cwriter.getSoulPos(selectStateOther, 0));
                break;
            case COMBAT_STATE.ITEM:
				bbox.draw(ctx);
				chp.draw(ctx, curHP, maxHP);
                cmenu.draw(ctx, 0, MENU_STATE);
                cwriter.drawMenu(ctx, items, menuState, MENU_STATE);
				soul.drawAt(ctx, cwriter.getSoulPos(selectStateOther, 0));
                break;
            case COMBAT_STATE.MERCY:
				bbox.draw(ctx);
				chp.draw(ctx, curHP, maxHP);
                cmenu.draw(ctx, 0, MENU_STATE);
                cwriter.drawMenu(ctx, mercies, menuState, MENU_STATE);
				soul.drawAt(ctx, cwriter.getSoulPos(selectStateOther, 1));
                break;
            case COMBAT_STATE.SURVIVE:
				bbox.draw(ctx);
				chp.draw(ctx, curHP, maxHP);
                cmenu.draw(ctx, 0, MENU_STATE);
				soul.checkCollision(ctx);
				soul.draw(ctx);
                break;
            case COMBAT_STATE.FLASH:
				soul.draw(ctx);
                break;
            case COMBAT_STATE.DEATH:
				soul.draw(ctx);
                break;
            case COMBAT_STATE.NAME:
				bbox.draw(ctx);
				chp.draw(ctx, curHP, maxHP);
                cmenu.draw(ctx, menuState, MENU_STATE);
				cwriter.drawMenu(ctx, names, 0, MENU_STATE);
				soul.drawAt(ctx, cwriter.getSoulPos(selectStateEnemy, 1));
                break;
        }
	}
    
    //Detect a selection change in a horizontally-positioned menu and change the selection.
    function detectHorizontalSelect(options, state)
    {
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT])
        {
            if(state % 2)
            {
                state--;
                app.main.sound.playSound("button", true);
            }
        }
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT])
        {
            if((state + 1) % 2 && state < options.length - 1)
            {
                state++;
                app.main.sound.playSound("button", true);
            }
        }
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_UP])
        {
            if(state > 1)
            {
                state -= 2;
                app.main.sound.playSound("button", true);
            }
        }
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN])
        {
            if(state < options.length - 2)
            {
                state += 2;
                app.main.sound.playSound("button", true);
            }
        }
        
        return state;
    }
    
    //Detect a selection change in a vertically-positioned menu and change the selection.
    function detectVerticalSelect(options, state)
    {
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_UP])
        {
            if(state > 0)
            {
                state --;
                app.main.sound.playSound("button", true);
            }
        }
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN])
        {
            if(state < options.length - 1)
            {
                state ++;
                app.main.sound.playSound("button", true);
            }
        }
        
        return state;
    }
	
	// export a public interface to this module (Why does this need to be same line bracket?)
	return {
		init : init,
        setup : setup,
        update : update,
        draw : draw,
	}
}());