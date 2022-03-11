const ControllerGenerator = require('./plop-templates/Controller/prompt')
const ServiceGenerator = require('./plop-templates/Service/prompt')
module.exports = function(plop) {
  plop.setGenerator('Controller', ControllerGenerator);
  plop.setGenerator('Service', ServiceGenerator);
};
