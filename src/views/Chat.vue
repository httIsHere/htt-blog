<template>
    <div class="ChatView">
        <my-header></my-header>
        <chat-main></chat-main>
    </div>
</template>
<script>
import MyHeader from "../components/MyHeader";
import ChatMain from "../components/ChatMain";
export default {
  components: {
    MyHeader,
    ChatMain
  }
}
</script>