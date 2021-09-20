<template>
 <!-- <div class="component-page-loader">
  <div classs="loader-wrapper">
		<div class="loader"></div>
		<div class="brand h1">
		  <small class="text--brand">MEGA</small>
              MART
   </div>
</div>
</div> -->

<div class="styles-module__centered__2hjqn inlineBlock">
   <div class="sk-spinner styles-module__color__1Gjdo styles-module__big__3IfIl inlineBlock line-scale-pulse-out"
	 style="display: inline-block;">
     <div class="brand h1">
		  <!-- <small class="text--brand">MEGA</small>
              MART -->
              <small class="text--brand">MEGA</small>
              <div style="color:white">MART</div>
   </div>
   
      <!-- <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div> -->
   </div>
   <div class="styles-module__progressUI__3rdag"></div>
</div>

</template>
<script>
  export default {
      name: 'Loader',
  }
</script>

<style scoped>
.styles-module__centered__2hjqn {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 10000;
    text-align: center;
    transform: translate(-50%, -50%);
    animation: styles-module__fadein__3JRVX 1s;
    border-radius: 10px;
}

.styles-module__centered__2hjqn > .sk-spinner {
    /* background: #3786c2; */
     background: #fc0404;
    padding: 15px;
    border-radius: 50%;
    height: 115px;
    width: 115px;
}

.sk-spinner {
    color: #333;
}
.sk-spinner > div {
    background-color: currentColor;
}
.styles-module__centered__2hjqn > .sk-spinner {
    background:  #fc0404;
    padding: 15px;
    border-radius: 0%;
    height: 115px;
    width: 125px;

    /* margin: 100px auto;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out; */

}

@-webkit-keyframes sk-rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes sk-rotateplane {
  0% { 
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg) 
  } 50% { 
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg) 
  } 100% { 
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}

.line-scale-pulse-out > div {
    background-color: #fff;
    /* width: 4px;  
    height: 35px; */
    width: 0px;  
    height: 0px;
    border-radius: 2px;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    -webkit-animation: line-scale-pulse-out 0.9s -0.6s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
    animation: line-scale-pulse-out 0.9s -0.6s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
}

.brand>small {
    display: block;
    font-family: arial;
    font-size: 14px;
    font-weight: 100;
    letter-spacing: 5px;
}
.text--brand, .text--brand:active, .text--brand:focus, .text--brand:hover {
    /* color: #44d62c; */
    color:#fff
}
.brand {
    float: left;
    margin-left: 5px;
    font-family: RazerF5,Arial,Helvetica,sans-serif;
    font-weight: 100;
}
.h1, h1 {
    font-size: 2.4rem;
}
.loader-wrapper {
   position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  opacity: 0;
  z-index: -1;
  transition: opacity .3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
}
.component-page-loader1 {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0 auto;
    padding: 0;
    z-index: 9999;
    /* background: url(https://media.gold.razer.com/goldweb/assets/images/loader-bg.png) no-repeat center center #111; */
}

.loader {
    width: 40px;
    height: 40px;
    -webkit-animation: circle .75s linear infinite;
    animation: circle .75s linear infinite;
    border-color: rgba(68,214,44,.3) rgba(69,214,46,.3) rgba(68,214,44,.3) #44d62c;
    border-style: solid;
    border-width: 4px;
    border-radius: 100%;
    float: left;
    -webkit-transform-origin: center;
    transform-origin: center;
}
</style>
