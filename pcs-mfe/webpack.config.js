const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'pcs-mfe',

  exposes: {
    './Routes': './src/app/pcs/pcs.routes.ts',
    './Widget': './src/app/widget/widget.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
