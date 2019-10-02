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
import makeSelectCrudTest, {
  makeSelectTableInfo,
  makeSelectDialogueVisible,
  makeSelectAddItem,
  makeSelectSetMessage,
  makeSelectSetErrMessage,
  makeSelectUpdateItem,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { Button } from 'primereact/components/button/Button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Growl } from 'primereact/growl';
import { InputText } from 'primereact/inputtext';
import {
  resetVisible,
  setVisible,
  addItem,
  getMessage,
  getErrMessage,
  deleteId,
  updateItem,
} from './actions';
/* eslint-disable react/prefer-stateless-function */
export class CrudTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      addressValue: '',
      emailValue: '',
      activeValue: '',
      updatenameValue: '',
      updateaddressValue: '',
      updateemailValue: '',
      updateactiveValue: '',
      updateId: '',
      typeDiag: '',
      typeDiagHead: '',
    };
    this.onchangeName = this.onchangeName.bind(this);
    this.onchangeAddress = this.onchangeAddress.bind(this);
    this.onchangeEmail = this.onchangeEmail.bind(this);
    this.onchangeActive = this.onchangeActive.bind(this);
    this.uponchangeName = this.uponchangeName.bind(this);
    this.uponchangeAddress = this.uponchangeAddress.bind(this);
    this.uponchangeEmail = this.uponchangeEmail.bind(this);
    this.uponchangeActive = this.uponchangeActive.bind(this);
    this.onSaveItem = this.onSaveItem.bind(this);
    this.onSaveDiaglog = this.onSaveDiaglog.bind(this);
    this.onUpdateItem = this.onUpdateItem.bind(this);
    this.onUpDateDiaglog = this.onUpDateDiaglog.bind(this);
  }
  componentDidUpdate() {
    this.props.changeMessage('');
  }
  onchangeName(value) {
    this.setState({ nameValue: value });
  }
  onchangeAddress(value) {
    this.setState({ addressValue: value });
  }
  onchangeEmail(value) {
    this.setState({ emailValue: value });
  }
  onchangeActive(value) {
    this.setState({ activeValue: value });
  }
  uponchangeName(value) {
    console.log('her')
    this.setState({ updatenameValue: value });
  }
  uponchangeAddress(value) {
    this.setState({ updateaddressValue: value });
  }
  uponchangeEmail(value) {
    this.setState({ updateemailValue: value });
  }
  uponchangeActive(value) {
    this.setState({ updateactiveValue: value });
  }
  onSaveDiaglog() {
    console.log('here');
    this.setState({ typeDiag: 1, typeDiagHead: 'Add User' });
    this.props.onClickOpenDiag();
  }
  onUpDateDiaglog(data) {
    console.log(data);
    this.setState({ updateId: data.id, updatenameValue: data.name, updateaddressValue: data.address, updateemailValue: data.email, updateactiveValue: data.active });
    this.setState({ typeDiag: 2, typeDiagHead: 'Update User' });
    this.props.onClickOpenDiag();
  }
  onSaveItem(value) {
    let requestedObject = {
      name: this.state.nameValue,
      address: this.state.addressValue,
      email: this.state.emailValue,
      active: this.state.activeValue,
    };
    this.props.changeAddItem(requestedObject);
  }
  onUpdateItem(value) {
    let requestedObject = {
      id: this.state.updateId,
      name: this.state.updatenameValue,
      address: this.state.updateaddressValue,
      email: this.state.updateemailValue,
      active: this.state.updateactiveValue,
    };
    this.props.changeUpdateItem(requestedObject);
  }
  render() {
    console.log(this.props.tableInfo);
    let msg = '';
    if (this.props.setMessage) {
      msg = { severity: 'success', detail: this.props.setMessage };
      this.growl.show(msg);
    } else if (this.props.setErrMessage) {
      msg = {
        severity: 'error',
        summary: 'Failure',
        detail: this.props.setErrMessage,
      };
      this.growl.show(msg);
    }
    const activeOption = [
      { label: 'Yes', value: 1 },
      { label: 'No', value: 0 },
    ];

    //table
    let actionButtonGroup = rowData => {
      return (
        <div className="btn-group action-column-icon">
          <Button
            icon="pi pi-pencil"
            title="Update"
            onClick={e => this.onUpDateDiaglog(rowData)}
          />{' '}
          <Button
            icon="pi pi-trash"
            title="Delete"
            onClick={e => this.props.onClickDelete(rowData)}
          />
        </div>
      );
    };

    var header = (
      <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>
        List of Users
      </div>
    );
    let paginatorLeft = <Button icon="pi pi-refresh" title="Refresh" />;
    let paginatorRight = (
      <Button
        icon="pi pi-user-plus"
        label="Add User"
        onClick={e => this.onSaveDiaglog()}
      />
    );
    let content = '';
    content = (
      <div>
        <div className="ui-g ui-fluid">
          <DataTable
            value={this.props.tableInfo.response}
            header={header}
            paginator={true}
            rows={10}
            paginatorLeft={paginatorLeft}
            paginatorRight={paginatorRight}
          >
            <Column field="name" header="Name" />
            <Column field="address" header="Adress" />
            <Column field="email" header="Email" />
            <Column field="active" header="Active" />
            <Column field="" header="Action" body={actionButtonGroup} />
          </DataTable>
        </div>
      </div>
    );
    let dialogContent = '';
    if (this.state.typeDiag === 1) {
      dialogContent = (
        <div className="p-grid">
          <div className="p-col-12 p-fluid">
            <span>
              <label htmlFor="resolution-username">
                Name <span>*</span>
              </label>
              <InputText
                value={this.state.nameValue}
                rows={10}
                cols={50}
                placeholder="Enter Name"
                autoResize={false}
                onChange={evt => {
                  this.onchangeName(evt.target.value);
                }}
              />
            </span>
            {/* <span className="error-message" style={{ marginLeft: '10px' }} /> */}
          </div>
          <div className="p-col-12 p-fluid">
            <span>
              <label htmlFor="resolution-username">
                Address <span>*</span>
              </label>
              <InputText
                value={this.state.addressValue}
                rows={10}
                cols={50}
                placeholder="Enter Adress"
                autoResize={false}
                onChange={evt => {
                  this.onchangeAddress(evt.target.value);
                }}
              />
            </span>
          </div>
          <div className="p-col-12 p-fluid">
            <span>
              <label htmlFor="resolution-username">
                Email <span>*</span>
              </label>
              <InputText
                value={this.state.emailValue}
                rows={10}
                cols={50}
                placeholder="Enter Adress"
                autoResize={false}
                onChange={evt => {
                  this.onchangeEmail(evt.target.value);
                }}
              />
            </span>
          </div>
          <div className="p-col-12 p-fluid">
            <span>
              <label htmlFor="resolution-username">
                Active <span>*</span>
              </label>
              <Dropdown
                value={this.state.activeValue}
                options={activeOption}
                onChange={evt => {
                  this.onchangeActive(evt.target.value);
                }}
                placeholder="Select Status"
              />
            </span>
          </div>
          <div className="p-col-12 p-fluid">
            <Button
              className="p-button p-component p-button-success p-button-text-only"
              label="Save"
              onClick={this.onSaveItem}
            />
          </div>
        </div>
      );
    }
    if (this.state.typeDiag === 2) {
      dialogContent = (
        <div className="p-grid">
          <div className="p-col-12 p-fluid">
            <span>
              <label htmlFor="resolution-username">
                Name <span>*</span>
              </label>
              <InputText
                value={this.state.updatenameValue}
                rows={10}
                cols={50}
                placeholder="Enter Name"
                autoResize={false}
                onChange={evt => {
                  console.log(evt)
                  this.uponchangeName(evt.target.value);
                }}
              />
            </span>
            {/* <span className="error-message" style={{ marginLeft: '10px' }} /> */}
          </div>
          <div className="p-col-12 p-fluid">
            <span>
              <label htmlFor="resolution-username">
                Address <span>*</span>
              </label>
              <InputText
                value={this.state.updateaddressValue}
                rows={10}
                cols={50}
                placeholder="Enter Adress"
                autoResize={false}
                onChange={evt => {
                  this.uponchangeAddress(evt.target.value);
                }}
              />
            </span>
          </div>
          <div className="p-col-12 p-fluid">
            <span>
              <label htmlFor="resolution-username">
                Email <span>*</span>
              </label>
              <InputText
                value={this.state.updateemailValue}
                rows={10}
                cols={50}
                placeholder="Enter Adress"
                autoResize={false}
                onChange={evt => {
                  this.uponchangeEmail(evt.target.value);
                }}
              />
            </span>
          </div>
          <div className="p-col-12 p-fluid">
            <span>
              <label htmlFor="resolution-username">
                Active <span>*</span>
              </label>
              <Dropdown
                value={this.state.updateactiveValue}
                options={activeOption}
                onChange={evt => {
                  this.uponchangeActive(evt.target.value);
                }}
                placeholder="Select Status"
              />
            </span>
          </div>
          <div className="p-col-12 p-fluid">
            <Button
              className="p-button p-component p-button-success p-button-text-only"
              label="Update"
              onClick={this.onUpdateItem}
            />
          </div>
        </div>
      );
    }
    return (
      <div>
        <Helmet>
          <title>CrudTest</title>
          <meta name="description" content="Description of CrudTest" />
        </Helmet>

        {content}
        <Growl ref={el => (this.growl = el)} />
        <Dialog
          header={this.state.typeDiagHead}
          visible={this.props.isDialogueVisible}
          style={{ width: '40vw' }}
          modal={true}
          onHide={this.props.hideDialogue}
        >
          {dialogContent}
        </Dialog>
      </div>
    );
  }
}

CrudTest.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isDialogueVisible: PropTypes.any,
  hideDialogue: PropTypes.func,
  onClickOpenDiag: PropTypes.func,
  changeAddItem: PropTypes.any,
  changeUpdateItem: PropTypes.any,
  changeMessage: PropTypes.func,
  onClickDelete: PropTypes.func,
  setMessage: PropTypes.any,
  setErrMessage: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  crudtest: makeSelectCrudTest(),
  tableInfo: makeSelectTableInfo(),
  addItem: makeSelectAddItem(),
  updateItem: makeSelectUpdateItem(),
  isDialogueVisible: makeSelectDialogueVisible(),
  setMessage: makeSelectSetMessage(),
  setErrMessage: makeSelectSetErrMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    hideDialogue: evt => {
      dispatch(resetVisible());
    },
    onClickOpenDiag: evt => {
      dispatch(setVisible());
    },
    changeAddItem: value => {
      dispatch(addItem(value));
    },
    changeUpdateItem: value => {
      dispatch(updateItem(value));
    },
    onClickDelete: evt => {
      dispatch(deleteId(evt.id));
    },
    changeMessage: evt => {
      dispatch(getMessage(evt));
      dispatch(getErrMessage(evt));
    },
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
