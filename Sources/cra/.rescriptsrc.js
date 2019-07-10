const { removeWebpackPlugin } = require("@rescripts/utilities");

module.exports = (config) => {
	config = removeWebpackPlugin("GenerateSW", config);
	return config;
};
