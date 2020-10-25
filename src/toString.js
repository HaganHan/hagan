import getType from './getType'

function toString (data) {
  switch (getType(data)) {
    case 'Symbol':
      return data.toString()
    case 'NaN':
      return data.toString()
    case 'Number':
      return data.toString()
    case 'Infinity':
      return data.toString()
    case 'String':
      return data
    case 'Null':
      return String(data)
    case 'Undefined':
      return String(data)
    case 'Boolean':
      return data.toString()
    case 'Function':
      return data.toString()
    case 'Date':
      return data.toString()
    case 'Array':
      return JSON.stringify(data)
    case 'RegExp':
      return data.toString()
    case 'BigInt':
      return data.toString()
    case 'Object':
      return JSON.stringify(data)
    case 'Unknown':
      return 'Unknown'
    default:
      return data.constructor.name
        ? `${data.constructor.name} ${JSON.stringify(data)}`
        : ''
  }
}

export default toString