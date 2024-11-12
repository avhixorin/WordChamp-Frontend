import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome.tsx';
import Home from './components/Home/Home.tsx';
import Game from './components/Game/GameScreen/Game.tsx';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './Redux/store/store.ts';
import Memory from './components/Memory/Memory.tsx';
import Page2 from './components/Page2/Page2.tsx';
import WaitingRoom from './components/WaitingRoom/WaitingRoom.tsx';
import SelectionPage from './components/SelectionPage/SelectionPage.tsx';
import ModeSelection from './components/ModeSelection/ModeSelection.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Home />} />
      <Route path='/mode' element={<ModeSelection />} />
      <Route path='/welcome' element={<Welcome/>}/>
      <Route path='/pg2' element={<Page2/>}/>
      <Route path='/game' element={<Game/>} />
      <Route path='/memory' element={<Memory />} />
      <Route path='/waiting-room' element={<WaitingRoom />} />
      <Route path='/selection' element={<SelectionPage />} />
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
