# cs361-sprint-2-microservice

## Overview

This program allows for bidirectional unit conversion for the following units:

km<->mi
m<->ft, in
cm<->in

To use this microservice, make an HTTP POST request to http://cs361-sprint-2-microservice.vercel.app/api/main with a body containing objects on the `values` field, where each object has a `from`, `to`, and `value` field.

If you are converting from `ft-in` to m, then you must have a `value2` including the number of inches, in addition to a `value` field.

## Example Call Instruction

Here is an example NodeJS POST request with a valid body to the microservice:

```js
(async () => {
    await fetch("http://cs361-sprint-2-microservice.vercel.app/api/main", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                values: [
                    { "from": "km", "to": "mi", "value": 1.6 },
                    { "from": "mi", "to": "km", "value": 1 },
                    { "from": "m", "to": "ft-in", "value": 1.8 },
                    { "from": "ft-in", "to": "m", "value": 5, "value2": 10 },
                    { "from": "cm", "to": "in", "value": 2.54 },
                    { "from": "in", "to": "cm", "value": 1 },
                    { "from": "m", "to": "ft", "value": 1 },
                    { "from": "ft", "to": "m", "value": 3.28 },
                    { "from": "cm", "to": "m", "value": 100 },
                    { "from": "m", "to": "cm", "value": 1 }
                ]
            }
        )
    })
})()
```

## Example Receive Instruction

Here is an example of a valid NodeJS POST request with a valid body to the microservice, that also parses and reads the data as JSON.

```js
(async () => {
    const res = await fetch("http://cs361-sprint-2-microservice.vercel.app/api/main", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                values: [
                    { "from": "km", "to": "mi", "value": 1.6 },
                    { "from": "mi", "to": "km", "value": 1 },
                    { "from": "m", "to": "ft-in", "value": 1.8 },
                    { "from": "ft-in", "to": "m", "value": 5, "value2": 10 },
                    { "from": "cm", "to": "in", "value": 2.54 },
                    { "from": "in", "to": "cm", "value": 1 },
                    { "from": "m", "to": "ft", "value": 1 },
                    { "from": "ft", "to": "m", "value": 3.28 },
                    { "from": "cm", "to": "m", "value": 100 },
                    { "from": "m", "to": "cm", "value": 1 }
                ]
            }
        )
    })
    if (!(res.status === 200)) {
        console.log(res)
        return
    }
    const data = await res.json()
    console.log(data)
})()
```

## UML Class Diagram

![alt text](<2025-08-4-cs361-sprint-2-microservice-uml-diagram (1).png>)