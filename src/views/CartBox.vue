<template>
  <div class="modal for-tote-box-modal" id="for-cart-modal">
  <div class="layer">
    <div class="layer-content">
      <div class="modal-inner modal-sm">
        <div class="modal-close" @click="modalclose"></div>
        <div class="modal-content">
          <div class="cart-info-area">
            <div class="cart-info-img"> <img src="../assets/images/img-cart.jpg" alt="카트방향"> </div>
            <div class="cart-info-text"> 카트 손잡이 방향 </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <!-- <div class="modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title"></p>
      <button class="delete" aria-label="close" @click="modalclose"></button>
    </header>
    <section class="modal-card-body">
       <div class="cart-info-area">
            <div class="cart-info-img"> <img src="../assets/images/img-cart.jpg" alt="카트방향"> </div>
            <div class="cart-info-text"> 카트 손잡이 방향 </div>
          </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success">Save changes</button>
      <button class="button">Cancel</button>
    </footer> 
  </div>
</div> -->
</template>
<script>
 export default {
    name: 'CartBox',
    props: {
    }
    ,
    components: {
    
    },
    data: () => ({
     
    })
    ,
    methods: {
      modalclose() {
        this.$emit('modal-close');
      }
      ,
    }
 } 
</script>
<style scoped>

</style>
