"use client";

import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthSession({ children }: AuthContextProps) {
  return (
    <SessionProvider>
      <Auth>{children}</Auth>
    </SessionProvider>
  );
}

function Auth({ children }: AuthContextProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && status !== "loading") {
      signIn();
    }
  }, [session, status]);

  if (!session) return null;

  return (
    <>
      <header className="Header mb-7">
        <div className="Header-item">
          <a href="/" className="Header-link f4 d-flex flex-items-center">
            <img
              height="50px"
              src="https://shalomfarms.org/wp-content/uploads/2021/09/SF_logo.png"
            />
            <div className="f3 text-bold d-flex flex-items-center color-fg-default pl-3">
              Bulletin Board
            </div>
          </a>
        </div>
        <div className="Header-item Header-item--full"></div>
        <div className="Header-item mr-0">
          <details className="dropdown details-reset details-overlay d-inline-block">
            <summary aria-haspopup="true">
              <img
                className="avatar"
                height="30"
                referrerPolicy="no-referrer"
                alt="@octocat"
                src={
                  session.user?.image || "https://i.stack.imgur.com/34AD2.jpg"
                }
                width="30"
              />
              <div className="dropdown-caret"></div>
            </summary>
            <ul className="dropdown-menu dropdown-menu-sw">
              <li>
                <a
                  onClick={() => signOut()}
                  className="dropdown-item"
                  href="#signout"
                >
                  Sign Out
                </a>
              </li>
            </ul>
          </details>
        </div>
      </header>
      {children}
    </>
  );
}
