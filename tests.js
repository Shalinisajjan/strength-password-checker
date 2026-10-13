/* Fictional examples only. Run with: node tests.js */
const assert=require('node:assert/strict');
const {evaluate}=require('./evaluator.js');
const cases=[
  ['short fictional','cat',0],
  ['long fictional passphrase','violet-lantern-river-cobalt-47',4],
  ['repeated fictional','aaaaaaaaaaaaaa',0],
  ['common fictional','password',0],
  ['predictable substitution','P@ssw0rd',0],
  ['sequence-heavy fictional','abc123abc123',0],
  ['empty input','',0]
];
for(const [name,input,expected] of cases){const got=evaluate(input);assert.equal(got.score,expected,`${name}: expected score ${expected}, got ${got.score}`);console.log(`PASS ${name}: ${got.rating}`);}
assert.equal(evaluate('password').factors.some(x=>x.includes('common password')),true);
assert.equal(evaluate('aaaaaaaaaaaaaa').factors.some(x=>x.includes('Repeated')),true);
console.log(`\n${cases.length+2} assertions passed.`);
