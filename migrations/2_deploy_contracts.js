const Releaf = artifacts.require("./Releaf.sol");
const DaiToken = artifacts.require("./DaiToken.sol");

module.exports = function(deployer) {
  deployer.deploy(Releaf);
};