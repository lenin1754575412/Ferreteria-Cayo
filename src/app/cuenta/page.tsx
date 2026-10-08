import {cookies} from 'next/headers'; import {redirect} from 'next/navigation'; import {api} from '@/server/service'; import {AuthForm} from '@/features/account/ui/AuthForm';
export const dynamic='force-dynamic';
export default async function Page(){const user=await api.session(cookies().get('cayo_session')?.value);if(!user)redirect('/login');return <main className="wrap"><section className="cayo-card"><h1>Mi cuenta</h1><p>{user.names} {user.surnames} · {user.email}</p><p>Rol: {user.role}</p></section><AuthForm mode="password"/></main>;}
