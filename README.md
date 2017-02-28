Hi, I'm using SimpleSchema to create a form like this:


```
schema = new SimpleSchema({
    title: {type: String},
    address: {type: Object},
    "address.address": {type: String},
    "address.placeId": {type: String},
    "address.position": {type: Object},
    "address.position.lat": {type: Number, decimal: true},
    "address.position.lng": {type: Number, decimal: true},
})
```
I'm using my custom component to get the address from a map.
![captura de pantalla 2017-02-28 a las 3 27 16 p m](https://cloud.githubusercontent.com/assets/3970983/23392912/919a60fe-fdca-11e6-8ff2-2744fd5f9978.png)

This component return or undefined or a object like 
`{address,placeId,position:{las,lng}}`

The problem is no error is no required error is detected by uniforms

for run clone this repo and
```
npm install
npm start
```