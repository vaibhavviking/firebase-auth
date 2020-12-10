const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole= functions.https.onCall((data,context) => {
    //get user and add custon claim (admin)
    if( context.auth.token.admin !==  true){
        return{ error : 'only admins can add admins'}
    }
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid,{
            admin : true
        });
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made amdin`
        }
    }).catch(err => {
        return err;
    });
});