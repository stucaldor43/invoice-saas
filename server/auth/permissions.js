const PERMISSIONS = {
  USER: Object.freeze([
    "create:user",
    "read:user",
    "delete:user",
    "update:user",
    "create:client",
    "read:client",
    "delete:client",
    "update:client",
  ]),
};

module.exports = {
  PERMISSIONS,
  default: PERMISSIONS
}
