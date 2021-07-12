module.exports = {
  description: '创建新的Service', // 描述这个generate的作用
  prompts: [{
    type: 'input', // 问题的类型
    name: 'name', // 问题对应得到答案的变量名，可以在acitons中使用该变量
    message: 'Service名称（无需重复输入Controller）', // 在命令行中的问题
  }],
  actions: data => {
    const name = data.name;
    name[0] = name[0].toUpperCase();
    const actions = [
      {
        type: 'add', // 操作类型 添加文件
        path: `app/Service/${data.name}.ts`, // 添加的文件的路径
        templateFile: 'plop-templates/Service/index.hbs', // 模版文件的路径
        data: {
          name,
        },
      },
    ];
    return actions;
  },
};
