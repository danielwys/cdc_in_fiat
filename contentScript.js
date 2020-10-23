let elements = document.getElementsByClassName("card-name d-block text-blue-300");

let croUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=crypto-com-chain&vs_currencies=usd';

function getCroPrice(callback) {
    return fetch(croUrl).then(response => response.text());
}

function parsePrice(text) {
    let priceObject = JSON.parse(text);
    return Object.values(priceObject)[0].usd;
}

Promise.all(
    [
        getCroPrice(),
    ]
).then(response => {
    modifyPrice(response);
})

function modifyPrice(croPriceObj) {
    let croPrice = parsePrice(croPriceObj);
    
    for (item in elements) {
        let html = elements[item].innerHTML;
        let price = parseInt(html.split(" ")[0].replace(/,/g,""));
        let unit = html.split(" ")[1];

        if (unit && unit == "CRO") {
            elements[item].innerHTML = (price * croPrice).toFixed(2) + " USD";
        }

    }
}
