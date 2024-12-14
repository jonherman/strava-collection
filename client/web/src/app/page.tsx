'use client'

import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  let code = searchParams.get('code');
  console.log("Authorization code is: " + code);
  let clientId = '133314';
  let redirectUrl = `http://localhost:3000?approval_prompt=force&scope=activity:write`;
  let enableURL = `http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}`;
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href={enableURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enable Strava Collection for your Strava Account
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
