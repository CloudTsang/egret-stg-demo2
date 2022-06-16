class Pool<T extends IPoolObject> {
	private _arr:T[]
	private _func:()=>T;
	public constructor(func:()=>T){
		this._arr = []
		this._func = func;
	}	

	public getOne():T{
		let ret:T = null;
		for(let obj of this._arr){
			if(!obj.activate){
				ret = obj;
				break;
			}
		}
		if(!ret){
			ret = this._func();
			this._arr.push(ret);
		}
		ret.activate = true;
		return ret;
	}

	private recycle(e:egret.Event=null){
		let obj:T = e.target;
		obj.activate = false;
	}

	public dispose(){
		this._arr = null;
		this._func = null;		
	}
}

interface IPoolObject extends egret.IEventDispatcher{
	activate:boolean;	
}

