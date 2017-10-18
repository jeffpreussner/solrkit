import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

import { NotFound } from './pages/NotFound';
import { SearchPageApp } from './pages/SearchPage';

import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';

import { DetailPageApp } from './pages/DetailPage';

interface RouterProps {
  history: object;
  location: object;
  match: {
    isExact: boolean;
    params: {
      id: string;
    };
    path: string;
    url: string;
  };
}

import createHistory from 'history/createBrowserHistory';
const history = createHistory({
  basename: '/view/',
  hashType: 'noslash'
});

class DetailComponent extends React.Component<RouterProps, {id: string}> {
  constructor(props: RouterProps) {
    super();

    this.state = {
      id: props.match.params.id
    };

    history.listen((location, action) => {
      if (location.key) {
        this.setState({
          id: location.pathname.substring(1)
        });
      }
    });
  }

  render() {
    return (
      <DetailPageApp 
        load={(id: string) => {
          history.push(id, {});
        }}
        id={this.state.id}
      />
    );
  }
}

class Routes extends React.Component<{}, {}> {
  constructor() {
    super();
  }

  render() {    
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={SearchPageApp} />
          <Route 
            path="/view/:id" 
            component={DetailComponent} 
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export function main() {
  ReactDOM.render(
    <Routes />,
    document.getElementById('root') as HTMLElement
  );
}