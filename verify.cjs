const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const E=require('./engines.js'),P=require('./connect-engine.js');
let value=481;const random=()=>{value=(Math.imul(value,1664525)+1013904223)>>>0;return value/4294967296;};
for(let trial=0;trial<500;trial++){const b=E.newBoard(random);assert.equal(b.length,30);assert.equal(E.matches(b).length,0);assert(E.canMove(b));assert(b.every(v=>v>=0&&v<5));let valid=false;for(let i=0;i<30&&!valid;i++)for(let j of [i+1,i+5]){if(j>=30||!E.adjacent(i,j,5))continue;const swapped=b.slice();[swapped[i],swapped[j]]=[swapped[j],swapped[i]];const found=E.matches(swapped);if(found.length){const next=E.refill(swapped,found,random);assert.equal(next.length,30);assert(next.every(v=>v>=0&&v<5));valid=true;break;}}assert(valid);}
assert.deepEqual(E.matches([0,0,0,1,2,1,2,3,4,0]),[0,1,2]);
assert.deepEqual(E.matches([0,1,2,3,4,0,2,3,4,1,0,3,4,1,2]),[0,5,10]);
assert.equal(E.adjacent(4,5,5),false);
const original=Array.from({length:30},(_,i)=>i);const collapsed=E.refill(original,[5,10],()=>0);assert.equal(collapsed[10],0);assert.equal(collapsed[15],15);assert.equal(collapsed[20],20);assert.equal(collapsed[25],25);
for(let size of [5,6,7])for(let trial=0;trial<100;trial++){const puzzle=P.createPuzzle('staff-test-'+trial,size);assert.equal(new Set(puzzle.solution).size,size*size);let route=[];for(const cell of puzzle.solution){const result=P.extendPath(puzzle,route,cell);assert.equal(result.error,'');route=result.path;if(route.length===size*size)assert(result.won);}assert(P.extendPath(puzzle,[],(puzzle.solution[0]+1)%(size*size)).error);const retrace=P.extendPath(puzzle,route,route[2]);assert.equal(retrace.path.length,3);}
for(let trial=0;trial<100;trial++){const deck=E.shuffle([...Array(8).keys(),...Array(8).keys()],random);assert.equal(deck.length,16);for(let i=0;i<8;i++)assert.equal(deck.filter(v=>v===i).length,2);}
const html=fs.readFileSync(__dirname+'/index.html','utf8');for(const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(script[1]);assert(!/https?:\/\/|<link|src=["\']https?/.test(html));
console.log('Passed: 500 match boards and legal moves, match runs and gravity, 300 complete path puzzles, 100 memory decks, inline JavaScript syntax and no external dependencies.');
