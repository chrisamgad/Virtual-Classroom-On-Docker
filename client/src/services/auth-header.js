export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user')); //parse user into javascript object
  
    console.log(user.token)
    if (user && user.token) {//if user still exists in the local storage AND user has user token
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }