import * as React from 'react';
import * as _ from 'lodash';

import { Popup } from 'semantic-ui-react';

import {
  FacetRenderer,
  defaultRenderer,
  FacetProps,
  FacetValue
} from './FacetTypes';

class RadioFacet extends React.Component<FacetProps, {}> {
  static contextTypes = {
    searchState: React.PropTypes.object,
    transition: React.PropTypes.func
  };

  onClick(value: FacetValue) {
    return () => {
      let selections: string[] = [value[0]];
      
      const thisFacet = {};
      thisFacet[this.props.facet] = selections;

      this.context.transition(
        {
          start: 0,
          facets: thisFacet
        }
      );
    };
  }

  render() {
    const title = this.props.title;
    const help = this.props.help;
    const render: FacetRenderer = this.props.render || defaultRenderer;

    return (
      <div className="ui" style={{marginBottom: '1em'}}>
        {title ? (
          help ? (
            <Popup 
              trigger={<h4>{title}</h4>}
              content={help}
            />) :
          <h4>{title}</h4>)
          : null}
        {
          _.sortBy(this.props.values, (v) => v[0]).filter(
            !this.props.initialValues ? _.stubTrue : (
              (row: FacetValue) => 
                _.includes(this.props.initialValues, row.value)
            )
          ).map(
            ({ value, count, checked }, i) => (              
              <div style={{display: 'block'}} className="ui radio checkbox">
                <input 
                  onClick={this.onClick({value, count, checked})} 
                  checked={checked} 
                  type="radio" 
                  name="frequency" 
                />
                <label>{render(value, count)}</label>
              </div>
            )
          )
        }
      </div>
    );
  }
}

export {
  RadioFacet
};