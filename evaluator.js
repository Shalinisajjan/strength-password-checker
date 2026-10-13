/* Heuristic educational estimator. No network, storage, or telemetry. */
(function (root) {
  'use strict';
  const COMMON = new Set(['password','password1','123456','123456789','12345678','qwerty','qwerty123','letmein','welcome','admin','abc123','iloveyou','monkey','dragon','sunshine','football','baseball','trustno1','passw0rd','correcthorsebatterystaple']);
  const RATINGS = ['Very Weak','Weak','Fair','Strong','Very Strong'];
  function normalizePredictable(s) { return s.toLowerCase().replace(/0/g,'o').replace(/[@4]/g,'a').replace(/[1!]/g,'i').replace(/3/g,'e').replace(/[5$]/g,'s').replace(/7/g,'t'); }
  function hasSequence(s) {
    const t=s.toLowerCase();
    for(let i=0;i<t.length-2;i++) { const a=t.charCodeAt(i),b=t.charCodeAt(i+1),c=t.charCodeAt(i+2); if((b-a===1&&c-b===1)||(b-a===-1&&c-b===-1)) return true; }
    return /(qwerty|asdf|zxcv|0123|1234|abcd|password)/.test(t);
  }
  function evaluate(password) {
    const p=String(password ?? ''), n=p.length, lower=p.toLowerCase(), normalized=normalizePredictable(p);
    if(!n) return {score:0,rating:'Waiting for input',factors:['Use a longer, unique passphrase for better protection.'],length:0};
    let score=0; const factors=[];
    if(n<8){factors.push('Very short: aim for at least 12 characters, preferably more.');}
    else if(n<12){score+=1;factors.push('Length is a start; 16 or more characters is a stronger target.');}
    else if(n<16){score+=2;factors.push('Good length. A longer passphrase can improve resistance.');}
    else if(n<20){score+=3;factors.push('Long passphrase length helps. Keep it unique to one account.');}
    else {score+=4;factors.push('Excellent length; uniqueness and unpredictability still matter.');}
    const classes=[/[a-z]/.test(p),/[A-Z]/.test(p),/[0-9]/.test(p),/[^A-Za-z0-9]/.test(p)].filter(Boolean).length;
    // Variety contributes modestly; it cannot compensate for weak patterns.
    if(classes>=3)score+=1;
    const repeated=/(.)\1{2,}/u.test(p) || (n>=4 && new Set(p).size<=2);
    if(repeated){score-=2;factors.push('Repeated characters or a tiny character set make guesses easier.');}
    if(hasSequence(p)){score-=2;factors.push('Contains a familiar keyboard, letter, or number sequence.');}
    if(COMMON.has(lower) || COMMON.has(normalized)){score-=4;factors.push('Matches a common password or a predictable substitution of one.');}
    const words=lower.split(/[^a-z]+/).filter(Boolean);
    if(words.length>1 && words.some(w=>['summer','welcome','password','love','admin','spring','winter','dragon'].includes(w))){score-=1;factors.push('A familiar word or seasonal term weakens the pattern.');}
    if(classes===1 && n<16)factors.push('Character variety is limited; length and uniqueness matter more than symbols alone.');
    score=Math.max(0,Math.min(4,score));
    if(!factors.some(x=>x.includes('unique')||x.includes('uniqueness'))) factors.push('Use a unique passphrase you have not used elsewhere.');
    return {score,rating:RATINGS[score],factors,length:n};
  }
  const api={evaluate,RATINGS};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  if(root)root.PasswordEvaluator=api;
})(typeof globalThis!=='undefined'?globalThis:this);
