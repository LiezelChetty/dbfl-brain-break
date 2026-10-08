(function(root){
 'use strict';
 const adjacent=(a,b,cols)=>Math.abs(a%cols-b%cols)+Math.abs(Math.floor(a/cols)-Math.floor(b/cols))===1;
 function matches(board,cols=5){const found=new Set();for(let i=0;i<board.length;i++){if(board[i]<0)continue;for(const stride of [1,cols]){const run=[i];for(let j=i+stride;j<board.length&&board[j]===board[i]&&(stride!==1||Math.floor(j/cols)===Math.floor(i/cols));j+=stride)run.push(j);if(run.length>=3)run.forEach(x=>found.add(x));}}return [...found];}
 function canMove(board,cols=5){for(let i=0;i<board.length;i++)for(const j of [i+1,i+cols]){if(j>=board.length||!adjacent(i,j,cols))continue;const copy=board.slice();[copy[i],copy[j]]=[copy[j],copy[i]];if(matches(copy,cols).length)return true;}return false;}
 function newBoard(random=Math.random,cols=5,rows=6){for(let attempt=0;attempt<1000;attempt++){const b=[];for(let i=0;i<cols*rows;i++){const choices=[0,1,2,3,4].filter(v=>!(i%cols>=2&&b[i-1]===v&&b[i-2]===v)&&!(i>=cols*2&&b[i-cols]===v&&b[i-cols*2]===v));b.push(choices[Math.floor(random()*choices.length)]);}if(canMove(b,cols))return b;}throw Error('Could not generate board');}
 function refill(board,cleared,random=Math.random,cols=5){const out=board.slice(),set=new Set(cleared),rows=board.length/cols;for(let col=0;col<cols;col++){const remaining=[];for(let row=0;row<rows;row++){const i=row*cols+col;if(!set.has(i))remaining.push(board[i]);}while(remaining.length<rows)remaining.unshift(Math.floor(random()*5));for(let row=0;row<rows;row++)out[row*cols+col]=remaining[row];}return out;}
 function shuffle(items,random=Math.random){const a=items.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 const api={adjacent,matches,canMove,newBoard,refill,shuffle};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrainEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this);
