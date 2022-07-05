import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from "./redux/store";
import PeopleContainer from './components/People/PeopleContainer';

function App() {
  return (

    <div className="App">
      <Provider store={store}>
        <PeopleContainer />
      </Provider>
    </div>
  );
}

export default App;
