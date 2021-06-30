import React from 'react';
import { connect } from 'react-redux';

const TestCompanent = () => {

    console.log("render from parent");

    
    return(

      <div className="progress red-grey lighten-3">
        <div className="determinate red" style={{width:'50%'}}></div>
      </div>
  );

}

export default TestCompanent