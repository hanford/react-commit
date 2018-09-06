# react-commit
> lazily execute async functions on user initiated action

[![npm package][npm-badge]][npm]

### Usage

```sh
$ npm install react-commit --save
```

```js
import Commit from 'react-commit'

...
return (
  <Commit
    fn={RequestTempToken.commit}
    onMouseEnter
    delayMs={500}
    cacheTime={60 * 1000}
  >
    {({ isLoading, retry, err, res }) => (
      <Button
        onClick={() => (err || !res ? retry() : this.onClick(res))}
        disabled={disabled ? disabled : isLoading}
      >
        {children}
      </Button>
    )}
  </Commit>
)
```

## API
| Param          | Type    | functionality | required |
|----------------|---------|-----------------|-----------------|
| fn           | Function | function to execute | true |
| children       | Function    | receive {isLoading, retry, err, res} | true |
| delayMs       | miliseconds    | minimum time to be isLoading = true | false |
| cacheTime       | miliseconds    | time to cache res before invoking fn again | false |
| onMouseEnter       | Boolean    | whether to invoke fn on mouseEnter | false |
| onClick       | Boolean    | whether to invoke fn on onClick | false |


[npm-badge]: https://img.shields.io/npm/v/react-commit.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-commit

Questions? Feedback? [Please let me know](https://github.com/hanford/react-commit/issues/new)

## License (MIT)

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```
Copyright © 2017-present [Jack Hanford](http://jackhanford.com) jackhanford@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
