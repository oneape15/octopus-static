import React, { Component } from 'react';
import { connect } from 'dva';

interface CachingProps { }

interface CachingState { }

class Caching extends Component<CachingProps, CachingState> {
  render() {
    return (
      <div>
        <h3>缓存设置</h3>
      </div>
    );
  }
}

export default connect(

)(Caching);
