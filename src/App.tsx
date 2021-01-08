import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthPage } from './auth/index';
import { Home } from './home/index';
import { setTheme, themeStateSelector } from './store/theme/themeSlice';
import { auth } from './store/firebase';
import { setAuthId } from './store/auth/authSlice';
import { NavBar } from './components/nav';
import { loadNotesAsync } from './store/notes/notesEvent';
import { ViewNote } from './home/ViewNote';

export const App = (): JSX.Element => {

  const dispatch = useDispatch();
  useEffect(() => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(setTheme(true));
    }

    auth.onAuthStateChanged(async user => {
      if (user !== null) {
        dispatch(setAuthId(await user.getIdToken()));
      }
    });

    dispatch(loadNotesAsync());

  }, [dispatch]);

  const usingDarkMode = useSelector(themeStateSelector);
  const rootElement = window.document.documentElement;
  const classNames: string[] = [
      "font-sans",
      "antialiased",
      "leading-normal",
      "tracking-wider",
      "dark:bg-gray-700"
  ];

  if (usingDarkMode) {
      rootElement.classList.add("dark");
  } else {
    rootElement.classList.remove("dark");
  }

  return (
    <main className={classNames.join(" ")}>
      <BrowserRouter>
        <NavBar/>
        <Switch>
          <Route path="/note/:id">
            <ViewNote/>
          </Route>
          <Route path="/auth">
            <AuthPage/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </BrowserRouter>
    </main>
  );
};
