<template>
  <main-layout>
    <div class="section">
      <div class="section-wrap">
        <div class="search-area">
          <ul class="accordion">
            <div class="main-search-area">
              <div class="input-area">
                <div class="row">
                  <div class="input-set">
                    <div class="input-lable">요청일자</div>
                    <input
                      type="text"
                      id="deliDate"
                      data-role="calendarpicker"
                      data-dialog-mode="true"
                    />
                    <div class="calendar-btn-area">
                      <button
                        type="button"
                        @click="dateminus"
                        class="btn btn-md btn-grey-outline ic-arrow-left"
                      >
                        <span>이전</span>
                      </button>
                      <button
                        type="button"
                        @click="dateplus"
                        class="btn btn-md btn-grey-outline ic-arrow-right"
                      >
                        <span>다음</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn-search-area">
                <button
                  type="button"
                  @click="getInspections"
                  class="btn btn-search btn-bk"
                >
                  <span>검색</span>
                </button>
              </div>
            </div>
          </ul>
        </div>
        <div class="main-table">
          <div class="table-title-area">
            <div class="table-total">
              총 주문건
              <span
                class="text-primary"
                v-if="this.getInspectionList.length > 0"
              >
                {{ this.getInspectionList[0].cnt }}
              </span>
            </div>
            <div class="table-btn-area">
              <button
                type="button"
                class="btn btn-ml btn-primary btn-ic ic-check-wh"
                @click="doInspect"
              >
                확정
              </button>
              <!--
              <button
                type="button"
                class="btn btn-ml btn-primary-outline btn-ic ic-cancel-red"
                @click="doReverseInspect"
              >
                확정취소
              </button>
              -->
            </div>
          </div>
          <div class="table-lg">
            <table>
              <colgroup>
                <col width="50px" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col />
                <col width="10%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr>
                  <th>
                    <div class="only-check">
                      <div class="checkbox">
                        <input
                          id="checkall"
                          type="checkbox"
                          @click="doallcheck"
                        />
                        <label for="checkall" class="checkbox-label"></label>
                      </div>
                    </div>
                  </th>
                  <th>보관/상차</th>
                  <th>주문번호</th>
                  <th>주문자ID</th>
                  <th>주문자</th>
                  <th>상품명</th>
                  <th>취소수량</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody v-if="this.getInspectionList.length > 0">
                <tr v-for="(pick, index) in getInspectionList" :key="index">
                  <td>
                    <div class="only-check">
                      <div class="checkbox">
                        <input
                          :id="getInspectionList[index].rnum"
                          value="getInspectionList[index].rnum"
                          v-model="getInspectionList[index].checked"
                          @click="selectpick(index)"
                          name="chk"
                          type="checkbox"
                        />
                        <label
                          :for="getInspectionList[index].rnum"
                          class="checkbox-label"
                        ></label>
                      </div>
                    </div>
                  </td>
                  <td>{{ getInspectionList[index].deliSaveCode }}/{{ getInspectionList[index].deliOrderSort }}</td>
                  <td>
                    <span
                      class="link modal-open check-modal"
                      @click="
                        openLabelScan(index
                                    , getInspectionList[index].productName
                                    , getInspectionList[index].orderCode
                                    , getInspectionList[index].orderName
                                    , getInspectionList[index].orderDetailSeq)
                      "
                    >
                      {{ getInspectionList[index].orderCode }}
                    </span>
                  </td>
                  <td>{{ getInspectionList[index].orderId }}</td>
                  <td>{{ getInspectionList[index].orderName }}</td>
                  <td class="text-left">
                    <div class="pr-content link modal-open pr-modal">
                      <div class="pr-img">
                        <img
                          :src="getInspectionList[index].imgUrl"
                          alt="제품이미지"
                        />
                      </div>
                      <div class="pr-text">
                        {{ getInspectionList[index].productName }}
                      </div>
                    </div>
                  </td>
                  <td class="bg-pink">
                    <span class="text-primary bold">{{ getInspectionList[index].inspQty }}</span>
                    / {{ getInspectionList[index].qty }}
                  </td>
                  <td class="text-primary">
                    {{ getInspectionList[index].statusNm }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagenation" ref="pagenation">
              <ul id="pageView" ref="pageView"></ul>
            </div>
          </div>
        </div>
      </div>
      <div class="pos-fixed pos-center">
        <Loader v-show="isLoading" />
      </div>
    </div>

    <!--라벨스캔 modal-->
    <label-scan
      ref = "labelscancomponent"
      @getInspections= "getInspections"
      @modal-close = "closeLabelScan"
      :productName = "productName"
      :orderCode = "orderCode"
      :orderName = "orderName"
      :orderDetailSeq = "orderDetailSeq"
      :index = "index"
    />
  </main-layout>
</template>
<script>
import Swal from "sweetalert2";
import Vue from "vue";
import _ from "lodash";
import $ from "jquery";
import Metro from "../../js/metro.min.js";
import vueMoment from "vue-moment";
import MainLayout from "../../layouts/Main.vue";
import Loader from "../../views/Loader";
import { buildPage } from "../../utils/pageService";
import { mapGetters } from "vuex";
import LabelScan from "@/components/LabelScan";

Vue.use(vueMoment);

export default {
  name: "InspectionList",
  components: {
    MainLayout,
    Loader: Loader,
    LabelScan,
  },
  data: () => ({
    title: "",
    buttontitle: "",
    page: 1,
    orderCode: "",
    orderName: "",
    deliOrder: "",
    deliDate: "",
    deliMethod: "",
    deliNo: "",
    centerCode: "",
    status: "",
    pickData: {
      groupCode: "",
      sPringOutLayer: "",
      deliDate: "",
      deliDiv: "",
      deliOrder: "",
      pickArea: "",
      status: "1",
      deliNo: "",
      orderName: "",
      pickerName: "",
      deliNo: "",
      pageGroup: 1,
      limit: 6,
      cnt: 0,
    },
    pageGroup: 1,
    limit: 6,
    cnt: 0,
    productName: "",
    orderDetailSeq:"",
    index:0,
  }),
  methods: {
    async getInspections() {
      console.log('this.page',this.page);

      $("#checkall").prop("checked", false);
      this.pickData.deliDate =
        $("#deliDate").val().length > 8
          ? $("#deliDate").val().replaceAll("-", "")
          : "";
      // console.log('this.pickData --> ', this.pickData);

      this.pickData.pageGroup = this.page > 1 ? (this.page - 1) * 6 + 1 : this.page;
      this.pickData.limit = this.pickData.pageGroup + 5;
      const senddata = Object.assign({}, this.pickData);
      // console.log('senddata --> ', senddata);

      await this.$store.dispatch("InspectionStore/getInspections", senddata); // send restful message to backend-server
      // console.log("this.getInspectionList --> " + this.getInspectionList);
      for (let i = 0; i < this.getInspectionList.length; i++) {
        this.getInspectionList[i] = Object.assign(this.getInspectionList[i], {
          checked: false,
        });
        this.getInspectionList[i].orderCode = this.getInspectionList[i].orderCode.substr(8);
      }

      // console.log('this.page', this.page);
      // console.log('this.getInspectionList[0]', this.getInspectionList[0]);

      if (this.getInspectionList.length > 0) {
        // console.log("this.getInspectionList[0].cnt", this.getInspectionList[0].cnt);
        // console.log("this.getInspectionList --> " + this.getInspectionList);
        buildPage(this, this.page, this.getInspectionList[0].cnt, 6);
      } else {
        buildPage(this, this.page, 0, 6);
      }
    },
    openLabelScan(index, productName, orderCode, orderName, orderDetailSeq) {
      this.index = index;
      this.productName = productName;
      this.orderCode = orderCode;
      this.orderName = orderName;
      this.orderDetailSeq = orderDetailSeq;
      $("#for-modal-label-scan").fadeIn(300);
    },
    closeLabelScan() {
      $(".modal").fadeOut(300);
      $("body").css("overflow", "visible");
    },
    onClickApp(event) {
      if (this.getInspectionList == null) {
        return;
      }

      if (event.target.name === "chk" || _.isUndefined(event.target.name)) {
        return;
      }

      if (
        this.getInspectionList.length < 1 ||
        event.target.id.length === 0 ||
        isNaN(event.target.id)
      ) {
        return;
      }

      const maxPage = Math.ceil(this.getInspectionList[0].cnt / 6);
      const currentPage = this.page;
      let index = Number(event.target.id);

      if (maxPage === currentPage && [999, 9999].includes(index)) {
        return;
      }
      if (currentPage === 1 && [888, 8888].includes(index)) {
        return;
      }

      let page = index;
      if (index === 888) {
        page = currentPage - 1;
      }
      if (index === 999) {
        page = currentPage + 1;
      }
      if (index === 8888) {
        page = 1;
      }
      if (index === 9999) {
        page = maxPage;
      }
      if (currentPage === page) {
        return;
      }

      console.log("caculation page is ", page);
      this.page = page;
      this.getInspections();
    },
    dateminus() {
      let curDate = $("#deliDate").val();
      if (curDate.length < 1) {
        return;
      }
      $("#deliDate").val(
        this.$moment(curDate).subtract(1, "days").format("YYYY-MM-DD")
      );
    },
    dateplus() {
      let curDate = $("#deliDate").val();
      if (curDate.length < 1) {
        return;
      }
      $("#deliDate").val(
        this.$moment(curDate).add(1, "days").format("YYYY-MM-DD")
      );
    },
    selectpick(index) {
      this.getInspectionList[index].checked = !this.getInspectionList[index].checked;
    },
    doallcheck() {
      for (let i = 0; i < this.getInspectionList.length; i++) {
        this.getInspectionList[i].checked = !this.getInspectionList[i].checked;
        //console.log(this.pickDataList[i].checked);
      }
      if ($("#checkall").prop("checked")) {
        $("input[name=chk]").prop("checked", true);
      } else {
        $("input[name=chk]").prop("checked", false);
      }
    },
    doInspect() {
      this.status = "40";
      this.title = "확정처리하시겠습니까!";
      this.buttontitle = "확정";

      console.log("확정버튼 클릭");
      this.doPick();
    },
    doReverseInspect() {
      this.status = "01";
      (this.title = "확정취소하시겠습니까!"), (this.buttontitle = "확정취소");
      //this.doPick();
    },
    cancelConfirmation() {
      console.log("확정취소");
    },
    doPick() {
      Swal.fire({
        title: this.title,
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.buttontitle,
        cancelButtonText: "취소!",
      }).then((result) => {
        if (result.dismiss === "cancel") {
          return;
        }

        if (result) {
          let payload = [];
          let ischecked = false;
          for (let i = 0; i < this.getInspectionList.length; i++) {
            if (this.getInspectionList[i].checked === true) {
              let param = {};
              ischecked = true;
              param.pickerId = sessionStorage.getItem("userid");
              param.storeCode = sessionStorage.getItem("storeCode");
              param.deliNo = this.getInspectionList[i].deliNo;
              param.deliDetailSeq = this.getInspectionList[i].deliDetailSeq;
              param.centerCode = this.getInspectionList[i].centerCode;
              param.orderCode = this.getInspectionList[i].orderCode;
              param.orderDetailSeq = this.getInspectionList[i].orderDetailSeq;
              console.log(i, param);
              payload.push(param);
            }
          }
          if (!ischecked) {
            Swal.fire({
              type: "error",
              title: "NG!",
              text: "선택된 항목이 없습니다!",
            });
            this.barcodeValue = "";
            return;
          }
          console.log("payload --> " + payload);
          this.$store.dispatch("InspectionStore/confirmInspection", payload).then(() => {
            this.getInspections();
          });
        }
      });
    },
  },
  mounted() {
    Metro.init();
    window.document.addEventListener("click", this.onClickApp);

    // var calendarPicker = document.querySelector(".calendar-picker");
    // calendarPicker.style.width = "100px";
    // calendarPicker.querySelector("#deliDate").style.width = "100px";

    $("#deliDate").val(this.$moment().format('YYYY-MM-DD'));
    // console.log(this.$moment().format('YYYY-MM-DD'));
    // $("#deliDate").val("2021-05-25");
  },
  computed: {
    ...mapGetters("InspectionStore", ["isLoading", "getInspectionList", "getCodeInfo"]),
  },
  // beforeCreate() {
  //   const codes = ["OMS_DELI_METHOD"];
  //   for (let i = 0; i < codes.length; i++) {
  //     this.$store.dispatch("Authentication/getCode", codes[i]);
  //   }
  // },
};
</script>
<style scoped>
.modal {
  z-index: 99;
}
#deliDate {
  text-align: center;
}
</style>
