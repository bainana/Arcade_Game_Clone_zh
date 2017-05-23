// 这是我们的玩家要躲避的敌人
var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.speed=100+Math.random()*300;
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的

    //Enemy到达终点后，回到起点
    if(this.x>500){
        this.x=-30;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数

var Play = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};
Play.prototype.update = function (dt) {
    var flag=false;
    if(this.x<=-44){
        this.x=6;
    }
    if(this.y<-12){
        if(flag==false){
           alert("Win!Play Again");
        }
        flag=true;
        this.y=320;
    }
};
//手动计算出敌人的宽度和高度，判断在边界之内碰撞为条件。
Play.prototype.checkCollisions=function(){
    for(var i=0;i<allEnemies.length;i++){
        var EnemyWidth=83,EnemyHeight=101;//手动计算出敌人的宽度和高度
        if(this.y>(allEnemies[i].y-EnemyHeight/2)&&this.y<(allEnemies[i].y+EnemyHeight/2)){//当玩家的y值大于敌人的y值减去玩家的一半宽度并且小于敌人的y值加上玩家的一半时
            if(this.x>(allEnemies[i].x-EnemyWidth/2)&&this.x<(allEnemies[i].x+EnemyWidth/2)){//当玩家的x值大于敌人的x值减去玩家的一半宽度并且小于敌人的x值加上玩家的一半时
                this.x=200;
                this.y=320;//恢复初始位置
            }

        }
    }
};
Play.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Play.prototype.handleInput = function (keywords) {
    switch (keywords) {
        case 'left':
        if(this.x<=1){
            this.x+=0;
        }else{
           this.x -= 101;
        }
            break;
        case 'right':
            if(this.x>=400){//当玩家到达右侧边界时不允许位置增加
                this.x+=0;
            }else{
                this.x += 101;
            }
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'down':
        if(this.y>=403){
               this.y+=0;
        }else{
            this.y += 83;
        }
            break;
    }
}
;
var allEnemies = [
    // new Enemy(0, 55),
    // new Enemy(100, 145),
    // new Enemy(150, 235)
];
var player = new Play(203, 320);
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面

// 把玩家对象放进一个叫 player 的变量里面

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
