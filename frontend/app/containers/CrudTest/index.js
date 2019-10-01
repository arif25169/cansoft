/**
 *
 * CrudTest
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCrudTest, { makeSelectTableInfo } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { Button } from 'primereact/components/button/Button';
/* eslint-disable react/prefer-stateless-function */
export class CrudTest extends React.Component {
  render() {
    console.log(this.props.tableInfo)
    let content = '';
    content = <div>
      <div className="ui-g ui-fluid">
        <DataTable value={this.props.tableInfo.response} paginator={true} rows={10}>
          <Column field="name" header="Name" />
          <Column field="status" header="Status" />
        </DataTable>
      </div>
    </div>;
    
    return (
      <div>
        <Helmet>
          <title>CrudTest</title>
          <meta name="description" content="Description of CrudTest" />
        </Helmet>
        {content}
      </div>
    );
  }
}

CrudTest.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  crudtest: makeSelectCrudTest(),
  tableInfo: makeSelectTableInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'crudTest', reducer });
const withSaga = injectSaga({ key: 'crudTest', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CrudTest);
