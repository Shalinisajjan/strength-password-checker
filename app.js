(function(){
  const input=document.getElementById('password'), toggle=document.getElementById('toggle'), clear=document.getElementById('clear');
  const rating=document.getElementById('rating'),length=document.getElementById('length'),summary=document.getElementById('summary'),details=document.getElementById('details'),fill=document.getElementById('meter-fill'),meter=document.querySelector('.meter');
  const colors=['#c8cec6','#d59b50','#d3ae43','#72a45e','#266e55'];
  function update(){const r=PasswordEvaluator.evaluate(input.value);rating.textContent=r.rating;length.textContent=r.length?r.length+' characters':'';fill.style.width=(r.score*25)+'%';fill.style.background=colors[r.score];meter.setAttribute('aria-valuenow',String(r.score));summary.textContent=r.length?'Estimate based on several password signals.':'Start typing to see an estimate.';details.replaceChildren(...r.factors.map(x=>{const li=document.createElement('li');li.textContent=x;return li;}));}
  input.addEventListener('input',update);
  toggle.addEventListener('click',()=>{const show=input.type==='password';input.type=show?'text':'password';toggle.textContent=show?'Hide':'Show';toggle.setAttribute('aria-label',show?'Hide password':'Show password');toggle.setAttribute('aria-pressed',String(show));input.focus();});
  clear.addEventListener('click',()=>{input.value='';update();input.focus();});
  update();
})();
