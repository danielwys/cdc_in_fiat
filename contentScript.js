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
        switch (elements[item].innerHTML) {
            case "1,000,000 CRO":
                elements[item].innerHTML = (1000000 * croPrice).toFixed(2) + " USD"
                break;
            case "100,000 CRO":
                elements[item].innerHTML = (100000 * croPrice).toFixed(2) + " USD"
                break;
            case "10,000 CRO":
                elements[item].innerHTML = (10000 * croPrice).toFixed(2) + " USD"
                break;
            case "1,000 CRO":
                elements[item].innerHTML = (1000 * croPrice).toFixed(2) + " USD"
                break;
        }

    }
}
