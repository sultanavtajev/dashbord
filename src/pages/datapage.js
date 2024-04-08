import React from 'react'
import Link from 'next/link'
import Data from '../components/alledata.js'


export default function Datapage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Data />
      </main>
    </div>
  );
}
