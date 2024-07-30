document.addEventListener("DOMContentLoaded", () => {
    navigate('login-view');
    // This function handles multi-view navigation
    function navigate(viewId) {
        const views = document.querySelectorAll(".view");
        views.forEach(view => {
            view.style.display = 'none';
        })
        document.getElementById(viewId).style.display = "block";
    }

    // This big chunk handles logging into the site
    function saveLoginCredentials() {
        const state = {
            savedUsername: usernamebox.value,
            savedPassword: passwordbox.value
        };
        localStorage.setItem('appState', JSON.stringify(state));
    }


    function restoreLoginCredentials() {
        const savedState = localStorage.getItem('appState');
        if (savedState) {
            const state = JSON.parse(savedState);
            
            // Debugging
            console.log('Username Box:', usernamebox);
            console.log('Password Box:', passwordbox);
            
            if (usernamebox && passwordbox) {
                usernamebox.value = state.savedUsername;
                passwordbox.value = state.savedPassword;
            } else {
                console.error('Input elements not found.');
            }
        }
    }

    function clearLoginCredentials() {
        localStorage.removeItem('appState');
        usernamebox.value = "";
        passwordbox.value = "";
    }

    //Same as before, but these next few functions handle saving user sign up info via local storage
    function saveSignupCredentials() {
        const state = {
            savedUsername: username_signup.value,
            savedPassword: password_signup.value,
            savedEmail: email_signup.value
        };
        localStorage.setItem('signupCreds', JSON.stringify(state));
    }

    function restoreSignupCredentials() {
        const savedState = localStorage.getItem('signupCreds');
        if (savedState) {
            const state = JSON.parse(savedState);
            username_signup.value = state.savedUsername;
            password_signup.value = state.savedPassword;
            email_signup.value = state.savedEmail;
        }
    }

    function clearSignupCredentials() {
        localStorage.removeItem('signupCreds');
        username_signup.value = "";
        password_signup.value = "";
        email_signup.value = "";
    }

    //Turns text input box white when some input has been entered.
    function textboxBackgroundColor (textbox){
        textbox.style.backgroundColor = 'whitesmoke';
    }

    //In progress
    function resetBackgroundColor (textbox){
        if (textbox.value === ""){
            textbox.style.backgroundColor = rgb(104, 104, 104);
        }
    }

    //Stores the data query in localStorage
    function storeQuery(){
        localStorage.setItem('dataQuestion', queryBox.value);
    }

    //Displays said query from localStorage
    function displayQuery() {
        const state = localStorage.getItem('dataQuestion');
        document.getElementById('queryDisplay').textContent = "Your query is: " + state;
    }

    //Function for getting the data view from settings
    function dataviewBeforeSettings(){
        document.getElementById('settings-view-to-main-view').addEventListener('click', () => navigate('data-view'));
    }

    //Function for getting the data view from settings
    function mainPageBeforeSettings() {
        document.getElementById('settings-view-to-main-view').addEventListener('click', () => navigate('main-view'));
    }

    //Function for toggling dark mode
    function darkMode() {
            if (darkModeButton.textContent === 'Dark Mode -- OFF!') {
                darkModeButton.textContent = 'Dark Mode -- ON!';
                //document.body.style.backgroundColor = 'whitesmoke';
                //document.h1.style.color = 'black';
                //document.p.style.color = 'black';
            } else if (darkModeButton.textContent === 'Dark Mode -- ON!'){
                darkModeButton.textContent = 'Dark Mode -- OFF!';
                //document.body.style.backgroundColor = rgb(52, 52, 52);
                //document.h1.style.color = 'white';
                //document.p.style.color = 'white';
            }
    };
    const darkModeButton = document.getElementById('dark-mode');
    darkModeButton.addEventListener('click', darkMode);

    //Function for toggling notifs
    function notifications() {
        if(notif_button.textContent==='Notifications -- OFF!'){
            notif_button.textContent='Notifications -- ON!';
        } else if (notif_button.textContent === 'Notifications -- ON!'){
            notif_button.textContent='Notifications -- OFF!';
        }
    }
    const notif_button = document.getElementById('notifs');
    notif_button.addEventListener('click', notifications);

    //Acount settings page logic
    const account_email = document.getElementById('email-signup');
    if(account_email.value !== ""){
        document.getElementById('user-email').textContent = account_email.value;
    }
    //document.getElementById('user-username').textContent = usernamebox.value;

    //Button navigation handling
    document.getElementById('signin').addEventListener('click', () => navigate('login-view'));
    document.getElementById('login-button').addEventListener('click', () => navigate('main-view'));
    document.getElementById('circle-button').addEventListener('click', () => navigate('data-view'));
    document.getElementById('data-view-to-main-view').addEventListener('click', () => navigate('main-view'));
    document.getElementById('back-to-login').addEventListener('click', () => navigate('login-view'));
    document.getElementById('signup').addEventListener('click', () => navigate('signup-view'));
    document.getElementById('back').addEventListener('click', () => navigate('login-view'));
    document.getElementById('restore-cred').addEventListener('click', restoreLoginCredentials);
    document.getElementById('clear-cred').addEventListener('click', clearLoginCredentials);
    document.getElementById('mainview-settings').addEventListener('click', () => navigate('settings-screen'));
    document.getElementById('mainview-settings').addEventListener('click', mainPageBeforeSettings);
    document.getElementById('settings-view-to-main-view').addEventListener('click', () => navigate('main-view'));
    document.getElementById('account-settings').addEventListener('click', () => navigate('account-view'));
    document.getElementById('account-to-settings').addEventListener('click', () => navigate('settings-screen'));
    document.getElementById('dataview-settings').addEventListener('click', () => navigate('settings-screen'));
    document.getElementById('dataview-settings').addEventListener('click', dataviewBeforeSettings);

    //Sign up page event handlers / objects
    const username_signup = document.getElementById('username-signup');
    const password_signup = document.getElementById('password-signup');
    const email_signup = document.getElementById('email-signup');
    username_signup.addEventListener('input', saveSignupCredentials);
    password_signup.addEventListener('input', saveSignupCredentials);
    email_signup.addEventListener('input', saveSignupCredentials);
    document.getElementById('signup-button').addEventListener('click', () => navigate('main-view'));
    document.getElementById('restore-cred-signup').addEventListener('click', restoreSignupCredentials);
    document.getElementById('clear-cred-signup').addEventListener('click', clearSignupCredentials);


    //Handles login input information
    const usernamebox = document.getElementById('username-input');
    const passwordbox = document.getElementById('password-input');
    usernamebox.addEventListener('input', saveLoginCredentials);
    passwordbox.addEventListener('input', saveLoginCredentials);
    usernamebox.addEventListener('input', function() {textboxBackgroundColor(usernamebox)});
    passwordbox.addEventListener('input', function() {textboxBackgroundColor(passwordbox)});
    usernamebox.addEventListener('input', function() {resetBackgroundColor(usernamebox)});
    passwordbox.addEventListener('input', function() {resetBackgroundColor(passwordbox)});

    //Handles getting the question info
    const queryBox = document.getElementById('prompt-input');
    document.getElementById('circle-button').addEventListener('click', storeQuery);
    document.getElementById('circle-button').addEventListener('click', displayQuery);
});