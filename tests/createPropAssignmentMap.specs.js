import expect from 'expect'

import createPropAssignmentMap from '../src/PropMap'

const props = {
  className: 'container',
  div: true,
  divText: 'Hello World',
  divClassName: 'super-div',
  divider: true,
  buttonOnClick: () => 'a'
}

describe('createPropAssignmentMap', () => {

  it('should be a function', () => {
    expect(typeof createPropAssignmentMap).toBe('function')
  })

  it('should distribute props based on names', () => {
    const propMap = createPropAssignmentMap( props, [ 'div', 'button' ])

    expect(typeof propMap).toBe('object', 'Produces an object')
    expect(typeof propMap.div).toBe('object', 'Produces an object for a name with props')

    const divKeys = Object.keys(propMap.div)
    const buttonKeys = Object.keys(propMap.button)

    expect(divKeys.length).toBe(2, 'Captures all named props')
    expect(buttonKeys.length).toBe(1)
    expect(divKeys).toInclude('className', 'Passes through prop without name and correct casing')
    expect(divKeys).toExclude('ider', 'Does not pass through coincidental props')

    expect(propMap.div.className).toBe('super-div', 'Maintains correct value')
  })

  it('should only create an object when there are props', () => {
    const propMap = createPropAssignmentMap( props, [ 'div', 'title' ])

    expect(propMap.title).toNotExist()
  })

  it('should pass remaining properties to $main', () => {
    const propMap = createPropAssignmentMap( props, [ 'div', 'button'])

    expect(typeof propMap.$main).toBe('object', 'Produces an object at $main')

    const keys = Object.keys(propMap.$main)

    expect(keys.length).toBe(2)
    expect(keys).toInclude('className').toInclude('divider', 'Contains proper keys at $main')
    expect(keys).toExclude('div', 'Does not contain names')
  })

  it('should accept nameProps objects', () => {
    const props = {
      divProps: {
        'className': 'super-div',
        'text': 'Hello World'
      }
    }

    const propMap = createPropAssignmentMap(props, ['div'])
    const divKeys = Object.keys(propMap.div)
    const $mainKeys = Object.keys(propMap.$main)

    expect(typeof propMap.div).toBe('object', 'Create an object at proper key')
    expect(divKeys).toInclude('className').toInclude('text', 'Props contains proper keys')
    expect($mainKeys.length).toBe(0, 'Excludes nameProps from $main')
  })
})
