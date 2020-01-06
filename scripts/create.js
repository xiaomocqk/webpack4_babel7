const path = require('path');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const { exec } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');

let resolve = dir => path.resolve(__dirname, '..', dir);
let name = process.argv[2];
let template = resolve('common/template');
let target = resolve(`src/${name}`);

catchError();
create();

function catchError() {
  if (name == null) {
    console.log('缺少项目名称：npm run create <new-project>');
    process.exit();
  }
  
  if (fse.pathExistsSync(target)) {
    console.log(`${target} 已存在，请使用其他项目名`);
    process.exit();
  }
}

async function create() {
  await fse.copy(template, target);
  ready();
}

async function ready() {
  let questions = [{
    type : "input",
    name : "answer",
    message : `是否运行项目：\`npm run dev ${name}\`? (Y/N) -`
  }];
  console.log(chalk.green((`已成功新建项目：${target}\n`)));

  let { answer } = await inquirer.prompt(questions);
  let answerUpperCase = answer.trim().toUpperCase();

  (answerUpperCase === 'Y' || answerUpperCase === 'YES')
    ? start()
    : process.exit();
}

function start() {
  let spinner = ora(chalk.cyan('Now building...\n'));
  spinner.start();
  let p = exec(`npm run dev ${name}`);
  
  // 打印子进程的 console
  p.stdout.on('data', receiveLog);
  p.stderr.on('data', receiveLog);

  function receiveLog(data){
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