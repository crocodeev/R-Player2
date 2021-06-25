import React from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import rpc from '../../api/renderProccessConnector';

function Authorize (){

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    rpc.getToken(data);
  }


  return(
    <div className="container">
    <div className="row">
    <form className="auth" onSubmit={handleSubmit((data) => onSubmit(data))}>
    <div className="browser-default">
        <label className="auth-label">PROJECT ID</label>
        <input
        name="projectId"
        ref={register({
          required: "ID IS REQUIRED!",
          pattern:{
            value: /^\d+$/,
            message:"MUST BE A NUMBER!"
          }
        })}
        type="text"
        className="browser-default auth-input"
        id="exampleInputEmail1"
        aria-describedby="emailHelp" />
        {errors.projectId && <p>{errors.projectId.message}</p>}
    </div>
    <div className="">
        <label>PLAYER CODE</label>
        <input
        name="playerCode"
        ref={register({
          required: "CODE IS REQUIRED!",
          minLength: {
            value: 4,
            message:"PLAYER CODE CAN NOT BE LESS THEN 4 SYMBOLS"
        }})}
        type="text"
        className="browser-default auth-input"
        id="exampleInputPassword1" />
        {errors.playerCode && <p>{errors.playerCode.message}</p>}
    </div>
    <button type="submit" className="btn btn-primary white-text  green darken-3">Submit</button>
    </form>
    </div>
    </div>
  );


}


const mapStateToProps = state => {
  return {
      isConnected: state.player.isConnected
  }
}


const Auth = connect(mapStateToProps)(Authorize);

export default Auth;
