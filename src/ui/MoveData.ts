/**位移数据处理 */
class MoveData {
	protected data:IMoveObj
	private _dx:number
	private _dy:number
	public constructor() {
		this.data = {deg:undefined, rad:undefined, spd:undefined, sin:undefined, cos:undefined}
		this._dx = 0
		this._dy = 0
	}

	public get speed(){
		return this.data.spd
	}
	
	public get sin(){
		return this.data.sin
	}

	public get cos(){
		return this.data.cos
	}

	public setData(deg:number, spd:number){
		let data = this.data
		if(data.deg == deg && data.spd == spd){
			//运动状态无需重新计算
			return
		}

		if(data.deg != deg){
			const rad = deg * Math.PI / 180
			const sin = Math.sin(rad)
			const cos = Math.cos(rad)
			data = {
				...data,
				deg, rad, sin, cos
			}
		}

		this._dx = spd * data.sin
		this._dy = spd * data.cos
		data = {
			...data, spd
		}
		this.data = data
	}

	public getDAxis():{dx:number, dy:number}{
		return {
			dx: this._dx,
			dy: -this._dy
		}
	}
}

interface IMoveObj{
	deg:number
	rad:number
	spd:number
	sin:number
	cos:number	
}