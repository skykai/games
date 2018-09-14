function G2048() {
    this.addEvent();
}
G2048.prototype = {
    constructor : G2048,
    init : function(){
        this.score = 0; //记录分数
        this.arr = [];  //记录每个格子的value
        this.moveAble = false;
        $("#score").html("分数：0");
        $(".number_cell").remove();
        this.creatArr();

    },
    //初始化数组 生成两个随机数组
    creatArr : function() {
        //先初始化每个格子数组
        var i,j;
        for(i = 0; i < 4; i++){
            this.arr[i] = [];
            for(j = 0; j < 4; j++){
                this.arr[i][j] = {};
                this.arr[i][j].value = 0;
            }
        }
        // 随机生成两个不同的格子
        var i1,j1,i2,j2;
        do{
            i1 = getRandom(3);
            i2 = getRandom(3);
            j1 = getRandom(3);
            j2 = getRandom(3);
        }while (i1 == i2 && j1 == j2);

        this.arrValueUpdate(2,i1,j1);
        this.arrValueUpdate(2,i2,j2);
        this.drawArr(i1,j1);
        this.drawArr(i2,j2);
    },
    // 话格子
    drawArr : function(i,j) {
        /*画一个新格子*/
        var item = '<div class="number_cell p'+i+j+'" ><div class="number_cell_con n2"><span>'
            +this.arr[i][j].value+'</span></div> </div>';
        $(".g2048").append(item);
    },
    arrValueUpdate : function(num,i,j) {
        /*更新一个数组的值。*/
        this.arr[i][j].oldValue = this.arr[i][j].value;
        this.arr[i][j].value = num;
    },
    addEvent : function() {
        //事件监听
        var that = this;
        document.onkeydown = function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            var keyCode = e.keyCode;
            switch (keyCode){
                case 39://右
                    that.moveAble = false;
                    that.moveRight();
                    that.checkLose();
                    break;
                case 40://下
                    that.moveAble = false;
                    that.moveDown();
                    that.checkLose();
                    break;
                case 37://左
                    that.moveAble = false;
                    that.moveLeft();
                    that.checkLose();
                    break;
                case 38://上
                    that.moveAble = false;
                    that.moveUp();
                    that.checkLose();
                    break;
            }
        }
    },
    moveRight : function() {
        console.log('right');

    },
    moveLeft : function() {
        console.log('left');
    },
    moveDown : function() {
        console.log('down');
    },
    moveUp : function() {
        console.log('up');
    },
    checkLose : function() {

    }
}
// 生成0到3之间的随机数
function getRandom(n){
    return Math.floor(Math.random()*n)
}

var g = new G2048();

g.init();