import _ from 'lodash';
  
  export function getTitle(url){
    console.log(url);
    let word='';
    const TITLE = {
                   "/order_list":"정상피킹" ,
                   "/tot_assign":"정상피킹" ,
                   "/picking":"정상피킹" ,
                   "/manual_picking":"이형피킹" ,
                   "/book_list":"예약상품" ,
                   "/inspection_list":"취소검수" ,
                   "/event_list":"사은품" ,
                   "/jangman_list":"장만출력" ,
                  };
                  _.map(TITLE, function(value, key){
                    console.log(key, value);
                    if(url.includes(key)){
                      word=value;
                    }
                  });
    return word;
  }
  export function getSubTitle(url){
    let word='';
    const SUBTITLE = {"/order_list":"주문목록",
                    "/tot_assign":"토트박스 스캔",
                    "/picking":"상품 스캔",
                    "/manual_picking":"주문목록",
                    "/book_list":"피킹목록",
                    "/inspection_list":"취소목록",
                    "/event_list":"사은품목록",
                    "/jangman_list":"장만출력목록",
                  };
                  _.map(SUBTITLE, function(value, key){
                    console.log(key, value);
                    if(url.includes(key)){
                      word=value;
                    }
                  });
    return word;
  }

  let GROUPKEY = '';
  export function setGroupKey(gkey){
    GROUPKEY=gkey;
  }
  export function getGroupKey(){
    return GROUPKEY;
  }
  