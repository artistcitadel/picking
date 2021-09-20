<template>
<main-layout>

<div class="section">
  <div class="section-wrap"> 
    <!--검색-->
    <div class="search-area">
      <ul class="accordion">
        <div class="main-search-area">
          <div class="input-area">
            <div class="row">
              <div class="input-set" style="width: 50%">
                <div class="input-lable">배송일자</div>
                <input type="text" data-role="calendarpicker" data-dialog-mode="true" >
                <div class="calendar-btn-area">
                  <button type="button" class="btn btn-md btn-grey-outline ic-arrow-left"><span>이전</span></button>
                  <button type="button" class="btn btn-md btn-grey-outline ic-arrow-right"><span>다음</span></button>
                </div>
              </div>
              <div class="input-set" style="width: 50%">
                <div class="input-lable">회차</div>
                <select>
                  <option>1회차</option>
                  <option>2호차</option>
                  <option>3회차</option>
                </select>
              </div>
            </div>
          </div>
          <div class="btn-search-area">
            <button type="button" class="btn btn-search btn-bk"><span>검색</span></button>
          </div>
        </div>
      </ul>
    </div>
    <!--테이블-->
    <div class="main-table">
      <div class="table-title-area">
        <div class="table-total">총 주문건<span class="text-primary">30</span></div>
        <div class="table-btn-area">
          <button type="button" class="btn btn-ml btn-primary btn-ic ic-check-wh">피킹완료</button>
        </div>
      </div>
      <div class="table-lg">
        <table>
          <colgroup>
          <col width="50px"/>
          <col/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="20%"/>
          <col width="10%"/>
          </colgroup>
          <thead>
            <tr>
              <th> <div class="only-check">
                  <div class="checkbox">
                    <input id="checkall" type="checkbox">
                    <label for="checkall" class="checkbox-label"></label>
                  </div>
                </div>
              </th>
              <th>상품명</th>
              <th>주문번호</th>
              <th>주문자</th>
              <th>피킹수량</th>
              <th>보관코드/상차코드</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><div class="only-check">
                  <div class="checkbox">
                    <input id="chk01" name="chk" type="checkbox">
                    <label for="chk01" class="checkbox-label"></label>
                  </div>
                </div></td>
              <td class="text-left"><div class="pr-content link modal-open pr-modal">
                  <div class="pr-img"> <img src="images/img-test-02.jpg" alt="제품이미지"> </div>
                  <div class="pr-text" @click="opengood">농심 새우깡 120g*5개 05556663</div>
                </div></td>
              <td><span class="link modal-open list-modal">123456789</span></td>
              <td>이*희</td>
              <td class="bg-pink"><span class="text-primary bold">3</span>/3</td>
              <td>01/02</td>
              <td class="text-primary">피킹완료</td>
            </tr>
            <tr>
              <td><div class="only-check">
                  <div class="checkbox">
                    <input id="chk02" name="chk" type="checkbox">
                    <label for="chk02" class="checkbox-label"></label>
                  </div>
                </div></td>
              <td class="text-left"><div class="pr-content link modal-open pr-modal">
                  <div class="pr-img"> <img src="images/img-test-02.jpg" alt="제품이미지"> </div>
                  <div class="pr-text">농심 새우깡 120g*5개 05556663</div>
                </div></td>
              <td><span class="link modal-open list-modal">123456789</span></td>
              <td>이*희</td>
              <td class="bg-pink"><span class="text-primary bold">3</span>/3</td>
              <td>01/02</td>
              <td>피킹준비</td>
            </tr>
            <tr>
              <td><div class="only-check">
                  <div class="checkbox">
                    <input id="chk03" name="chk" type="checkbox">
                    <label for="chk03" class="checkbox-label"></label>
                  </div>
                </div></td>
              <td class="text-left"><div class="pr-content link modal-open pr-modal">
                  <div class="pr-img"> <img src="images/img-test-02.jpg" alt="제품이미지"> </div>
                  <div class="pr-text">농심 새우깡 120g*5개 05556663</div>
                </div></td>
              <td><span class="link modal-open list-modal">123456789</span></td>
              <td>이*희</td>
              <td class="bg-pink"><span class="text-primary bold">3</span>/3</td>
              <td>01/02</td>
              <td>피킹준비</td>
            </tr>
            <tr>
              <td><div class="only-check">
                  <div class="checkbox">
                    <input id="chk04" name="chk" type="checkbox">
                    <label for="chk04" class="checkbox-label"></label>
                  </div>
                </div></td>
              <td class="text-left"><div class="pr-content link modal-open pr-modal">
                  <div class="pr-img"> <img src="images/img-test-02.jpg" alt="제품이미지"> </div>
                  <div class="pr-text">농심 새우깡 120g*5개 05556663</div>
                </div></td>
              <td><span class="link modal-open list-modal">123456789</span></td>
              <td>이*희</td>
              <td class="bg-pink"><span class="text-primary bold">3</span>/3</td>
              <td>01/02</td>
              <td>피킹준비</td>
            </tr>
            <tr>
              <td><div class="only-check">
                  <div class="checkbox">
                    <input id="chk05" name="chk" type="checkbox">
                    <label for="chk05" class="checkbox-label"></label>
                  </div>
                </div></td>
              <td class="text-left"><div class="pr-content link modal-open pr-modal">
                  <div class="pr-img"> <img src="images/img-test-02.jpg" alt="제품이미지"> </div>
                  <div class="pr-text">농심 새우깡 120g*5개 05556663</div>
                </div></td>
              <td><span class="link modal-open list-modal">123456789</span></td>
              <td>이*희</td>
              <td class="bg-pink"><span class="text-primary bold">3</span>/3</td>
              <td>01/02</td>
              <td>피킹준비</td>
            </tr>
            <tr>
              <td><div class="only-check">
                  <div class="checkbox">
                    <input id="chk06" name="chk" type="checkbox">
                    <label for="chk06" class="checkbox-label"></label>
                  </div>
                </div></td>
              <td class="text-left"><div class="pr-content link modal-open pr-modal">
                  <div class="pr-img"> <img src="images/img-test-02.jpg" alt="제품이미지"> </div>
                  <div class="pr-text">농심 새우깡 120g*5개 05556663</div>
                </div></td>
              <td><span class="link modal-open list-modal">123456789</span></td>
              <td>이*희</td>
              <td class="bg-pink"><span class="text-primary bold">3</span>/3</td>
              <td>01/02</td>
              <td>피킹준비</td>
            </tr>
          </tbody>
        </table>
        <div class="pagenation">
          <ul>
            <li class="prev-double"><a href="#"></a></li>
            <li class="prev"><a href="#"></a></li>
            <li class="active">1</li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li class="next"><a href="#"></a></li>
            <li class="next-double"><a href="#"></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <good @modal-close='closegood' />

</div>

</main-layout>
</template>
<script>
import _ from 'lodash';
import $ from 'jquery';
import MainLayout from '../../layouts/Main.vue';
import Loader from '../../views/Loader';
import Good from './Good';
export default {
    name: 'bookList',
    components: {
     MainLayout,
     'Loader': Loader,
     Good,

  },
  data: () => ({
   
  })
  ,
  methods: {
      opengood(){
          $("#for-pr-modal").fadeIn(300);
      }
      ,
      closegood(){
        $(".modal").fadeOut(300);
        $("body").css("overflow", "visible");
      }
  }
  ,
}
</script>
<style scoped>

</style>
