var scene=11;	//현재 동작되는 장면의 종류
var s1,s2; //각 장면이 들어간 객체
function setup() { 
  createCanvas(500, 500);
	s1=new scene1();  //첫번째 장면
	s2=new scene2();  //두번째 
} 

function draw() { 
	//switch문을 이용해 전역변수 scene의 값에 해당하는 장면 코드만 실행시킨다
  switch(scene)
	{
		case 11:s1.setup(); break;
		case 12:s1.draw(); break;
		case 21:s2.setup(); break;
		case 22:s2.draw(); break;
	}
}

function scene1()
//여기에 첫번째 장면의 프로그램을 클래스 형식으로 넣는다
{
  //첫 번째 장면에만 쓰이는 전역변수
	this.x=0;
	this.y=0;
	this.vx=0;
	this.vy=0;
	this.vMultiplier=1.05;
	this.bMultiplier=0.5;
	this.count=0;
	this.setup=function(){
		var r=random(TWO_PI);
		this.x=width/2;
		this.y=height/2;
		this.vx=10*sin(r);
		this.vy=10*cos(r);
		this.count=0;
		fill(0);
		scene=12;	//1번만 실행하고 1번 장면의 draw함수로 넘어간다
	}
	this.draw=function() {
		background(255);
		this.vx*=this.vMultiplier;
		this.vy*=this.vMultiplier;
		this.y += this.vy; 
		this.x += this.vx;
		if (this.x < 0) { 
			this.x = 0; 
			this.vx = -this.vx * this.bMultiplier; 
			this.count++;
		}
		if (this.y < 0) { 
			this.y = 0; 
			this.vy = -this.vy * this.bMultiplier; 
			this.count++;
		}
		if (this.x > width - 20) { 
			this.x = width - 20; 
			this.vx = -this.vx * this.bMultiplier; 
			this.count++;
		}
		if (this.y > height - 20) { 
			this.y = height - 20; 
			this.vy = -this.vy * this.bMultiplier; 
			this.count++;
		}
		ellipse(this.x,this.y,30,30);
		if(this.count>20) scene=21; //다음 장면의 setup함수로 넘어간다
	}
}

function scene2()
//여기에 두 번째 장면의 프로그램을 클래스 형식으로 넣는다
{
	//두 번째 장면에만 쓰이는 전역변수
  this.x=0;
	this.y=0;
	this.r=20;
	this.setup=function()
	{
		this.x=width/2;
		this.y=height/2;
    fill(255);
		scene=22;//1번만 실행하고 2번 장면의 draw함수로 넘어간다
	}
	this.draw=function()
	{
		background(0);
		if (dist(mouseX,mouseY,this.x,this.y)<this.r) {
			this.x += random(-5, 5);
			this.y += random(-5, 5);
		}
		ellipse(this.x,this.y,this.r*2,this.r*2);
		if(this.x<this.r||this.x>width-this.r||this.y<this.r||this.y>height-this.r) scene=11; //다음 장면의 setup함수로 넘어간다
	}
}
