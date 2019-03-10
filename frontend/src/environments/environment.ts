// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  FRONTEND_BASE: "http://transport-ministry1.1.s3-website-ap-southeast-2.amazonaws.com/",
  // FRONTEND_BASE: "http://localhost:4200/",
  FRONTEND_RESETPWREQ: "reset-password-request",
  FRONTEND_SIGNUP: "signup",
  API_BASE: "http://hope-transport-api.ap-southeast-2.elasticbeanstalk.com/",
  // API_BASE: "http://localhost:5000/",
  API_LG: "lifegroup",
  API_NOTE: "note",
  API_MEMBER: "member",
  API_SUBURB: "suburb",
  API_LOGIN: "login",
  API_LOGOUT: "logout",
  API_RESETPW: "reset-password",
  NAME: "name",
  EMAIL: "email",
  ID: "id"
};