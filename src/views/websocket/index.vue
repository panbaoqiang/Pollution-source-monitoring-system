<template>
    <div>
        <button @click="send">发消息</button>
        {{ ans }}
    </div>
</template>

<script>
export default {
    data () {
        return {
            ans:'',
            path:"ws://localhost:9529/websocket/panbaoqiang",
            socket:""
        }
    },
    mounted () {
        // 初始化
        this.init()
    },
    created(){

    },
    methods: {
        init: function () {
            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                this.socket = new WebSocket(this.path)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
                  // 销毁监听
                this.socket.onclose = this.close
            }
        },
        open: function () {
            console.log("socket连接成功")
        },
        error: function () {
            console.log("连接错误")
        },
        getMessage: function (msg) {
            if(msg.data === 'exits'){
                alert('用户已经在另外的网页登入了')
                this.socket.close()
                return
            }
            this.ans = this.ans + msg.data
            console.log(msg)
        },
        send: function () {
            this.socket.send('你好')
        },
        close: function () {
            console.log("socket已经关闭")
        }
    },
    destroyed () {
        this.socket.close()
    }
}
</script>

<style>

</style>