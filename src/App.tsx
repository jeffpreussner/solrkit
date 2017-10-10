import * as React from 'react';
import * as _ from 'lodash';
import './App.css';

import { Histogram, HistogramProperties } from './components/Histogram';
import { Pagination, PaginationProperties } from './components/Pagination';

import { sampleResults, sampleHistogramData } from './editor/SampleData';

import Properties from './editor/Properties';

class App extends React.Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }
  
  onClick(event: string) {
    debugger;
    //this.setState({});
  }


  render() {
    return (
      <div>
        <Properties properties={PaginationProperties} name="Pagination" >
          <Pagination 
            data={sampleResults} 
            pageSize={10} 
          />
        </Properties>        

        <Properties properties={HistogramProperties} name="Histogram" >
          <Histogram 
            data={sampleHistogramData} 
            facetHandler={_.partial(this.onClick, 'facetHandler')} /* TODO separate out events */
          />
        </Properties>       
      </div>
    );
  }
}

export default App;
