const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "app1Angular",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({

        // For remotes (please adjust)
        name: "app1Angular",
        filename: "remoteEntry.js",
        exposes: {
            './web-components': './src/bootstrap.ts',
        },

        // For hosts (please adjust)
        // remotes: {
        //     "mfe1": "mfe1@http://localhost:3000/remoteEntry.js",

        // },


        shared: share({
          "@angular/core": { requiredVersion: '^12.0.0'  },
          "@angular/common": { requiredVersion: '^12.0.0'  },
          "@angular/common/http": {requiredVersion: '^12.0.0' },
          "@angular/router": {requiredVersion: 'auto' },
          'cxone-client-services-platform': { singleton: true, strictVersion: true, requiredVersion: '>8.0.0'},
          "components-lib": { singleton: true, strictVersion: true, requiredVersion: false},
          "useless-lib": { singleton: true,  strictVersion: true, requiredVersion: '>=1.1.0 <3.0.0'},
          "rxjs": {requiredVersion: '^6.0.0'},
          "shared-js-lib": { singleton: true, strictVersion: true, requiredVersion: "1.0.0"},

          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
