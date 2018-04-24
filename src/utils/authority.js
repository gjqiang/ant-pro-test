// use localStorage to store the authority info, which might be sent from server in actual project.
import Cookies from 'js-cookie';

export function getAuthority() {
  return Cookies.get('wlrs');
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', authority);
}
