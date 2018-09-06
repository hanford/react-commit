import * as React from 'react';

type Props = {
  fn: () => void, // commit or async function we want to invoke
  delayMs: number,
  cacheTime: number, // ms to cache response, once time is up user will need to re-invoke
  onMouseEnter: boolean,
  onClick: boolean
};

type State = {
  loading: boolean,
  res: any,
  err: any,
};

const isEmptyObject = (obj = {}) => Object.keys(obj).length === 0 && obj.constructor === Object;

export default class Commit extends React.Component<Props, State> {
  isCacheValid: boolean;
  cacheFunction: any;

  static defaultProps = {
    delayMs: 300,
    onClick: false,
    onMouseEnter: true,
    cacheTime: 15 * 60 * 1000, // 15 mins
  };

  state = {
    err: undefined,
    res: undefined,
    loading: false,
  };

  cacheFunction = undefined;
  isCacheValid = false;

  // invalidate cached res and allow this.execute to be invoked again
  allowReExecution = () => {
    const { cacheFunction } = this;

    this.isCacheValid = false;
    this.cacheFunction = clearTimeout(cacheFunction);

    this.setState({
      res: undefined,
    });
  };

  execute = retry => async () => {
    const { fn, cacheTime, delayMs } = this.props;
    const { loading, res } = this.state;

    if (loading || (this.isCacheValid && !retry) || (!retry && !isEmptyObject(res))) return;

    this.isCacheValid = false;

    this.setState({ loading: true, err: undefined }, () => {
      // minimum time we should be "loading"
      setTimeout(async () => {
        try {
          const res = await fn();

          this.isCacheValid = true;
          this.cacheFunction = setTimeout(this.allowReExecution, cacheTime);

          this.setState({
            res,
            loading: false,
          });
        } catch (err) {
          this.setState({
            err,
            res: undefined,
            loading: false,
          });
        }
      }, delayMs);
    });
  };

  render() {
    const { children, render, onMouseEnter, onClick, ...props } = this.props;

    return (
      <div
        onMouseEnter={onMouseEnter && this.execute(false)}
        onClick={onClick && this.execute(false)}
        {...props}
      >
        {children({
          ...this.state,
          props,
          retry: this.execute(true),
        })}
      </div>
    );
  }
}
