const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');

let mode = process.argv[2];// 'development' | 'production'
let project = process.argv[3];

catchError(project);
build(project);

function build(project){
  let spinner = ora(chalk.cyan('Now building...\n'));
  let commands = {
    production: `cross-env NODE_ENV=production project=${project} webpack --progress --hide-modules`,
    development: `cross-env NODE_ENV=development project=${project} webpack-dev-server --color`
  };
  
  spinner.start();
  let p = exec(commands[mode]);
  
  // 打印子进程的 console
  p.stdout.on('data', receiveMessage);
  p.stderr.on('data', receiveMessage);

  function receiveMessage(data) {
    process.stdout.write(data.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n');
  
    spinner.stop();
  }
}

function catchError(project){
  let logWarn = msg => console.log(chalk.yellow(msg));
  if (project == null) {
    logWarn(`未指定项目名称: \`npm run ${mode === 'production' ? 'build' : 'dev'} <project>\``);
    process.exit();
  }

  let targetPath = path.resolve(__dirname, '../src', project);

  if (!fs.existsSync(targetPath)) {
    logWarn(`项目 ${project} 不存在, ${targetPath}`);
    process.exit();
  }
}