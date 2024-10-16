var stocks = new Stocks('Q389U2UW5M159N9S');


async function request (sym) {
  var result = await stocks.timeSeries({
    symbol: sym,
    interval: 'daily',
    amount: 10
   });

   return JSON.stringify(result, null, 2);
}


async function getStockData() {
    const stockSymbol = document.getElementById("sym").value;

    const displayArea = document.getElementById("display");

    const result = await request(stockSymbol);

    displayArea.value = result;
}

document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    getStockData();
});
