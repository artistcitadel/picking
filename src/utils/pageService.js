import $ from 'jquery';

export function buildPage(component, page,totalPage, limit) {
    console.log('build page started page is', page);
    console.log('origin totalPage', totalPage);
    totalPage = Math.ceil(totalPage/limit);
    console.log('caculate totalPage ', totalPage);
    generate(component, page,totalPage, limit);
}
export function generate(component,page,totalPage, limit){
    console.log(component.$refs.pagenation);
    // console.log(component.$refs.pageView);
    const pageNation = component.$refs.pagenation
    const pageView = component.$refs.pageView;
    console.log($(pageView));
    // const prev = '<li class="next-double"><a href="#"></a></li>';
    //   var next = '<a style="cursor:pointer;" class="btn_last">마지막</a>';
    //   var before = '<a style="cursor:pointer;" class="btn_prev">이전</a>';
    //   var after = '<a style="cursor:pointer;" class="btn_next">다음</a>';
     const prev ='<li class="prev-double"><a href="#" id="8888"></a></li>';
     const next = '<li class="next-double"><a href="#" id="9999"></a></li>';
     const before = '<li class="prev"><a href="#" id="888"></a></li>';
     const after = '<li class="next" id="999"><a href="#" id="999"></a></li>';

     let str = buildCount(totalPage,page,limit);
      // console.log('1',str);
      $(pageNation).find("ul > *").remove();
      if(totalPage>1){
        $(pageView).append(prev).append(before).append(str).append(after).append(next);
      }
      if(totalPage===1) $(pageView).append(str);
    //   $('.pi').on('click',function() {
    //       var page = Number($(this).attr("id"))-1;
          
    //   });
    //   $('.prev-double').on('click',function() {
    //       //gridView.setPage(1);
          
    //   });
    //   $('.next-double').on('click',function() {
    //       //gridView.setPage(totalPage);
          
    //   });
    //   $('.prev').on('click',function() {
    //       //gridView.setPage(gridView.getPage()-1);
          
    //   });
    //   $('.next').on('click',function() {
    //       //gridView.setPage(gridView.getPage()+1);
          
    //   });
  }
/*showProgress: function(grid,page){
    grid.showProgress();
    setTimeout(function(){ grid.closeProgress(); }, 500);
    grid.setPage(page);
    kcisa.sr.cmmn.generate(grid);
}*/

export function buildCount(totalPage, page, limit){
    console.log('build count ', totalPage, page);
    let sidx = Math.floor(page/10);
    console.log('1',sidx);
    sidx = Math.floor(sidx)*9+1;
    console.log('2',sidx);
    let eidx = sidx+9;
    console.log('eidx',eidx);
    eidx = (totalPage<eidx)?totalPage:eidx;
    console.log('eidx',eidx);
    // if(eidx>1)--eidx;
    console.log("sidx ", sidx);
    console.log("edix " , eidx);
    let str = '';
    for(let i=sidx;i<=eidx;i++){
        //str += '<a style="cursor:pointer;" class="pi" id="'+i+'">'+i+'</a>';
        if(i===page)
                 str += '<li class="active pi" id="'+i+'">'+i+'</li>';
             else
                //  str += '<a style="cursor:pointer;" class="pi" id="'+i+'">'+i+'</a>';
                 str += '<li><a style="cursor:pointer;" class="pi" id="'+i+'">'+i+'</a></li>';
    }
    return str;
}

// export function route(url){
//     console.log(url);
//     router.push(url);
// }
// import router from '../router';
