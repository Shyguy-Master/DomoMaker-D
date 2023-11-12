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
    e.preventDefault();
    helper.hideError();

    const name = e.target.parentNode.querySelector('h3.domoName').innerHTML.substring(6);
    const age = e.target.parentNode.querySelector('h3.domoAge').innerHTML.substring(5);
    const gender = e.target.parentNode.querySelector('h3.domoGender').innerHTML.substring(8);

    helper.sendDelete("/deleteDomo", {name, age, gender}, loadDomosFromServer);

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
                <input type="button" onClick={deleteDomo} action="/deleteDomo" method="DELETE" value="Delete Domo" className="deleteDomoButton" />
                <h3 class="domoName" className="domoName">Name: {domo.name} </h3>
                <h3 class="domoAge" className="domoAge">Age: {domo.age} </h3>
                <h3 class="domoGender" className="domoGender">Gender: {domo.gender} </h3>
            </div>
            //<div id="domoListLeftSide"></div>
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