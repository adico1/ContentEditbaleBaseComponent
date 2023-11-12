// file: rollup.config.js
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');

// Determine if we are in development mode
const isDev = process.env.ROLLUP_WATCH === 'true';

const productionOutputOptions = {
  sourcemap: isDev ? 'inline' : false, // Only include sourcemaps in development mode
};

// Common plugins for all builds
const commonPlugins = [
  resolve(),
  // Set 'sourcemap' option to true for TypeScript plugin when in development mode
  typescript({ tsconfig: './tsconfig.json', sourceMap: isDev, inlineSources: isDev }),
  isDev ? serve({
    open: true,
    contentBase: ['dist', '.'],
    host: 'localhost',
    port: 3001,
  }) : null,
  isDev ? livereload({
    watch: ['dist', '.'],
  }) : null,
  !isDev ? terser() : null,
].filter(Boolean); // Use 'filter(Boolean)' to remove 'null' values in production

// React-specific build configurations
const reactConfig = {
  input: 'src/react/index.ts',
  output: [
    {
      file: 'dist/content-editable-base.react.umd.js',
      format: 'umd',
      name: 'contentEditableReactBase',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      ...productionOutputOptions,
    },
    {
      file: 'dist/content-editable-base.react.esm.js',
      format: 'es',
      ...productionOutputOptions,
    },
  ],
  plugins: [...commonPlugins],
  external: ['react', 'react-dom'], // React and ReactDOM should not be bundled
};

module.exports = [
  // UMD build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/content-editable-base.umd.js',
      format: 'umd',
      name: 'contentEditableBase',
      globals: {
        // Define global variable names here for external imports
      },
      ...productionOutputOptions, // Spread the production options
    },
    plugins: [commonPlugins],
    external: [
      // List of dependencies to exclude from the bundle
    ],
  },
  // ES module build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/content-editable-base.esm.js',
      format: 'es',
      ...productionOutputOptions, // Spread the production options
    },
    plugins: [commonPlugins],
    external: [
      // List of dependencies to exclude from the bundle
    ],
  },
  reactConfig,
  // Add a separate output for development that includes the dev server and livereload
  ...(isDev
    ? [
        {
          input: 'src/index.ts',
          output: {
            file: 'dist/content-editable-base.js', // Output file for development
            format: 'iife', // iife format is generally suitable for testing directly in browsers
            name: 'contentEditableBase',
            sourcemap: true, // Enable source maps for debugging
          },
          plugins: [...commonPlugins],
        },
      ]
    : []),
];
