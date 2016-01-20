//Combat module displays and manages the entire combat sequence.
var Combat = (function()
{
	var combatState;  //State of the combat sequence.
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
        DEATH : 8,    //State where the player's death animation occurs, after death.
        NAME : 9      //State where the player selects an enemy by name.
	});
    
	var menuState;    //Menu selection state.
    var MENU_STATE = Object.freeze
	({
		FIGHT : 1,    //Player has selected to fight.
		ACT : 2,      //Player has selected to act.
        ITEM : 3,     //Player has selected to use an item.
        MERCY : 4,    //Player has selected to offer mercy.
	});
    
    var selectStateEnemy;  //Index of currently selected enemy.
    var selectStateOther;  //Index of currently selected anything else.
	
	//Init
	function init()
	{
        //Initial states for combat
        combatState = COMBAT_STATE.MAIN;
        menuState = MENU_STATE.FIGHT;
        selectStateEnemy = 0;
        selectStateOther = 0;
        
        //Bullet box
        Cbbox.setup(574, 140);
        
        //Group setup
        Cgroup.setup();
	}
    
    //Setup with provided canvas.
    function setup(ctx)
    {
		Soul.getCollision(ctx);   //Form collision data for player.
        
        Cwriter.setupTimes(
            .50,
            .33,
            .21,
            .033);
        Cwriter.setupText(Cgroup.getText());
        
        Cattack.setup();
    }
    
    //Update
	function update(dt)
	{
        Cgroup.update(dt);
        
        //Seperate as to ensure that the soul finishes updating.
        if(combatState != COMBAT_STATE.FLASH)
        {
            Soul.update(dt);
        }
        
        //States for the combat sequence.
        switch(combatState)
        {
            case COMBAT_STATE.MAIN:
                if(Cbbox.update(dt))
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
                        switch(menuState)
                        {
                            case MENU_STATE.FIGHT:
                                combatState = COMBAT_STATE.NAME;
                                selectStateOther = 0;
                                Sound.pauseSoundHard("text");
                                break;
                            case MENU_STATE.ACT:
                                combatState = COMBAT_STATE.NAME;
                                selectStateOther = 0;
                                Sound.pauseSoundHard("text");
                                break;     
                            case MENU_STATE.ITEM:
                                combatState = menuState;
                                if(Inventory.getLength() <= 0)
                                {
                                    combatState = COMBAT_STATE.MAIN;
                                }
                                else
                                {
                                    selectStateOther = 0;
                                    Sound.pauseSoundHard("text");
                                }
                                break;
                            case MENU_STATE.MERCY:
                                combatState = menuState;
                                selectStateOther = 0;
                                Sound.pauseSoundHard("text");
                                break;                            
                        }
                             
                        Sound.playSound("button", true);
                    }
                }
                break;
                
            case COMBAT_STATE.FIGHT:
            	if(Cattack.update(dt))
                {
                    combatState = COMBAT_STATE.RESPOND;
                    Cbubble.setup();
                    Cbbox.setSize(Cgroup.getDefends().width, Cgroup.getDefends().height, false);
                    Cgroup.getDefends().setup();
                    Cwriter.reset();
                }
                break;
                
            case COMBAT_STATE.ACT:
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    combatState = COMBAT_STATE.NAME;
                    Sound.playSound("button", true);
                }
                if(myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
                {
                    Cwriter.setupText(Cgroup.getRes(selectStateEnemy, selectStateOther));
                    combatState = COMBAT_STATE.EFFECT;   
                }
                selectStateOther = detectHorizontalSelect(Cgroup.getActs(selectStateEnemy), selectStateOther);
                break;
                
            case COMBAT_STATE.ITEM:
                if(myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
                {
                    Cwriter.setupText(Inventory.getText(selectStateOther));
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
                selectStateOther = detectVerticalSelect(Cgroup.getMercies(), selectStateOther);
                break;
            
            case COMBAT_STATE.EFFECT:
                Cwriter.update(dt);
                if(myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
                {
                    combatState = COMBAT_STATE.RESPOND;
                    Cbubble.setup();
                    Cbbox.setSize(Cgroup.getDefends().width, Cgroup.getDefends().height, false);
                    Cgroup.getDefends().setup();
                    Cwriter.setupText(Cgroup.getText());
                    Sound.pauseSound("text"); 
                }
                break;
            
            case COMBAT_STATE.RESPOND:
                if(Cbbox.update(dt) && Cbubble.update(dt) && myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
                {
                    combatState = COMBAT_STATE.DEFEND;
                }
                break;
                
            case COMBAT_STATE.DEFEND:
                Soul.update(dt);
				Soul.move(dt);
				Soul.limit(Cbbox.getBound());
                if(Cgroup.getDefends().update(dt))
                {
                    Soul.reset();
                    Cbbox.setSize(574, 140, false);
                    combatState = COMBAT_STATE.MAIN;
                }
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
                selectStateEnemy = detectVerticalSelect(Cgroup.getNames(), selectStateEnemy);
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
        Cgroup.draw(ctx);
        
        //States for the combat sequence.
        switch(combatState)
        {
            case COMBAT_STATE.MAIN:
                ctx.save();
                ctx.globalAlpha = Soul.getOpacity();
				Cbbox.draw(ctx);
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
                ctx.restore();
                break;
                
            case COMBAT_STATE.FIGHT:
				Cbbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, 0, MENU_STATE);
                Cattack.draw(ctx);
                break;
                
            case COMBAT_STATE.ACT:
				Cbbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, 0, MENU_STATE);
                Cwriter.drawMenu(ctx, Cgroup.getActs(selectStateEnemy), menuState, MENU_STATE);
				Soul.drawAt(ctx, Cwriter.getSoulPos(selectStateOther, 0));
                break;
                
            case COMBAT_STATE.ITEM:
				Cbbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, 0, MENU_STATE);
                Cwriter.drawMenu(ctx, Inventory.getNames(), menuState, MENU_STATE);
				Soul.drawAt(ctx, Cwriter.getSoulPos(selectStateOther, 0));
                break;
                
            case COMBAT_STATE.MERCY:
				Cbbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, 0, MENU_STATE);
                Cwriter.drawMenu(ctx, Cgroup.getMercies(), menuState, MENU_STATE);
				Soul.drawAt(ctx, Cwriter.getSoulPos(selectStateOther, 1));
                break;
            
            case COMBAT_STATE.EFFECT:
				Cbbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, 0, MENU_STATE);
                Cwriter.drawText(ctx);
                break;
                
            case COMBAT_STATE.RESPOND:
				Cbbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, 0, MENU_STATE);
				Soul.draw(ctx);
                Cbubble.draw(ctx);
                break;
                
            case COMBAT_STATE.DEFEND:
				Cbbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, 0, MENU_STATE);
                Cgroup.getDefends().draw(ctx);
				Soul.checkCollision(ctx);
				Soul.draw(ctx);
                break;
                
            case COMBAT_STATE.DEATH:
				Soul.draw(ctx);
                break;
                
            case COMBAT_STATE.NAME:
				Cbbox.draw(ctx);
				Chp.draw(ctx, Player.getHPCur(), Player.getHPMax());
                Cmenu.draw(ctx, menuState, MENU_STATE);
                if(menuState == MENU_STATE.FIGHT)
                {
                    Cwriter.drawMenu(ctx, Cgroup.getNames(), menuState, MENU_STATE);
                }
                else
                {
                    Cwriter.drawMenu(ctx, Cgroup.getNames(), 4, MENU_STATE);
                }
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
	
	//Return
	return {
		init : init,
        setup : setup,
        update : update,
        draw : draw,
        getSelectStateEnemy : getSelectStateEnemy,
	}
}());