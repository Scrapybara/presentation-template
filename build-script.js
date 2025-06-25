import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, basename } from 'path';
import { fileURLToPath } from 'url';
import { compile } from 'sass';
import CleanCSS from 'clean-css';
import { glob } from 'glob';
import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const babelConfig = {
  babelHelpers: 'bundled',
  ignore: ['node_modules'],
  compact: false,
  extensions: ['.js', '.html'],
  plugins: [
    'transform-html-import-to-string'
  ],
  presets: [[
    '@babel/preset-env',
    {
      corejs: 3,
      useBuiltIns: 'usage',
      modules: false
    }
  ]]
};

const plugins = [
  { name: 'RevealHighlight', input: './plugin/highlight/plugin.js', output: './plugin/highlight/highlight' },
  { name: 'RevealMarkdown', input: './plugin/markdown/plugin.js', output: './plugin/markdown/markdown' },
  { name: 'RevealSearch', input: './plugin/search/plugin.js', output: './plugin/search/search' },
  { name: 'RevealNotes', input: './plugin/notes/plugin.js', output: './plugin/notes/notes' },
  { name: 'RevealZoom', input: './plugin/zoom/plugin.js', output: './plugin/zoom/zoom' },
  { name: 'RevealMath', input: './plugin/math/plugin.js', output: './plugin/math/math' },
];

async function buildScssThemes() {
  console.log('Building SCSS themes...');
  
  // Ensure dist/theme directory exists
  mkdirSync(resolve(__dirname, 'dist/theme'), { recursive: true });
  
  // Compile all theme SCSS files
  const themeFiles = glob.sync('./css/theme/source/*.scss');
  
  for (const file of themeFiles) {
    try {
      const result = compile(file, {
        silenceDeprecations: ['legacy-js-api'],
      });
      
      const themeName = basename(file, '.scss');
      const outDir = resolve(__dirname, 'dist/theme');
      mkdirSync(outDir, { recursive: true });
      const outPath = resolve(outDir, `${themeName}.css`);
      
      // Minify CSS
      const minified = new CleanCSS({ compatibility: 'ie9' }).minify(result.css.toString());
      writeFileSync(outPath, minified.styles);
      
      console.log(`✓ Compiled theme: ${themeName}`);
    } catch (err) {
      console.error(`Error compiling ${file}:`, err);
    }
  }
  
  // Compile core reveal.scss
  try {
    const coreResult = compile('./css/reveal.scss', {
      silenceDeprecations: ['legacy-js-api'],
    });
    
    const minified = new CleanCSS({ compatibility: 'ie9' }).minify(coreResult.css.toString());
    writeFileSync(resolve(__dirname, 'dist/reveal.css'), minified.styles);
    
    console.log('✓ Compiled core reveal.css');
  } catch (err) {
    console.error('Error compiling reveal.scss:', err);
  }
}

async function buildRevealCore() {
  console.log('Building reveal.js core...');
  
  try {
    const bundle = await rollup({
      input: './js/index.js',
      plugins: [
        nodeResolve(),
        commonjs(),
        babel(babelConfig),
        terser()
      ]
    });
    
    // Ensure dist directory exists
    mkdirSync('./dist', { recursive: true });
    
    // Write ES module
    await bundle.write({
      file: './dist/reveal.esm.js',
      format: 'es',
      sourcemap: true,
    });
    
    // Write UMD bundle
    await bundle.write({
      file: './dist/reveal.js',
      format: 'umd',
      name: 'Reveal',
      sourcemap: true,
    });
    
    await bundle.close();
    console.log('✓ Built reveal.js core');
  } catch (error) {
    console.error('Error building core:', error);
    throw error;
  }
}

async function buildRevealPlugins() {
  console.log('Building reveal.js plugins...');
  
  for (const plugin of plugins) {
    try {
      console.log(`Building ${plugin.name}...`);
      
      const bundle = await rollup({
        input: plugin.input,
        plugins: [
          nodeResolve(),
          commonjs(),
          babel({
            ...babelConfig,
            ignore: [/node_modules\/(?!(highlight\.js|marked)\/).*/],
          }),
          terser()
        ]
      });
      
      // Write ES module
      await bundle.write({
        file: plugin.output + '.esm.js',
        format: 'es',
      });
      
      // Write UMD bundle
      await bundle.write({
        file: plugin.output + '.js',
        format: 'umd',
        name: plugin.name,
      });
      
      await bundle.close();
      console.log(`✓ Built ${plugin.name}`);
    } catch (error) {
      console.error(`Error building ${plugin.name}:`, error);
      throw error;
    }
  }
  
  console.log('✓ All plugins built successfully');
}

export function buildPlugin() {
  return {
    name: 'build-script',
    
    async buildStart() {
      mkdirSync(resolve(__dirname, 'dist/theme'), { recursive: true });
      await buildScssThemes();
      await buildRevealCore();
      await buildRevealPlugins();
    },
  };
} 