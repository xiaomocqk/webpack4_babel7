import '../styles/index.less';
import React from 'react';
import ReactDOM from 'react-dom';

console.log(ReactDOM);

function App() {
  const a: number = 1;
  return (
    <>
      react {a}
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));