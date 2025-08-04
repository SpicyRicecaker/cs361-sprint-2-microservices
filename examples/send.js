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