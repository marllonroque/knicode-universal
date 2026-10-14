/* Componentes compartilhados das aulas. O build (build.mjs) embute este arquivo em cada aula.
   Componentes: .runner (editar e executar Python), pre.annot (código anotado), .quest (respostas curtas),
   .open (pergunta aberta com análise modelo e autoavaliação), .hints (dicas progressivas).
   Cada um com data-key conta no progresso da aula (salvo via Curso, curso.js).
   Evidência de aprendizagem: data-concept="id1,id2" data-level="comp|exec" (padrão exec); data-module-final / data-transfer. */
(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const norm=s=>(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/\s+/g," ").trim();
const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
window.checks=window.checks||{};
window.norm=norm;
const LESSON=(document.querySelector('meta[name="curso-aula"]')||{}).content||null;
const C=()=>window.Curso||null;

function hl(t){
  const re=/("[^"\n]*"?|'[^'\n]*'?)|(#.*$)|(\b\d+(?:\.\d+)?\b)|(\b(?:def|return|if|elif|else|for|in|while|and|or|not|True|False|None)\b)|(\b[A-Za-z_]\w*(?=\())/gm;
  let out="",last=0,m;
  while((m=re.exec(t))){
    out+=esc(t.slice(last,m.index));
    const c=m[1]?"s":m[2]?"c":m[3]?"n":m[4]?"k":"f";
    out+=`<span class="${c}">${esc(m[0])}</span>`;last=m.index+m[0].length;
  }
  return out+esc(t.slice(last));
}

/* Progresso da aula (persistido em localStorage via Curso) */
const done=new Set();
function markDone(key,silent){
  if(!key)return;done.add(key);
  const total=new Set($$("[data-key]").map(e=>e.dataset.key)).size||1;
  const pct=Math.min(100,Math.round(done.size/total*100));
  const bar=$(".progress .bar");if(bar){bar.style.width=pct+"%";$(".progress .pct").textContent=pct+"%"}
  $$("section.card").forEach(sec=>{
    const ks=$$("[data-key]",sec).map(e=>e.dataset.key);
    const ok=ks.length>0&&ks.every(k=>done.has(k));
    sec.classList.toggle("complete",ok);
    const l=$(`.toc a[href="#${sec.id}"]`);if(l)l.classList.toggle("done",ok);
  });
  if(!silent&&LESSON&&C())C().lessonKey(LESSON,key,total);
  if(!silent&&done.size>=total)document.dispatchEvent(new CustomEvent("aula-completa",{detail:{id:LESSON}}));
}

/* Registra evidência de aprendizagem de um componente que tem data-concept */
function evid(el,ok){
  if(!ok||!C()||!el)return;
  const ids=(el.dataset.concept||"").split(",").filter(Boolean),lvl=el.dataset.level||"exec",sozinho=!el.dataset.hinted;
  ids.forEach(id=>C().evidence(id,lvl,{sozinho}));
  if(el.dataset.moduleFinal)C().setFinal(el.dataset.moduleFinal,sozinho);
  if(el.dataset.transfer)C().setTransfer(el.dataset.transfer);
}

/* Python no navegador (Pyodide), carregado só quando alguém executa algo */
let pyP=null;
function loadPy(){
  if(pyP)return pyP;
  pyP=new Promise((res,rej)=>{
    const s=document.createElement("script");
    s.src="https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
    s.onload=()=>loadPyodide().then(res,rej);
    s.onerror=()=>{pyP=null;rej(new Error("Não consegui carregar o Python. Verifique a internet e tente de novo."))};
    document.head.appendChild(s);
  });
  return pyP;
}
async function runPython(code){
  const py=await loadPy(),out=[];
  py.setStdout({batched:s=>out.push(s)});py.setStderr({batched:s=>out.push(s)});
  const g=py.globals.get("dict")();let err=null;
  try{py.runPython(code,{globals:g})}
  catch(e){err=String(e.message).trim().split("\n").filter(Boolean).slice(-1)[0]}
  g.destroy();
  return{out,err};
}

const ROBOT=`<div class="robot" aria-hidden="true"><svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
  <g class="head part">
    <g class="antenna part"><line x1="60" y1="22" x2="60" y2="8" stroke="#e05a26" stroke-width="3" stroke-linecap="round"/><circle class="led" cx="60" cy="6" r="4.5"/></g>
    <rect x="16" y="22" width="88" height="64" rx="9" fill="#17171b" stroke="#e05a26" stroke-width="3"/>
    <rect x="24" y="30" width="72" height="48" rx="5" fill="#0c0c0e" stroke="rgba(224,90,38,.45)"/>
    <rect class="eye" x="40" y="44" width="11" height="15" rx="2"/>
    <rect class="eye" x="69" y="44" width="11" height="15" rx="2"/>
    <path d="M47 68h6l3-3 3 3h14" fill="none" stroke="#e05a26" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="9" y="42" width="7" height="24" rx="2" fill="#e05a26"/><rect x="104" y="42" width="7" height="24" rx="2" fill="#e05a26"/>
  </g>
  <rect x="32" y="92" width="56" height="36" rx="7" fill="#17171b" stroke="#e05a26" stroke-width="3"/>
  <path d="M46 105h10m-10 8h22" stroke="#e05a26" stroke-width="2.4" stroke-linecap="round"/><circle cx="72" cy="105" r="3" fill="#ff6600"/>
  <rect x="20" y="98" width="9" height="24" rx="3" fill="#e05a26"/>
  <g class="arm-r part"><rect x="91" y="98" width="9" height="24" rx="3" fill="#e05a26"/></g>
  <rect x="40" y="132" width="12" height="14" rx="3" fill="#e05a26"/><rect x="68" y="132" width="12" height="14" rx="3" fill="#e05a26"/>
</svg></div>`;

document.addEventListener("DOMContentLoaded",()=>{
  /* Robô na capa */
  const heroIn=$(".hero-in");
  if(heroIn){heroIn.classList.add("has-robot");heroIn.insertAdjacentHTML("afterbegin",ROBOT)}

  /* Índice lateral com estado de cada seção */
  const secs=$$("section.card");
  if(secs.length>2&&!$(".dash")){
    secs.forEach((s,i)=>s.id="s"+i);
    const toc=document.createElement("nav");toc.className="toc";toc.setAttribute("aria-label","Seções da aula");
    toc.innerHTML='<div class="t">// seções</div>'+secs.map(s=>{
      const t=s.querySelector("h2").childNodes;let name="";t.forEach(n=>{if(n.nodeType===3)name+=n.textContent});
      return `<a href="#${s.id}">${esc(name.trim())}</a>`}).join("");
    document.body.appendChild(toc);
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$$(".toc a").forEach(a=>a.classList.remove("on"));
      const a=$(`.toc a[href="#${e.target.id}"]`);if(a)a.classList.add("on")}}),{rootMargin:"-30% 0px -60% 0px"});
    secs.forEach(s=>io.observe(s));
  }

  /* Botão de copiar em cada janela de código */
  $$(".win").forEach(w=>{
    const bar=$(".win-bar",w);if(!bar)return;
    const b=document.createElement("button");b.className="copy";b.type="button";b.textContent="Copiar código";
    b.onclick=async()=>{
      const ta=$("textarea",w),pre=$("pre",w);
      const text=ta?ta.value:$$(".ln",pre).length?$$(".ln",pre).map(l=>l.textContent).join("\n"):pre.textContent;
      try{await navigator.clipboard.writeText(text);b.textContent="Copiado ✓";b.classList.add("ok");
        setTimeout(()=>{b.textContent="Copiar código";b.classList.remove("ok")},1600)}
      catch{b.textContent="Selecione e copie (Ctrl+C)"}
    };
    bar.appendChild(b);
  });

  /* Realce de sintaxe estático */
  $$("pre.hl").forEach(p=>p.innerHTML=hl(p.textContent));

  /* Código anotado: clique numa linha para ver o que ela faz */
  $$("pre.annot").forEach(p=>{
    const lines=$$(".ln",p);
    lines.forEach(l=>{l.innerHTML=hl(l.textContent);l.tabIndex=0;
      const show=()=>{lines.forEach(x=>x.classList.remove("on"));l.classList.add("on");
        const note=p.parentElement.querySelector(".annot-note");note.innerHTML=l.dataset.note;
        markDone(p.dataset.key)};
      l.onclick=show;l.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();show()}};
    });
  });

  /* Executar e editar */
  $$(".runner").forEach(r=>{
    const ta=$("textarea",r),out=$(".out",r),orig=ta.value,chk=r.dataset.check;let fb=$(".fb",r);if(!fb){fb=document.createElement("div");fb.className="fb";out.after(fb)}
    $(".run",r).onclick=async()=>{
      out.textContent="Executando… (na primeira vez o Python é carregado e leva alguns segundos)";
      if(fb){fb.className="fb";fb.innerHTML=""}
      try{
        const T=C()&&C().tolerancia,fx=T?T.corrigirMaiusculas(ta.value):{code:ta.value,trocas:[]};
        if(fx.trocas.length)ta.value=fx.code;   // mostra o código já corrigido para o aluno aprender
        const {out:o,err}=await runPython(fx.code);
        const aviso=fx.trocas.length?`<div class="alert-case">${esc(T.MSG_CASE_RUN.replace("{nomes}",[...new Set(fx.trocas)].map(n=>"“"+n+"”").join(" e ")))}</div>`:"";
        out.innerHTML=(o.length?esc(o.join("\n")):"<i>(o programa não mostrou nada)</i>")+(err?`\n<span class="errline">Mensagem do Python: ${esc(err)}</span>`:"");
        if(chk&&window.checks[chk]){
          const res=window.checks[chk](o,err,ta.value);
          fb.className="fb "+(res.ok?"ok":"bad");fb.innerHTML=res.msg+aviso;
          if(res.ok){evid(r,true);markDone(r.dataset.key)}
        }else{if(aviso){fb.className="fb";fb.innerHTML=aviso}if(!err)markDone(r.dataset.key)}
      }catch(e){out.textContent=e.message}
    };
    const rs=$(".reset",r);if(rs)rs.onclick=()=>{ta.value=orig;out.textContent="";if(fb){fb.className="fb";fb.innerHTML=""}};
  });

  /* Respostas curtas com conferência */
  $$(".quest").forEach(q=>{
    $(".chk",q).onclick=()=>{
      let ok=0,tot=0,caps=false;const msgs=[];
      $$("input.q",q).forEach((i,idx)=>{
        tot++;const T=C()&&C().tolerancia,aceitas=i.dataset.answer.split("|"),c=T?T.conferir(i.value,aceitas,i.dataset.unwrap==="print"):{ok:aceitas.map(norm).includes(norm(i.value)),capitalizado:false},good=c.ok,v=norm(i.value);if(c.capitalizado)caps=true;
        i.classList.toggle("good",good);i.classList.toggle("wrong",!good&&v!=="");
        if(good)ok++;else msgs.push(`<b>${i.dataset.label||"Item "+(idx+1)}:</b> ${v?`você escreveu “${esc(i.value)}”. `:"sem resposta. "}${i.dataset.why||""}`);
      });
      const fb=$(".fb",q);fb.className="fb "+(ok===tot?"ok":"bad");
      fb.innerHTML=(ok===tot?(q.dataset.ok||"Tudo certo."):`${ok} de ${tot}.<br>`+msgs.join("<br>"))+(ok===tot&&caps&&C()&&C().tolerancia?`<div class="alert-case">${esc(C().tolerancia.MSG_CASE_QUIZ)}</div>`:"");
      if(ok===tot){evid(q,true);markDone(q.dataset.key)}
    };
  });

  /* Pergunta aberta: registra, mostra a análise modelo e pede autoavaliação (evidência de compreensão) */
  $$(".open").forEach(o=>{
    $(".reg",o).onclick=()=>{
      const ta=$("textarea",o),min=+(o.dataset.min||12),fb=$(".fb",o);
      if(ta.value.trim().length<min){fb.className="fb bad";fb.textContent="Escreva um pouco mais, mesmo sem ter certeza. O erro também ensina.";return}
      fb.className="fb ok";fb.textContent="Registrado. Agora compare com a análise abaixo e veja o que você acrescentaria.";
      const m=$(".model",o);if(m)m.classList.add("show");
      if(o.dataset.concept&&!$(".selfgrade",o)){
        fb.insertAdjacentHTML("afterend",'<div class="selfgrade"><span>Comparando com a análise, você:</span><button type="button" class="sg-ok">Acertou o essencial</button><button type="button" class="ghost sg-gap">Faltou algo</button></div>');
        $(".sg-ok",o).onclick=()=>{evid(o,true);$(".selfgrade",o).innerHTML="<b>Anotado como compreendido.</b> Na recuperação você vai testar se isso ficou mesmo.";};
        $(".sg-gap",o).onclick=()=>{(o.dataset.concept||"").split(",").filter(Boolean).forEach(id=>C()&&C().gap(id));$(".selfgrade",o).innerHTML="<b>Anotado como ponto a revisar.</b> Peça ao Claude (ou a quem te acompanha) para explicar de outro jeito.";};
      }
      markDone(o.dataset.key);
    };
  });

  /* Dicas progressivas (usar dica tira o "sozinho" da evidência de execução) */
  $$(".hints").forEach(h=>{
    const items=$$(".hint",h),btn=$(".nexthint",h),owner=h.closest("[data-key]");let n=0;
    btn.onclick=()=>{
      if(owner)owner.dataset.hinted="1";
      if(n<items.length)items[n++].classList.add("show");
      if(n>=items.length)btn.style.display="none";
      else btn.textContent=`Preciso de outra dica (${n}/${items.length})`;
    };
  });

  /* Teclado do celular: sem maiúscula automática nem autocorreção em campos de texto e de código (o build também grava isso no HTML) */
  $$("textarea,input").forEach(e=>{const t=(e.getAttribute("type")||"text").toLowerCase();if(["checkbox","radio","button","submit","hidden"].includes(t))return;
    e.setAttribute("autocapitalize","none");e.setAttribute("autocorrect","off");e.setAttribute("spellcheck","false");e.setAttribute("autocomplete","off")});

  /* Restaura o progresso salvo desta aula (sem registrar de novo) */
  if(LESSON&&C()){const info=C().lessonInfo(LESSON);if(info)info.keys.forEach(k=>markDone(k,true))}
});
})();
