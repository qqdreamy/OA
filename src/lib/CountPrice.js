import SizeCount from '../lib/SizeCount.js'
const mythick={
  '2':1150,
  '1.5':850,
  '2.5':1450,
  '3':1750
}
module.exports.Print=function(long,wide,quantity,pType){//传入需印刷的长宽尺寸，以及数量，返回印刷价格
  let boxJson=require("../json/Technology.json");
  let printKB=long > 870 ? '全开' : long > 580 ? '对开' : '四开';
  let pName= pType=='1'? '四色印刷' : pType=='3' ? '专色印刷' : '单色印刷';
  let p=boxJson[pName][printKB].price;
  p=p+Number(quantity-1000 >0 ? boxJson[pName][printKB].addPrice*(quantity-1000) : 0);
  return (p/quantity).toFixed(2);
}
//计算加工费
module.exports.Process=function(name,quantity){
  let boxJson=require('../json/Process.json');
  let p= typeof(boxJson[name][quantity])=="undefined" ? boxJson[name]['起步价']/quantity : boxJson[name][quantity];
  //let p = quantity < 1000 ? boxJson[name]['起步价']/quantity : boxJson[name][quantity];
  return p;
}
//计算纸板价格
module.exports.Cardboard=function(long,wide,CardboardName,thick,cutt){
  //厚度转换
  let mthick;
  for (let i in mythick){
    if(thick==i){
      mthick=mythick[i];
      break;
    }
  }
  //是否含切纸费
  let cuttPrice=0;
  if(typeof(cutt)!="undefined" && cutt){
    let boxJson=require("../json/cutt.json");
    let kb=SizeCount.KbCountBig(1,long,wide).count;
    let kbName=kb>25 ? '49k' : kb>10 ? '24k' : kb>5 ? '9k' : kb>2 ? '4k' : '9k';
    cuttPrice=boxJson[thick][kbName];
  } 
  let boxJson = require("../json/CardboardPrice.json");
  let dKB=SizeCount.KbCountBig(1,long,wide).count;
  let zKB=SizeCount.KbCountBig(0,long,wide).count;
  let tonPrice=boxJson[CardboardName]['吨价'];
  var zPrice=(tonPrice/2327*mthick/500)+cuttPrice;//计算单张价格
  var dPrice=(tonPrice/1884*mthick/500)+cuttPrice;
  return (dPrice/dKB>zPrice/zKB ? zPrice/zKB : dPrice/dKB);
}
//计算纸板价格-公式2//返回纸板总价-方便核对纸板开料价格
module.exports.CheckCardboard=function(long,wide,tonPrice,thick,quantity,cutt){
  //厚度转换
  let mthick;
  for (let i in mythick){
    if(thick==i){
      mthick=mythick[i];
      break;
    }
  }
  let Price = new Object();
  //是否含切纸费
  let cuttPrice=0;
  if(typeof(cutt)!="undefined" && cutt){
    let boxJson=require("../json/cutt.json");
    let kb=SizeCount.KbCountBig(1,long,wide).count;
    let kbName=kb>25 ? '49k' : kb>10 ? '24k' : kb>5 ? '9k' : kb>2 ? '4k' : '9k';
    cuttPrice=boxJson[thick][kbName];
  } 
  let dKB=SizeCount.KbCountBig(1,long,wide).count;
  let zKB=SizeCount.KbCountBig(0,long,wide).count;
  var zPrice=(tonPrice/2327*mthick/500)+cuttPrice;//计算单张价格
  var dPrice=(tonPrice/1884*mthick/500)+cuttPrice;
  Price.z= Math.ceil(quantity/zKB)*zPrice;
  Price.d= Math.ceil(quantity/dKB)*dPrice;
  return Price;
  //(dPrice/dKB>zPrice/zKB ? zPrice/zKB : dPrice/dKB);
}
module.exports.ColorSurface=function(long,wide,paper,paperWeight,price){//长、宽、纸张名称、克重、自设纸价格
  let dKB=SizeCount.KbCountBig(1,long,wide).count;
  let zKB=SizeCount.KbCountBig(0,long,wide).count;
  if(typeof(price)!="undefined"){
    return price/zKB;
  }else{
    let boxJson = require('../json/CopperplatePaper.json');
    let tonPrice=boxJson[paper]['吨价'];
    let zPrice=(tonPrice/2327*paperWeight/500);//计算单张价格
    let dPrice=(tonPrice/1884*paperWeight/500);
    console.log('test'+paperWeight);
    console.log('test2'+(tonPrice/1884*paperWeight/500));
    return (dPrice/dKB>zPrice/zKB ? zPrice/zKB : dPrice/dKB);
  }
}
//卡合
module.exports.KaHe=function(long,wide,quantity){
  let boxJson=require("../json/Technology.json");
  let p=boxJson['卡合'].price;
  p=p+Number(quantity-1000 >0 ? boxJson['卡合'].addPrice*(quantity-1000) : 0);
  return (p/quantity);
}
//覆膜
module.exports.film=function(long,wide,quantity){//按照平方计算价格
  let boxJson=require("../json/Technology.json");
  let Square=long/1000*wide/1000;
  return Square*boxJson['覆膜'].addPrice*quantity > boxJson['覆膜'].price ? Square*boxJson['覆膜'].addPrice : boxJson['覆膜'].price/quantity;
}
//切纸费
module.exports.cutt=function(long,wide,thick){
  let boxJson=require("../json/cutt.json");
  let kb=SizeCount.KbCountBig(1,long,wide).count;
  let kbName=kb>25 ? '49k' : kb>10 ? '24k' : kb>5 ? '9k' : kb>2 ? '4k' : '9k';
  return boxJson[thick][kbName];
}
//纸箱价格
module.exports.Carton=function(long,wide,height) {
  const clong=530;
  const cwide=480;
  const cheight=330;
  const p=5;
  return p/SizeCount.carton(clong,cwide,cheight,long,wide,height);
}
//烫金价格
module.exports.Permed=function(type,quantity) {
  let boxJson=require("../json/Technology.json");
  let p=boxJson['烫金'].price;
  p=p+Number(quantity-1000 >0 ? boxJson['烫金'].addPrice*(quantity-1000) : 0);
  return (p/quantity)*type;
}
//提绳
module.exports.Rope=function(type) {
  let boxJson=require("../json/other.json");
  return boxJson['提绳'][type].price;
}