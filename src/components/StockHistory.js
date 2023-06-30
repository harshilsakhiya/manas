export default class StocksHistory {
    /** gets stock OHLC prices for multiple stocks */
  
    static async getMultipleStocks() {
      // getting prices of multiples stocks asynchronously
      const dataSources = [
        //await this.getAmazonStock(),
        await this.getGoogleStock(),
        await this.getMicrosoftStock()
        //await this.getTeslaStock()
      ]
  
      return new Promise((resolve, reject) => {
        resolve(dataSources)
      })
    }
  
    /** gets Amazon stock OHLC prices from a .JSON file */
    static async getAmazonStock() {
      let url =
        "https://static.infragistics.com/xplatform/data/stocks/stockAmazon.json"
      let response = await fetch(url)
      let jsonData = await response.json()
      let stockData = this.convertData(jsonData)
      // setting data intent for Series Title, e.g. FinancialChart usage
      stockData.__dataIntents = {
        close: ["SeriesTitle/Amazon"]
      }
      // console.log("fetchAmazonStock: ", stockData.length);
  
      return new Promise((resolve, reject) => {
        resolve(stockData)
      })
    }
  
    /** gets Tesla stock OHLC prices from a .JSON file */
    static async getTeslaStock() {
      let url =
        "https://static.infragistics.com/xplatform/data/stocks/stockTesla.json"
      let response = await fetch(url)
      let jsonData = await response.json()
      let stockData = this.convertData(jsonData)
      // setting data intent for Series Title, e.g. FinancialChart usage
      stockData.__dataIntents = {
        close: ["SeriesTitle/Tesla"]
      }
      return new Promise((resolve, reject) => {
        resolve(stockData)
      })
    }
  
    /** gets Microsoft stock OHLC prices from a .JSON file */
    static async getMicrosoftStock() {
      let url =
        "https://static.infragistics.com/xplatform/data/stocks/stockMicrosoft.json"
      let response = await fetch(url)
      let jsonData = await response.json()
      let stockData = this.convertData(jsonData)
      // setting data intent for Series Title, e.g. FinancialChart usage
      stockData.__dataIntents = {
        close: ["SeriesTitle/Microsoft"]
      }
      return new Promise((resolve, reject) => {
        resolve(stockData)
      })
    }
  
    /** gets Google stock OHLC prices from a .JSON file */
    static async getGoogleStock() {
      let url =
        "https://static.infragistics.com/xplatform/data/stocks/stockGoogle.json"
      let response = await fetch(url)
      let jsonData = await response.json()
      let stockData = this.convertData(jsonData)
      // setting data intent for Series Title, e.g. FinancialChart usage
      stockData.__dataIntents = {
        close: ["SeriesTitle/Google"]
      }
      return new Promise((resolve, reject) => {
        resolve(stockData)
      })
    }
  
    static convertData(jsonData) {
      let stockItems = []
  
      for (let json of jsonData) {
        let parts = json.date.split("-") // "2020-01-01"
        let item = new StockItem()
        item.date = new Date(parts[0], parts[1], parts[2])
        item.open = json.open
        item.high = json.high
        item.low = json.low
        item.close = json.close
        item.volume = json.volume
        stockItems.push(item)
      }
  
      return stockItems
    }
  }
  
  export class StockItem {}