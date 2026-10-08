import {cookies} from 'next/headers';import {redirect} from 'next/navigation';import {api} from '@/server/service';import {DiscountManager} from '@/features/account/ui/DiscountManager';
export const dynamic='force-dynamic';
export default async function Page(){const u=await api.session(cookies().get('cayo_session')?.value);if(!u)redirect('/login');return <main className="wrap"><DiscountManager/></main>;}
