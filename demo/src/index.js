import React, {Component, Fragment} from 'react'
import {render} from 'react-dom'

import Commit from '../../src'

class Demo extends Component {

  mockCommit = fail => () => {
    return new Promise((res, err) =>
      setTimeout(() => (fail ? err({ message: 'I failed' }) : res({ status: 200 })), 500),
    );
  };

  render() {
    return (
      <Commit fn={this.mockCommit(false)}>
        {({ err = {}, res = {}, loading, retry }) => (
          <Fragment>
            <h2>Hover over me!</h2>

            <div>
              <div>Loading: {loading.toString()}</div>
              <div>err: {JSON.stringify(err)}</div>
              <div>res: {JSON.stringify(res)}</div>
            </div>

            <button onClick={retry}>
              Retry
            </button>
          </Fragment>
        )}
      </Commit>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
