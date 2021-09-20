<template>
<div class="modal" id="for-pr-modal">
  <div class="layer">
    <div class="layer-content">
      <div class="modal-inner modal-md">
        <div class="modal-close" @click="modalclose"></div>
        <div class="modal-content">
          <div class="pr-area p-t-0">
            <div class="pr-img-area">
              <div class="pr-img-wrap"> <img src="images/img-test-02.jpg" alt="제품이미지"> </div>
            </div>
            <div class="pr-info-area pr-info-sm">
              <div class="pr-info-title">농심 새우깡 120g * 5 개</div>
              <div class="pr-info-list p-b-0">
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
        </div>
      </div>
    </div>
  </div>
  </div>

  </template>
  
  <script>
   export default {
    name: 'Good',
    // props: ['pickData'],
    // mixins: [changeRouteMixin],
    data: () => ({
      task: ''
    })
    ,

  methods: {
     modalclose() {
       this.$emit('modal-close');
     }
  }
  ,
  mounted(){
   }
  ,
   beforeCreate(){
   }
  }  

  </script>
  <<style scoped>
  
  </style>
