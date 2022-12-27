import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import routes from './Routes/Routes';

function App() {
  return (
    <div className="">
      <h1 className=''>hellooooo</h1>
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
