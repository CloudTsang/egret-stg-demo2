class PlayEvents{
    public static readonly BUFF_GAIN = 'BUFF_GAIN';
    public static readonly BUFF_LOSE = 'BUFF_LOSE';
    public static readonly PLAYER_SHOT = 'PLAYER_SHOT';
    public static readonly RECYCLEABLE = 'RECYCLEABLE';       
    
    public static readonly DRIFT_MISS = 'DRIFT_MISS';
    public static readonly DRIFT_BREAK = 'DRIFT_BREAK';
    public static readonly DRIFT_GET = 'DRIFT_GET';

    public static readonly START = 'START';
    public static readonly RETRY = 'RETRY';
    public static readonly CLEAR = 'CLEAR';
    public static readonly GAME_OVER = 'GAME_OVER';
    public static readonly RANK_UP = 'RANK_UP'

    public static readonly OVER_BORDER = 'OVER_BORDER';
    public static readonly CLOSE_DESCRIPT = 'CLOSE_DESCRIPT';
}

enum AIType{
    ROOKIE,
    NORMAL,
    ELITE,
    EXTREME,
}

enum AIActType{
    /** 轻微躲避*/
    SLIGHT_AVOID,
    /** 普通躲避*/
    AVOID,
    /** 冲刺躲避*/
    DASH_AVOID,
    /** 追击*/
    TRACE,
    /** 冲刺追击 */
    DASH_TRACE,
    /** 获取buff*/
    GETBUFF,
    /** 空闲*/
    SPARE,
    /** 冲撞*/
    IMPACT,
    /** 制造弹幕 */
    BARRAGE,
}


enum BuffType{
    /**子弹强化-变大 */
	BULLET_BOOST_BIG,
    /**子弹强化-三方向 */
	BULLET_BOOST_3DIRECT,
    /**子弹强化-五方向*/ 
	BULLET_BOOST_5DIRECT,
    /**子弹强化-增加两个方向 */
    BULLECT_BOOST_PLUS2DIRECT,
    /**护罩 */
	BARRIER,
    /**子机 */
	SUB_PLANE,
    /**无限冲刺*/ 
    INF_DASH, 
    /**冲刺无敌 */
    DASH_INVINS, 
}

class Keyboard{
    public static readonly LEFT = 37;
    public static readonly UP = 38;
    public static readonly RIGHT = 39;
    public static readonly DOWN = 40;
    public static readonly Z = 90;
    public static readonly X = 88;
    public static readonly C = 67;
}