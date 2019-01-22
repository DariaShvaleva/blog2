import React from 'react';

import axios from 'axios';

export default class Posts extends React.Component {
	state = {
		posts: []
	}

	componentDidMount(){
		axios.get('https://still-dawn-69995.herokuapp.com/api/posts')
		.then(res => {
			const posts = res.data;
			this.setState({ posts });
		})
	}

	render() {
		return (
			<ul>
			{ this.state.posts.map(post => <li> <b>{ post.title}</b> <br/>
				{post.content} <br/>
				{post.tags}
				</li>)}
			</ul>
			)
	}
}