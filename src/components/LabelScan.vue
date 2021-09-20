<template>
  <div class="modal for-modal-label-scan" id="for-modal-label-scan">
    <div class="layer">
      <div class="layer-content">
        <div class="modal-inner modal-lg">
          <div class="modal-close" @click="modalclose"></div>
          <div class="modal-header">
            <div class="check-title">{{ productName }}</div>
            <div class="check-info">
              <li>주문번호 : {{ orderCode }}</li>
              <li>주문자명 : {{ orderName }}</li>
            </div>
          </div>
          <div class="scan-area">
            <div class="scan-input scan-input-label-set" id="qr-code-box">
              <input type="text" placeholder="라벨 QR코드를 스캔하세요." id="qr-code" @keyup.enter.up="onQrCodeEnter"/>
              <button type="button" class="ic-scan" @click="onQrCodeEnter"></button>
              <div class="scan-label">라벨</div>
            </div>
            <div class="scan-input scan-input-label-set scan-disabled"  id="product-bar-code-box">
              <input type="text" placeholder="상품 바코드를 스캔하세요" disabled=""
                id="product-bar-code" @keyup.enter.up="onProductBarCodeEnter"/>
              <button type="button" class="ic-scan" @click="onProductBarCodeEnter"></button>
              <div class="scan-label">상품</div>
            </div>
          </div>
          <div class="modal-content tote-box-content">
            <div class="number-set-area">
              <div class="number-area">
                <div class="number-wrap">
                  <span class="minus" @click="decreaseCount"></span>
                  <div class="input-number-wrap">
                    <input
                      class="input-number"
                      type="text"
                      value=""
                      min="0"
                      readonly=""
                    />
                    <span class="input-number-total">{{currentCount}}/8</span>
                  </div>
                  <span class="plus" @click="increaseCount"></span>
                </div>
              </div>
              <div class="number-btn">
                <button type="button" class="btn" @click="setAllCount">전체</button>
              </div>
            </div>
            <div class="btn-area">
              <div class="btn-half">
                <div class="row">
                  <div>
                    <button type="button" class="btn btn-big btn-primary-outline w-100" @click="modalclose" >
                      취소
                    </button>
                  </div>
                  <div>
                    <button type="button" class="btn btn-big btn-primary w-100" @click="confirmInspection">
                      확정
                    </button>
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

import { mapGetters } from "vuex";
import Swal from 'sweetalert2';
import $ from 'jquery';

