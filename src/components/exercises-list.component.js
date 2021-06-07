import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => {
	return (
		<tr>
			<td>{props.exercise.username}</td>
			<td>{props.exercise.description}</td>
			<td>{props.exercise.duration} mins</td>
			<td>{props.exercise.date.substring(0, 10)}</td>
			<td>
				<Link to={"/edit/" + props.exercise._id}>Edit</Link> | <a href="#deleteD" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a>
			</td>
		</tr>
	)
}


export default class ExercisesList extends Component {
	constructor(props) {
		super(props);

		this.deleteExercise = this.deleteExercise.bind(this);
		this.state = { exercises: [] };
	}

	componentDidMount() {
		axios.get('/exercises/')
			.then(res => {
				if (res.data.length > 0) {
					this.setState({
						exercises: res.data
					});
				} else {
					this.setState({
						exercises: "Sorry we got nothing here !"
					});
				}
			})
			.catch(err => console.log("Frontend Error:\n" + err));
	}

	deleteExercise(id) {
		axios.delete('/exercises/' + id)
			.then(res => console.log(res.data))
			.catch(err => console.log('Frontend Error:\n' + err));

		this.setState({
			exercises: this.state.exercises.filter(el => (el._id !== id))
		});
	}

	exercisesList() {
		return this.state.exercises.map(currentExercise => {
			return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />
		});
	}

	render() {
		return (
			<div className="container">
				<h3>Your Exercises:</h3>
				<hr />
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Username</th>
							<th>Description</th>
							<th>Duration</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.exercisesList()}
					</tbody>
				</table>
			</div>
		);
	}
};
