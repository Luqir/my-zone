module.exports = {
  root: true, // 此项是用来告诉eslint找当前配置文件不能往父级查找

  parserOptions: {
    sourceType: 'module' // 此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
  },

  env: { // 此项指定环境的全局变量，下面的配置指定为浏览器环境
    browser: true,
    node: true,
    es6: true
  },

  extends: ['plugin:vue/recommended', 'eslint:recommended'], // 此项是用来配置标准的js风格

  /*
    下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
    主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
    "off" -> 0 关闭规则
    "warn" -> 1 开启警告规则
    "error" -> 2 开启错误规则

    it is base on https://github.com/vuejs/eslint-config-vue
    */
  rules: {
    'vue/max-attributes-per-line': [2, { // 多个特性的元素应该分多行撰写，每个特性一行
      'singleline': 10,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    'vue/singleline-html-element-content-newline': 'off', // 在单行元素的内容前后需要换行符
    'vue/multiline-html-element-content-newline': 'off', // 在多行元素的内容之前和之后需要换行符
    'vue/name-property-casing': ['error', 'PascalCase'], // JS/JSX中的组件名应该始终是帕斯卡命名法
    'vue/no-v-html': 'off', // 此规则报告v-html指令的所有使用情况，以降低将潜在的不安全/未转义的html注入浏览器导致跨站点脚本（XSS）攻击的风险
    'vue/html-self-closing': ['warn', { // 标签行尾斜杠
      'html': {
        'void': 'always',
        'normal': 'never',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }],
    'accessor-pairs': 2, // 在对象中使用getter/setter
    'arrow-spacing': [2, { // 箭头函数箭头前后空格
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'], // 禁止或强制在单行代码块中使用空格(禁用)
    'brace-style': [2, '1tbs', { // if while function 后面的{必须与if在同一行，java风格。
      'allowSingleLine': true
    }],
    'camelcase': [0, { // 双峰驼命名格式
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'], // 对象字面量项尾不能有逗号
    'comma-spacing': [2, { // 控制逗号前后的空格
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'], // 控制逗号在行尾出现还是在行首出现 (默认行尾)
    'constructor-super': 2, // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
    'curly': [2, 'multi-line'], // 必须使用 if(){} 中的{}
    'dot-location': [2, 'property'], // 对象访问符的位置，换行的时候在行首还是行尾
    'eol-last': 2, // 文件以单一的换行符结束
    'eqeqeq': ['error', 'always', { 'null': 'ignore' }], // 必须使用全等
    'generator-star-spacing': [2, { // 强制 generator 函数中 * 号周围使用一致的空格
      'before': true,
      'after': true
    }],
    'handle-callback-err': [2, '^(err|error)$'], // 要求回调函数中有容错处理
    'indent': [2, 2, { // 嵌套的代码块或者语句缩进样式 "SwitchCase"（默认：0）指定 switch-case 语句的缩进级别
      'SwitchCase': 1
    }],
    'jsx-quotes': [2, 'prefer-single'], // 强制在 JSX 属性中一致地使用双引号或单引号
    'key-spacing': [2, { // 强制在对象字面量的属性中键和值之间使用一致的间距
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, { // 强制在关键字前后使用一致的空格 (前后腰需要)
      'before': true,
      'after': true
    }],
    'new-cap': [2, { // 要求构造函数首字母大写 （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 2, // 要求调用无参构造函数时有圆括号
    'no-array-constructor': 2, // 禁止使用 Array 构造函数
    'no-caller': 2, // 禁用 arguments.caller 或 arguments.callee
    'no-console': 'off', // 禁用 console
    'no-class-assign': 2, // 禁止修改类声明的变量
    'no-cond-assign': 2, // 禁止条件表达式中出现赋值操作符
    'no-const-assign': 2, // 禁止修改 const 声明的变量
    'no-control-regex': 0, // 禁止在正则表达式中使用控制字符 ：new RegExp("\x1f")
    'no-delete-var': 2, // 禁止删除变量
    'no-dupe-args': 2, // 函数参数不能重复
    'no-dupe-class-members': 2, // 禁止类成员中出现重复的名称
    'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-duplicate-case': 2, // switch中的case标签不能重复
    'no-empty-character-class': 2, // 正则表达式中的[]内容不能为空
    'no-empty-pattern': 2, // 禁止使用空解构模式no-empty-pattern
    'no-eval': 2, // 禁用 eval()
    'no-ex-assign': 2, // 禁止对 catch 子句的参数重新赋值
    'no-extend-native': 2, // 禁止扩展native对象
    'no-extra-bind': 2, // 禁止不必要的 .bind() 调用
    'no-extra-boolean-cast': 2, // 不必要的bool转换
    'no-extra-parens': [2, 'functions'], // 非必要的括号
    'no-fallthrough': 2, // 禁止 case 语句落空
    'no-floating-decimal': 2, // 禁止省略浮点数中的0 .5 3.
    'no-func-assign': 2, // 禁止重复的函数声明
    'no-implied-eval': 2, // 禁止使用类似 eval() 的方法
    'no-inner-declarations': [2, 'functions'], // 禁止在嵌套的块中出现 function 或 var 声明
    'no-invalid-regexp': 2, // 禁止无效的正则表达式
    'no-irregular-whitespace': 2, // 禁止在字符串和注释之外不规则的空白
    'no-iterator': 2, // 禁用 __iterator__ 属性
    'no-label-var': 2, // 不允许标签与变量同名
    'no-labels': [2, { // 禁止标签声明
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2, // 禁止不必要的嵌套块
    'no-mixed-spaces-and-tabs': 2, // 不允许空格和 tab 混合缩进
    'no-multi-spaces': 2, // 不能用多余的空格
    'no-multi-str': 2, // 禁止使用多行字符串，在 JavaScript 中，可以在新行之前使用斜线创建多行字符串
    'no-multiple-empty-lines': [2, { // 不允许多个空行
      'max': 1
    }],
    'no-native-reassign': 2, // 禁止对原生对象赋值
    'no-negated-in-lhs': 2, // 禁止在 in 表达式中出现否定的左操作数
    'no-new-object': 2, // 禁止使用 Object 的构造函数
    'no-new-require': 2, // 禁止调用 require 时使用 new 操作符
    'no-new-symbol': 2, // 禁止 Symbol 的构造函数
    'no-new-wrappers': 2, // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-obj-calls': 2, // 禁止把全局对象 (Math 和 JSON) 作为函数调用 错误：var math = Math();
    'no-octal': 2, // 禁用八进制字面量
    'no-octal-escape': 2, // 禁止在字符串中使用八进制转义序列
    'no-path-concat': 2, // 禁止对 __dirname 和 __filename进行字符串连接
    'no-proto': 2, // 禁用 __proto__ 属性
    'no-redeclare': 2, // 禁止重复声明变量
    'no-regex-spaces': 2, // 禁止正则表达式字面量中出现多个空格
    'no-return-assign': [2, 'except-parens'], // return 语句中不能有赋值表达式
    'no-self-assign': 2, // 禁止自我赋值
    'no-self-compare': 2, // 不能比较自身
    'no-sequences': 2, // 禁止使用逗号运算符
    'no-shadow-restricted-names': 2, // 严格模式中规定的限制标识符不能作为声明时的变量名使用
    'no-spaced-func': 2, // 禁止 function 标识符和括号之间出现空格
    'no-sparse-arrays': 2, // 禁止稀疏数组， [1,,2]
    'no-this-before-super': 2, // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-throw-literal': 2, // 禁止抛出字面量错误 throw "error";
    'no-trailing-spaces': 2, // 禁用行尾空格
    'no-undef': 2, // 可以有未定义的变量
    'no-undef-init': 2, // 禁止将变量初始化为 undefined
    'no-unexpected-multiline': 2, // 避免多行表达式
    'no-unmodified-loop-condition': 2, // 禁用一成不变的循环条件
    'no-unneeded-ternary': [2, { // 禁止可以在有更简单的可替代的表达式时使用三元操作符
      'defaultAssignment': false
    }],
    'no-unreachable': 2, // 不能有无法执行的代码
    'no-unsafe-finally': 2, // 不允许return，throw，break，和continue里面的语句finally块。它允许间接使用，如in function或class定义
    'no-unused-vars': [2, { // 不能有声明后未被使用的变量或参数
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2, // 禁止不必要的call和apply
    'no-useless-computed-key': 2, // 禁止不必要的计算性能键对象的文字
    'no-useless-constructor': 2, // 在不改变类的工作方式的情况下安全地移除的类构造函数
    'no-useless-escape': 0, // 禁用不必要的转义字符
    'no-whitespace-before-property': 2, // 禁止属性前有空白
    'no-with': 2, // 禁用with
    'one-var': [2, { // 连续声明
      'initialized': 'never'
    }],
    'operator-linebreak': [2, 'after', { // 强制操作符使用一致的换行符
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [2, 'never'], // 要求或禁止块内填充
    'quotes': [2, 'single', { // 强制使用一致的反勾号、双引号或单引号
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': [2, 'never'], // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的）
    'semi-spacing': [2, { // 强制分号之前和之后使用一致的空格
      'before': false,
      'after': true
    }],
    'no-extra-semi': 0, // 要求或禁止使用不必要的分号
    'space-before-blocks': [2, 'always'], // 强制在块之前使用一致的空格
    'space-before-function-paren': [2, { // 强制在 function的左括号之前使用一致的空格
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'space-in-parens': [2, 'never'], // 强制在圆括号内使用一致的空格
    'space-infix-ops': 2, // 中缀操作符周围要不要有空格
    'space-unary-ops': [2, { // 强制在一元操作符前后使用一致的空格
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [2, 'always', { // 强制在注释中 // 或 /* 使用一致的空格
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'], // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    'use-isnan': 2, // 要求使用 isNaN() 检查 NaN
    'valid-typeof': 2, // 必须使用合法的typeof的值
    'wrap-iife': [2, 'any'], // 要求 IIFE 使用括号括起来
    'yield-star-spacing': [2, 'both'], // 强制在 yield* 表达式中 * 周围使用空格
    'yoda': [2, 'never'], // 要求或禁止 “Yoda” 条件
    'prefer-const': 2, // 要求使用 const 声明那些声明后不再被修改的变量
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 禁止使用debugger
    'object-curly-spacing': [2, 'always', { // 强制在花括号中使用一致的空格
      'objectsInObjects': true,
      'arraysInObjects': true
    }],
    'array-bracket-spacing': [2, 'never'] // 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
  }
}
