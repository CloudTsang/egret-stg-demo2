class AIConfig {
	protected plane:BasePlane
	/**开始射击的夹角 */
	protected startShotAngle:number
	/**和目标超过该距离时，只会直线前进 */
	protected maxDistance:number
	/**宝箱距离更近时是否优先选择宝箱为目标 */
	public driftFirst:boolean
	/**位置数据 */
	protected positionData:IPositionCalc
	/**行动判断数据 */
	protected aicfg:IAiAct
	/**
	 * 阶段0：空闲时每5秒判断一次，决定目标和移动轨迹，之后进入阶段2
	 * 阶段1：追踪目标时每1秒判断一次，判断目标是否进入射程扇形范围，是的场合进入阶段3
	 * 阶段2：每3帧判断一次，判断与目标的夹角微调，决定是否射击，是的场合进入阶段4
	 * 阶段3：每3帧判断一次，与目标夹角超出射程范围或追击时间结束时重置到阶段1，否则微调角度 
	 */
	protected _phrase:number
	/**各阶段的时间计数 */
	protected counters:(()=>number)[]
	/**时间计数 */
	protected timeCounter:number
	/**阶段最大持续时间 */
	protected phraseTime:number[]
	protected phraseTimeCounter:number

	private fps:number
	
	public constructor(p:BasePlane) {
		this.plane = p
		this.positionData = {}
		this.driftFirst = false
		this.startShotAngle = 10
		this.aicfg = {
			shot:AI_Shot.CEASE,
			rotation:AI_Rotation.STRAIGHT,
			speed:AI_Speed.NORMAL
		}
		
		const fps = egret.MainContext.instance.stage.frameRate
		this.fps = fps
		this.counters = [
			()=>{return 5 * fps}, 
			()=>{return this.phrase2Counter},
			()=>{return 3},
			//3,
		]
		this.phraseTime = [
			-1,
			10 * fps,
			10 * fps
		]
		this.phrase = 0
		this.timeCounter = 0
	}	

	public delay(t:number){
		this.timeCounter += t
	}

	public refreshAI(player:BasePlane, drifts:Drift[]):IAiAct{
		const t = this
		let aiRefreshed:IAiResult = {nextAct:false, nextPhrase:false}
		if(!t.positionData.tgt || !t.positionData.tgt.isActivated){
			t.targetCalc(player, drifts)
		}
		switch(t.phrase){ 
			case 0:
				t.timeCounter --
				if(t.timeCounter<=0){
					// console.log('refreshAI : ', t.plane)
					if(t.driftFirst){
						t.targetCalc(player, drifts)
					}
					t.resetTimeCounter()
					aiRefreshed = t.p0Test()
					// console.log("刷新移动策略 ： ", t.positionData.tgt, t.aicfg)
				}
			break
			case 1:
				t.phraseTimeCounter --
				if(t.phraseTimeCounter <= 0){
					// console.log("移动阶段结束")
					t.resetAI()
					t.phrase = 0
					return t.aicfg
				}else{	
					t.timeCounter --
					if(t.timeCounter<=0){
						t.resetTimeCounter()
						aiRefreshed = t.p1Test()		
					}

				}
				
			break
			case 2:
				t.phraseTimeCounter --
				if(t.phraseTimeCounter <= 0){
					console.log("追击阶段结束")
					t.resetAI()
					aiRefreshed.nextPhrase = true
				}else{
					t.timeCounter --
					if(t.timeCounter<=0){
						t.resetTimeCounter()
						aiRefreshed = t.p2Test()		
					}
				}
				if(aiRefreshed.nextPhrase){
					console.log(t.aicfg)
					t.phrase = t.phrase==t.counters.length-1?0:t.phrase+1
				}
				return t.aicfg
			break
		}
		if(aiRefreshed.nextPhrase){
			t.phrase = t.phrase==t.counters.length?0:t.phrase+1
			return t.aicfg
		}
		if(aiRefreshed.nextAct){
			return t.aicfg
		}
		return null
	}

	/**计算大致移动方向 */
	protected p0Test():IAiResult{
		const t = this
		let {shot, rotation, speed} = t.aicfg
		t.distanceCalc()
		t.enemyRotationCalc()
		t.angleCalc()
		t.pr1DirectionCalc()
		t.pr2LineCalc()
		t.pr3SideCalc()
		// console.log(t.positionData.pr1, t.positionData.pr2, t.positionData.pr3)
		switch(t.positionData.pr1){
			case PosRelat_Direction.SAME:
				//小于90度
				switch(t.positionData.pr2){
					case PosRelat_LINE.BEHIND:
						//玩家在敌机方向后方
						//朝外侧加速回旋
						speed = AI_Speed.FAST
						rotation = t.getRotationSide(t.positionData.pr3, "out")
					break
					case PosRelat_LINE.FRONT:
						//玩家在敌机方向前方
						//根据距离，朝内侧加/普通/减速回旋							
						speed = AI_Speed.NORMAL
						rotation = t.getRotationSide(t.positionData.pr3, "in")
					break
				} 
				
					
			break
			case PosRelat_Direction.DIFF:
				//大于90度
				switch(t.positionData.pr2){
					case PosRelat_LINE.BEHIND:
						//玩家在敌机方向后方
						//朝外侧加速回旋
						speed = AI_Speed.FAST
						rotation = t.getRotationSide(t.positionData.pr3, "out")
					break
					case PosRelat_LINE.FRONT:
						//玩家在敌机方向前方
						//朝内侧减速回旋
						speed = AI_Speed.SLOW
						rotation = t.getRotationSide(t.positionData.pr3, "in")
					break
				} 
			break
		}
		t.aicfg = {shot, rotation, speed}
		return {nextPhrase:true, nextAct:true}
	}

	/**计算目标是否进入射程 */
	protected p1Test():IAiResult{
		const t = this
		let nextPhrase = false
		let {shot, rotation, speed} = t.aicfg
		t.distanceCalc()
		t.enemyRotationCalc()
		t.pr2LineCalc()
		t.angleCalc()
		if(t.positionData.angle <= 45 
		&& t.positionData.pr2 == PosRelat_LINE.FRONT
		){
			if(t.positionData.distance <= t.plane.bulletRange ){
				t.pr3SideCalc()
				rotation = t.getRotationSide(t.positionData.pr3, "in")
				t.aicfg = {shot, rotation, speed}
				nextPhrase = true
			}else{
				// console.log("直线前进")
				t.aicfg = {shot, rotation:AI_Rotation.STRAIGHT, speed}
			}
		}
		return {
			nextPhrase, 
			nextAct:true
		}
	}

	protected p2Test():IAiResult{
		const t = this
		let {shot, rotation, speed} = t.aicfg
		let nextPhrase = false

		let reset = ()=>{
			shot=AI_Shot.CEASE,
			rotation=AI_Rotation.STRAIGHT,
			speed=AI_Speed.NORMAL
		}

		t.enemyRotationCalc()
		if(!nextPhrase){
			t.distanceCalc()
			const d1 = t.positionData.distance
			const d2 = t.plane.bulletRange
			if(d1 > d2 * 2){
				console.log("距离过远结束追击")
				reset()
				nextPhrase = true
			}else if(d1 > d2){
				speed = AI_Speed.FAST
			}else{
				speed = AI_Speed.NORMAL
			}
		}

		if(!nextPhrase){
			t.pr2LineCalc()
			if(t.positionData.pr2 != PosRelat_LINE.FRONT){
				console.log("机位超过目标结束追击")
				reset()
				nextPhrase = true
			}
		}

		if(!nextPhrase){	
			t.angleCalc()
			// console.log('t.positionData.angle : ', t.positionData.angle)
			if(t.positionData.angle > 45){
				console.log("目标超出射程角度范围结束追击")
				reset()
				nextPhrase = true
			}else if(t.positionData.angle <= t.startShotAngle) {
				// console.log("开始射击")
				shot = AI_Shot.FIRE
				speed = AI_Speed.NORMAL
				rotation = AI_Rotation.STRAIGHT
			}
			else{
				shot = AI_Shot.CEASE
			}
		}
		
		if(!nextPhrase){
			t.pr3SideCalc()
			rotation = t.getRotationSide(t.positionData.pr3, "in")
		}
		
		t.aicfg = {shot, speed, rotation}
		return {
			nextPhrase, 
			nextAct:true
		}
	}

	/**计算最接近的目标 */
	public targetCalc(player:BasePlane, drifts:Drift[]){
		const emy = this.plane
		let distance = egret.Point.distance(player.position, emy.position)
		let tgt:CollisionObject = player
		if(this.driftFirst){
			for(let d of drifts){
				const tmpd = egret.Point.distance(d.position, emy.position)
				
				if(tmpd < distance || true){
					distance = tmpd
					tgt = d
				}
			}
		}
		
		this.positionData = {
			...this.positionData,
			distance,
			tgt
		}
	}

	/**计算和目标的距离 */
	public distanceCalc(){
		const enemy = this.plane
		const tgt = this.positionData.tgt
		const distance:number = egret.Point.distance(enemy.position, tgt.position)
		this.positionData = {
			...this.positionData,
			distance
		}
	}

	/**计算目标和敌机的移动方向是否在同一侧 */
	public pr1DirectionCalc(){
		const enemy = this.plane
		const tgt = this.positionData.tgt
		const enemyRotation = this.positionData.enemyRotation
		const playerRotation:number = tgt.rotation<0?tgt.rotation+360:tgt.rotation
		let dRotation:number = Math.abs(playerRotation - enemyRotation)
		dRotation = dRotation>180?Math.abs(dRotation-360):dRotation
		const sameDirect:boolean = dRotation <= 90
		const pr1 = sameDirect?PosRelat_Direction.SAME:PosRelat_Direction.DIFF
		this.positionData = {
			...this.positionData,
			pr1, playerRotation,
		}
	}

	/**计算目标位于敌机前进方向上的前方还是后方 */
	public pr2LineCalc(){
		const enemy = this.plane
		const tgt = this.positionData.tgt
		let enemyRotation:number = this.positionData.enemyRotation

		/**垂直前进方向的斜率 */
		const k = Math.tan(enemyRotation*Math.PI/180)
		const b = enemy.y - k*enemy.x

		let pr2:PosRelat_LINE
		const y = k * tgt.x + b
		if(enemyRotation < 90 || enemyRotation > 270){
			pr2 = tgt.y < y?PosRelat_LINE.FRONT:PosRelat_LINE.BEHIND	
		}else{
			pr2 = tgt.y > y?PosRelat_LINE.FRONT:PosRelat_LINE.BEHIND
		}
		this.positionData = {
			...this.positionData,
			pr2
		}
	}

	/**计算目标位于敌机前进方向上的左侧还是右侧 */
	public pr3SideCalc(){
		const enemy = this.plane
		const tgt = this.positionData.tgt
		let enemyRotation:number = this.positionData.enemyRotation
		
		/**垂直前进方向的斜率 */
		const k = -1/Math.tan(enemyRotation*Math.PI/180)
		const b = enemy.y - k*enemy.x

		const y = k * tgt.x + b
		let pr3:PosRelat_SIDE
		if(this.positionData.angle < 5 
		// || this.positionData.distance > enemy.bulletRange * 2
		){
			//夹角小于5度时 / 距离过远时 不调整角度 
			pr3 = PosRelat_SIDE.STRAIGHT
		}else if(enemyRotation >= 0 && enemyRotation < 180){
			pr3 = tgt.y < y?PosRelat_SIDE.LEFT:PosRelat_SIDE.RIGHT
		}else{
			pr3 = tgt.y > y?PosRelat_SIDE.LEFT:PosRelat_SIDE.RIGHT	
		}
		
		this.positionData = {
			...this.positionData,
			 pr3, k, b
		}
	}

	/**计算敌机前进方向和目标方向的夹角 */
	protected angleCalc(){
		const enemy = this.plane
		const tgt = this.positionData.tgt
		let enemyRotation:number = this.positionData.enemyRotation
		const k1 = Math.tan(enemyRotation*Math.PI/180)
		const k2 = (tgt.y - enemy.y)/(tgt.x - enemy.x)
		const tan = Math.abs((k1-k2)/(1+k1*k2))
		const atan = Math.atan(tan)*180/Math.PI
		let angle = 90-atan
		this.positionData = {
			...this.positionData, angle
		}
	}

	/**处理敌机旋转角 */
	protected enemyRotationCalc(){
		const enemy = this.plane
		let enemyRotation:number = enemy.rotation<0?enemy.rotation+360:enemy.rotation
		if(Math.abs(enemy.rotation)%90==0) enemyRotation++
		this.positionData = {
			...this.positionData,
			enemyRotation
		}
	}

	protected getRotationSide(v:PosRelat_SIDE, side:"out"|"in"):AI_Rotation{
		if(v == PosRelat_SIDE.STRAIGHT){
			return AI_Rotation.STRAIGHT
		}
		if(side == "out"){
			if(v == PosRelat_SIDE.LEFT){
				return AI_Rotation.PLUS
			}
			else if(v == PosRelat_SIDE.RIGHT){
				return AI_Rotation.MINUS
			}
		}
		else if(side == 'in'){
			if(v == PosRelat_SIDE.LEFT){
				return AI_Rotation.MINUS
			}
			else if(v == PosRelat_SIDE.RIGHT){
				return AI_Rotation.PLUS
			}
		}
	}

	protected set phrase(v){
		this._phrase = v
		this.timeCounter = this.counters[v]()
		this.phraseTimeCounter = this.phraseTime[v]
	}

	protected resetTimeCounter(){
		this.timeCounter = this.counters[this._phrase]()
	}


	protected get phrase2Counter(){
		const t = this
		if(t.positionData.pr2 == PosRelat_LINE.FRONT && t.positionData.angle <=  90){
			return 3
		}
		return this.fps
	}

	protected get phrase(){
		return this._phrase
	}

	protected resetAI(){
		this.aicfg = {
			shot:AI_Shot.CEASE,
			rotation:AI_Rotation.STRAIGHT,
			speed:AI_Speed.NORMAL
		}
	}




	/**
	 * 
	 * cpu设计
	 * 
	 * 敌机每3秒刷新一次动作模式
	 * 
	 * 根据敌机和玩家的夹角：（玩家相对敌机的方向为内侧）
	 * 小于20度:
	 * 敌机在玩家方向前方：朝外侧加速回旋 
	 * 敌机在玩家方向后方：微调整进行射击
	 * 小于90度: 
	 * 敌机在玩家方向前方：朝外侧加速回旋以获得侧面或背面
	 * 敌机在玩家方向后方：根据距离，朝内侧加/普通/减速回旋以获得背面
	 * 大于90度:
	 * 敌机在玩家方向前方: 朝外侧加速回旋以获得侧面
	 * 敌机在玩家方向后方：朝内侧减速回旋以获得背面
	 */

}

