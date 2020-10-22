let elements = document.getElementsByClassName("card-name d-block text-blue-300");

let croUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=crypto-com-chain&vs_currencies=usd';
let mcoUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=monaco&vs_currencies=usd';

function getCroPrice(callback) {
    return fetch(croUrl).then(response => response.text());
}

function getMcoPrice(callback) {
    return fetch(mcoUrl).then(response => response.text());
}

function parsePrice(text) {
    let priceObject = JSON.parse(text);
    return Object.values(priceObject)[0].usd;
}

Promise.all(
    [
        getCroPrice(),
        getMcoPrice()
    ]
).then(response => {
    modifyPrice(response[0], response[1]);
})

function modifyPrice(croPriceObj, mcoPriceObj) {
    let croPrice = parsePrice(croPriceObj);
    let mcoPrice = parsePrice(mcoPriceObj);

    let ratio = mcoPrice/croPrice;
    
    for (item in elements) {
        switch (elements[item].innerHTML) {
            case "1,000,000 CRO":
                elements[item].innerHTML = (1000000/ratio).toFixed(2) + " MCO"
                break;
            case "100,000 CRO":
                elements[item].innerHTML = (100000/ratio).toFixed(2) + " MCO"
                break;
            case "10,000 CRO":
                elements[item].innerHTML = (10000/ratio).toFixed(2) + " MCO"
                break;
            case "1,000 CRO":
                elements[item].innerHTML = (1000/ratio).toFixed(2) + " MCO"
                break;
        }

        console.log(elements[item].innerHTML)
    }
}
