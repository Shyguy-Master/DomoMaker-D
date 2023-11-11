const { query } = require('express');
const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleDomo = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const gender = e.target.querySelector('#domoGender').value;

    if (!name || !age || !gender) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, age, gender}, loadDomosFromServer);

    return false;
};

const DomoForm = (props) => {
    return (
        <form id="domoForm" onSubmit={handleDomo} name="domoForm" action="/maker" method="POST" className="domoForm">
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="number" name="age" />
            <label htmlFor="gender">Gender: </label>
            <input id="domoGender" type="text" name="gender" />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    );
};

const deleteDomo = (e) => {
    console.log("It's running");

    // e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('div.domoName').innerHTML;
    const age = e.target.querySelector('div.domoAge').innerHTML;
    const gender = e.target.querySelector('div.domoGender').innerHTML;

    helper.sendPost(e.target.action, {name, age, gender}, loadDomosFromServer);

    return false;
};

const DomoList = (props) => {
    if (props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(domo => {
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName">Name: {domo.name} </h3>
                <h3 className="domoAge">Age: {domo.age} </h3>
                <h3 className="domoGender">Gender: {domo.gender} </h3>
                <input type="button" onClick={deleteDomo} action="/deleteDomo" method="DELETE" value="Delete Domo" className="deleteDomoButton" />
            </div>
            // <form onSubmit={deleteDomo} key={domo._id} action="/deleteDomo" method="DELETE" className="domo">
            //     <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
            //     <h3 className="domoName">Name: {domo.name} </h3>
            //     <h3 className="domoAge">Age: {domo.age} </h3>
            //     <h3 className="domoGender">Gender: {domo.gender} </h3>
            //     <input className="deleteDomoButton" type="submit" value="Delete Domo" />
            // </form>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();
    ReactDOM.render(<DomoList domos={data.domos} />, document.getElementById('domos'));
};

const init = () => {
    ReactDOM.render(<DomoForm />, document.getElementById('makeDomo'));
    
    ReactDOM.render(<DomoList domos={[]} />, document.getElementById('domos'));

    loadDomosFromServer();
};

window.onload = init;