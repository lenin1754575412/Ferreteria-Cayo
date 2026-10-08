import {cookies} from 'next/headers';import {redirect} from 'next/navigation';import {api} from '@/server/service';import {Management} from '@/features/admin/ui/Management';
export const dynamic='force-dynamic';
export default async function Page(){const user=await api.session(cookies().get('cayo_session')?.value);if(!user)redirect('/login');if(user.role==='cliente')redirect('/cuenta');return <main className="wrap"><Management role={user.role}/></main>;}
