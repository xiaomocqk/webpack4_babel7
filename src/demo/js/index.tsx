import '../styles/index.less';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function App() {
  const a: number = 1;
  return (
    <>
      react {a}
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));

