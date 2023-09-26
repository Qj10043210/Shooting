//default//
const visualWidth= $(document).width(); const visualHeight = $(document).height(); const boxMain = $('#mainBox');
const boxSide = $('#sideBox');
const delayMakingBox = 100; const slightLineHowMuchWeNeed = 4;
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
let titleSize ="";
//default//
    let defaultSizeTWH = default01_measuringBox(visualWidth); //[>800 T, width, height]
    default02_HorizenORVertical(defaultSizeTWH, boxMain, boxSide); //boxW, boxH get changed here
    boxZoneValueArray = default03_divideThearea();
    //default04 will be activated when we choose diff
    default05_howManyBoxesWeWillDeal();
//default//
//Action01:Choose Language, difficulty
if(optionChoose.ObLang==""){
action01_01_pShowLang();};
$(document).on("click",'#sideDifficulty .diff',function(){
    action01_02_pChooseLang($(this));
    action01_03_pRemoveLang();
    action01_04_pShowDif(optionChoose.ObLang);
    action01_05_pShowMobBox();
    
}) //from Start, to Difficulty
$(document).on("click",'#sideRealDifficulty .diff',function(){
    action02_01_pChooseDiff($(this));
    action02_02_pRemoveDiff(optionChoose.ObLang);
    action02_03_pFontSize()
    default04_makeMonsterSpawnArea(); //MaxEntity will fixed here too, and if over 120, it will fixed as 120
    action02_04_pPrompt();
}) //from Difficulty, to main Start
$(document).on("click","#sideTextPrompt p",function(){
    action02_06_pSkip();
})
$(document).on("click","#sideStart",function(){
    action03_01_lStart();
})
$(document).on("click","#logoBoxBgUnder span",function(){
    action04_01_FinallyWeStart($());
})

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
    titleSize=tempC.css("fontSize");
    
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

