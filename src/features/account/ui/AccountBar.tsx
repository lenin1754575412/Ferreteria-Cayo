'use client';
import {useEffect,useState} from 'react'; import Link from 'next/link';
export function AccountBar(){const [user,setUser]=useState<any>(null);
 useEffect(()=>{const controller=new AbortController();fetch('/api/auth/me',{signal:controller.signal}).then(r=>r.json()).then(d=>setUser(d.user)).catch(()=>{});return()=>controller.abort();},[]);
 async function logout(){const r=await fetch('/api/auth/logout',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});if(r.ok) window.location.assign('/');}
 return <div className="account-bar"><Link href="/">Inicio</Link>{user?<><span>Hola, {user.names} ({user.role})</span><Link href="/cuenta">Mi cuenta</Link><Link href="/mis-pedidos">Mis pedidos</Link><Link href="/descuentos">Mis descuentos</Link>{user.role!=='cliente'?<Link href="/gestion">Gestión</Link>:null}<button onClick={logout}>Cerrar sesión</button></>:<><Link href="/login">Iniciar sesión</Link><Link href="/registro">Registrarme</Link></>}</div>;
}
