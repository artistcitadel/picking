<template>
    <vs-row>
      <vs-col vs-w="12" class="text-center">
        <vs-icon
          icon="sentiment_dissatisfied"
          size="large"
        />
      </vs-col>
      <vs-col vs-w="12" class="text-center">
        <h1>NG!</h1>
      </vs-col>
      <vs-col vs-w="12" class="text-center">
        <h3>존재하지 않는 페이지입니다...</h3>
      </vs-col>
      <vs-col vs-w="12" class="text-center">
        <vs-button
          type="relief"
          to="/"
        >
          돌아가기...
        </vs-button>
      </vs-col>
    </vs-row>
</template>
<script>
  export default {
    name: 'NotFound',
  }
</script>
<style scoped>
@import '../style.css';
  .text-center {
    text-align: center;
    margin-bottom: 20px;
  }
</style>
