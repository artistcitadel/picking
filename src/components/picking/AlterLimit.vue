<template>
    <div class="modal" id="for-replace-over-modal">
  <div class="layer">
    <div class="layer-content">
      <div class="modal-inner modal-md">
        <div class="replace-over-close" @click="limitclose"></div>
        <div class="modal-header p-b-10">
          <div class="header-title">대체상품</div>
        </div>
        <div class="scan-area">
          <div class="scan-input">
            <input type="text" placeholder="상품 바코드를 스캔하세요.">
            <button type="button" class="ic-scan"></button>
          </div>
        </div>
        <div class="modal-content">
          <div class="pr-area p-t-0">
            <div class="pr-img-area">
              <div class="pr-img-wrap">
                <div class="sold-out">대체 한도 초과로 품절 처리</div>
                <img src="images/img-test-01.jpg" alt="제품이미지"> </div>
            </div>
            <div class="pr-info-area pr-info-sm">
              <div class="pr-info-title">농심 신라면 멀티 120g * 5 개</div>
              <div class="pr-info-list">
                <ul>
                  <li>상품코드</li>
                  <li>0555663</li>
                </ul>
                <ul>
                  <li>판매가격</li>
                  <li>3,210 원<span class="text-primary">1201(대용식품)_라면(번들)</span></li>
                </ul>
                <ul>
                  <li>판매상태</li>
                  <li>판매중</li>
                </ul>
                <ul>
                  <li>재고수량 </li>
                  <li>100</li>
                </ul>
                <ul>
                  <li>상품위치</li>
                  <li>1-3-5<span>1201(대용식품)_라면(번들)</span></li>
                </ul>
                <ul>
                  <li>행사정보</li>
                  <li>다다익선, MP할인</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="btn-area">
            <div class="btn-half">
              <div class="row">
                <div>
                  <button type="button" class="btn btn-big btn-primary-outline w-100">피킹취소</button>
                </div>
                <div>
                  <button type="button" class="btn btn-big w-100 btn-disable">피킹</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>
<script>
 export default {
    name: 'AlterLimit',
    props: {
    }
    ,
    components: {
    
    },
    data: () => ({
     
    })
    ,
    methods: {
      limitclose() {
         this.$emit('limit-close');
      }
      ,
    }
 } 
</script>
<style scoped>

</style>
