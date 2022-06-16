interface IController {
	 setPanel(cp:ControlPanel)
	 setDirect(x:-1|0|1, y:-1|0|1)
	 setControllee(p:BasePlane, bg:BgLayer)
	 setLock(v:boolean)
	 btnTrigger(e?:any)
}