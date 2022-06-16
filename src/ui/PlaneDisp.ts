class PlaneDisp extends eui.Component{
	private curSpin:-1|0|1
	
	/**
	 * @param type 机体类型 0：玩家 1：杂兵 2：精英
	 */
	public constructor(type:0|1|2) {
		super()
		switch(type){
			case 0:
			this.skinName = 'resource/eui_skins/playerPlane.exml'
			break
			case 1:
			this.skinName = 'resource/eui_skins/enemyPlane.exml'
			break
			case 2:
			this.skinName = 'resource/eui_skins/extremeplane.exml'
			break

		}
		
	}

	public setSpinState(spin:-1|0|1){
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