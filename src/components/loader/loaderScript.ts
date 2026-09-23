/*
 * First-load progress, measured rather than timed:
 *   - at DOMContentLoaded, collect every stylesheet, script, preload and image the page references;
 *   - progress = how many of those have finished downloading (Resource Timing API, buffered entries
 *     included), plus "DOM parsed" and "fonts ready" milestones;
 *   - it completes on window `load`, i.e. when the browser reports everything has loaded.
 * The overlay only becomes visible after 300ms (CSS), so fast loads never flash it, and a 10s
 * failsafe always releases the page. Without JavaScript the overlay is never shown.
 */
export const loaderScript = `(function(){
var d=document,w=window,root=d.documentElement,el=d.getElementById('ap-loader');
if(!el)return;
root.classList.add('ap-loading');
var fill=el.querySelector('.apl-bar span'),pct=el.querySelector('.apl-pct span');
var expected=null,seen={},milestones=0,shown=0,finished=false;
function norm(u){try{return new URL(u,location.href).href}catch(e){return u}}
function count(){if(!expected)return 0;var n=0;for(var k in expected)if(seen[k])n++;return n}
function total(){return (expected?Object.keys(expected).length:0)+2}
function render(){var p=finished?100:Math.min(96,Math.round((count()+milestones)/total()*100));if(p<shown)p=shown;shown=p;fill.style.transform='scaleX('+(p/100)+')';pct.textContent=p;el.setAttribute('aria-valuenow',p)}
function record(list){for(var i=0;i<list.length;i++)seen[norm(list[i].name)]=1;render()}
if(w.PerformanceObserver){try{new PerformanceObserver(function(l){record(l.getEntries())}).observe({type:'resource',buffered:true})}catch(e){}}
function onDom(){expected={};var q=d.querySelectorAll('link[rel="stylesheet"][href],link[rel="preload"][href],script[src],img[src]');for(var i=0;i<q.length;i++){var u=q[i].getAttribute('href')||q[i].getAttribute('src');if(u)expected[norm(u)]=1}if(w.performance&&performance.getEntriesByType)record(performance.getEntriesByType('resource'));milestones++;render();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){milestones++;render()});else{milestones++;render()}}
function finish(){if(finished)return;finished=true;render();setTimeout(function(){el.classList.add('apl-done');root.classList.remove('ap-loading');w.dispatchEvent(new Event('ap:loaded'))},180)}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',onDom);else onDom();
if(d.readyState==='complete')finish();else w.addEventListener('load',finish);
setTimeout(finish,10000);
})();`;
