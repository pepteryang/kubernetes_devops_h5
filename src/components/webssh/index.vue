<template>
    <!--给dialog模态框加 v-if，在关闭的时候v-if会直接将其从DOM结构中抹除-->
    <el-dialog  v-if="visible"
                :visible.sync="visible"
                title="容器"
                @opened="initiateTerminal"
                @close="closeTerminal"
                :kubernetesTerminalDialogShow="kubernetesTerminalDialogShow"
                
    >
    <div id="KuberntesTerminal"></div>

    </el-dialog>
</template>

<script>
  import { Terminal } from "xterm";
  import { AttachAddon } from 'xterm-addon-attach';
  require('xterm/css/xterm.css')
  
  export default {
      name: 'WebSsh',
      props: {
        kubernetesTerminalDialogShow: {
          type: Boolean,
          default: false
        },
        wsURL:String,
      },
      watch: {
        kubernetesTerminalDialogShow () {
            this.visible = this.kubernetesTerminalDialogShow;
        }
      },
      data () {
          return {
            visible: this.kubernetesTerminalDialogShow,
            term:null,
            loading:false,
            socket: null,
          }
      },
      mounted(){
      },
      methods: {
        initiateTerminal() {
          //定义变量
          //初始化链接
          this.socket = new WebSocket(this.wsURL)
          let attachAddon = new AttachAddon(this.socket);
          this.term = new Terminal({
            fontSize: 14,
            cols: 120,
            rows: 30,
            cursorBlink: 5,
            scrollback: 100,
            tabStopWidth: 4,
            // cursorBlink: true,
            cursorStyle: "underline",
            //字体
            fontFamily: "Consolas, courier-new, courier, sans-serif"
          });
          this.term.loadAddon(attachAddon);
          this.term.focus()

          this.term.writeln('Welcome to xterm.js');
          this.term.writeln('This is a local terminal emulation, without a real terminal in the back-end.');
          this.term.writeln('Type some keys and commands to play around.');
          this.term.writeln('');

          this.term.open(document.getElementById('KuberntesTerminal'))
          this.term._initialized = true

          

          //连接成功建立的回调方法
          this.socket.onopen = (event) => {
            console.log("状态：" + this.socket.readyState)
            this.term.writeln(
              "*************************"
            );
          };
          // WebSocket 返回的数据会写到窗口
          this.socket.onmessage = (e) => {
            console.log("WebSocket接收消息，ssh交互中")
          };
          this.socket.onerror = (ce) => {
            console.log(ce)
          };
          //获取键盘输入：
          this.term.textarea.onkeydown = (e) => {
            console.log('User pressed key with keyCode: ', e.key, e.keyCode);
          }
        },
        closeTerminal() {
          if (this.socket) {
              this.socket.close()
          }
          if (this.term) {
            this.term.write('\n\r\x1B[1;3;31msocket is already closed.\x1B[0m');
          }
          this.$emit('update:kubernetesTerminalDialogShow', false)
        },
        
    },
  }
</script>

<style scoped></style>