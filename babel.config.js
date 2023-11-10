module.exports = { 
    presets: ['@babel/preset-env', {
      "useBuiltIns": "usage",
      "corejs": { "version": 3, "proposals": true },
      "targets": "defaults, not IE 11"
    }] 
};
