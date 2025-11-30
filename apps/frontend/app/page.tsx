import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Trading Automation Platform</h1>
      <ul>
        <li>
          <Link href="/workflows">Workflows</Link>
        </li>
        <li>
          <Link href="/credentials">Credentials</Link>
        </li>
      </ul>
    </main>
  );
}
