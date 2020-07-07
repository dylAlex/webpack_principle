const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')
module.exports = class Webpack{
    constructor(options){
        const { entry, output } = options;
        this.entry = entry;
        this.output = output;
        this.modules = [];
    }
    run(){
        const info = this.parse(this.entry)
        this.modules.push(info);
        for(let i=0; i<this.modules.length;i++){
            const item = this.modules[i];
            const { yilai } = item;
            if(yilai){
                for(let j in yilai){
                    this.modules.push(this.parse(yilai[j]));
                }
            }
        }
        // 数组结构转换
        const obj = {};
        this.modules.forEach(item=>{
            obj[item.entryFile] = {
                yilai: item.yilai,
                code: item.code, 
            };
        });
        this.file(obj)
    }
    parse(entryFile){
        // 读取入口文件的内容
        const content = fs.readFileSync(entryFile, 'utf-8')
        //! 分析内容，得到ast
        const ast = parser.parse(content, {
            sourceType: 'module'
        })
        const yilai = {};
        // 处理ast
        traverse(ast, {
            ImportDeclaration({ node }){
                const newPath = path.join(path.dirname(entryFile), node.source.value)
                // { './a.js': 'src/a.js', './b.js': 'src/b.js' }
                yilai[node.source.value] = newPath
            },
        })
        // 按标准转换成es5+
        const { code } = transformFromAst(ast, null, {
            presets: ["@babel/preset-env"]
        })
        return {
            entryFile,
            yilai,  //{ './a.js': 'src/a.js', './b.js': 'src/b.js' } 
            code
        }
    }
    file(code){
        // 生成code放在对应的文件夹下
        const filePath = path.join(this.output.path, this.output.filename);
        const newCode = JSON.stringify(code); //???????这里为何要转化为字符串
        // webpack的启动器函数
        // localRequire重新定义require, exports定义exports
        const bundle = `(function(graph){
            function require(module){
                function localRequire(relativePath){
                    return require(graph[module].yilai[relativePath])
                }
                var exports = {};
                (function(require,exports,code){
                    eval(code)
                })(localRequire,exports,graph[module].code)
                return exports;
            }
            require('${this.entry}')
        })(${newCode})`;
        fs.writeFileSync(filePath, bundle, "utf-8");
    }
}