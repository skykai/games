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
        /*向右移动*/
        var i,j,k,n;
        for (j = 0; j < 4; j++) {
            n = 3;
            for (i = 3; i >= 0; i--) {
                if(this.arr[i][j].value==0){
                    continue;
                }
                k = i+1;
                aa:
                    while(k<=n){
                        if(this.arr[k][j].value == 0){
                            if(k == n || (this.arr[k+1][j].value!=0 && this.arr[k+1][j].value!=this.arr[i][j].value)){
                                this.moveCell(i,j,k,j);
                            }
                            k++;


                        }else{
                            if(this.arr[k][j].value == this.arr[i][j].value){
                                //this.mergeCells(i,j,k,j);
                                n--;
                            }
                            break aa;
                        }
                    }
            }
        }


    },
    moveLeft : function() {
        /*向左移动*/
        var i,j,k,n;

        for (j = 0; j < 4; j++) {
            n=0;
            for (i = 0; i < 4; i++) {
                if(this.arr[i][j].value==0){
                    continue;
                }
                k=i-1;
                aa:
                    while(k>=n){
                        if(this.arr[k][j].value == 0){
                            if(k == n || (this.arr[k-1][j].value!=0 && this.arr[k-1][j].value!=this.arr[i][j].value)){
                                this.moveCell(i,j,k,j);
                            }
                            k--;
                        }else{
                            if(this.arr[k][j].value == this.arr[i][j].value){
                                //this.mergeCells(i,j,k,j);
                                n++;
                            }
                            break aa;

                        }
                    }
            }
        }
    },
    moveDown : function() {
        /*向下移动*/
        var i,j,k,n;
        for (i = 0; i < 4; i++) {
            n = 3;
            for (j = 3; j >= 0; j--) {
                if(this.arr[i][j].value==0){
                    continue;
                }
                k = j+1;
                aa:
                    while(k<=n){
                        if(this.arr[i][k].value == 0){
                            if(k == n || (this.arr[i][k+1].value!=0 && this.arr[i][k+1].value!=this.arr[i][j].value)){
                                this.moveCell(i,j,i,k);
                            }
                            k++;

                        }else{
                            if(this.arr[i][k].value == this.arr[i][j].value){
                               // this.mergeCells(i,j,i,k);
                                n--;
                            }
                            break aa;
                        }

                    }
            }
        }
    },
    moveUp : function() {
        // 向上移动
        var i,j,k,n;
        for(i = 0; i < 4; i++){
            n = 0;
            for(j = 0; j < 4; j++){
                if(this.arr[i][j].value == 0){
                    continue;
                }
                k = j-1;
                aa:
                    while(k>=n){
                        if(this.arr[i][k].value == 0){
                            if( k == n || (this.arr[i][k-1].value!=0 && this.arr[i][k-1].value != this.arr[i][j].value)){
                                this.moveCell(i,j,i,k);
                            }
                            k--;
                        }else{
                            if(this.arr[i][k].value == this.arr[i][j].value){
                                //this.mergeCells(i,j,i,k);
                                n++;
                            }
                            break aa;
                        }

                    }
            }
        }
    },
    moveCell : function(i1, j1,i2, j2){
        //移动格子
        this.arr[i2][j2].value = this.arr[i1][j1];
        this.arr[i1][j1].value = 0;
        this.moveAble = true;
        $('.p'+i1+j1).removeClass('p'+i1+j1).addClass('p'+i2+j2);
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