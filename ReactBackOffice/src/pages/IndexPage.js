import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import { LoginLink } from 'react-stormpath';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-center">Welcome!</h2>
        <hr />
        <div className="jumbotron">
          <p>
            <strong>Introduction!</strong>
          </p>
          <p>All Frontend part has been made on the React and Bootstrap & all the Backend was based on the Stormpath. Also, all the accounts control 
carried via the admin panel in the Stormpath.</p>
          </div>
      </div>
    );
  }
}