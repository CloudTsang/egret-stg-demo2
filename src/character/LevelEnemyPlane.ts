class LevelEnemyPlane extends EnemyPlane{
	private _drift:boolean
	public constructor(lv:number, pw:number = 30, ph:number = 50, apear:0|90|180|270=180) {
		const lvData = LevelData.instance
		super(pw, ph, apear, lvData.curTextureType)

		this.maxHP = lvData.curHP
		this.HP = lvData.curHP
		this.gears = lvData.curMoveSpd
		this.shotSpeed = lvData.curShotSpd;
		this.shotTimer.delay = this.shotSpeed	
		this._score = lvData.curScore
		this._drift = lvData.curDriftFirst
	}

	public boot(){
       super.boot()
	//    this.aiCfg.driftFirst = this._drift
    }

	public setBuff(ty:BuffType, duration:number){
        super.setBuff(ty, duration)
		// if(this.buffManager.buffNum >= 1){
		// 	this.aiCfg.driftFirst = false
		// }
    }

    public loseBuff(ty:BuffType){
		super.loseBuff(ty)
        // if(this.buffManager.buffNum <= 0){
		// 	this.aiCfg.driftFirst = true
		// }
    }
}

class LevelData{
	private readonly lvData:StatData = {
		base:1, max:20, step:1, span:1
	}
	private readonly hpData:StatData = {
		base:3, max:13, step:1, span:2
	}
	private readonly shotSpdData:StatData = {
		base:750, max:250, step:25, span:1
	}
	private readonly moveSpdData:StatData2 = {
		base:[2,6,12], max:[10, 18, 28], step:[1, 1, 1], span:[2,1,1]
	}
	private readonly typeData:StatData = {
		base:1, max:3, step:1, span:5
	}
	private readonly scoreData:StatData = {
		base: 100, max:5000, step:245, span:1
	}

	private _curLv:number
	private _curHP:number
	private _curShotSpd:number
	private _curMoveSpd:number[]
	private _curTextureType:number
	private _curDriftFirst:boolean
	private _curScore:number

	private _hpSpan:number
	private _shotSpdSpan:number
	private _moveSpdSPan:number[]

	public constructor(){
		this.init()
	}

	public init(){
		const t = this
		t._curLv = 0
		t._curHP = t.hpData.base
		t._curShotSpd = t.shotSpdData.base
		t._curMoveSpd = t.moveSpdData.base
		t._curTextureType = t.typeData.base
		t._curScore = t.scoreData.base
		t._curDriftFirst = false

		t._hpSpan = 0
		t._shotSpdSpan = 0
		t._moveSpdSPan = [0,0,0]
		
	}

	public levelUp(){
		const t = this
		if(t._curLv == t.lvData.max) return
		t._curLv ++
		if(t._curLv == 1) return
		t.hpHandle()
		t.shotSpdHandle()
		t.moveSpdHandle()
		
		if(t._curLv > 10) t._curDriftFirst = true

		if(t._curLv == 5) t._curTextureType = 2
		else if(t._curLv == 10) t._curTextureType = 3

		if(t._curLv < 5){
			t._curScore += 100
		}else if(t._curLv < 10){
			t._curScore += 500
		}else{
			t._curScore += 1000
		}

		console.log("levelUp : ", t._curMoveSpd, t._curShotSpd)
	}

	private hpHandle(){
		const t = this
		const data = t.hpData
		t._hpSpan ++
		if(t._hpSpan == data.span && t._curHP < data.max){
			t._hpSpan = 0
			t._curHP += data.step
		}
	}

	private shotSpdHandle(){
		const t = this
		const data = t.shotSpdData
		t._shotSpdSpan ++
		if(t._shotSpdSpan == data.span && t._curShotSpd > data.max){
			t._shotSpdSpan = 0
			t._curShotSpd -= data.step
		}
	}

	private moveSpdHandle(){
		const t = this
		const data = t.moveSpdData
		for(let i=0; i<3; i++){
			t._moveSpdSPan[i] ++
			if(t._moveSpdSPan[i] == data.span[i] && t._curMoveSpd[i] < data.max[i]){
				t._moveSpdSPan[i] = 0
				t._curMoveSpd[i] += data.step[i]
			}
		}
	}


	public get curLv(){
		return this._curLv
	}

	public get curHP(){
		return this._curHP
	}

	public get curShotSpd(){
		return this._curShotSpd
	}

	public get curMoveSpd(){
		return this._curMoveSpd
	}

	public get curTextureType(){
		return this._curTextureType
	}

	public get curDriftFirst(){
		return this._curDriftFirst
	}

	public get curScore(){
		return this._curScore
	}

	private static _ins:LevelData
	public static get instance(){
		if(!LevelData._ins) LevelData._ins = new LevelData()
		return LevelData._ins
	}

}

/**等级数据 */
interface StatData{
	/**基础值 */
	base:number,
	/**最大值 */
	max:number,
	/**增长步长 */
	step:number,
	/**增长间隔 */
	span:number,
}


/**等级数据 */
interface StatData2{
	/**基础值 */
	base:number[],
	/**最大值 */
	max:number[],
	/**增长步长 */
	step:number[]
	/**增长间隔 */
	span:number[],
}
