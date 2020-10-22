let elements = document.getElementsByClassName("card-name d-block text-blue-300");

console.log(elements);
let url = 'https://api.coingecko.com/api/v3/simple/price?ids=crypto-com-chain&vs_currencies=usd'

fetch(url).then(response => response.text()).then(text => modifyPrice(parsePrice(text))).catch(error => console.log(error));

function parsePrice(text) {
    let priceObject = JSON.parse(text);
    return priceObject["crypto-com-chain"].usd;
}

function modifyPrice(price) {
    console.log(price)
    for (item in elements) {
        switch (elements[item].innerHTML) {
            case "1,000,000 CRO":
                elements[item].innerHTML = (price * 1000000).toFixed(2) + " USD"
                break;
            case "100,000 CRO":
                elements[item].innerHTML = (price * 100000).toFixed(2) + " USD"
                break;
            case "10,000 CRO":
                elements[item].innerHTML = (price * 10000).toFixed(2) + " USD"
                break;
            case "1,000 CRO":
                elements[item].innerHTML = (price * 1000).toFixed(2) + " USD"
                break;
        }

        console.log(elements[item].innerHTML)
    }
}
