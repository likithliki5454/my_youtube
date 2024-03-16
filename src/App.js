// import './App.css'
// import Header from './Components/Header'
// import Body from './Components/Body'
// import store from './utils/store'
// import { Provider } from 'react-redux'
// import { createBrowserRouter } from 'react-router-dom'
// import Sidebar from './Components/Sidebar'
// import MainContainer from './Components/MainContainer'
// import WatchPage from './Components/WatchPage'

// const Approuter=createBrowserRouter([{
//   path:'/',
//   element:<Body/>,
//   children:[
//   {
//     path:'/',
//     element:<MainContainer/>
//   },

//   {
//     path:'watch',
//     element:<WatchPage/>
//   }

//   ]
// }])

// const App = () => {
//   return (
//     <Provider store={store}>
//     <div>
//     <Header/>
//     </div>
        
//     </Provider>
//   )
// }

// export default App


import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';
import Header from './Components/Header';
import Body from './Components/Body';
import MainContainer from './Components/MainContainer';
import WatchPage from './Components/WatchPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<MainContainer />} />
              <Route path="watch" element={<WatchPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
