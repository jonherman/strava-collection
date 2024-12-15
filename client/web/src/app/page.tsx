'use client'

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react'

async function getAccessToken(clientId:string, clientSecret:string, code:string) {
  const url = "https://www.strava.com/oauth/token";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          grant_type: 'authorization_code'
        }
      )
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

function Fallback() {
  return <>loading..</>
}

function EnableStravaButton() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  console.log("Authorization code is: " + code);
  const clientId = '133314';
  const clientSecret = '76555058917134e613269637de2fb70f9a5ffa44';
  const redirectUrl = `http://localhost:3000?approval_prompt=force&scope=activity:write`;
  const enableURL = `http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}`;
  if (code) {
    getAccessToken(clientId, clientSecret, code);
  }
  return(
    <a
    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    href={enableURL}
    rel="noopener noreferrer"
  >
    Enable Strava Collection for your Strava Account
  </a>
  )
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
        <Suspense fallback={<Fallback />}>
          <EnableStravaButton></EnableStravaButton>
          </Suspense>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
