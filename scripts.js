const database = firebase.database();
const auth = firebase.auth();
const chatRef = database.ref('messages');
let currentUser = null;

function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const username = document.getElementById('signup-username').value;

    if (!email || !password || !username) {
        alert('Please fill all fields');
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            return userCredential.user.updateProfile({ displayName: username });
        })
        .then(() => {
            alert('Signup successful!');
            showLogin(); // Auto switch to login after signup
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Please fill all fields');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert('Login successful!');
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(() => {
            alert('Google login successful!');
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}

function logout() {
    auth.signOut();
}

auth.onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
        document.getElementById('user-display').textContent = user.displayName || 'User';
    } else {
        currentUser = null;
        document.getElementById('auth-container').style.display = 'block';
        document.getElementById('chat-container').style.display = 'none';
        document.getElementById('chat-box').innerHTML = '';
    }
});

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message === '' || !currentUser) {
        alert('Please log in and type a message');
        return;
    }

    const timestamp = new Date().toLocaleTimeString();
    chatRef.push({
        text: message,
        timestamp: timestamp,
        sender: currentUser.displayName || 'User',
        uid: currentUser.uid
    }).then(() => {
        messageInput.value = '';
    }).catch((error) => {
        alert('Error sending message: ' + error.message);
    });
}

chatRef.on('child_added', (snapshot) => {
    const message = snapshot.val();
    const chatBox = document.getElementById('chat-box');
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', message.uid === currentUser.uid ? 'sent' : 'received');
    
    const usernameElement = document.createElement('div');
    usernameElement.classList.add('username');
    usernameElement.textContent = message.sender;
    
    const textElement = document.createElement('div');
    textElement.textContent = message.text;
    
    const timestampElement = document.createElement('div');
    timestampElement.classList.add('timestamp');
    timestampElement.textContent = message.timestamp;
    
    messageElement.appendChild(usernameElement);
    messageElement.appendChild(textElement);
    messageElement.appendChild(timestampElement);
    
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
});