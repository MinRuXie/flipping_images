async function init(){let e=await fetch("src/assets/data/images.json"),t=await e.json(),n=t.card_back,a=t.card_fronts;let s=a.slice();s.push(t.card_back),s.push(t.game_cover);for(let e=0;e<s.length;e++)i=s[e],(new Image).src=i;var i;$((function(){let e,t=document.getElementById("js-correct-player"),s=document.getElementById("js-incorrect-player"),i=document.getElementById("js-flipping-player"),l=document.getElementById("js-start-player"),c=$("#js-start-btn"),r=$("#js-card-wrap"),o=$("#js-restart-btn"),d=$("#js-timer"),f=$("#js-history-list"),u=$("#js-game-cover-back"),m=$("#js-reward-wrap"),p=[],g=[],h=0,v=[],y=0,j=0,w=[];function b(){let e=a.slice();!function(e){for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}}(e);let t=e.slice(0,12);p=t.concat(t),g=[];for(let e=0;e<t.length;e++)g.push(t[e]);r.empty();for(let e=0;e<p.length;e++)r.append(`<div class="card exist">\n                        <img class="card-back" src="${n}" draggable="false" />\n                        <img class="card-front" src="${p[e]}" draggable="false"/>\n                    </div>`)}function C(){y=0,j=0,d.text(`${y.toString().padStart(2,0)}:${j.toString().padStart(2,0)}`),e=setInterval((function(){j++,j>=60&&(j=0,y++),d.text(`${k(y)}:${k(j)}`)}),1e3)}async function I(){g.length<=0&&(await clearInterval(e),await function(){let e=60*y+j,t="";t=e<=20?"這麼快速一定是真愛粉！":e<=40?"回去多練習吧！":"太可憐了...";let n=prompt(`遊戲結束！${t}共花費${k(y)}分${k(j)}秒！\n請輸入您的大名：`,"讓我想想");null==n&&(n="無名氏");w.push({sec:k(e),name:n}),w.sort(q),f.empty();for(let e=0;e<w.length;e++)f.append(`<li>${w[e].name} ${w[e].sec}秒</li>`)}(),m.addClass("show"),m.append('\n                <div class="reward-content">\n                    恭喜破關成功！\n                    <div class="image-wrap"></div>\n                    <div id="js-close-btn" class="btn">我收下了</div>\n                </div>'),$("#js-image-wrap").addClass("show"),$("#js-close-btn").on("click",(function(){m.empty(),m.removeClass("show")})))}function x(){h=0,v=[]}function k(e){return e<10?`0${e}`:e}function q(e,t){return e.sec-t.sec}c.on("click",(function(){l.currentTime=0,l.play(),$("#js-ready").fadeOut(),C()})).on("mouseenter",(function(){u.addClass("show")})).on("mouseleave",(function(){u.removeClass("show")})),o.on("click",(function(){l.currentTime=0,l.play(),clearInterval(e),b(),x(),C()})),$(document).on("click",".exist",(function(){if(i.currentTime=0,i.play(),h++,$(this).removeClass("flipped-b-to-f"),$(this).removeClass("flipped-f-to-b"),h<=2){v.push($(this)),$(this).find("img").eq(0).fadeOut(),$(this).addClass("flipped-b-to-f");for(let e=0;e<v.length;e++)v[e].removeClass("exist"),v[e].removeClass("exist");if(2==v.length){let e=v[0].find("img"),n=v[1].find("img");setTimeout((function(){if(e.eq(1).attr("src")==n.eq(1).attr("src"))new Promise((function(a,s){t.currentTime=0,t.play(),e.fadeOut(),n.fadeOut(),g.splice(g.indexOf(e.eq(1).attr("src")),1),a(),s()})).then((function(e){I()}),(function(e){}));else{s.currentTime=0,s.play(),e.eq(0).fadeIn(),n.eq(0).fadeIn();for(let e=0;e<v.length;e++)v[e].addClass("flipped-f-to-b"),v[e].addClass("flipped-f-to-b");v[0].addClass("exist"),v[1].addClass("exist")}x()}),800)}}})),b()}))}init().then((function(){let e=!0;let t=setInterval((function(){switch(console.log("loading..."),document.readyState){case"interactive":case"complete":$("#js-loading").fadeOut(),e=!1}e||clearInterval(t)}),500)}));