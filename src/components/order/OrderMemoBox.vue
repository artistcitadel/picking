<template>
<div class="modal full-modal" id="for-memo-modal">
  <div class="layer">
    <div class="layer-content">
      <div class="modal-inner">
        <div class="memo-header">
          <div class="header-title">메모등록</div>
          <div class="memo-edit-btn-area">
            <button type="button" class="btn btn-lg btn-primary memo-close" v-on:click='addTask'>등록</button>
            <button type="button" class="btn btn-lg btn-bk-outline memo-close" @click="memoclose">취소</button>
          </div>
        </div>
        <div class="memo-content">
          <textarea v-model='task' placeholder="이곳에 메모를 입력해주세요" autofocus></textarea>
        </div>
      </div>
    </div>
  </div>
</div>

</template>
<script>
//   import changeRouteMixin from '@/mixin/changeRoute';
  export default {
    name: 'OrderMemoBox',
      props: {
               deliNo: {
                   type: String,
                   require: true 
              },
      },
    // mixins: [changeRouteMixin],
    data: () => ({
      task: ''
    })
    ,
    methods: {
      memoclose() {
        this.$emit('memo-close');
      }
      ,
      addTask() {
        // this.$emit('add-task', this.task);
        // this.task = '';
        // this.$emit('memo-close');
        let param = {
          'deliNo':this.deliNo,
          'status':'01',
          'userId':sessionStorage.getItem("userid"),
          'memo':this.task,
        }
        this.$store.dispatch('PickStore/putMemo', param).then(() => {
            this.task = '';
            this.$emit('memo-close');
        });
      }
    }
    ,
    computed: {
     
    },
    mounted(){
      console.log('OrderMemoBox');
      console.log(this.deliNo);
    }
  }
</script>
