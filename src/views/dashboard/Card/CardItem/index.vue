<template>
  <el-card>
    <div slot="header" class="header">
      <span class="type">{{title}}</span>
      <span><svg t="1649475678958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2213" width="16" height="16"><path d="M512 958.016C266.08 958.016 65.984 757.952 65.984 512 65.984 266.08 266.08 65.984 512 65.984c245.952 0 446.016 200.064 446.016 446.016C958.016 757.952 757.952 958.016 512 958.016zM512 129.984C301.344 129.984 129.984 301.344 129.984 512c0 210.624 171.36 382.016 382.016 382.016 210.624 0 382.016-171.36 382.016-382.016C894.016 301.344 722.624 129.984 512 129.984z" p-id="2214" fill="#bfbfbf"></path><path d="M512 304m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z" p-id="2215" fill="#bfbfbf"></path><path d="M512 768c-17.664 0-32-14.304-32-32l0-288c0-17.664 14.336-32 32-32s32 14.336 32 32l0 288C544 753.696 529.664 768 512 768z" p-id="2216" fill="#bfbfbf"></path></svg></span>
    </div>
    <div class="center">
      <div class="number">
        <slot name="number"></slot>
      </div>
      <div class="charts">
        <slot name="icon"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    title: String
  },
  data() {
    return {
    };
  },

  mounted() {

  },

  methods: {

  },
};
</script>

<style  scoped>
>>>.el-card__header{
  border: none;
}
>>>.el-card__body{
  padding: 0 20px;
}
.header{
    display: flex;
    justify-content: space-between;
}
.header .type{
  color: rgb(153, 149, 149);
}
.center .number{
  padding: 0 0 10px;
  font-size: 160%;
}
.center .footer{
  border-top: 1px #eee solid;
  padding: 8px 0 20px;
}
.charts{
  margin-bottom: 5px;
  height: 50px;
}
</style>
