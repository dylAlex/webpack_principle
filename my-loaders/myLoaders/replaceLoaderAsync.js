module.exports = function(source){
    // 异步的回调函数需要使用async()
    const callback = this.async();
    
    setTimeout(()=>{
        const result = source.replace('webpack', this.query)
        // this.async 返回的callback == this.callback
        callback(null, result);
    }, 2000)
}