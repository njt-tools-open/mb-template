#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from 'fs';
import path from 'path';
import { Command } from 'commander';
import inquirer from 'inquirer';

import { create } from './create';

const pkg = JSON.parse(
  readFileSync(path.join(__dirname, '../package.json'), { encoding: 'utf8' })
);

const program = new Command();

program.version(pkg.verison, '-v', '--version');

/** 选择产品 */
const selectProduction = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: '选择模板: ',
      choices: [
        {
          name: 'remote',
          value: 'remote',
        },
        {
          name: 'production',
          value: 'production',
        },
      ],
    },
  ]);
  return answer.template;
};

/** 模块选项 */
const createRemoteOptions = async () => {
  const productions = readdirSync(path.resolve('production'))
    .filter(name => {
      return statSync(path.resolve(`production/${name}`)).isDirectory();
    })
    .map(name => ({
      name,
      value: name,
    }));
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'production',
      message: '选择项目: ',
      choices: productions,
    },
    {
      type: 'list',
      name: 'type',
      message: '选择类型: ',
      choices: [
        {
          name: 'module',
          value: 'module',
        },
        {
          name: 'layout',
          value: 'layout',
        },
      ],
    },
    {
      name: 'name',
      message: '目录名(仅支持小写 字母+中横线):',
    },
  ]);

  return answer;
};

/** 项目选项 */
const createProductionOptions = async () => {
  const answer = await inquirer.prompt([
    {
      name: 'name',
      message: '目录名(仅支持小写 字母+中横线):',
    },
  ]);

  return answer;
};

program
  .command('create')
  .description('创建 新项目/项目模块')
  .action(async () => {
    const template = await selectProduction();
    let answer: any;

    switch (template) {
      case 'production':
        answer = await createProductionOptions();
        break;
      default:
        answer = await createRemoteOptions();
    }
    create({ ...answer, template });
  });

program.parse(process.argv);
