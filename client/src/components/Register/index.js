import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import pink from '@material-ui/core/colors/pink';
import {
	validateName,
	validateEmail,
	validatePhone,
	validatePassword,
} from '../../utills/validateFields';
import { register } from '../../actions/auth';

const pinkStrong = pink[500];

const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white,
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	container: {
		minHeight: '100vh',
		marginBottom: 50,
	},
	error: {
		color: pinkStrong,
	},
}));

const SignUp = ({ register, isAuthenticated }) => {
	const classes = useStyles();

	const [errorData, setErrorData] = useState({
		errorName: '',
		errorEmail: '',
		errorPhone: '',
		errorPassword: '',
		checkFields: '',
	});
	const { errorPassword } = errorData;

	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, phone, email, password, password2 } = formData;

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const checkPassword = (pas1, pas2) => {
		if (pas1 !== pas2 || pas2.length < 6 || pas1.length < 6) {
			setErrorData({
				...errorData,
				errorPassword: 'Check password',
			});
		} else {
			setErrorData({
				...errorData,
				errorPassword: '',
			});
		}
	};

	const onSubmit = e => {
		e.preventDefault();
		if (
			!password ||
			!password2 ||
			!name ||
			!email ||
			!phone ||
			errorPassword ||
			password !== password2
		) {
			setErrorData({
				...errorData,
				checkFields: 'All fields must be filled in or check fields',
			});
		} else {
			register({ name, phone, email, password });
		}
	};

	if (isAuthenticated) {
		return <Redirect to="/" />;
	}

	return (
		<Container className={classes.container} component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} onSubmit={e => onSubmit(e)}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								label="Name"
								name="name"
								value={name}
								onChange={e => {
									onChange(e);
									setErrorData({
										...errorData,
										errorName: validateName(e.target.value),
									});
								}}
							/>
							{errorData.errorName && (
								<div className={classes.error}>{errorData.errorName}</div>
							)}
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								type="email"
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								value={email}
								onChange={e => {
									onChange(e);
									setErrorData({
										...errorData,
										errorEmail: validateEmail(e.target.value),
									});
								}}
							/>
							{errorData.errorEmail && (
								<div className={classes.error}>{errorData.errorEmail}</div>
							)}
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="phone"
								label="Phone"
								name="phone"
								placeholder="096 123 45 67"
								value={phone}
								onChange={e => {
									onChange(e);
									setErrorData({
										...errorData,
										errorPhone: validatePhone(e.target.value),
									});
								}}
							/>
							{errorData.errorPhone && (
								<div className={classes.error}>{errorData.errorPhone}</div>
							)}
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								value={password}
								onChange={e => {
									onChange(e);
									setErrorData({
										...errorData,
										errorPassword: validatePassword(e.target.value),
									});
									checkPassword(password2, e.target.value);
								}}
								// onBlur={e =>
								//
								// }
							/>
							{errorData.errorPassword && (
								<div className={classes.error}>{errorData.errorPassword}</div>
							)}
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password2"
								label="Repeat password"
								type="password"
								value={password2}
								onChange={e => {
									onChange(e);
									setErrorData({
										...errorData,
										errorPassword: validatePassword(e.target.value),
									});
									checkPassword(password, e.target.value);
								}}
							/>
							{errorData.errorPassword && (
								<div className={classes.error}>{errorData.errorPassword}</div>
							)}
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					{errorData.checkFields && (
						<div className={classes.error}>{errorData.checkFields}</div>
					)}
					<Grid container justify="flex-end">
						<Grid item>
							<Link to="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

SignUp.propTypes = {
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

SignUp.defaultProps = {
	isAuthenticated: null,
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
	register,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SignUp);
