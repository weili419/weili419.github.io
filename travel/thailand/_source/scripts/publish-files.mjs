import { spawn, spawnSync } from 'node:child_process';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';
process.chdir(fileURLToPath(new URL('..', import.meta.url)));
const build=spawnSync('npm',['run','build'],{stdio:'inherit'});
if(build.status!==0)process.exit(build.status??1);
const socket=createServer();
await new Promise(resolve=>socket.listen(0,'127.0.0.1',resolve));
const port=socket.address().port;
await new Promise(resolve=>socket.close(resolve));
const server=spawn('npm',['run','dev','--','--port',String(port)],{stdio:'inherit',detached:true});
const url='http://localhost:'+port+'/';
try {
 let ready=false;
 for(let attempt=0;attempt<60;attempt++){
  try{const response=await fetch(url,{signal:AbortSignal.timeout(3000)});if(response.ok){ready=true;break;}}catch{}
  if(server.exitCode!==null)throw Error('Preview server exited.');
  await new Promise(resolve=>setTimeout(resolve,1000));
 }
 if(!ready)throw Error('Preview server did not become ready.');
 const result=spawnSync('python3',['scripts/export-site.py'],{stdio:'inherit',env:{...process.env,PREVIEW_URL:url}});
 if(result.status!==0)process.exitCode=result.status??1;
} finally {try{process.kill(-server.pid,'SIGTERM');}catch{}}
