//check if user is authenticated
export const isAuthenticated = () => {
    if(typeof window == 'undefined'){
        return false;
    }
    if(localStorage.getItem('userInfo')){
        return JSON.parse(localStorage.getItem('userInfo'));
    }else{
        return false;
    }
}