
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', e => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email : adminEmail }).then(result => {
        console.log(result);
    });
})

auth.onAuthStateChanged(user => {
    console.log('here');
    if(user) {
        user.getIdTokenResult().then(IdTokenResult => {
            user.admin = IdTokenResult.claims.admin;
            setupUI(user);
        })
        console.log('user signed in',user);
        db.collection('guides').onSnapshot(snapshot => {
            
            setupGuides(snapshot.docs);
        },err => {console.log(err)});
    }else{
        console.log('not here');
        setupUI(user);
        console.log('user logged out');
        setupGuides([]);
    }
})


const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', e => {
    e.preventDefault();
    db.collection('guides').add({
        title : createForm['title'].value,
        content: createForm['content'].value
    }).then(()=>{
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    })
})


//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email,password).then(cred => {
       return db.collection('users').doc(cred.user.uid).set({
           bio: signupForm['signup-bio'].value
       })
        
    }).then (() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    })
    
})

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click',(e) => {
    e.preventDefault();
    auth.signOut().then(()=>{
        console.log('user signed out');
    })
})

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',e => {
    e.preventDefault();
    const email=loginForm['login-email'].value;
    const password=loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,password).then( cred => {

        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = ''
    })
    .catch(error => {
        loginForm.querySelector('.error').innerHTML = err.message;
    })
})