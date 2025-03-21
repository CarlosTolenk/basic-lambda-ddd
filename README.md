# mk-sendToOrderToClient

Ejemplo de arquitectura con principios en DDD

## Setear env para layer y nombres de tablas
crear un .env en la raiz de la lambda, con las variables detalladae en env.template
```js
LAYERS_BASE_PATH=../../../layer/node-tecnico
```

## Request for debug
Se debe agregar la siguiente IIFE justo antes del export en el archivo index.js con el json de input que se desee
```js
(async() => {
    await handleRequest({
        headers: {
            'Authorization': 'token',
            'cpgId': '001',
            'countryId': 'CL',
            'organizationId': '3043',
            'transactionId': 'd61e8405-d4b4-4d4f-ae35-76b76137f774',
            'b2bSession': {
                'Authorization': 'token-id'
            },
            'appID': 'MiMarket',
            'appVersion': 'ios',
            'appOs': 'ios',
            'appOsVersion': '17.0.1'
        },
        'clientId': '217',
        'orderId': 1313,
        'longitude': -2.1933527,
        'latitude': -79.8934204,
        'deliveryDate': '2024-06-14T23:59:00.000Z"',
        'deliveryFrozenDate': '2024-06-14T23:59:00.000Z',
        'paymentMethod': 'C'
    });
})();

```

## Response: 
```js
{
    result: true,
    isCollaborative: false
}
```
