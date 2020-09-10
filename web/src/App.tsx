import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer, toast } from 'react-toastify';
import configureStore from './store';
import LoadingIcon from 'components/LoadingIcon';
import Table from 'pages/Table';
import UserLogin from 'pages/UserLogin';
import HostNew from 'pages/HostNew';
import ModalHandler from 'components/ModalHandler';
import CardModalHandler from 'components/CardModalHandler';
import * as socketEvents from 'actions/socket';
import { hot } from 'react-hot-loader';
import LangPicker from 'components/LangPicker';
import { getTranslation } from 'utils/translations';
import { useLangChange } from 'utils/hooks';

const { store, persistor } = configureStore();
export const reduxStore = store;

export enum Views {
  LOGIN,
  HOSTNEW,
  GAME,
}
function AppRoutes() {
  const [nav, setNav] = useState<Views>(Views.LOGIN);
  useLangChange();

  useEffect(() => {
    socketEvents.socket.on('disconnect', (reason: string) => {
      toast.error(getTranslation('disconnected'));
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        socketEvents.socket.connect();
      }
    });
    socketEvents.socket.on('reconnect', (attemptNumber: number) => {
      toast.success(getTranslation('connected'));
      socketEvents.askSyncRoom();
    });

    return () => {
      socketEvents.socket.off('disconnect');
      socketEvents.socket.off('reconnect');
    };
  }, []);

  return (
    <div>
      {nav === Views.LOGIN && <UserLogin onChangeNav={setNav} />}
      {nav === Views.HOSTNEW && <HostNew onChangeNav={setNav} />}
      {nav === Views.GAME && <Table onLogout={() => setNav(Views.LOGIN)} />}
    </div>
  );
}
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingIcon type="ring" />} persistor={persistor}>
        <AppRoutes />
        <LangPicker />
        <ModalHandler />
        <CardModalHandler />
        <ToastContainer position="bottom-right" autoClose={4000} progressClassName="bg-white" />
      </PersistGate>
    </Provider>
  );
}

export default hot(module)(App);
