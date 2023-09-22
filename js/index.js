//default//
const visualWidth= $(document).width(); const visualHeight = $(document).height(); const boxMain = $('#mainBox');
const boxSide = $('#sideBox');
const delayMakingBox = 100;
let MaxEntity = 20; //will adjust
let verticalOrHorizen = true; // true=horizen, false = vertical
let stopMakingBox = false; //true = stop make the box
let boxWidth =800; let boxHeight=400; //default size
let difficultyReHa = true; // true = regular, false = hard
let boxLocationWeWilluse = []; // Location number as size
let boxHowMuchweUsed = [];  //after we put box, this will be filled
let boxZoneValueArray = []; //[0, 1stLine, 2ndLine, lastLine, height]
let boxHowMuchweNeed = []; //Made Numbers as MaxEntity
let monsterSize = "";
let optionChoose = {ObLang:"",Obdiffi:""};
//default//
    let defaultSizeTWH = default01_measuringBox(visualWidth); //[>800 T, width, height]
    default02_HorizenORVertical(defaultSizeTWH, boxMain, boxSide); //boxW, boxH get changed here
    boxZoneValueArray = default03_divideThearea();
    default04_makeMonsterSpawnArea(); //MaxEntity will fixed here too, and if over 120, it will fixed as 120
    default05_howManyBoxesWeWillDeal();
//default//
//Action01:Choose Language, difficulty
if(optionChoose.ObLang==""){
action01_01_pShowLang();
$(document).on("click",'#sideDifficulty .diff',function(){
    action01_02_pChooseLang($(this));
    action01_03_pRemoveLang();
    action01_04_pShowDif(optionChoose.ObLang);
    action01_05_pShowMobBox();
})

    
    


}


//test//
    console.log(boxLocationWeWilluse)
    console.log(boxHowMuchweNeed)
//test//
//Function for mainBox open Function for mainBox open Function for mainBox open Function for mainBox open Function for mainBox open //

