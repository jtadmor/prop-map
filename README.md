# prop-map
<em>A small utility function for assigning properties based on names.</em>

`npm install prop-map`

tl,dr:

```
import createPropMap from 'prop-map'

const props = {
 className: 'cool-class',
 buttonClassName: 'cool-button',
 buttonOnClick: coolClickHandler,
 titleProps: {
  className: 'cool-text'
  onHover: coolHoverHandler
 },
 title: true,
 someOtherProp: someValue
}

const propMap = createPropMap(props, ['button','title'])
<div {...propMap.$main}>
 { props.title && <h1 {...propMap.title}>So Cool</h1> }
 <button {...propMap.button} />
</div>
```

propMap will look like:

```
 {
 $main: { className: 'cool-class', someOtherProp: someValue },
 button: { className: 'cool-button', onClick: coolClickHandler },
 title: { className: 'cool-text', onHover: coolHoverHandler }
}
```

 If you just want the properties for one name:
 
 ```
 import { childrenProps } from 'prop-map'
 
 const buttonProps = childrenProps('button', props)
 ```