interface IAiAct{
	/**是否进行射击 */
	shot:AI_Shot
	/**向哪个方向旋转 */
	rotation:AI_Rotation
	/**采取什么速度 */
	speed:AI_Speed
	/**瞄准目标设计的微调角度 */
	//adjust?:number
}

interface IAiResult{
	/**是否进入下一阶段 */
	nextPhrase:boolean
	/**是否更新ai行为 */
	nextAct:boolean
}

interface IPositionCalc {
	tgt?:CollisionObject
	/**玩家方向 */
	playerRotation?:number
	/**敌机方向 */
	enemyRotation?:number
	/**敌机和玩家的距离 */
	distance?:number
	/**位置关系 ：前进方向（是否大于90度） */
	pr1?:PosRelat_Direction
	/**位置关系 ：在前进方向上的前方或后方 */
	pr2?:PosRelat_LINE
	/**位置关系 ：在前进方向上的左侧或右侧 */
	pr3?:PosRelat_SIDE
	/**前进方向直线函数的k值 */
	k?:number
	/**前进方向直线函数的b值 */
	b?:number
	/**前进方向和目标方向的夹角 */
	angle?:number

} 

enum AI_Shot{
	FIRE,  CEASE
}

enum AI_Rotation{
	PLUS, STRAIGHT, MINUS
}

enum AI_Speed{
	FAST, NORMAL, SLOW
}

/**位置关系 ：前进方向（是否大于90度） */
enum PosRelat_Direction{
	SAME, DIFF
}

/**位置关系 ：在前进方向上的前方或后方 */
enum PosRelat_LINE{
	FRONT, BEHIND
}

/**位置关系 ：在前进方向上的左侧或右侧或重叠 */
enum PosRelat_SIDE{
	/**rotation - */
	LEFT, 
	/**rotation + */
	RIGHT,
	STRAIGHT
}



