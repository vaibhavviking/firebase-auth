const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details')
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
    if(user){
        if(user.admin){
            adminItems.forEach(item => {
                item.style.display = 'block';
            })
        }
        db.collection('users').doc(user.uid).get().then(doc=>{
            const html = `
                <div>Logged In as ${user.email}</div>
                <div>${doc.data().bio}</div>
                <div class='pink-text'>${user.admin ? 'Admin' : ''}</div>
            `;
            accountDetails.innerHTML = html;
        })
        loggedInLinks.forEach(item => item.style.display ='block');
        loggedOutLinks.forEach(item => item.style.display ='none');
    }else{
        adminItems.forEach(item => {
            item.style.display = 'none';
        })
        accountDetails.innerHTML = '';
        loggedOutLinks.forEach(item => item.style.display ='block');
        loggedInLinks.forEach(item => item.style.display ='none');
    }
}

const setupGuides = (data) => {
    if(data.length){
        let html='';
        data.forEach(doc => {
            let guide=doc.data();
            let li = `
            <li>
            <div class="collapsible-header grey lighten-4">${guide.title}</div>
            <div class="collapsible-body white">${guide.content}</div>
          </li>
            `
            html+=li;
        })
        guideList.innerHTML = html;
    }else{
        guideList.innerHTML = '<h5 class="center-align" >Please Log In</h5>'
    }
}


document.addEventListener('DOMContentLoaded', () => {
    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    let items=document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
})