export default {
  name: "LabelScan",
  props: {
    productName: {
      type: String,
      require: true
    },
    orderCode: {
      type: String,
      require: true
    },
    orderName: {
      type: String,
      require: true
    },
    orderDetailSeq: {
      type: String,
      require: true
    },
    index: {
      type:Number,
      require: true
    },
  },
  data: () => ({
    currentCount: 0,
  }),
  computed: {
    ...mapGetters("InspectionStore", ["isLoading", "getInspectionList", "getCodeInfo"]),
  },
  methods: {
    async onQrCodeEnter() {
      console.log("Enter Key 입력");
      console.log("QR CODE : " + $('#qr-code').val());

      let qrCodeValue = $('#qr-code').val();
      let sendData = {};
      sendData.storeCode = sessionStorage.getItem("storeCode");
      sendData.orderCode = this.orderCode;
      sendData.orderDetailSeq = this.orderDetailSeq;

      console.log("테스트용 라벨코드 : D320210318000000001");
      console.log("테스트용 상품코드(아이디) : 04263890");

      if (qrCodeValue === '') {
        Swal.fire({
          title: '라벨코드를 스캔하세요',
          // text: '',
          type: 'warning',
        });
        return;
      }

      await this.$store.dispatch("InspectionStore/getLabelCode", sendData); // send restful message to backend-server
      console.log("this.getCodeInfo[0].labelCode --> " + this.getCodeInfo[0].labelCode);
      console.log("this.getCodeInfo[0].productId --> " + this.getCodeInfo[0].productId);

      let labelCodeForProduct = this.getCodeInfo[0].labelCode;
      if (qrCodeValue !== labelCodeForProduct) {     // 스캔된 라벨정보와 클릭한 상품의 배송정보가 다를 경우
        Swal.fire({
          title: '스캐닝한 라벨정보가 해당 상품정보와 다릅니다',
          // text: '',
          type: 'warning',
        });
        return;
      }

      // 라벨 코드 매칭 성공시 
      console.log('포커싱 이동');
      $("#qr-code-box").addClass("scan-disabled");
      $("#qr-code").attr("disabled", true);
      $('#product-bar-code-box').removeClass("scan-disabled");
      $('#product-bar-code').attr("disabled", false);
      $('#product-bar-code').focus();
    },
    onProductBarCodeEnter() {
      if (this.currentCount >= 8) {
        Swal.fire({
          title: '주어진 처리 개수인 8개가 완료되었습니다.',
          // text: '',
          type: 'warning',
        });
        return;
      }

      let productIdFromDB    = this.getCodeInfo[0].productId;
      let productIdFromInput = $('#product-bar-code').val();
      
      // console.log('productIdFromDB : ' + productIdFromDB);
      // console.log('productIdFromInput : ' + productIdFromInput);

      if (productIdFromInput === '') {
        Swal.fire({
          title: '상품바코드를 스캔하세요',
          // text: '',
          type: 'warning',
        });
        return;
      }

      if (productIdFromDB === productIdFromInput) {
        $('#product-bar-code').val('');
        this.increaseCount();
      } else {
        Swal.fire({
          title: '스캐닝한 상품바코드정보가 해당 상품 정보와 다릅니다.',
          // text: '',
          type: 'warning',
        });
      }
    },
    modalclose() {
      this.$emit("modal-close");
      this.currentCount = 0;

      $("#qr-code-box").removeClass("scan-disabled");
      $('#qr-code').val('');
      $("#qr-code").attr("disabled", false);

      $('#product-bar-code-box').addClass("scan-disabled");
      $('#product-bar-code').val('');
      $('#product-bar-code').attr("disabled", true);
      // $('#product-bar-code').focus();
    },
    confirmInspection() {
      console.log("index", this.index);

      if (this.currentCount < 8) {
        Swal.fire({
          title: '아직 취소검수할 건이 남아있습니다.',
          text: '',
          type: 'warning',
        });
        return;
      }

      let param = {};
      let i = this.index;
      param.pickerId = sessionStorage.getItem("userid");
      (param.storeCode = sessionStorage.getItem("storeCode")),
      (param.deliNo = this.getInspectionList[i].deliNo);
      param.deliDetailSeq = this.getInspectionList[i].deliDetailSeq;
      param.centerCode = this.getInspectionList[i].centerCode;
      param.orderCode = this.getInspectionList[i].orderCode;
      param.orderDetailSeq = this.getInspectionList[i].orderDetailSeq;
      console.log(i, param);

      let payload = [];
      payload.push(param);
      console.log(payload);
      console.log("payload --> " + payload);
      this.$store.dispatch("InspectionStore/confirmInspection", payload).then(() => {
        this.$emit('getInspections')
      });

      Swal.fire({
        title: '취소완료 하였습니다.',
        text: '',
        type: 'success',
        onAfterClose: () => {
          this.modalclose();
        }
      });
      this.modalclose();
    },
    decreaseCount() {
      if (this.currentCount <= 0) {
        this.currentCount = 0;
        return;
      }
      this.currentCount--;
    },
    increaseCount() {
      if (this.currentCount >= 8) {
        this.currentCount = 8;
        return;
      }
      this.currentCount++;
    },
    setAllCount() {
      this.currentCount = 8;
    },
    onClick(e) {
    }
  },
  mounted() {
    window.document.addEventListener("click", this.onClick);
  },
  updated() {
    // console.log("LabelScan updated", this.orderCode);
  },
  created() {
  },
};
</script>
<style scoped>
.modal-lg {
  width: 650px;
  left: 35px;
}
</style>