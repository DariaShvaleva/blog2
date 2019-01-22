import React from 'react';

import axios from 'axios';

export default class Form extends React.Component {
constructor(props) {
	super(props);
	this.state = {
		title: '',
		content: '',
		tags: ''
	}

	this.handleTitle = this.handleTitle.bind(this);
	this.handleText = this.handleText.bind(this);
	this.handleTags = this.handleTags.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);

}

	
	handleSubmit(event) {
		axios.post('https://enigmatic-savannah-53961.herokuapp.com/api/posts', {
			title: this.state.title, content: this.state.content, tags: this.state.tags
		}).then(res => window.location.reload());
		
		
	}
	handleTitle(event) {
		this.setState({ title: event.target.value});
	}
	handleText(event) {
		this.setState({ content: event.target.value})
	}
	handleTags(event) {
		this.setState({ tags: event.target.value})
	}

	render() {
		return (<div>
	<div>
		<input type="text" onChange={this.handleTitle} value={this.state.title} placeholder="Название"/ >
		<input type="text" onChange={this.handleText}  value={this.state.content} placeholder="Текст"/>
		<input type="text" onChange={this.handleTags} value={this.state.tags} placeholder="категории"/>
		<button onClick={this.handleSubmit}>Submit</button>
	</div></div>
			)
	}
}