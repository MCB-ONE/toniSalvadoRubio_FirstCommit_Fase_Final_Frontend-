export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    console.log(user.token.token);
    return { Authorization: `Bearer ${user.token.token}` };
  }
  return {};
}
