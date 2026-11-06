(function(){
var Q=document.getElementById("fn"),S={svc:"",obj:"",prim:"",date:null,time:"",nome:""},step=1,vm=new Date();vm.setDate(1);
var SV=["Recuperação capilar","Mechas e loiros","Mega Hair","Corte e coloração","Unhas e beleza","Cílios e estética","Programas especiais","Ainda não sei, quero uma avaliação"];
var OB=["Recuperar a saúde dos fios","Mudar o visual","Manutenção do meu cabelo","Ocasião especial"];
var PR=["Primeira vez na Casa MZX","Já sou cliente"];
var MAPS="https://www.google.com/maps/search/?api=1&query=Sal%C3%A3o+de+Beleza+CASA+MZX+Rua+Nova+Jerusal%C3%A9m+78+S%C3%A3o+Paulo";
var progress=document.createElement("div");progress.className="scroll-progress";progress.setAttribute("aria-hidden","true");document.body.prepend(progress);
function h(d){var w=d.getDay();return w==0?[9,17]:w==1?[9,20]:[8,20]}
function slots(d){var o=h(d),a=[],n=new Date();for(var i=o[0];i<o[1];i++){var t=new Date(d);t.setHours(i,0,0,0);if(t>new Date(n.getTime()+2*36e5))a.push(i)}return a}
function ok(d){return slots(d).length>0}
function fmt(d){return d.toLocaleDateString("pt-BR",{weekday:"long",day:"2-digit",month:"2-digit",year:"numeric"})}
function esc(v){return String(v).replace(/[&<>\"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'\"':"&quot;","'":"&#39;"}[c]})}
function opts(list,key){return '<div class="ops">'+list.map(function(x){return '<button class="op'+(S[key]==x?' sel':'')+'" data-k="'+key+'" data-v="'+x+'">'+x+'</button>'}).join("")+'</div>'}
function bar(){var s="";for(var i=1;i<=5;i++)s+='<i class="'+(i<=step?'on':'')+'"></i>';return '<div class="pg">'+s+'</div>'}
function nav(back,next,nl){return '<div class="nv">'+(back?'<button class="lk" data-go="'+back+'">Voltar</button>':'<span></span>')+(next?'<button class="btn" data-go="'+next+'" '+(nl?'':'disabled')+'>Continuar</button>':'')+'</div>'}
function cal(){
 var y=vm.getFullYear(),m=vm.getMonth(),f=new Date(y,m,1).getDay(),n=new Date(y,m+1,0).getDate(),t=new Date(),cm=t.getFullYear()*12+t.getMonth(),
 hd="";["D","S","T","Q","Q","S","S"].forEach(function(x){hd+="<b>"+x+"</b>"});
 var c=hd;for(var i=0;i<f;i++)c+="<span></span>";
 for(var d=1;d<=n;d++){var dt=new Date(y,m,d),s=S.date&&S.date.toDateString()==dt.toDateString();c+='<button data-d="'+d+'" class="'+(s?'sel':'')+'" '+(ok(dt)?'':'disabled')+'>'+d+'</button>'}
 return '<div class="mh"><button data-m="-1" aria-label="Mês anterior" '+((y*12+m)<=cm?'disabled':'')+'>‹</button><span>'+vm.toLocaleDateString("pt-BR",{month:"long",year:"numeric"})+'</span><button data-m="1" aria-label="Próximo mês" '+((y*12+m)>=cm+2?'disabled':'')+'>›</button></div><div class="cal">'+c+'</div>'}
function hrs(){if(!S.date)return '<p class="nt">Escolha um dia no calendário para ver os horários.</p>';
 return '<p style="color:var(--ch);margin-bottom:.7rem;text-transform:capitalize">'+fmt(S.date)+'</p><div class="hrs">'+slots(S.date).map(function(i){var v=(i<10?"0":"")+i+":00";return '<button class="op'+(S.time==v?' sel':'')+'" data-t="'+v+'">'+v+'</button>'}).join("")+'</div>'}
function msg(){return "Olá! Vim pelo site da Casa MZX e gostaria de agendar.\n\n• Nome: "+S.nome+"\n• Serviço: "+S.svc+"\n• Objetivo: "+S.obj+"\n• "+S.prim+"\n• Data preferida: "+fmt(S.date)+"\n• Horário preferido: "+S.time+"\n\nPodem confirmar a disponibilidade? Obrigado(a)!"}
function draw(){var x=bar();
 if(step==1)x+='<h3>Qual serviço você procura?</h3>'+opts(SV,"svc")+nav(0,2,S.svc);
 if(step==2)x+='<h3>Qual é o seu objetivo?</h3>'+opts(OB,"obj")+nav(1,3,S.obj);
 if(step==3)x+='<h3>Qual dia e horário preferem?</h3><div class="dt"><div>'+cal()+'</div><div>'+hrs()+'</div></div><p class="nt">Estes são seus horários de preferência. A disponibilidade real é confirmada pela equipe no WhatsApp.</p>'+nav(2,4,S.date&&S.time);
 if(step==4)x+='<h3>Para finalizar</h3><label for="nm">Seu nome</label><input id="nm" type="text" autocomplete="given-name" maxlength="80" value="'+esc(S.nome)+'" placeholder="Como podemos te chamar?"><div style="margin-top:1.2rem">'+opts(PR,"prim")+'</div>'+nav(3,5,S.nome&&S.prim);
 if(step==5)x+='<h3>Tudo pronto, '+esc(S.nome)+'!</h3><p style="margin-bottom:1rem">Confira o resumo. Ao tocar no botão, abrimos o WhatsApp com a mensagem já escrita.</p><div class="sm">'+esc(msg())+'</div><a class="btn" target="_blank" rel="noopener" href="https://wa.me/5511992032906?text='+encodeURIComponent(msg())+'">Enviar pelo WhatsApp</a><p class="nt">Ainda não sabe como chegar? <a class="lk" target="_blank" rel="noopener" href="'+MAPS+'">Abrir no Google Maps</a></p><div class="nv"><button class="lk" data-go="4">Voltar e editar</button></div>';
 Q.innerHTML=x;var nm=document.getElementById("nm");if(nm)nm.addEventListener("input",function(){S.nome=nm.value.trim();var b=Q.querySelector(".btn[data-go]");b.disabled=!(S.nome&&S.prim)});}
Q.addEventListener("click",function(e){var t=e.target.closest("button");if(!t)return;
 if(t.dataset.k){S[t.dataset.k]=t.dataset.v;if(t.dataset.k=="prim"){draw()}else{step++;draw()}return}
 if(t.dataset.go){step=+t.dataset.go;draw();return}
 if(t.dataset.m){vm.setMonth(vm.getMonth()+ +t.dataset.m);draw();return}
 if(t.dataset.d){S.date=new Date(vm.getFullYear(),vm.getMonth(),+t.dataset.d);S.time="";draw();return}
 if(t.dataset.t){S.time=t.dataset.t;draw()}});
document.querySelectorAll("[data-svc]").forEach(function(b){b.addEventListener("click",function(){S.svc=b.dataset.svc;step=2;draw();document.getElementById("agendar").scrollIntoView()})});
var bg=document.querySelector(".bg"),n=document.getElementById("menu");
bg.addEventListener("click",function(){var o=n.classList.toggle("open");bg.setAttribute("aria-expanded",o)});
n.addEventListener("click",function(e){if(e.target.tagName=="A"){n.classList.remove("open");bg.setAttribute("aria-expanded","false")}});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&n.classList.contains("open")){n.classList.remove("open");bg.setAttribute("aria-expanded","false");bg.focus()}});
document.getElementById("y").textContent=new Date().getFullYear();
window.addEventListener("scroll",function(){var max=document.documentElement.scrollHeight-window.innerHeight;progress.style.transform="scaleX("+(max>0?window.scrollY/max:0)+")"},{passive:true});
var rv=document.querySelectorAll(".rv");
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.1});rv.forEach(function(el){io.observe(el)})}else rv.forEach(function(el){el.classList.add("in")});
draw();
})();
