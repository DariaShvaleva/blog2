import React from 'react';
import Posts from "./Posts";
import Form from "./Form";

export default class App extends React.Component {

	render() {
		return (
			<div>
			<Form/>
			<Posts/>
			</div>)
		}
	}