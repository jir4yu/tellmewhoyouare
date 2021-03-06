const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.addMessage = functions.https.onRequest((req, res) => {
	const original = req.query.text;
	return admin
		.database()
		.ref('/messages')
		.push({ original: original })
		.then(snapshot => {
			console.log(snapshot);
			return res.redirect(303, snapshot.ref);
		});
});

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original').onWrite( (event) => {
	console.log('event is ', event);
	
	const original = event.data.val();
	console.log('uppercasing', event.params.pushId, original);

	const uppercase = original.toUpperCase();
	return event.data.ref.parent.child('uppercase').set(uppercase);
});
