export function authorize(permission) {
  return function (req, res, next) {
    if (!req.session.user) return res.sendStatus(401);
    if (!req.session.user.permissions.includes(permission))
      return res.sendStatus(401);
    next();
  };
}
