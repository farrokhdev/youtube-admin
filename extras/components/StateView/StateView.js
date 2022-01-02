import React, { Component, Fragment } from 'react'
import { Spin, Empty, Button, Row, Col, Card } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

const LoadingIcon = (
  <LoadingOutlined style={{ fontSize: 50, marginBottom: 20 }} spin />
)
@observer
export default class StateView extends Component {
  static get State() {
    return {
      loading: '0',
      placeholder: '1',
      error: '2',
      content: '3',
      privacy: '4',
      modalerror: '5',
    }
  }

  constructor(props) {
    super(props)
    this.renderView = this.renderView.bind(this)
  }

  _privacyView = () => {
    if (!!this.props.privacyView) {
      // + ' ' +  this.props.containerStyle
      return (
        <Fragment>
          <div className={'full-flex'}>{this.props.privacyView}</div>
        </Fragment>
      )
    } else {
      return null
    }
  }

  _loadingView = () => {
    if (!!this.props.loadingView) {
      return (
        <Fragment>
          <div className={'full-flex'}>{this.props.loadingView}</div>
        </Fragment>
      )
    } else {
      return (
        <Row>
          <Col
            span={24}
            className={'d-flex justify-content-center align-items-center '}
          >
            <Card className={'text-center pt-5 card-loading w-100 '}>
              <Spin indicator={LoadingIcon} tip="درحال بارگذاری..."></Spin>
            </Card>
          </Col>
        </Row>
      )
    }
  }

  _errorView = () => {
    if (!!this.props.errorView) {
      return (
        <Fragment>
          <div className={'styles.container  ' + this.props.containerStyle}>
            {this.props.errorView}
          </div>
        </Fragment>
      )
    } else {
      return (
        <Card>
          <Empty description={'Error get Data'}>
            {' '}
            <Button danger onClick={this.props.errorButtonAction}>
              try again{' '}
            </Button>
          </Empty>
        </Card>
      )
    }
  }

  _placeholderView = () => {
    if (!!this.props.placeholderView) {
      return (
        <Fragment>
          <div className={'full-w'}>{this.props.placeholderView}</div>
        </Fragment>
      )
    } else {
      return <Empty />
    }
  }
  _contentView = () => {
    if (!!this.props.placeholderView) {
      return (
        <Fragment>
          <div className={'full-w'}>{this.props.children}</div>
        </Fragment>
      )
    } else {
      return null
    }
  }
  // MODAL STATE VIEWS

  _modalErrorView = () => {
    if (!!this.props.errorView) {
      return (
        <Fragment>
          <div className={'styles.container  ' + this.props.containerStyle}>
            {this.props.errorView}
          </div>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <div className={'full-w'}>
            <div className="state_error">
              <h4>خطا در برقرای ارتباط</h4>
              <p>لطفا مجدد تلاش کنید</p>
            </div>
            {this.props.children}
          </div>
        </Fragment>
      )
    }
  }

  renderView() {
    switch (this.props.state) {
      case StateView.State.loading:
        return this._loadingView()
      case StateView.State.privacy:
        return this._privacyView()
      case StateView.State.error:
        return this._errorView()
      case StateView.State.modalerror:
        return this._modalErrorView()
      case StateView.State.content:
        return (
          <Fragment>
            <div className={'full-w ' + this.props.bodyClass}>
              {this.props.children}
            </div>
          </Fragment>
        )

      default:
    }
  }

  render() {
    return this.renderView()
  }
}

StateView.propTypes = {
  state: PropTypes.oneOf(
    Object.keys(StateView.State).map((k) => StateView.State[k]),
  ),

  color: PropTypes.string,
  privacyView: PropTypes.element,

  loadingView: PropTypes.element,
  loadingTitle: PropTypes.string,

  placeholderView: PropTypes.element,
  placeholderImageRes: PropTypes.number,
  placeholderTitle: PropTypes.string,
  placeholderBody: PropTypes.string,
  placeholderButtonText: PropTypes.string,
  placeholderButtonAction: PropTypes.func,

  errorView: PropTypes.element,
  errorImageRes: PropTypes.number,
  errorTitle: PropTypes.string,
  errorBody: PropTypes.string,
  errorButtonText: PropTypes.string,
  errorButtonAction: PropTypes.func,
}

StateView.defaultProps = {
  containerStyle: {},
  state: StateView.State.loading,

  color: '#000',
  imageStyle: {},
  titleStyle: {},
  bodyClass: '',
  buttonStyle: {},
  buttonTextStyle: {},

  privacyView: undefined,
  loadingView: undefined,
  loadingTitle: '',
  loadingTitleStyle: {},

  placeholderView: undefined,
  placeholderImageRes: undefined,
  placeholderTitle: '',
  placeholderBody: '',
  placeholderButtonText: '',
  placeholderButtonAction: () => {},
  placeholderImageStyle: {},
  placeholderTitleStyle: {},
  placeholderBodyStyle: {},
  placeholderButtonStyle: {},
  placeholderButtonTextStyle: {},

  errorView: undefined,
  errorImageRes: undefined,
  errorTitle: '',
  errorBody: '',
  errorButtonText: 'تلاش مجدد',
  errorButtonAction: () => {},
  refresh: () => {
    Router.push()
  },

  errorImageStyle: {},
  errorTitleStyle: {},
  errorBodyStyle: {},
  errorButtonStyle: {},
  errorButtonTextStyle: {},
}
