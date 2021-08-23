import React, { lazy, Suspense } from 'react';
import {
  Route, Router, Switch, Redirect
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import muiTheme from '@styles/muiTheme';

/* Cpmponents */
import Page from '@components/Page';
import Loading from '@components/Loading';

/* Routes */
import routes from '@routes';

/* Pages */
const NewsFeedContainer = lazy(() => import(/* webpackChunkName: 'NewsFeed' */ '@containers/NewsFeedContainer'));

const browserHistory = createBrowserHistory();

// Execute when user navigates between routes
const onRouteChange = (history) => {
  history.listen(() => {
    window.scrollTo(0, 0);
  });
};

onRouteChange(browserHistory);

const redirectToHome = () => <Redirect to={routes.newsFeed} />;

const App = () => (
  <ThemeProvider theme={muiTheme}>
    <div className="App">
      <Page>
        <Router history={browserHistory}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path={routes.newsFeed} component={NewsFeedContainer} />
              <Route component={redirectToHome} />
            </Switch>
          </Suspense>
        </Router>
      </Page>
    </div>
  </ThemeProvider>
);

export default App;
