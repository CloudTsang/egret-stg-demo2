class PlaneDisp extends eui.Component{
	private curSpin:number
	
	/**
	 * @param type 机体类型 0：玩家 1：杂兵,2:强力杂兵,  3：精英
	 */
	public constructor(type:number) {
		super()
		switch(type){
			case 0:
			this.skinName = 'resource/eui_skins/playerPlane.exml'
			break
			case 1:
			this.skinName = 'resource/eui_skins/enemyPlane.exml'
			break
			case 2:
			this.skinName = 'resource/eui_skins/elitePlane.exml'
			break
			case 3:
			this.skinName = 'resource/eui_skins/extremeplane.exml'
			break

		}
		
	}

	public setSpinState(spin:number){
		if(spin == this.curSpin) return 
		this.curSpin = spin
		switch(spin){
			case -1:
			this.currentState = 'lspin'
			break
			case 0:
			this.currentState = 'normal'
			break
			case 1:
			this.currentState = 'rspin'
			break
		}
	}

}