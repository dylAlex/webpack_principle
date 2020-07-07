// loader本质是一个函数，但是不能是箭头函数
module.exports = function(source){
    console.log(this.query);
    // 一定得有返回值
    return source.replace("Davy", "老韩");
}