function default01_measuringBox(input_width){
    let tempArr = [];
    let areSize800 = false;
            if (input_width>800){
                areSize800 = true;
            }
    let tempBoxWidth = boxWidth;
    let tempBoxHeight = boxHeight;
    let tempCalc01 = parseFloat(input_width / tempBoxWidth);
    let tempCalc02 = Math.floor(tempCalc01);
    if(areSize800){
        if(tempCalc02 >= 2){
            tempBoxWidth = tempBoxWidth * (tempCalc01 - 0.5);
            tempBoxHeight = tempBoxHeight * (tempCalc01 - 0.5);
            
        }
        else{
            if (tempCalc01 - tempCalc02 >0.49){
                tempBoxWidth = tempBoxWidth * 1.5;
                tempBoxHeight = tempBoxHeight * 1.5;
            }else{
                tempBoxWidth = tempBoxWidth * 1;
                tempBoxHeight = tempBoxHeight * 1;
            }

        }
    }
    tempArr.push(areSize800);
    tempArr.push(tempBoxWidth);
    tempArr.push(tempBoxHeight);
    return tempArr
}
function default02_HorizenORVertical(input_arr, input_div, input_div2){
    let tempArr = default02_2_leftAndTop(input_arr);
    if(input_arr[0]){ //>800
        input_div.css({
            width : tempArr[0],
            height : tempArr[1],
            left : tempArr[2],
            top : tempArr[3],
            position:'absolute'

        });
        input_div2.css({
            width : tempArr[0],
            height : tempArr[1],
            left : tempArr[2],
            top : tempArr[3],
            position:'absolute'

        })
    }else{
        input_div.css({
            width : tempArr[0],
            height : tempArr[1],
            position:'absolute',
            transform : 'rotate(90deg)'
        });
        input_div2.css({
            width : tempArr[0],
            height : tempArr[1],
            position:'absolute',
            transform : 'rotate(90deg)'
        });
        let tempA = input_div.position();
        let tempAL = tempA.left;
        let tempAT = tempA.top;
        tempAL = -1 * tempAL;
        tempAT = -1 * tempAT;
        
        input_div.css({
            left : tempAL + tempArr[2],
            top : tempAT + tempArr[3]
        });
        input_div2.css({
            left : tempAL + tempArr[2],
            top : tempAT + tempArr[3]
        });
        verticalOrHorizen =false;
    }
    boxWidth = tempArr[0];
    boxHeight = tempArr[1];
}
function default02_2_leftAndTop(input_arr){
    let tempArr = [];
    if(input_arr[0]){ //>800
        let tempA_Vwidth = visualWidth / 2;
        let tempB_Bwidth = input_arr[1] / 2;
        let tempC_Vheight = visualHeight / 2;
        let tempD_Bheight = input_arr[2] / 2;
        let tempE_left = tempA_Vwidth - tempB_Bwidth;
        let tempF_top = tempC_Vheight - tempD_Bheight;
        tempArr = [input_arr[1],input_arr[2],tempE_left,tempF_top]
    }else{ //wiil rotate 90deg
        let tempA_Vwidth = visualWidth / 2;
        let tempB_Bwidth = input_arr[1] / 2;
        let tempC_Vheight = visualHeight / 2;
        let tempD_Bheight = input_arr[2] / 2;
        let tempE_left = tempA_Vwidth - tempD_Bheight;
        let tempF_top = tempC_Vheight - tempB_Bwidth;
        tempArr = [input_arr[1],input_arr[2],tempE_left,tempF_top];
    }
    return tempArr
}
function default03_divideThearea(){
    let tempA = boxWidth / 3;
    let tempB = boxHeight;
    let tempArr = [];
    tempArr.push(0);
    tempArr.push(parseFloat(tempA.toFixed(2)));
    tempArr.push(parseFloat((tempA*2).toFixed(2)));
    tempArr.push(parseFloat((tempA*3).toFixed(2)));
    tempArr.push(tempB);
    return tempArr
}
function default04_makeMonsterSpawnArea(){
    let tempMobSize = 0;
    let tempA = 0;
    if (difficultyReHa){tempMobSize = 50; tempA = 25;}else{tempMobSize=30; tempA =15;} //true=reg
    let tempBoxHeight = boxZoneValueArray[4];
    let tempMobAreaStartLIne = boxZoneValueArray[2];
    let tempArr= [];
    let tempBoolean = true;
        while(tempBoolean){
            if(tempMobAreaStartLIne>=boxZoneValueArray[3]-tempMobSize){
                tempMobAreaStartLIne = boxZoneValueArray[2];
                tempA += tempMobSize;
                if (tempA >= tempBoxHeight-tempMobSize){
                    tempBoolean=false;
                    break;
                }
            }
            tempArr.push(tempMobAreaStartLIne);
            tempArr.push(tempA);
            tempMobAreaStartLIne += tempMobSize;
            boxLocationWeWilluse.push(tempArr)
            tempArr=[];
        }
        if(boxLocationWeWilluse.length-2 <120){
            MaxEntity = boxLocationWeWilluse.length -2;
        }else{
            MaxEntity = 120; 
        }
}
function default05_howManyBoxesWeWillDeal(){
    for (let i=0; i<MaxEntity;i++){
        boxHowMuchweNeed.push(i)
    }
}
function default06_giveSameSizeToo(){

}
//Function for mainBox close Function for mainBox close Function for mainBox close Function for mainBox close Function for mainBox close //

