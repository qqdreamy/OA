import SizeCount from '../lib/SizeCount'
import AV from 'leancloud-storage'

const mythick = {
  '2': 1150,
  '1.5': 850,
  '2.5': 1450,
  '3': 1750
}
// 初始化 leancloud
const appId = 'cjtOItWI6rsyCzjvJCh9iSMH-gzGzoHsz'
const appKey = '5uIGW67Gq2wbEnLaD7IlVUHu'
AV.init({ appId, appKey })

let Cardboard = []
let Process = []
let Papers = []
let Prints = []
let FinishPrints = []
let Ropes = []

// @根据key查询指定数组
function findCardbord (element) {
  return element.name === this
}
  // 拼板算法
function MakeUp (long, wide, quantity) {
  let printQuantity = quantity
  if (wide > long) {
    // [long, wide] = [wide, long]
  }
  if (Math.floor(590 / (long + 6)) >= Math.floor(440 / (wide + 6)) && Math.floor(590 / (long + 6)) !== 0) { // 4K尺寸可拼多个进行拼板算法
    printQuantity = quantity / (Math.floor(440 / (wide + 6)) * Math.floor(590 / (long + 6)))
  } else if (long < 590) {
    printQuantity = quantity / Math.floor(590 / (long + 6))
  }
  return printQuantity
}
class CountPrice {
  static async getPriceList () {
    let query = new AV.Query('Prices')
    let results = await query.first()
    return results.toFullJSON()
  }
  static parseJSON (json) {
    return AV.parseJSON(json)
  }
  // @获取最新报价
  static async getPrices () {
    let query = new AV.Query('Prices')
    let results = await query.first()
    Cardboard = results.get('Cardboards')
    Process = results.get('Process')
    Papers = results.get('Papers')
    Prints = results.get('Prints')
    FinishPrints = results.get('FinishPrints')
    Ropes = results.get('Ropes')
  }
  // 印刷费
  // 2017-02-17加入拼板算法
  static PrintPromise (clong, cwide, quantity, pType) {
    let long = Number(clong)
    let wide = Number(cwide)
    let printQuantity = MakeUp(long, wide, quantity)
    console.log('printQuantity' + printQuantity)
    let printKB = long > 880 ? '全开' : long > 590 ? '对开' : '四开'
    let pName = pType === 0 ? '四色印刷' : pType === 2 ? '专色印刷' : '单色印刷'
    let p = Prints.find(findCardbord, pName + '-' + printKB).price
    let addPrice = Prints.find(findCardbord, pName + '-' + printKB).addPrice
    let pr = (Number(p) + Number(printQuantity - 1000 > 0 ? addPrice * (printQuantity - 1000) : 0))
    return (pr / quantity)
  }
  // 计算加工费
  static ProcessPromise (name, quantity) {
    let price = Process.find(findCardbord, name)
    return price[quantity] === 'undefined' ? price.startPrice : price[quantity]
  }
  // 瓦楞片(内托)
  static CorrugatedPromise (long, wide, name) {
    return new Promise(function (resolve, reject) {
      let query = new AV.Query('CopperplatePapers')
      query.select(['price'])
      query.startsWith('name', '瓦楞片')
      query.first().then(results => {
        let Square = (long / 1000) * (wide / 1000)
        let price = results.get('price')
        resolve(Square * price)
      })
    })
  }
  // 三层瓦楞直接印刷
  static ThreeCorrugated (long, wide, name) {
    return new Promise(function (resolve, reject) {
      let query = new AV.Query('FinishPrints')
      query.select(['price'])
      query.startsWith('name', name)
      query.first().then(results => {
        let Square = (long / 1000) * (wide / 1000)
        let price = results.get('price')
        resolve(Square * price)
      })
    })
  }
  // 裱3层瓦楞
  static CorrugatedMount (long, wide, name) {
    return new Promise(function (resolve, reject) {
      let query = new AV.Query('FinishPrints')
      query.select(['price'])
      query.startsWith('name', name)
      query.first().then(results => {
        let Square = (long / 1000) * (wide / 1000)
        let price = results.get('price')
        resolve(Square * price)
      })
    })
  }
  // 珍珠棉/PE等按立方计算的价格类
  static EPE (long, wide, height, name) {
    return new Promise(function (resolve, reject) {
      let query = new AV.Query('CopperplatePapers')
      query.select(['price'])
      query.startsWith('name', name)
      query.first().then(results => {
        let Cube = (long / 1000) * (wide / 1000) * (height / 1000)
        let price = results.get('price')
        resolve(Cube * price)
      })
    })
  }
  // 绸布
  static DraperyPromise (long, wide, quantity, type) {
    return new Promise(function (resolve, reject) {
      let query = new AV.Query('CopperplatePapers')
      query.select(['price'])
      query.startsWith('name', type)
      query.first().then(results => {
        let metric = SizeCount.drapery(long, wide, quantity)
        let price = results.get('price')
        resolve(metric * price / quantity)
      })
    })
  }
  // ddd
  static CardboardPromise (long, wide, CardboardName, thick, cutt) {
    // 厚度转换
    let mthick
    for (let i in mythick) {
      if (thick === i) {
        mthick = mythick[i]
        break
      }
    }
    // 是否含切纸费
    let cuttPrice = 0
    if (typeof (cutt) !== 'undefined' && cutt) {
    }
    return new Promise(function (resolve, reject) {
      let query = new AV.Query('Cardboards')
      query.select(['Name', 'Price'])
      query.startsWith('Name', CardboardName)
      let dKB = SizeCount.KbCountBig(1, long, wide).count
      let zKB = SizeCount.KbCountBig(0, long, wide).count
      query.first().then(results => {
        let tonPrice = results.get('Price')
        let zPrice = (tonPrice / 2327 * mthick / 500) + cuttPrice// 计算单张价格
        let dPrice = (tonPrice / 1884 * mthick / 500) + cuttPrice
        resolve((dPrice / dKB > zPrice / zKB ? zPrice / zKB : dPrice / dKB))
      })
    })
  }
  static CheckCardboard (long, wide, tonPrice, thick, quantity, cutt) {
    // 厚度转换
    let mthick
    for (let i in mythick) {
      if (thick === i) {
        mthick = mythick[i]
        break
      }
    }
    let Price = {}
    // 是否含切纸费
    let cuttPrice = 0
    if (typeof (cutt) !== 'undefined' && cutt) {
    }
    let dKB = SizeCount.KbCountBig(1, long, wide).count
    let zKB = SizeCount.KbCountBig(0, long, wide).count
    var zPrice = (tonPrice / 2327 * mthick / 500) + cuttPrice// 计算单张价格
    var dPrice = (tonPrice / 1884 * mthick / 500) + cuttPrice
    console.log('zPrice' + zPrice)
    console.log('dPrice' + dPrice)
    Price.z = Math.ceil(quantity / zKB) * zPrice
    Price.d = Math.ceil(quantity / dKB) * dPrice
    return Price
  }
  // 计算包纸
  static ColorSurface (long, wide, paper, paperWeight, price) {
    let dKB = SizeCount.KbCountBig(1, long, wide).count
    let zKB = SizeCount.KbCountBig(0, long, wide).count
    if (price !== 0) {
      return price / zKB
    } else {
      let tonPrice = Papers.find(findCardbord, paper).price
      let zPrice = (tonPrice / 2327 * paperWeight / 500)
      let dPrice = (tonPrice / 1884 * paperWeight / 500)
      return dPrice / dKB > zPrice / zKB ? zPrice / zKB : dPrice / dKB
    }
  }
  static KaHePromise (clong, cwide, quantity) {
    return new Promise((resolve, reject) => {
      let query = new AV.Query('FinishPrints')
      let long = Number(clong)
      let wide = Number(cwide)
      query.select(['price', 'addPrice'])
      query.startsWith('name', '卡合')
      let printQuantity = this.MakeUp(long, wide, quantity)
      query.first().then(results => {
        let p = results.get('price')
        let addPrice = results.get('addPrice')
        p = p + Number(printQuantity - 2000 > 0 ? addPrice * (printQuantity - 2000) : 0)
        resolve(p / quantity)
      })
    })
  }
  // 粘盒
  static StickyBox (quantity) {
    return new Promise((resolve, reject) => {
      let query = new AV.Query('FinishPrints')
      query.select(['price', 'addPrice'])
      query.startsWith('name', '粘盒')
      query.first().then(results => {
        let addPrice = results.get('addPrice')
        let price = results.get('price')
        resolve(quantity * addPrice > price ? quantity * addPrice / quantity : price / quantity)
      })
    })
  }
  static Film (long, wide, quantity) {
    // 计算覆膜平方
    let Square = long / 1000 * wide / 1000
    let price = FinishPrints.find(findCardbord, '覆膜').price
    let addPrice = FinishPrints.find(findCardbord, '覆膜').addPrice
    return Square * addPrice * quantity > price ? Square * addPrice : price / quantity
  }
  // 纸箱价格
  static Carton (long, wide, height) {
    const clong = 530
    const cwide = 480
    const cheight = 330
    const p = 7
    return p / SizeCount.carton(clong, cwide, cheight, long, wide, height)
  }
  // 烫金
  static Permed (type, quantity) {
    let p = FinishPrints.find(findCardbord, '烫金').price
    let addPrice = FinishPrints.find(findCardbord, '烫金').addPrice
    p = p + Number(quantity - 1000 > 0 ? addPrice * (quantity - 1000) : 0)
    return (p / quantity * type)
  }
  // 提绳
  static Rope (type) {
    return Ropes.find(findCardbord, type).price
  }
  // UV
  static UVPromise (long, wide, quantity) {
    return new Promise((resolve, reject) => {
      let query = new AV.Query('FinishPrints')
      query.select(['price'])
      query.startsWith('name', 'UV')
      query.first().then(results => {
        let Square = (long / 1000) * (wide / 1000)
        let p = results.get('price')
        let addPrice = results.get('addPrice')
        let singlePrice = results.get('singlePrice')
        resolve(Square * addPrice * quantity > p ? Square * addPrice < singlePrice ? singlePrice : Square * addPrice : p / quantity)
      })
    })
  }
}

export default CountPrice
