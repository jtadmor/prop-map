export const childrenProps = (name, props) => {
  if (props[name + 'Props']) {
    return props[name + 'Props']
  }

  const keys = Object.keys( props )

  return keys.reduce( ( childProps, key ) => {
    if (key.match( new RegExp( `^${name}[A-Z]` ) ) ) {
      const newKey = key.replace( name, '' )
      if ( !newKey ) { return childProps }
      const lowerFirst = newKey[0].toLowerCase() + newKey.slice(1)
      childProps[lowerFirst] = props[key]
    }
    return childProps
  }, {})
}

const createPropAssignmentMap = ( props, arrayOfNames ) => {
  let propKeys = Object.keys(props)

  const assigner = arrayOfNames.reduce( (propLookup, name) => {
    const clone = [].concat(propKeys)
    let numSpliced = 0

    const i = clone.indexOf(`${name}Props`)
    
    if ( i > -1 ) {
      propKeys.splice(i, 1)
      numSpliced++
      propLookup[name] = props[`${name}Props`]
      return propLookup
    }

    const nameProps = clone.reduce( ( obj, key, index ) => {
      if (key === name) {
        propKeys.splice(index - numSpliced, 1)
        numSpliced++
        return obj
      }
      if (key.match( new RegExp( `^${name}[A-Z]`) ) ) {
        propKeys.splice(index - numSpliced, 1)
        numSpliced++
        const newKey = key.replace( name, '' )
        const lowerFirst = newKey[0].toLowerCase() + newKey.slice(1)
        obj[lowerFirst] = props[key]
      }
      return obj
    }, {})

    if ( Object.keys(nameProps).length > 0 ) {
      propLookup[name] = nameProps
    }

    return propLookup
  }, {})

  assigner.$main = propKeys.reduce( (rootProps, key) => {
    rootProps[key] = props[key]
    return rootProps
  }, {})

  return assigner
}

export default createPropAssignmentMap