//Function when we START!//
//action01
function action01_01_pShowLang(){
    let tempA = $('#sideBox');
    let tempB = $('#sideDifficulty')

    tempA.addClass("view");//show sideBox
    tempB.addClass("view");
    let tempC = $('.diffTitle .t1')
    let tempD = $('.diff span')
    anyway01_fontSize(tempC)
    anyway01_fontSize(tempD)
}
function action01_02_pChooseLang(input_div){
    // let tempBoxText = input_div.children().text();
    let tempBoxText = input_div.index(); //1 korean 2 english
    switch (tempBoxText) {
        case 1 : 
            optionChoose.ObLang = "kr";
            break;
        case 2 : 
            optionChoose.ObLang = "en";
            break;
    }
}
function action01_03_pRemoveLang(){
    $('#sideDifficulty').removeClass("view");
    $('#sideRealDifficulty').addClass("view");
    
    
}
function action01_04_pShowDif(input_obj){
    
    if(input_obj=="kr"){
        let tempA = $('#sideRealDifficulty .diffRTitle .t1 .t2')
        let tempB = $('#sideRealDifficulty .diff .t2')
        tempA.addClass("view");
        tempB.addClass("view");
        

    }else{
        let tempA = $('#sideRealDifficulty .diffRTitle .t1 .t4')
        let tempB = $('#sideRealDifficulty .diff .t4')
        tempA.addClass("view");
        tempB.addClass("view");
        
    }
    let tempC = $('.diffRTitle .t1')
    anyway01_fontSize(tempC)
    
}
function action01_05_pShowMobBox(){
    let tempA = $('.diff .tempMonsterR');
    let tempB = $('.diff .tempMonsterH');
    for(let i =0;i<4;i++){
        tempA.eq(i).css({
            width:'50px',
            height:'50px',
            backgroundColor : `rgb(${anyway02_RandNumberXYZ(50,200,1000)},${anyway02_RandNumberXYZ(50,200,1000)},${anyway02_RandNumberXYZ(50,200,1000)})`,
            border : `1px solid rgb(${anyway02_RandNumberXYZ(50,200,1000)},${anyway02_RandNumberXYZ(50,200,1000)},${anyway02_RandNumberXYZ(50,200,1000)})`,
          
        });
        tempB.eq(i).css({
            width:'30px',
            height:'30px',
            backgroundColor : `rgb(${anyway02_RandNumberXYZ(50,200,1000)},${anyway02_RandNumberXYZ(50,200,1000)},${anyway02_RandNumberXYZ(50,200,1000)})`,
            border : `1px solid rgb(${anyway02_RandNumberXYZ(50,200,1000)},${anyway02_RandNumberXYZ(50,200,1000)},${anyway02_RandNumberXYZ(50,200,1000)})`,
           
        });
        tempA.eq(i).append(`<span>${anyway02_RandNumberXYZ(1,9,10)}</span>`)
        tempB.eq(i).append(`<span>${anyway02_RandNumberXYZ(1,9,10)}</span>`)
        anyway01_2_fontSizeN(tempA.eq(i).children())
        anyway01_2_fontSizeN(tempB.eq(i).children())
        tempA.eq(i).css({
            textAlign : 'center',
            animation : `a03_beating 1.${+anyway02_RandNumberXYZ(1,10,100)}s  linear infinite`,
            animationDelay : `0.${i+anyway02_RandNumberXYZ(1,10,100)}s`
        });
        tempB.eq(i).css({
            textAlign : 'center',
            animation : `a03_beating 1.${+anyway02_RandNumberXYZ(1,10,100)}s  linear infinite`,
            animationDelay : `0.${i+anyway02_RandNumberXYZ(1,10,100)}s`
        });
    }
   

}
//Function when we START!//


//Funtion anyway//
function anyway01_fontSize(span){
    
    let a = span.height();
    let b = span.width();
    
    let c = span.parent().height();
    let d = span.parent().width();
    
    let t = span.css("font-size");
    do{
        
        b = span.width()
        t = parseFloat(t)
        t = t + 0.5;
        t = t + "px"
        span.css("font-size",t)
        

    }while( b<d )
    do{
        a = span.height()
        t = span.css("font-size")
        t = parseFloat(t)
        t = t - 0.5;
        t = t + "px"
        span.css("font-size",t)
        span.css("line-height",t)
        console.log("aa")

    }while( a>=c )
    //100% too big
    
    t= parseFloat(t)*0.65 +"px";
    
    $(span).css("font-size",t)
    $(span).css("line-height",t)
}
function anyway01_2_fontSizeN(span){
    
    let a = span.height();
    let b = span.width();
    
    let c = span.parent().height();
    let d = span.parent().width();
    
    let t = span.css("font-size");
    do{
        
        b = span.width()
        t = parseFloat(t)
        t = t + 0.5;
        t = t + "px"
        span.css("font-size",t)
        

    }while( b<d )
    do{
        a = span.height()
        t = span.css("font-size")
        t = parseFloat(t)
        t = t - 0.5;
        t = t + "px"
        span.css("font-size",t)
        span.css("line-height",t)
        console.log("aa")

    }while( a>=c )
    
    t= parseFloat(t)*1.35 +"px";
    
    $(span).css("font-size",t)
    $(span).css("line-height",t)
    
}
function anyway02_RandNumberXYZ(x,y,z){
    let a = Math.random()
    let b = Math.floor(a * z); 
    let c = true;
    while (c) {
        if (b >= x && b <= y) {
            c = false;
        }
        else {
            a = Math.random()
            b = Math.floor(a * z);
        }
    }
    return b;
}
//Funtion anyway//