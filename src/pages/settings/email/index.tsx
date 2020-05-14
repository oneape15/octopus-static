import React, { Component } from 'react';
import { connect } from 'dva';

interface EmailProps { }

interface EmailState { }

class Email extends Component<EmailProps, EmailState> {
  render() {
    return (
      <div>
        <h3>缓存设置</h3>
      </div>
    );
  }
}

export default connect(

)(Email);
