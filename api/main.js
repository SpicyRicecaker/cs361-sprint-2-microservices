// api/main.js

// acceptible inputs

const fromToMappings = {
  "mi": ["km"],
  "km": ["mi"],
  "m": [
    "cm",
    "ft",
    "ft-in"
  ],
  "ft-in": ["m"],
  "ft": ["m"],
  "cm": ["in", 'm'],
  "in": ["cm"]
}

const fromToUnits = {
  "mi": [1.609],
  "km": [1/1.609],
  "m": [
    100,
    3.281,
    [3.281, 39.37],
  ],
  "ft-in": [
    [1/3.281, 1/39.37]
  ],
  "ft": [1/3.281],
  "cm": [1/2.54, 1/100],
  "in": [2.54]
}

// acceptible outputs

const acceptableTo = {

}

/**
 * A simple Vercel Serverless Function.
 *
 * @param {import('@vercel/node').VercelRequest} req - The request object.
 * @param {import('@vercel/node').VercelResponse} res - The response object.
 */
export default async function handler(req, res) {
  // You can access query parameters like this:
  // const { name } = req.query;

  // Set the status code and send a JSON response.
  if (req.method !== 'POST') {
    res.status(405).json({error: "Method Not Allowed"})
    return
  }

  let r
  try {
    r = req.body
  } catch (e) {
    res.status(400).json({error: "invalid json payload"})
    return
  }

  if (!r.values) {
    res.json({
      error: "values not provided"
    })
    return
  }
  const values = []
  const errors = []
  const valueErr = { converted: -1 }

  for (let i = 0; i < r.values.length; i++) {
    const value = r.values[i]
    if (!value.from) {
      values.push(valueErr)
      errors.push({valueIndex: i, error: "`from` field not provided"})
      continue
    }
    if (!value.to) {
      values.push(valueErr)
      errors.push({valueIndex: i, error: "`to` field not provided"})
      continue
    }
    if (!value.value) {
      values.push(valueErr)
      errors.push({valueIndex: i, error: "`value` field not provided"})
      continue
    }
    if (value.from === 'ft-in' && !value.value2) {
      values.push(valueErr)
      errors.push({valueIndex: i, error: "`value2` field not provided for `ft-in`"})
      continue
    }
    if (!(value.from in fromToMappings)) {
      values.push(valueErr)
      errors.push({valueIndex: i, error: `\`from\` field \`${value.from}\` is not a valid unit`})
      continue
    }
    if (!(fromToMappings[value.from].includes(value.to))) {
      values.push(valueErr)
      errors.push({valueIndex: i, error: `\`to\` field \`${value.to}\` not a matching conversion for ${value.from}`})
      continue
    }
    if (value.from === 'ft-in') {
      if (!(value.value2)) {
        values.push(valueErr)
        errors.push({valueIndex: i, error: `value2 (inch field) not included for conversion from ft-in`})
        continue
      }
      // simply return values
      const [factor, factor2] = [1/3.281, 1/39.37]
      values.push({converted: value.value * factor + value.value2 * factor2})
    } else if (value.to === 'ft-in') {
      const nIn = value.value * 39.37
      const ft = Math.floor(nIn / 12)
      const _in = nIn - ft * 12

      values.push({converted: ft, converted2: _in})
    } else {
      // get the index of the ith conversion factor
      const idx = fromToMappings[value.from].indexOf(value.to)
      // reference the units
      const factor = fromToUnits[value.from][idx]
      values.push({converted: value.value * factor})
    }
  }

  const status = (() => {
    if (errors.length === 0) {
      return 200
    } else {
      return 400
    }
  })()


  res.status(status).json({
    values: JSON.stringify(values),
    errors: JSON.stringify(errors)
  })
}
