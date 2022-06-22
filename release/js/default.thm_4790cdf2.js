window.skins=window.skins||{};
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml"};generateEUI.paths['resource/eui_skins/BtnBullet.exml'] = window.skins.BtnBullet = (function (_super) {
	__extends(BtnBullet, _super);
	function BtnBullet() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 200;
		this.width = 200;
		this.elementsContent = [];
		this._Rect1_i();
		
		this._Rect2_i();
		
		this._Image1_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Rect1","",0,""),
					new eui.AddItems("_Image1","",1,"")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Rect2","",1,""),
					new eui.AddItems("_Image1","",1,"")
				])
		];
	}
	var _proto = BtnBullet.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		this._Rect1 = t;
		t.ellipseHeight = 200;
		t.ellipseWidth = 200;
		t.fillAlpha = 0.3;
		t.fillColor = 0xAEABAB;
		t.height = 200;
		t.width = 200;
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		this._Rect2 = t;
		t.ellipseHeight = 200;
		t.ellipseWidth = 200;
		t.fillAlpha = 0.8;
		t.fillColor = 0x515050;
		t.height = 200;
		t.width = 200;
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.source = "sheet_json#btn_bullet";
		return t;
	};
	return BtnBullet;
})(eui.Skin);generateEUI.paths['resource/eui_skins/BtnJet.exml'] = window.skins.BtnJet = (function (_super) {
	__extends(BtnJet, _super);
	function BtnJet() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 100;
		this.width = 100;
		this.elementsContent = [this._Image1_i()];
		this._Rect1_i();
		
		this._Rect2_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Rect1","",0,""),
					new eui.SetProperty("","width",200),
					new eui.SetProperty("","height",200)
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Rect2","",2,"_Image1"),
					new eui.SetProperty("","width",200),
					new eui.SetProperty("","height",200)
				])
		];
	}
	var _proto = BtnJet.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		this._Rect1 = t;
		t.ellipseHeight = 200;
		t.ellipseWidth = 200;
		t.fillAlpha = 0.3;
		t.fillColor = 0xAEABAB;
		t.height = 200;
		t.width = 200;
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		this._Rect2 = t;
		t.ellipseHeight = 200;
		t.ellipseWidth = 200;
		t.fillAlpha = 0.8;
		t.fillColor = 0x515050;
		t.height = 200;
		t.width = 200;
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.source = "sheet_json#barrier";
		return t;
	};
	return BtnJet;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ControlPanel.exml'] = window.skins.ControlPanel = (function (_super) {
	__extends(ControlPanel, _super);
	function ControlPanel() {
		_super.call(this);
		this.skinParts = ["btn_barrier","btn_shot","leftup","up","rightup","left","right","leftdown","down","rightdown","analog","barrier_gauge","hp_gauge"];
		
		this.height = 400;
		this.width = 800;
		this.elementsContent = [this.btn_barrier_i(),this.btn_shot_i(),this.analog_i(),this.barrier_gauge_i(),this.hp_gauge_i()];
	}
	var _proto = ControlPanel.prototype;

	_proto.btn_barrier_i = function () {
		var t = new eui.Button();
		this.btn_barrier = t;
		t.label = "Button";
		t.skinName = "skins.BtnJet";
		t.x = 601;
		t.y = -26;
		return t;
	};
	_proto.btn_shot_i = function () {
		var t = new eui.Button();
		this.btn_shot = t;
		t.label = "Button";
		t.skinName = "skins.BtnBullet";
		t.x = 601;
		t.y = 203;
		return t;
	};
	_proto.analog_i = function () {
		var t = new eui.Group();
		this.analog = t;
		t.anchorOffsetX = 200;
		t.anchorOffsetY = 200;
		t.height = 400;
		t.width = 400;
		t.x = 200;
		t.y = 200;
		t.elementsContent = [this._Image1_i(),this._Group4_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 300;
		t.horizontalCenter = 0;
		t.source = "sheet_json#analog";
		t.verticalCenter = 0;
		t.width = 300;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.height = 400;
		t.width = 400;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this._Group3_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 133;
		t.width = 400;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.leftup_i(),this.up_i(),this.rightup_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	_proto.leftup_i = function () {
		var t = new eui.Rect();
		this.leftup = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.name = "leftup";
		t.width = 133;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.up_i = function () {
		var t = new eui.Rect();
		this.up = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.name = "up";
		t.width = 133;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.rightup_i = function () {
		var t = new eui.Rect();
		this.rightup = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.name = "rightup";
		t.width = 133;
		t.x = 20;
		t.y = 20;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 133;
		t.width = 400;
		t.x = 10;
		t.y = 10;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this.left_i(),this._Rect1_i(),this.right_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	_proto.left_i = function () {
		var t = new eui.Rect();
		this.left = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.name = "left";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 133;
		t.x = 0;
		t.y = 133;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0;
		t.height = 133;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 133;
		t.x = 10;
		t.y = 143;
		return t;
	};
	_proto.right_i = function () {
		var t = new eui.Rect();
		this.right = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.name = "right";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 133;
		t.x = 20;
		t.y = 153;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 133;
		t.width = 400;
		t.x = 20;
		t.y = 20;
		t.layout = this._HorizontalLayout3_i();
		t.elementsContent = [this.leftdown_i(),this.down_i(),this.rightdown_i()];
		return t;
	};
	_proto._HorizontalLayout3_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	_proto.leftdown_i = function () {
		var t = new eui.Rect();
		this.leftdown = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.name = "leftdown";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 133;
		t.x = 0;
		t.y = 133;
		return t;
	};
	_proto.down_i = function () {
		var t = new eui.Rect();
		this.down = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.name = "down";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 133;
		t.x = 10;
		t.y = 143;
		return t;
	};
	_proto.rightdown_i = function () {
		var t = new eui.Rect();
		this.rightdown = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.name = "rightdown";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 133;
		t.x = 20;
		t.y = 153;
		return t;
	};
	_proto.barrier_gauge_i = function () {
		var t = new BarrierGauge();
		this.barrier_gauge = t;
		t.height = 30;
		t.width = 200;
		t.x = 601;
		t.y = -83;
		return t;
	};
	_proto.hp_gauge_i = function () {
		var t = new HPGauge();
		this.hp_gauge = t;
		t.height = 30;
		t.width = 200;
		t.x = 601;
		t.y = -134;
		return t;
	};
	return ControlPanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Description.1.exml'] = window.DescriptionMobile = (function (_super) {
	__extends(DescriptionMobile, _super);
	function DescriptionMobile() {
		_super.call(this);
		this.skinParts = ["decript_group"];
		
		this.height = 800;
		this.width = 600;
		this.elementsContent = [this.decript_group_i()];
	}
	var _proto = DescriptionMobile.prototype;

	_proto.decript_group_i = function () {
		var t = new eui.Group();
		this.decript_group = t;
		t.height = 800;
		t.width = 600;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.4;
		t.height = 800;
		t.width = 600;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return DescriptionMobile;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Description.exml'] = window.Description = (function (_super) {
	__extends(Description, _super);
	function Description() {
		_super.call(this);
		this.skinParts = ["btn_next"];
		
		this.height = 800;
		this.width = 600;
		this.elementsContent = [this._Rect1_i(),this.btn_next_i()];
		this._Group4_i();
		
		this._Group12_i();
		
		this._Group23_i();
		
		this._Group32_i();
		
		this._Group38_i();
		
		this.states = [
			new eui.State ("p0",
				[
					new eui.AddItems("_Group4","",2,"btn_next")
				])
			,
			new eui.State ("p1",
				[
					new eui.AddItems("_Group38","",2,"btn_next")
				])
			,
			new eui.State ("p4",
				[
					new eui.AddItems("_Group12","",2,"btn_next"),
					new eui.SetProperty("btn_next","label","✖")
				])
			,
			new eui.State ("p3",
				[
					new eui.AddItems("_Group23","",2,"btn_next")
				])
			,
			new eui.State ("p2",
				[
					new eui.AddItems("_Group32","",2,"btn_next")
				])
		];
	}
	var _proto = Description.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.4;
		t.height = 800;
		t.width = 600;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		this._Group4 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group1_i(),this._Image1_i(),this._Group2_i(),this._Label1_i(),this._Group3_i(),this._Label2_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 30;
		t.width = 0;
		t.x = 138;
		t.y = 275;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 240;
		t.source = "sheet_json#plane1";
		t.width = 200;
		t.x = 185;
		t.y = 235;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 30;
		t.width = 0;
		t.x = 294;
		t.y = 277;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 60;
		t.text = "游戏目标";
		t.x = 365;
		t.y = 340;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 30;
		t.width = 0;
		t.x = 246;
		t.y = 381;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.multiline = true;
		t.percentWidth = 90;
		t.size = 45;
		t.text = "驾驶战机躲避或防御敌机的子弹并击落尽可能多的敌机以获取更高的分数。注意拾取宝箱道具来获得强化。";
		t.wordWrap = true;
		t.x = 292;
		t.y = 498;
		return t;
	};
	_proto._Group12_i = function () {
		var t = new eui.Group();
		this._Group12 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout2_i();
		t.elementsContent = [this._Group5_i(),this._Group6_i(),this._Group7_i(),this._Label3_i(),this._Group8_i(),this._Label4_i(),this._Group9_i(),this._Group11_i()];
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.height = 30;
		t.x = 362;
		t.y = 351;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.height = 200;
		t.percentWidth = 100;
		t.x = 133;
		t.y = 244;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image2_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 200;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "sheet_json#radar";
		t.top = 0;
		t.width = 200;
		t.x = 0;
		t.y = 206;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.height = 30;
		t.width = 0;
		t.x = 228;
		t.y = 276;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.size = 60;
		t.text = "雷达";
		t.x = 365;
		t.y = 340;
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.height = 30;
		t.width = 0;
		t.x = 246;
		t.y = 381;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.multiline = true;
		t.percentWidth = 90;
		t.size = 45;
		t.text = "显示一定范围内的敌机和宝箱的方向。";
		t.wordWrap = true;
		t.x = 292;
		t.y = 498;
		return t;
	};
	_proto._Group9_i = function () {
		var t = new eui.Group();
		t.height = 30;
		t.width = 0;
		t.x = 240;
		t.y = 590;
		return t;
	};
	_proto._Group11_i = function () {
		var t = new eui.Group();
		t.height = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this._Label5_i(),this._Rect2_i(),this._Group10_i(),this._Label6_i(),this._Rect3_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.size = 50;
		t.text = "敌机标记";
		t.x = 191;
		t.y = 33;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.ellipseHeight = 100;
		t.ellipseWidth = 100;
		t.fillColor = 0xFF4500;
		t.height = 35;
		t.width = 35;
		t.x = 229;
		t.y = 55;
		return t;
	};
	_proto._Group10_i = function () {
		var t = new eui.Group();
		t.height = 0;
		t.width = 30;
		t.x = 462;
		t.y = 44;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		t.size = 50;
		t.text = "宝箱标记";
		t.x = 191;
		t.y = 33;
		return t;
	};
	_proto._Rect3_i = function () {
		var t = new eui.Rect();
		t.ellipseHeight = 100;
		t.ellipseWidth = 100;
		t.fillColor = 0xFFD700;
		t.height = 35;
		t.width = 35;
		t.x = 229;
		t.y = 55;
		return t;
	};
	_proto._Group23_i = function () {
		var t = new eui.Group();
		this._Group23 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout4_i();
		t.elementsContent = [this._Group13_i(),this._Group15_i(),this._Group16_i(),this._Label8_i(),this._Group17_i(),this._Label9_i(),this._Group18_i(),this._Group22_i()];
		return t;
	};
	_proto._VerticalLayout4_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	_proto._Group13_i = function () {
		var t = new eui.Group();
		t.height = 30;
		t.x = 362;
		t.y = 351;
		return t;
	};
	_proto._Group15_i = function () {
		var t = new eui.Group();
		t.height = 160;
		t.percentWidth = 100;
		t.x = 133;
		t.y = 244;
		t.layout = this._HorizontalLayout3_i();
		t.elementsContent = [this._Image3_i(),this._Group14_i(),this._Label7_i()];
		return t;
	};
	_proto._HorizontalLayout3_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 160;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "sheet_json#barrier";
		t.top = 0;
		t.width = 160;
		t.x = 0;
		t.y = 206;
		return t;
	};
	_proto._Group14_i = function () {
		var t = new eui.Group();
		t.height = 0;
		t.width = 100;
		t.x = 399;
		t.y = 77;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		t.size = 60;
		t.text = "X键";
		t.x = 558;
		t.y = 90;
		return t;
	};
	_proto._Group16_i = function () {
		var t = new eui.Group();
		t.height = 20;
		t.width = 0;
		t.x = 228;
		t.y = 276;
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		t.size = 50;
		t.text = "开启/关闭护盾";
		t.x = 365;
		t.y = 340;
		return t;
	};
	_proto._Group17_i = function () {
		var t = new eui.Group();
		t.height = 20;
		t.width = 0;
		t.x = 246;
		t.y = 381;
		return t;
	};
	_proto._Label9_i = function () {
		var t = new eui.Label();
		t.multiline = true;
		t.percentWidth = 90;
		t.size = 38;
		t.text = "开启护盾后，护盾耐久将缓慢降低，被敌机子弹击中时降低一定值但减免对机体的伤害。护盾可随时手动关闭或在耐久降至0时自动解除。拾取特定强化道具可以使护盾耐久回复满并一定时间内不会降低。";
		t.wordWrap = true;
		t.x = 292;
		t.y = 498;
		return t;
	};
	_proto._Group18_i = function () {
		var t = new eui.Group();
		t.height = 20;
		t.width = 0;
		t.x = 240;
		t.y = 590;
		return t;
	};
	_proto._Group22_i = function () {
		var t = new eui.Group();
		t.height = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout4_i();
		t.elementsContent = [this._Group19_i(),this._Group20_i(),this._Group21_i()];
		return t;
	};
	_proto._HorizontalLayout4_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Group19_i = function () {
		var t = new eui.Group();
		t.height = 100;
		t.width = 100;
		t.x = 431;
		t.y = 10;
		t.elementsContent = [this._Image4_i(),this._Label10_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.source = "sheet_json#buff";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label10_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.size = 80;
		t.text = "★";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group20_i = function () {
		var t = new eui.Group();
		t.height = 0;
		t.width = 30;
		t.x = 469;
		t.y = 42;
		return t;
	};
	_proto._Group21_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.width = 200;
		t.x = 518;
		t.y = 29;
		t.layout = this._VerticalLayout3_i();
		t.elementsContent = [this._Label11_i(),this._ProgressBar1_i()];
		return t;
	};
	_proto._VerticalLayout3_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label11_i = function () {
		var t = new eui.Label();
		t.size = 34;
		t.text = "护盾耐久槽";
		t.x = 95;
		t.y = 10;
		return t;
	};
	_proto._ProgressBar1_i = function () {
		var t = new eui.ProgressBar();
		t.height = 30;
		t.scaleX = 1;
		t.scaleY = 1;
		t.value = 75;
		t.width = 200;
		t.x = -206;
		t.y = 35.000000000000114;
		return t;
	};
	_proto._Group32_i = function () {
		var t = new eui.Group();
		this._Group32 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout5_i();
		t.elementsContent = [this._Group24_i(),this._Group26_i(),this._Group27_i(),this._Label13_i(),this._Group28_i(),this._Label14_i(),this._Group29_i(),this._Group31_i()];
		return t;
	};
	_proto._VerticalLayout5_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	_proto._Group24_i = function () {
		var t = new eui.Group();
		t.height = 30;
		t.x = 362;
		t.y = 351;
		return t;
	};
	_proto._Group26_i = function () {
		var t = new eui.Group();
		t.height = 200;
		t.percentWidth = 100;
		t.x = 133;
		t.y = 244;
		t.layout = this._HorizontalLayout5_i();
		t.elementsContent = [this._Image5_i(),this._Group25_i(),this._Label12_i()];
		return t;
	};
	_proto._HorizontalLayout5_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 200;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "sheet_json#btn_bullet";
		t.top = 0;
		t.width = 200;
		t.x = 0;
		t.y = 206;
		return t;
	};
	_proto._Group25_i = function () {
		var t = new eui.Group();
		t.height = 0;
		t.width = 100;
		t.x = 399;
		t.y = 77;
		return t;
	};
	_proto._Label12_i = function () {
		var t = new eui.Label();
		t.size = 60;
		t.text = "Z键";
		t.x = 558;
		t.y = 90;
		return t;
	};
	_proto._Group27_i = function () {
		var t = new eui.Group();
		t.height = 30;
		t.width = 0;
		t.x = 228;
		t.y = 276;
		return t;
	};
	_proto._Label13_i = function () {
		var t = new eui.Label();
		t.size = 60;
		t.text = "射击";
		t.x = 365;
		t.y = 340;
		return t;
	};
	_proto._Group28_i = function () {
		var t = new eui.Group();
		t.height = 30;
		t.width = 0;
		t.x = 246;
		t.y = 381;
		return t;
	};
	_proto._Label14_i = function () {
		var t = new eui.Label();
		t.multiline = true;
		t.percentWidth = 90;
		t.size = 45;
		t.text = "发射子弹击破敌机获得分数，或击破宝箱并拾取道具，可以获得子弹威力增强或同时多方向发射等效果。";
		t.wordWrap = true;
		t.x = 292;
		t.y = 498;
		return t;
	};
	_proto._Group29_i = function () {
		var t = new eui.Group();
		t.height = 30;
		t.width = 0;
		t.x = 240;
		t.y = 590;
		return t;
	};
	_proto._Group31_i = function () {
		var t = new eui.Group();
		t.height = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout6_i();
		t.elementsContent = [this._Image6_i(),this._Label15_i(),this._Group30_i()];
		return t;
	};
	_proto._HorizontalLayout6_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 100;
		t.source = "sheet_json#drift";
		t.width = 100;
		t.x = 160;
		t.y = 37;
		return t;
	};
	_proto._Label15_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 50;
		t.text = "→";
		t.x = 401;
		t.y = 56;
		return t;
	};
	_proto._Group30_i = function () {
		var t = new eui.Group();
		t.height = 100;
		t.width = 100;
		t.x = 431;
		t.y = 10;
		t.elementsContent = [this._Image7_i(),this._Label16_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.source = "sheet_json#buff";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label16_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.size = 80;
		t.text = "B";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group38_i = function () {
		var t = new eui.Group();
		this._Group38 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout6_i();
		t.elementsContent = [this._Group33_i(),this._Group35_i(),this._Group36_i(),this._Label18_i(),this._Group37_i(),this._Label19_i()];
		return t;
	};
	_proto._VerticalLayout6_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	_proto._Group33_i = function () {
		var t = new eui.Group();
		t.height = 30;
		t.x = 362;
		t.y = 351;
		return t;
	};
	_proto._Group35_i = function () {
		var t = new eui.Group();
		t.height = 200;
		t.percentWidth = 100;
		t.x = 133;
		t.y = 244;
		t.layout = this._HorizontalLayout7_i();
		t.elementsContent = [this._Image8_i(),this._Group34_i(),this._Label17_i()];
		return t;
	};
	_proto._HorizontalLayout7_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.height = 200;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "sheet_json#analog";
		t.top = 0;
		t.width = 200;
		t.x = 0;
		t.y = 206;
		return t;
	};
	_proto._Group34_i = function () {
		var t = new eui.Group();
		t.height = 0;
		t.width = 100;
		t.x = 399;
		t.y = 77;
		return t;
	};
	_proto._Label17_i = function () {
		var t = new eui.Label();
		t.size = 60;
		t.text = "方向键";
		t.x = 558;
		t.y = 90;
		return t;
	};
	_proto._Group36_i = function () {
		var t = new eui.Group();
		t.height = 30;
		t.width = 0;
		t.x = 228;
		t.y = 276;
		return t;
	};
	_proto._Label18_i = function () {
		var t = new eui.Label();
		t.size = 60;
		t.text = "控制机体移动";
		t.x = 365;
		t.y = 340;
		return t;
	};
	_proto._Group37_i = function () {
		var t = new eui.Group();
		t.height = 30;
		t.width = 0;
		t.x = 246;
		t.y = 381;
		return t;
	};
	_proto._Label19_i = function () {
		var t = new eui.Label();
		t.multiline = true;
		t.percentWidth = 90;
		t.size = 45;
		t.text = "虚拟摇杆朝斜上/下方（只有单层边框的方向）滑动时，或方向键同时按下左/右和上/下键时，机体将进行加/减速左/右回旋。否则仅加/减速或保持普通速度左/右回旋。";
		t.wordWrap = true;
		t.x = 292;
		t.y = 498;
		return t;
	};
	_proto.btn_next_i = function () {
		var t = new eui.Button();
		this.btn_next = t;
		t.bottom = 20;
		t.height = 50;
		t.horizontalCenter = 0;
		t.label = "▶";
		t.touchChildren = true;
		t.width = 120;
		return t;
	};
	return Description;
})(eui.Skin);generateEUI.paths['resource/eui_skins/elitePlane.exml'] = window.skins.elitePlane = (function (_super) {
	__extends(elitePlane, _super);
	function elitePlane() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 510;
		this.width = 405;
		this.elementsContent = [this._Image1_i()];
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("rspin",
				[
					new eui.SetProperty("_Image1","source","plane_json#plane5spin")
				])
			,
			new eui.State ("lspin",
				[
					new eui.SetProperty("_Image1","source","plane_json#plane5spin2")
				])
		];
	}
	var _proto = elitePlane.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.source = "plane_json#plane5";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return elitePlane;
})(eui.Skin);generateEUI.paths['resource/eui_skins/enemyPlane.exml'] = window.skins.enemyPlane = (function (_super) {
	__extends(enemyPlane, _super);
	function enemyPlane() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 510;
		this.width = 405;
		this.elementsContent = [this._Image1_i()];
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("rspin",
				[
					new eui.SetProperty("_Image1","source","plane_json#plane4spin")
				])
			,
			new eui.State ("lspin",
				[
					new eui.SetProperty("_Image1","source","plane_json#plane4spin2")
				])
		];
	}
	var _proto = enemyPlane.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.source = "plane_json#plane4";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return enemyPlane;
})(eui.Skin);generateEUI.paths['resource/eui_skins/extremeplane.exml'] = window.skins.extremePlane = (function (_super) {
	__extends(extremePlane, _super);
	function extremePlane() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 510;
		this.width = 405;
		this.elementsContent = [this._Image1_i()];
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("rspin",
				[
					new eui.SetProperty("_Image1","source","plane_json#plane3spin")
				])
			,
			new eui.State ("lspin",
				[
					new eui.SetProperty("_Image1","source","plane_json#plane3spin2")
				])
		];
	}
	var _proto = extremePlane.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.source = "plane_json#plane3";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return extremePlane;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameResult.exml'] = window.skins.GameResult = (function (_super) {
	__extends(GameResult, _super);
	function GameResult() {
		_super.call(this);
		this.skinParts = ["txt_type","txt_hit_type","txt_time","txt_bullet","txt_hit","txt_defeat","btn_retry"];
		
		this.height = 800;
		this.width = 600;
		this.elementsContent = [this._Rect1_i(),this.txt_type_i(),this._Group1_i(),this.btn_retry_i()];
	}
	var _proto = GameResult.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.5;
		t.height = 800;
		t.width = 600;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.txt_type_i = function () {
		var t = new eui.Label();
		this.txt_type = t;
		t.size = 80;
		t.text = "游戏结束";
		t.textAlign = "center";
		t.width = 425.438;
		t.x = 87.281;
		t.y = 62.336;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 465;
		t.width = 600;
		t.x = 0;
		t.y = 177.76;
		t.elementsContent = [this._Label1_i(),this._Label2_i(),this.txt_hit_type_i(),this.txt_time_i(),this.txt_bullet_i(),this.txt_hit_i(),this._Label3_i(),this.txt_defeat_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.text = "游戏时长：";
		t.x = 60;
		t.y = 89;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.text = "消耗弹药：";
		t.x = 60;
		t.y = 192.24;
		return t;
	};
	_proto.txt_hit_type_i = function () {
		var t = new eui.Label();
		this.txt_hit_type = t;
		t.text = "被击中次数：";
		t.x = 55.055;
		t.y = 291;
		return t;
	};
	_proto.txt_time_i = function () {
		var t = new eui.Label();
		this.txt_time = t;
		t.x = 241.659;
		t.y = 89;
		return t;
	};
	_proto.txt_bullet_i = function () {
		var t = new eui.Label();
		this.txt_bullet = t;
		t.x = 241.659;
		t.y = 192.24;
		return t;
	};
	_proto.txt_hit_i = function () {
		var t = new eui.Label();
		this.txt_hit = t;
		t.x = 241.659;
		t.y = 291;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.text = "击破分数：";
		t.x = 55;
		t.y = 378;
		return t;
	};
	_proto.txt_defeat_i = function () {
		var t = new eui.Label();
		this.txt_defeat = t;
		t.x = 241;
		t.y = 378;
		return t;
	};
	_proto.btn_retry_i = function () {
		var t = new eui.Button();
		this.btn_retry = t;
		t.height = 66.683;
		t.label = "返回";
		t.width = 170.902;
		t.x = 219.323;
		t.y = 696.659;
		return t;
	};
	return GameResult;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HpBarSkin.exml'] = window.skins.HpBarSkin = (function (_super) {
	__extends(HpBarSkin, _super);
	function HpBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i()];
	}
	var _proto = HpBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_hp_png";
		t.percentWidth = 100;
		return t;
	};
	return HpBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ModeSelectPanel.exml'] = window.skins.ModeSelectPanel = (function (_super) {
	__extends(ModeSelectPanel, _super);
	function ModeSelectPanel() {
		_super.call(this);
		this.skinParts = ["btnMode1","btnMode2","btnMode3"];
		
		this.height = 500;
		this.width = 400;
		this.elementsContent = [this._Group4_i()];
	}
	var _proto = ModeSelectPanel.prototype;

	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.btnMode1_i(),this._Label1_i(),this._Group1_i(),this.btnMode2_i(),this._Label2_i(),this._Group2_i(),this.btnMode3_i(),this._Label3_i(),this._Group3_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.btnMode1_i = function () {
		var t = new eui.Button();
		this.btnMode1 = t;
		t.height = 100;
		t.label = "限时模式";
		t.width = 300;
		t.x = 123;
		t.y = 77;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 30;
		t.text = "在5分钟内击落尽可能多敌机";
		t.x = 247;
		t.y = 199;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 20;
		t.width = 0;
		return t;
	};
	_proto.btnMode2_i = function () {
		var t = new eui.Button();
		this.btnMode2 = t;
		t.height = 100;
		t.label = "生存模式";
		t.width = 300;
		t.x = 162;
		t.y = 210;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.size = 30;
		t.text = "游戏直到被击落为止";
		t.x = 203;
		t.y = 231;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 20;
		t.width = 0;
		return t;
	};
	_proto.btnMode3_i = function () {
		var t = new eui.Button();
		this.btnMode3 = t;
		t.height = 100;
		t.label = "练习模式";
		t.width = 300;
		t.x = 162;
		t.y = 251;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.size = 30;
		t.text = "击落随机分布的10个标靶";
		t.x = 168;
		t.y = 278;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 20;
		t.width = 0;
		return t;
	};
	return ModeSelectPanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/playerPlane.exml'] = window.skins.playerPlane = (function (_super) {
	__extends(playerPlane, _super);
	function playerPlane() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 510;
		this.width = 405;
		this.elementsContent = [this._Image1_i()];
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("rspin",
				[
					new eui.SetProperty("_Image1","source","sheet_json#plane1spin")
				])
			,
			new eui.State ("lspin",
				[
					new eui.SetProperty("_Image1","source","sheet_json#plane1spin2")
				])
		];
	}
	var _proto = playerPlane.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.source = "sheet_json#plane1";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return playerPlane;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TimeLimit.exml'] = window.skins.TimeLimit = (function (_super) {
	__extends(TimeLimit, _super);
	function TimeLimit() {
		_super.call(this);
		this.skinParts = ["txt"];
		
		this.height = 100;
		this.width = 200;
		this.elementsContent = [this.txt_i()];
	}
	var _proto = TimeLimit.prototype;

	_proto.txt_i = function () {
		var t = new eui.Label();
		this.txt = t;
		t.bold = true;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.size = 60;
		t.text = "5:00";
		t.textAlign = "center";
		t.textColor = 0xDCDCDC;
		t.verticalAlign = "middle";
		return t;
	};
	return TimeLimit;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Title.exml'] = window.skins.Title = (function (_super) {
	__extends(Title, _super);
	function Title() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 250;
		this.width = 600;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = Title.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Label1_i(),this._Label2_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.percentWidth = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 80;
		t.text = "EEE Combat";
		t.textAlign = "center";
		t.textColor = 0xFFEE79;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 60;
		t.text = "- 杂牌空战 -";
		t.textColor = 0xD2D85A;
		t.x = 83;
		t.y = 86;
		return t;
	};
	return Title;
})(eui.Skin);