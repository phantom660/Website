var stocks = new Stocks('1Q0CJ1D2YU2RDV71');


async function request (sym) {
  var result = await stocks.timeSeries({
    symbol: sym,
    interval: 'daily',
    amount: 10
   });

   return JSON.stringify(result);
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
