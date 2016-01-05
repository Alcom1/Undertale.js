// Combat module
var Combat = (function()
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
        EFFECT : 5,   //State where the player gets to see the impact of their decisive actions.
        RESPOND: 6,   //State where the player gets responded to by the enemy group.  
        DEFEND : 7,   //State where the player defends themself.
        FLASH : 8,    //State where the player's flash animation occurs, before the combat sequence begins.
        DEATH : 9,    //State where the player's death animation occurs, after death.
        NAME : 10     //State where the player selects an enemy by name.
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
    
    var cgroup;       //Group of attacking enemies! D:
    var startPos;     //Starting position 
    
	
	//Init
	function init()
	{
        //Initial states for combat
        combatState = COMBAT_STATE.MAIN;
        menuState = MENU_STATE.FIGHT;
        selectStateEnemy = 0;
        selectStateOther = 0;
        
        //Bullet box
        Bbox.setup(new Vect(320, 320, 0), 574, 140);
        
        //Soul
        startPos = new Vect(310, 309, 0);
        Soul.setup(startPos);
	}
    
    //Initialize with provided canvas.
    function setup(
        ctx)
    {
		Soul.getCollision(ctx);   //Form collision data for player.
        cgroup = new Cgroup();
        
        Cwriter.setTimes(
            .75,
            .33,
            .21,
            .033);
        Cwriter.setText(cgroup.getText());
        
        Cattack.setup();
    }
    
    //Update
	function update(dt)
	{
        //States for the combat sequence.
        switch(combatState)
        {
            case COMBAT_STATE.MAIN:
                if(Bbox.update(dt))
                {
                    Cwriter.update(dt);
                    
                    if(myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT])
                    {
                        menuState++;
                        if(menuState > MENU_STATE.MERCY)
                            menuState = MENU_STATE.MERCY;
                        else
                            Sound.playSound("button", true);
                    }
                    if(myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT])
                    {
                        menuState--;
                        if(menuState < MENU_STATE.FIGHT)
                            menuState = MENU_STATE.FIGHT;
                        else
                            Sound.playSound("button", true);
                    }
                    if(myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
                    {
                        combatState = menuState == MENU_STATE.ITEM || menuState == MENU_STATE.MERCY ? menuState : COMBAT_STATE.NAME;
                        if(combatState == COMBAT_STATE.ITEM && Inventory.getLength() <= 0)
                        {
                            combatState = COMBAT_STATE.MAIN;
                        }
                        else
                        {
                            selectStateOther = 0;
                            Sound.pauseSound("text"); 
                        }
                        Sound.playSound("button", true);
                    }
                }
                break;
                
            case COMBAT_STATE.FIGHT:
            	if(Cattack.update(dt) == -1)
                {
                    combatState = COMBAT_STATE.RESPOND;
                    Bbox.setSize(cgroup.getDefends().width, cgroup.getDefends().height, false);
                    cgroup.getDefends().setup();
                    Cwriter.reset();
                }
                break;
                
            case COMBAT_STATE.ACT:
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    combatState = COMBAT_STATE.NAME;
                    Sound.playSound("button", true);
                }
                selectStateOther = detectHorizontalSelect(cgroup.getActs()[selectStateEnemy], selectStateOther);
                break;
                
            case COMBAT_STATE.ITEM:
                if(myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
                {
                    Cwriter.setText(Inventory.getText(selectStateOther));
                    Inventory.activate(selectStateOther);
                    Inventory.removeItem(selectStateOther);
                    combatState = COMBAT_STATE.EFFECT;   
                }
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    combatState = COMBAT_STATE.MAIN;
                    Cwriter.reset();
                    Sound.playSound("button", true);
                }
                selectStateOther = detectHorizontalSelect(Inventory.getNames(), selectStateOther);
                break;
                
            case COMBAT_STATE.MERCY:
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    combatState = COMBAT_STATE.MAIN;
                    Cwriter.reset();
                    Sound.playSound("button", true);
                }
                selectStateOther = detectVerticalSelect(cgroup.getMercies(), selectStateOther);
                break;
            
            case COMBAT_STATE.EFFECT:
                Cwriter.update(dt);
                if(myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
                {
                    combatState = COMBAT_STATE.RESPOND;
                    Bbox.setSize(cgroup.getDefends().width, cgroup.getDefends().height, false);
                    cgroup.getDefends().setup();
                    Cwriter.setText(cgroup.getText());
                    Sound.pauseSound("text"); 
                }
                break;
            
            case COMBAT_STATE.RESPOND:
                if(Bbox.update(dt))
                {
                    combatState = COMBAT_STATE.DEFEND;
                }
                break;
                
            case COMBAT_STATE.DEFEND:
				Soul.move(dt);
				Soul.limit(Bbox.getBound());
                if(cgroup.getDefends().update(dt))
                {
                    Bbox.setSize(574, 140, false);
                    combatState = COMBAT_STATE.MAIN;
                }
                break;
                
            case COMBAT_STATE.FLASH:
                break;
                
            case COMBAT_STATE.DEATH:
                break;
                
            case COMBAT_STATE.NAME:
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
                {
                    combatState = menuState;
                    Sound.playSound("button", true);
                }
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    combatState = COMBAT_STATE.MAIN;
                    Cwriter.reset();
                    Sound.playSound("button", true);
                }
                if(combatState == COMBAT_STATE.FIGHT)
                {
                    Cattack.setup();
                }
                selectStateEnemy = detectVerticalSelect(cgroup.getNames(), selectStateEnemy);
                break;
        }
        
        //Sound updates
        Sound.update();
        
        //Tapping mode.
        if(combatState != COMBAT_STATE.DEFEND)
            myKeys.keydown = [];
	}
    
    //Draw
	function draw(ctx)
	{
        //States for the combat sequence.
        switch(combatState)
        {
            case COMBAT_STATE.MAIN:
				Bbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, menuState, MENU_STATE);
                Cwriter.drawText(ctx);
                switch(menuState)
                {
                    case MENU_STATE.FIGHT:
				        Soul.drawAt(ctx, new Vect(40, 446, 0));
                        break;
                    case MENU_STATE.ACT:
				        Soul.drawAt(ctx, new Vect(193, 446, 0));
                        break;
                    case MENU_STATE.ITEM:
				        Soul.drawAt(ctx, new Vect(353, 446, 0));
                        break;
                    case MENU_STATE.MERCY:
				        Soul.drawAt(ctx, new Vect(508, 446, 0));
                        break;
                }
                break;
                
            case COMBAT_STATE.FIGHT:
				Bbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, 0, MENU_STATE);
                Cattack.draw(ctx);
                break;
                
            case COMBAT_STATE.ACT:
				Bbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, 0, MENU_STATE);
                Cwriter.drawMenu(ctx, cgroup.getActs()[selectStateEnemy], menuState, MENU_STATE);
				Soul.drawAt(ctx, Cwriter.getSoulPos(selectStateOther, 0));
                break;
                
            case COMBAT_STATE.ITEM:
				Bbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, 0, MENU_STATE);
                Cwriter.drawMenu(ctx, Inventory.getNames(), menuState, MENU_STATE);
				Soul.drawAt(ctx, Cwriter.getSoulPos(selectStateOther, 0));
                break;
                
            case COMBAT_STATE.MERCY:
				Bbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, 0, MENU_STATE);
                Cwriter.drawMenu(ctx, cgroup.getMercies(), menuState, MENU_STATE);
				Soul.drawAt(ctx, Cwriter.getSoulPos(selectStateOther, 1));
                break;
            
            case COMBAT_STATE.EFFECT:
				Bbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, 0, MENU_STATE);
                Cwriter.drawText(ctx);
                break;
                
            case COMBAT_STATE.RESPOND:
				Bbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, 0, MENU_STATE);
				Soul.draw(ctx);
                break;
                
            case COMBAT_STATE.DEFEND:
				Bbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, 0, MENU_STATE);
                cgroup.getDefends().draw(ctx);
				Soul.checkCollision(ctx);
				Soul.draw(ctx);
                break;
                
            case COMBAT_STATE.FLASH:
				Soul.draw(ctx);
                break;
                
            case COMBAT_STATE.DEATH:
				Soul.draw(ctx);
                break;
                
            case COMBAT_STATE.NAME:
				Bbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, menuState, MENU_STATE);
				Cwriter.drawMenu(ctx, cgroup.getNames(), 0, MENU_STATE);
				Soul.drawAt(ctx, Cwriter.getSoulPos(selectStateEnemy, 1));
                break;
        }
	}
    
    //Return the state/index of the enemy selector
    function getSelectStateEnemy()
    {
        return selectStateEnemy;
    }
    
    //Detect a selection change in a horizontally-positioned menu and change the selection.
    function detectHorizontalSelect(options, state)
    {
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT])
        {
            if(state % 2)
            {
                state--;
                Sound.playSound("button", true);
            }
        }
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT])
        {
            if((state + 1) % 2 && state < options.length - 1)
            {
                state++;
                Sound.playSound("button", true);
            }
        }
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_UP])
        {
            if(state > 1)
            {
                state -= 2;
                Sound.playSound("button", true);
            }
        }
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN])
        {
            if(state < options.length - 2)
            {
                state += 2;
                Sound.playSound("button", true);
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
                Sound.playSound("button", true);
            }
        }
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN])
        {
            if(state < options.length - 1)
            {
                state ++;
                Sound.playSound("button", true);
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
        getSelectStateEnemy : getSelectStateEnemy,
	}
}());