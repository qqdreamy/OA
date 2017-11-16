import jsxgraph from '../lib/jsxgraphcore-amd.js'
module.exports.KbCountBig=function(type,c,k){
    //0为正度，1为大度,默认为正度
    var zc=1092;
    var zk=787;
    if(type==1){
        zc=1194;
        zk=889;
    }else{
        zc=1092;
        zk=787
    }
    //需计算的长宽高
    var c=Number(c);
    var k=Number(k);
    //最终开别结果
    var kbEnd1;
    var kbEnd2;
    if (c>=k){//测试数据250 220
        var kb1=parseInt(zc/c);//4
        var kb2=parseInt(zk/k);//4
        var sy1=(zc % c);//194
        var ssy1=(zk % k);//9
        var kb3=parseInt(sy1/k);//0
        var sy2;
        var path;
        var ssy2;
        if(kb3>=1){
            sy2=parseInt(zk/c);
            kbEnd1=kb1*kb2+sy2*kb3;
        }else{
            //增加新算法，需测试
            if(ssy1+k>c){
                kb2=kb2-1;
                ssy2=parseInt(zc/k);
                sy2=1;
                kb3=ssy2;
                kbEnd1=kb1*kb2+ssy2;
                path='top';
            }else{
                kbEnd1=kb1*kb2
            }
        }
        var kb4=parseInt(zc/k);
        var kb5=parseInt(zk/c);
        var sy4=zk % c;
        var kb6=parseInt(sy4/k);
        var sy5;
        if(kb6>=1){
            sy5=parseInt(zc/c);
            kbEnd2=kb4*kb5+sy5*kb6;
        }
        else{
            kbEnd2=kb4*kb5;
        }
    }else{
        var kb1=parseInt(zc/c);//3
        var kb2=parseInt(zk/k);//3
        var sy1=(zk % k);//103
        var kb3=parseInt(sy1/c);//1
        var sy2;
        if(kb3>=1){
            sy2=parseInt(zc/k);
            kbEnd1=kb1*kb2+sy2*kb3;
        }else{
            kbEnd1=kb1*kb2
        }
        var kb4=parseInt(zc/k);
        var kb5=parseInt(zk/c);
        var sy4=zc % k;
        var kb6=parseInt(sy4/c);
        var sy5;
        if(kb6>=1){
            sy5=parseInt(zk/k);
            kbEnd2=kb4*kb5+sy5*kb6;
        }
        else{
            kbEnd2=kb4*kb5;
        }
    }
    var kb = new Object();
    if(kbEnd1>=kbEnd2){
        kb.type=1;
        kb.count=kbEnd1;
        kb.kb1=kb1;
        kb.kb2=kb2;
        kb.sy2=sy2;
        kb.kb3=kb3;
        kb.path=path;
    }else{
        kb.type=2
        kb.count=kbEnd2;
        kb.kb4=kb4;
        kb.kb5=kb5;
        kb.sy5=sy5;
        kb.kb6=kb6;
    }
    return kb;
}
//div 对象id，长,长+3/10,宽，宽+3/+10
module.exports.DJSXkb=function(name,ccc,c,kkk,k,typeName){
    if(Number(ccc)<Number(kkk)){
        [ccc,kkk]=[kkk,ccc];
        [c,k]=[k,c];
    }
    var b = jsxgraph.JSXGraph.initBoard(name, {boundingbox: [-3.5,15, 15, -3], keepaspectratio: false, axis:false,zoomFactor:1,showCopyright:false,showNavigation:false});
    var li3 = b.create('line',[[0,0],[11.94,0]], {straightFirst:false, straightLast:false, strokeWidth:2,strokeColor:'#000000',fixed:true});
    var li3 = b.create('line',[[0,0],[0,8.89]], {straightFirst:false, straightLast:false, strokeWidth:2,strokeColor:'#000000',fixed:true});
    var li3 = b.create('line',[[0,8.89],[11.94,8.89]], {straightFirst:false, straightLast:false, strokeWidth:2,strokeColor:'#000000',fixed:true});
    var li3 = b.create('line',[[11.94,8.89],[11.94,0]], {straightFirst:false, straightLast:false, strokeWidth:2,strokeColor:'#000000',fixed:true});
    b.create('text', [9.5, 10, "长=1194"], {cssClass:'mytext'});
    b.create('text', [12.5, 2.5, "宽=889"], {cssClass:'mytext'});
    var kb=this.KbCountBig(1,c,k);
    console.log(kb);
    if(kb.type==1){
        var kk=k*0.01;
        var cc=c*0.01;
        for(var n=1;n<=kb.kb2;n++){
            for (var i=0;i<=kb.kb1;i++){
                b.create('line',[[i*cc,kk*n],[cc,kk*n]], {straightFirst:false, straightLast:false, strokeWidth:2});
                b.create('line',[[i*cc,0*kk*n],[i*cc,kk*n]], {straightFirst:false, straightLast:false, strokeWidth:2});
            }
        }
        var t=c*0.01*kb.kb1;
        for(var n=1;n<=kb.sy2;n++){
            for (var i=0;i<=kb.kb3;i++){
               //增加新算法
                if(kb.path=='top'){
                    var pp=kb.kb2*k*0.01;
                    b.create('line',[[0,c*0.01*n+pp],[i*(k*0.01),c*0.01*n+pp]], {straightFirst:false, straightLast:false, strokeWidth:2});
                    b.create('line',[[k*0.01*i,c*0.01*n+pp],[k*0.01*i,0+pp]], {straightFirst:false, straightLast:false, strokeWidth:2});
                }else{
                    b.create('line',[[t,c*0.01*n],[t+i*(k*0.01),c*0.01*n]], {straightFirst:false, straightLast:false, strokeWidth:2});
                    b.create('line',[[t+k*0.01*i,c*0.01*n],[t+k*0.01*i,0]], {straightFirst:false, straightLast:false, strokeWidth:2});
                }
            }
        }
        if(kb.kb3>=1){
            b.create('text', [6, -1.5, "+"+kkk+"mm*"+kb.kb3+"开"], {cssClass:'mytext'});
            b.create('text', [12.5, 5, "+"+ccc+"mm*"+kb.sy2+"开"], {cssClass:'mytext'});
        }
        b.create('text', [-3, 3, kkk+"mm*"+kb.kb2+"开"], {cssClass:'mytext'});
        //增加余料标识
        //var y=889-k*kb2;
       // b.create('text',[-3, 8.5, "余料："+y+"mm"], {cssClass:'mytext'});
        b.create('text', [2.5, -1.5, ccc+"mm*"+kb.kb1+"开"], {cssClass:'mytext'});
        //赋值坐标上，总开别
        b.create('text', [-0, 12, "大度："+kb.count+"开"], {cssClass:'mytext',fontSize:20});
    }else{
        var kk=k*0.01;
        var cc=c*0.01;
        for(var n=1;n<=kb.kb5;n++){
            for (var i=0;i<=kb.kb4;i++){
                b.create('line',[[i*kk,cc*n],[kk,cc*n]], {straightFirst:false, straightLast:false, strokeWidth:2});
                b.create('line',[[i*kk,0*cc*n],[i*kk,cc*n]], {straightFirst:false, straightLast:false, strokeWidth:2});
            }
        }
        var t=c*0.01*kb.kb5;
        for(var n=1;n<=kb.sy5;n++){
            for (var i=1;i<=kb.kb6;i++){
                b.create('line',[[c*0.01*n,t+k*0.01*i],[0,t+k*0.01*i]], {straightFirst:false, straightLast:false, strokeWidth:2});
                b.create('line',[[c*0.01*n,t],[c*0.01*n,t+k*0.01*i]], {straightFirst:false, straightLast:false, strokeWidth:2});
            }
        }
        if(kb.kb6>=1){
            b.create('text', [-3, 5, "+"+k+"mm*"+kb.kb6+"开"], {cssClass:'mytext'});
            b.create('text', [3, 10, "+"+c+"mm*"+kb.sy5+"开"], {cssClass:'mytext'});
        }
        b.create('text', [-3, 3, c+"mm*"+kb.kb5+"开"], {cssClass:'mytext'});
        b.create('text', [2.5, -1.5, k+"mm*"+kb.kb4+"开"], {cssClass:'mytext'});
        //赋值坐标上，总开别
        b.create('text', [-0, 12, "大度："+kb.count+"开"], {cssClass:'mytext',fontSize:20});
    }
   b.create('text', [-3, 12, typeName], {fontSize:25});
    return kb.count;
}
module.exports.ZJSXkb=function(name,ccc,c,kkk,k,typeName){
    if(Number(ccc)<Number(kkk)){
        [ccc,kkk]=[kkk,ccc];
        [c,k]=[k,c];
    }
    var b = jsxgraph.JSXGraph.initBoard(name, {boundingbox: [-4,15, 15, -2], keepaspectratio: false, axis:false,zoomFactor:1,showCopyright:false,showNavigation:false});
    var li3 = b.create('line',[[0,0],[10.92,0]], {straightFirst:false, straightLast:false, strokeWidth:2,strokeColor:'#000000'});
    var li3 = b.create('line',[[0,0],[0,7.87]], {straightFirst:false, straightLast:false, strokeWidth:2,strokeColor:'#000000'});
    var li3 = b.create('line',[[0,7.87],[10.92,7.87]], {straightFirst:false, straightLast:false, strokeWidth:2,strokeColor:'#000000'});
    var li3 = b.create('line',[[10.92,7.87],[10.92,0]], {straightFirst:false, straightLast:false, strokeWidth:2,strokeColor:'#000000'});
    b.create('text', [9.5, 10, "长=1092"], {cssClass:'mytext'});
    b.create('text', [12.5, 2.5, "宽=787"], {cssClass:'mytext'});
    var kb=this.KbCountBig(0,c,k);
    //alert (kb.type);
    if(kb.type==1){
        var kk=k*0.01;
        var cc=c*0.01;
        for(var n=1;n<=kb.kb2;n++){
            for (var i=0;i<=kb.kb1;i++){
                b.create('line',[[i*cc,kk*n],[cc,kk*n]], {straightFirst:false, straightLast:false, strokeWidth:2});
                b.create('line',[[i*cc,0*kk*n],[i*cc,kk*n]], {straightFirst:false, straightLast:false, strokeWidth:2});
            }
        }
        var t=c*0.01*kb.kb1;
        for(var n=1;n<=kb.sy2;n++){
            for (var i=0;i<=kb.kb3;i++){
                //增加新算法
                if(kb.path=='top'){
                    //alert(1);
                    var pp=kb.kb2*k*0.01;
                    b.create('line',[[0,c*0.01*n+pp],[i*(k*0.01),c*0.01*n+pp]], {straightFirst:false, straightLast:false, strokeWidth:2});
                    b.create('line',[[k*0.01*i,c*0.01*n+pp],[k*0.01*i,0+pp]], {straightFirst:false, straightLast:false, strokeWidth:2});
                }else{
                    b.create('line',[[t,c*0.01*n],[t+i*(k*0.01),c*0.01*n]], {straightFirst:false, straightLast:false, strokeWidth:2});
                    b.create('line',[[t+k*0.01*i,c*0.01*n],[t+k*0.01*i,0]], {straightFirst:false, straightLast:false, strokeWidth:2});
                }

            }
        }
        if(kb.kb3>=1){
            b.create('text', [6, -1.5, "+"+kkk+"mm*"+kb.kb3+"开"], {cssClass:'mytext'});
            b.create('text', [12.5, 5, "+"+ccc+"mm*"+kb.sy2+"开"], {cssClass:'mytext'});
        }
        b.create('text', [-3, 3, kkk+"mm*"+kb.kb2+"开"], {cssClass:'mytext'});
        b.create('text', [2.5, -1.5, ccc+"mm*"+kb.kb1+"开"], {cssClass:'mytext'});
        ///总开别
        b.create('text', [-0, 12, "正度："+kb.count+"开"], {cssClass:'mytext',fontSize:25});
    }else{
        var kk=k*0.01;
        var cc=c*0.01;
        for(var n=1;n<=kb.kb5;n++){
            for (var i=0;i<=kb.kb4;i++){
                b.create('line',[[i*kk,cc*n],[kk,cc*n]], {straightFirst:false, straightLast:false, strokeWidth:2});
                b.create('line',[[i*kk,0*cc*n],[i*kk,cc*n]], {straightFirst:false, straightLast:false, strokeWidth:2});
            }
        }
        var t=c*0.01*kb.kb5;
        for(var n=1;n<=kb.sy5;n++){
            for (var i=1;i<=kb.kb6;i++){
                b.create('line',[[c*0.01*n,t+k*0.01*i],[0,t+k*0.01*i]], {straightFirst:false, straightLast:false, strokeWidth:2});
                b.create('line',[[c*0.01*n,t],[c*0.01*n,t+k*0.01*i]], {straightFirst:false, straightLast:false, strokeWidth:2});
            }
        }
        if(kb.kb6>=1){
            b.create('text', [-3.5, 5, "+"+k+"mm*"+kb.kb6+"开"], {cssClass:'mytext'});
            b.create('text', [3, 10, "+"+c+"mm*"+kb.sy5+"开"], {cssClass:'mytext'});
        }
        b.create('text', [-3.5, 3, c+"mm*"+kb.kb5+"开"], {cssClass:'mytext'});
        b.create('text', [2.5, -1.5, k+"mm*"+kb.kb4+"开"], {cssClass:'mytext'});
        b.create('text', [-0, 12, "正度："+kb.count+"开"], {cssClass:'mytext',fontSize:25});
    }
    b.create('text', [-3, 12, typeName], {fontSize:25});
    return kb.count;
}
//
//绘制天地盖盒展开图name=div对象ID，长、宽、高
module.exports.TopBottomdDevelopment=function (name,olong,owide,oheight,typeName){
    //alert(olong);
    var b = jsxgraph.JSXGraph.initBoard(name, {boundingbox: [-5, 10, 10, -5], keepaspectratio: true, axis:false,showCopyright:false,showNavigation:false});
    var cheage=olong > 400? 2.5 : 4
    cheage=owide > 200 ? 2.5 : cheage;
    cheage=owide > 300 ? 1.9 : cheage;
    var long=olong*0.01*cheage;
    var wide=owide*0.01*cheage;
    var height=oheight*0.01*cheage;
    //绘制盒型主体
    b.create('line',[[0,0],[0,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[0,0],[long,0]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[long,0],[long,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[long,wide],[0,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    //绘制盒型高度(左)
    b.create('line',[[0,0],[-height,0]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[-height,0],[-height,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[0,wide],[-height,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    //绘制盒型高度(右)
    b.create('line',[[long,0],[long+height,0]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[long+height,0],[long+height,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[long,wide],[long+height,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    //绘制盒型高度(上)
    b.create('line',[[0,wide],[0,wide+height]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[0,wide+height],[long,wide+height]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[long,wide],[long,wide+height]], {straightFirst:false, straightLast:false, strokeWidth:2});
    //绘制盒型高度(下)
    b.create('line',[[0,0],[0,-height]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[0,-height],[long,-height]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[long,-height],[long,0]], {straightFirst:false, straightLast:false, strokeWidth:2});
    //绘制文字说明
    b.create('text', [long*0.4, wide*0.9, olong+"mm"], {cssClass:'mytext'});
    b.create('text', [long*0.1, wide*0.5, owide+"mm"], {cssClass:'mytext'});
    b.create('text', [long+height*0.2, wide+height*0.5, oheight+"mm"], {cssClass:'mytext'});
    b.create('text', [10, 8.5, typeName], {fontSize:30});
}
//绘制围框V槽图长、宽、V槽尺寸
module.exports.inclose=function(name,olong,owide,oVfillister,typeName){
    var b = jsxgraph.JSXGraph.initBoard(name, {boundingbox: [-5, 10, 10, -5], keepaspectratio: true, axis:true,showCopyright:false,showNavigation:false});
    var long=olong*0.01*3;
    var wide=owide*0.01*3;
    var Vfillister=oVfillister*0.01*3;
    b.create('line',[[0,0],[long,0]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[0,wide],[long,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[0,0],[0,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[long,0],[long,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    //增加V槽标识
    b.create('line',[[Vfillister,0],[Vfillister,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    //添加文字标识
    b.create('text',[long/2,-1.5,olong+"mm"]);
    b.create('text',[-2.5,wide/2,owide+"mm"]);
    b.create('text',[Vfillister/2,wide+1,oVfillister+"mm"]);
    //添加name标识
    b.create('text', [10, 8.5, typeName], {fontSize:30});
}
 //绘制皮壳
module.exports.Hull=function(name,olong,owide,otoplong,oheight,obottomlong,otakeheigt)
{
    var b = jsxgraph.JSXGraph.initBoard(name, {boundingbox: [-5, 10, 10, -5], keepaspectratio: true,axis:false,showCopyright:false,showNavigation:false});
    var change=2.5;
    var long=olong*0.01*change;
    var wide=owide*0.01*change;
    var toplong=otoplong*0.01*change;
    var height=oheight*0.01*change;
    var bottomlong=obottomlong*0.01*change;
    var takeheigt=otakeheigt*0.01*change;
    b.create('line',[[0,0],[long,0]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[0,0],[0,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[0,wide],[long,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[long,0],[long,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[toplong,0],[toplong,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    b.create('line',[[toplong+height,0],[toplong+height,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});    
    b.create('line',[[toplong+height+bottomlong,0],[toplong+height+bottomlong,wide]], {straightFirst:false, straightLast:false, strokeWidth:2});
    //绘制文字说明
    b.create('text', [long/2, -0.8, olong], {fontSize:20});
    b.create('text', [-2.5, wide/2, owide], {fontSize:20});
    b.create('text', [toplong/2, wide+0.5, otoplong], {fontSize:12});
    b.create('text', [toplong+height/2, wide+0.5, oheight], {fontSize:12});
    b.create('text', [toplong+height+bottomlong/2, wide+0.5, obottomlong], {fontSize:12});
    b.create('text', [toplong+height+bottomlong+takeheigt*0.2, wide+0.5, otakeheigt], {fontSize:12});
    //alert (vm.take);
}
//计算绸布,返回实际需要米数
module.exports.drapery=function(long,wide,quantity){//长、宽、数量
  const draperyWide=1500;//宽幅常量
  if(draperyWide % long > draperyWide % wide){
    let t= draperyWide / wide;
    return quantity/t*long/1000;
  }else{
    let t=draperyWide / long;
    return quantity/t*wide/1000;
  }
}
//计算纸箱
module.exports.carton=function(clong,cwide,cheight,long,wide,height){
  /*const clong=530;
  const cwide=480;
  const cheight=330;
  let long=231;
  let wide=220;
  let height=40;*/
  let mlong=clong % long;
  let mwide=clong % wide;
  let mheight=clong % height;
  let re;
  if(mlong>mwide){
    let a=parseInt(clong / wide);
    let b=parseInt(cwide / long);
    let c=parseInt(cheight/height);
    re= a*b*c;
  }else{
    let a=parseInt(clong/long);
    let b=parseInt(cwide/wide);
    let c=parseInt(cheight/height);
    re= a*b*c;
  }
  let mmwide=cwide % long;
  let ree;
  if(mlong >mmwide  && cheight>height){
    let a=parseInt(clong/ height);
    let b=parseInt(cwide/ long);
    let c=parseInt(cheight/ wide);
    ree=a*b*c;
  }else {
    let a=parseInt(clong/long);
    let b=parseInt(cwide/height);
    let c=parseInt(cheight/wide);
    ree=a*b*c;
  }
  return re>ree ? re : ree;
}