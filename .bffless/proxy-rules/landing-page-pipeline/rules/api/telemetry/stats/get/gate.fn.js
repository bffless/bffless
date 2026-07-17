function handler({ user }) {
  var role = (user && user.role) || '';
  var isAdmin = role === 'admin';

  return {
    isAdmin: isAdmin,
    notAdmin: !isAdmin,
  };
}
