class BaseCharacter extends CollisionObject{
	public maxHP:number = 1
	public HP:number
	
	protected _stage = egret.MainContext.instance.stage;        
	
	public constructor() {
		super();
		this.HP = this.maxHP;		
	}

	public hit(b:IWeapon){		
		this.HP -= b.planeDamage;	
		return true
	}

	public hit2(d:number){
		this.HP -= d
		return true
	}

	public isDefeated(){
		return this.HP <= 0;
	}

}