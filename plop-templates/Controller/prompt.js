module.exports = {
  description: '创建新的Controller', // 描述这个generate的作用
  prompts: [{
    type: 'input', // 问题的类型
    name: 'name', // 问题对应得到答案的变量名，可以在acitons中使用该变量
    message: 'Controller名称（无需重复输入Controller）', // 在命令行中的问题
  }],
  actions: data => {
    const name = data.name;
    name[0] = name[0].toLocaleUpperCase();
    const actions = [
      {
        type: 'add', // 操作类型 添加文件
        path: `app/controller/${data.name}.ts`, // 添加的文件的路径
        templateFile: 'plop-templates/Controller/index.hbs', // 模版文件的路径
        data: {
          name,
        },
      },
    ];
    return actions;
  },
};
