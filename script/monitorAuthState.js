const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user){
            return true;
        }
    })
}

export {monitorAuthState};