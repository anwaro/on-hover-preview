// ==UserScript==
// @name         Liveleak, Vimeo, Youtube - play on hover
// @namespace    https://lukaszmical.pl/
// @version      0.1.0
// @description  try to take over the world!
// @author       Łukasz Micał
// @match        *://*/*
// @exclude      https://www.liveleak.com/*
// @exclude      https://vimeo.com/*
// @exclude      https://player.vimeo.com/*
// @exclude      https://youtube.com/*
// @exclude      https://youtu.be/*
// @grant        none
// ==/UserScript==
(()=>{"use strict";var e={751:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(326);t.default=class{constructor(){this.iframeActive=!1,this.iframe=document.createElement("iframe"),this.popup=document.createElement("div"),this.setupIframe(),this.setupPopup(),this.setupEvent()}setupIframe(){i.default(this.iframe,{height:"100%",width:"100%"}),this.popup.appendChild(this.iframe)}setupPopup(){i.default(this.popup,{background:"#444",height:"300px",width:"500px",position:"absolute",display:"none","z-index":9999,"box-shadow":"rgb(218, 218, 218) 1px 1px 5px"}),document.body.appendChild(this.popup)}setupEvent(){document.addEventListener("click",this.hidePopup.bind(this))}showPopup(e,t){this.iframeActive||(this.iframeActive=!0,i.default(this.popup,{display:"block",top:`${e.pageY}px`,left:`${e.pageX}px`}),this.iframe.src=t)}hidePopup(){this.iframeActive=!1,this.iframe.src="",i.default(this.popup,{display:"none"})}}},472:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){let s=!1,i=0;e.addEventListener("mouseenter",(o=>{s=!0,i=window.setTimeout((()=>{s&&t.call(e,o)}),1e3)})),e.addEventListener("mouseleave",(()=>{clearTimeout(i),s=!1}))}},326:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){Object.entries(t).forEach((([t,s])=>{e.style.setProperty(t,`${s}`)}))}},607:(e,t,s)=>{const i=s(751),o=s(472),a=s(490),u=s(706),n=[new(s(453).default),new u.default,new a.default],r=new i.default;n.map((e=>{e.videoLinks().map((t=>{o.default(t,(s=>{e.embeddedVideoUrl(t).then((e=>{r.showPopup(s,e)}))}))}))}))},905:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});t.default=class{isHTMLAnchorElement(e){return e instanceof HTMLAnchorElement}getLinks(e){return[...document.querySelectorAll(e)].reduce(((e,t)=>this.isHTMLAnchorElement(t)?[...e,t]:e),[])}}},490:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(905);class o extends i.default{async embeddedVideoUrl(e){return`https://www.liveleak.com/ll_embed?t=${new URLSearchParams(e.search).get("t")}`}videoLinks(){return this.getLinks('a[href*="liveleak.com/view"]')}}t.default=o},706:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(905);class o extends i.default{async embeddedVideoUrl(e){let t="";if(/\/\d+(\/.*)?$/.test(e.pathname))t=e.pathname.replace(/\D+/g,"");else{const s=await fetch(`https://vimeo.com/api/oembed.json?url=${e.href}`);t=(await s.json()).video_id}return`https://player.vimeo.com/video/${t}?autoplay=1`}videoLinks(){return this.getLinks('a[href*="vimeo.com"]')}}t.default=o},453:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(905);class o extends i.default{async embeddedVideoUrl({href:e,search:t}){const s=new URLSearchParams(t);let i=s.get("v")||"",o=s.get("t")||"0";if(e.includes("//youtu.be/")){const t=e.match(/\.be\/(?<id>[^?\/]+).*$/),{groups:{id:s}={id:i}}=t||{groups:{id:i}};i=s}else if(e.includes("youtube.com/attribution_link")){const e=decodeURIComponent(s.get("u")||`/watch?v=${i}`),t=new URL(`https://youtube.com${e}`);let a=new URLSearchParams(t.search);i=a.get("v")||i,o=a.get("t")||o}const[a="0",u="0",n]=o.match(/(?:(\d+)h)?(?:(\d+)m)?(\d+)s/)||["0","0","-1"];return o="-1"!==n?`${60*(60*Number(a)+Number(u))+n}`:"0",`https://www.youtube.com/embed/${i}?fs=1&autoplay=1&enablejsapi=1&start=${o}`}videoLinks(){return[...this.getLinks('a[href*="youtube.com"]'),...this.getLinks('a[href*="youtu.be"]')].filter((e=>{return(t=e.href).includes("youtube.com/attribution_link")||t.includes("youtube.com/watch")||t.includes("//youtu.be/");var t}))}}t.default=o}},t={};!function s(i){if(t[i])return t[i].exports;var o=t[i]={exports:{}};return e[i](o,o.exports,s),o.exports}(607)})();