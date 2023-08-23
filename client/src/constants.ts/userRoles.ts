export const ROLE_COLOR_MAPPING = {
  ADMIN: { bg: "bg-pink-400 text-white", text: "text-white" },
  USER: { bg: "bg-green-400 text-white", text: "text-white" },
};
export const REPORT_STATUS_MAPPING = {
  COMPLETED: { bg: "bg-green-500 text-white", text: "text-white" },
  PREPARING: { bg: "bg-yellow-500 text-white", text: "text-white" },
  REQUESTED: { bg: "bg-red-400 text-white", text: "text-white" },
};
export const USER_ROLES = ["ADMIN", "USER"];
export const USERS_ROLES_MAPPING = {
  ADMIN: "ADMIN",
  USER: "USER",
};
export default { ROLE_COLOR_MAPPING, USER_ROLES, USERS_ROLES_MAPPING };
