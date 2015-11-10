var firebase = new Firebase('https://devspace-io.firebaseio.com');

firebase.authWithOAuthPopup('github', function(error, authData) {
	if (error) {
		console.log('Login Failed!', error);
	}
	else {
		console.log('Authenticated successfully with payload:', authData);
	}
}, {
	scope: 'notifications'
});