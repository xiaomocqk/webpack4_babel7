import '../styles/index.less';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (
    <>
      <ClassComponent />
      <FunctionComponent />
    </>
  );
}

class ClassComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 0

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 0

    setTimeout(() => {
      console.log(this.state.val);  // 1
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 2

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 3
    }, 0);
  }

  render() {
    return null;
  }
}

function FunctionComponent() {
  let [count, setCount] = useState(100);

  useEffect(() => {
    setCount(count + 1);
    console.log(count);// 100

    setCount(count + 1);
    console.log(count);// 100

    setTimeout(() => {
      setCount(count => count + 1);
      console.log(count);// 100
      
      setCount(count + 1);
      console.log(count);// 100
    }, 0);
  }, []);
  
  return null;
}

ReactDOM.render(<App />, document.getElementById('app'));