//action 02
function action02_01_pChooseDiff(input_div){
    let tempBoxText = input_div.index(); //1 korean 2 english
    switch (tempBoxText) {
        case 1 : 
            optionChoose.Obdiffi = "re";
            difficultyReHa = true;
            break;
        case 2 : 
            optionChoose.Obdiffi = "ha";
            difficultyReHa = false;
            break;
    }
}
function action02_02_pRemoveDiff(input_obj){
    $('#sideTeleprompterBox').addClass("view");
    $('#sideRealDifficulty').removeClass("view");
    if(input_obj=="kr"){
        $.get(`./text/storyKR.txt`,function(ata){
            let a = ata;
            $("#sideTextPrompt").append(a)
        }, 'text');
        
    }else{
        $.get(`./text/storyEN.txt`,function(ata){
            let a = ata;
            $("#sideTextPrompt").append(a)
        }, 'text');
        
    }
   
}
function action02_03_pFontSize(){
    
    $('#sideTextPrompt').css('fontSize',titleSize);
    
}
function action02_04_pPrompt(){
    
    let tempInterval = setInterval(()=>{
        $('#sideTextPrompt').animate({
            top: "-=50"
        }, 0)
        if (parseFloat($('#sideTextPrompt').css("top"))*-1>=($('#sideTextPrompt').height())){
            clearInterval(tempInterval);
            action02_05_pShowStart();
            
        }
    },600);

}
function action02_05_pShowStart(){
    $('#sideStart').addClass("view");
    if(optionChoose.ObLang=="kr"){
        $('#sideStart .t2').addClass("view");
        $('#sideStart').css('fontSize',titleSize);
    }else{
        $('#sideStart .t4').addClass("view");
        $('#sideStart').css('fontSize',titleSize);
    }
}
function action02_06_pSkip(){
    let tempA = ($('#sideTextPrompt').height())*-1 +"px"
    $('#sideTextPrompt').css("top",tempA)
}
//action 03
function action03_01_lStart(){
    $('#sideTeleprompterBox').removeClass("view");
    $('#logoBox').addClass("view");
    if(optionChoose.ObLang=="kr"){
        let tempA = slightLineHowMuchWeNeed *2 +1;
        for(let i=0; i< tempA*2; i++){
            $('#logoBox').append(`<div class='sideSlight slight${i}'></div>`);
            console.log("boxx")
        };

        let tempB = $('.sideSlight').height(); //get each line's height
        let tempC = $('#logoBox').width(); // get the box will contain slight
        let tempBA = tempC / (slightLineHowMuchWeNeed *2); // get each location where slight will be there
        let tempArray = [];//for Last array
        let tempArray2 = []; // for puting each location;
            for(let i=0; i < (slightLineHowMuchWeNeed *2)+1; i++){
                tempArray2.push(tempBA*i);
            }
        let tempD_Degree = 40;
        let tempD_eachTimeDegree = (tempD_Degree *2) / (slightLineHowMuchWeNeed * 2);
        let tempD_lastValue = (-1 * tempD_Degree) - tempD_eachTimeDegree;
        let tempD_tempCount = 0;
            for(let u = tempD_Degree; u>tempD_lastValue; u -= tempD_eachTimeDegree){
                let tempArray3 = [];
                if(u>0){
                    let tempE = u * (Math.PI / 180); // get real deg
                    tempE = Math.tan(tempE) // get height/bottom
                    tempE = (tempE).toFixed(2) // make number light
                    tempE = tempB * tempE; //get height
                    tempE = tempE / 2 // it's height/2 but we will deal this as width
                    tempE = (tempArray2[tempD_tempCount] +tempE);
                    tempE += "px";

                    tempArray3.push(tempE);
                    tempArray3.push(`skewX(${u}deg)`)

                    tempD_tempCount++;
                }else if(tempD_tempCount==slightLineHowMuchWeNeed){
                    // let tempE = u * (Math.PI / 180);
                    // tempE = Math.tan(tempE)
                    // tempE = (tempE).toFixed(2)
                    // tempE = tempB * tempE;
                    // tempE = tempE / 2
                    // let tempE2 = $(`slight${tempD_tempCount}`).width();
                    // tempE = (tempArray2[tempD_tempCount] -tempE2/2);
                    let tempE2 = $(`.slight${tempD_tempCount}`).width();
                    console.log(tempE2+"E2")
                    let tempE = tempC/2 - tempE2/2
                    console.log(tempE+"E")
                    tempE += "px";
                    tempArray3.push(tempE);
                    tempArray3.push(`skewX(${u}deg)`)

                    tempD_tempCount++;
                }else{
                    let tempE = tempB * (Math.tan((-1 * u) * Math.PI / 180)).toFixed(2) / 2
                    tempE = tempArray2[(slightLineHowMuchWeNeed*2)-tempD_tempCount] + tempE + "px"
                    
                    tempArray3.push(tempE);
                    tempArray3.push(`skewX(${u}deg)`)
                
                    tempD_tempCount++;
                }
                tempArray.push(tempArray3)
            }
            console.log(tempArray)
            for(let p=0; p <=(slightLineHowMuchWeNeed*4)+1;p++){
                if(p>=0&&p<=2*slightLineHowMuchWeNeed){ //top
                    if(p<slightLineHowMuchWeNeed){ //left
                        $(`.slight${p}`).css({
                        left:tempArray[p][0],
                        transform:tempArray[p][1],
                        top:0
                    })
                    }else if(p==slightLineHowMuchWeNeed){
                        $(`.slight${p}`).css({
                        left:tempArray[p][0],
                        transform:tempArray[p][1],
                        top:0
                    })
                    }else{ //right
                        $(`.slight${p}`).css({
                        right:tempArray[p][0],
                        transform:tempArray[p][1],
                        top:0
                    })
                    }
                
                    
                }else{ //bottom
                    if(p<(slightLineHowMuchWeNeed*3)+1){ //left
                        $(`.slight${p}`).css({
                        left:tempArray[(4*slightLineHowMuchWeNeed)+1-p][0],
                        transform:`${tempArray[(4*slightLineHowMuchWeNeed)+1-p][1]} rotate(180deg)`,
                        bottom:0
                        
                    })
                    }else if(p==(slightLineHowMuchWeNeed*3+1)){
                        $(`.slight${p}`).css({
                        left:tempArray[(4*slightLineHowMuchWeNeed)+1-p][0],
                        transform:`${tempArray[(4*slightLineHowMuchWeNeed)+1-p][1]} rotate(180deg)`,
                        bottom:0
                    })
                    }else{ //right
                        $(`.slight${p}`).css({
                        right:tempArray[(4*slightLineHowMuchWeNeed)+1-p][0],
                        transform:`${tempArray[(4*slightLineHowMuchWeNeed)+1-p][1]} rotate(180deg)`,
                        bottom:0
                    })
                    }
                }
                

            }
        let tempK = 0;
        let tempK1 = setInterval(()=>{
            $(`.slight${tempK}`).css({
                    
                animation: 'b01_blight 2s linear infinite',
                
                })
                tempK++;
                if(tempK == slightLineHowMuchWeNeed*4){
                    clearInterval(tempK1)
                }

        },500)
        
    }
    action03_02_lBg()   
}
function action03_02_lBg(){
    $('#logoBoxBgUnder').addClass("view");
    if(optionChoose.ObLang=="kr"){
    $('#logoBoxBg').css({
        backgroundImage : `url(./css/images/DefenseTitleKr.png)`
    })
    $('#logoBoxBgUnder .t2').addClass("view");
    $('#logoBoxBgUnder .t2').css('fontSize',titleSize);

    }else{
        $('#logoBoxBg').css({
            backgroundImage : `url(./css/images/DefenseTitle.png)`,
            filter: 'drop-shadow(0 0 0.75rem #280000)'
        })
    $('#logoBoxBgUnder .t4').addClass("view");
    $('#logoBoxBgUnder .t4').css('fontSize',titleSize);
    }
}

//action 04
function action04_01_FinallyWeStart(){
    $('#sideBox').removeClass("view");
    $('#mainBox #backgroundBox').css({
        width : '105%',
        height : '105%',
        position : 'absolute',
        top : '-5%',
        left : '-2.5%',
        backgroundImage : `url(./css/images/thisisit.png)`,
        zIndex : '-1',
        backgroundSize : '100% 100%',
        borderRadius : '15px',
        backgroundColor : '#7d7d7d',
        backgroundPosition : 'center',
        boxShadow : '0px 0px 10px 10px #7d7d7d'

    })
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