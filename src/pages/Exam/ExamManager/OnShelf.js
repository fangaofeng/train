import React, { Component } from 'react'
import CommonConent from './CommonConent'

class ExamOnShelf extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
      const {match:{params:{ID}}} = this.props;
      return (
        <CommonConent ID={ID} currentType='已上架' />
      );
    }
}

export default ExamOnShelf;