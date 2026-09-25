import type { ReactNode } from "react"
export const PAGE_SHELL = "page-shell mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12"
export function PageHeader({eyebrow,title,intro,children}:{eyebrow:string;title:ReactNode;intro?:ReactNode;children?:ReactNode}) {
 return <header className="page-heading engineering-grid">
   <div className="heading-marker" aria-hidden="true"><span /> NCC / INFRASPACE</div>
   <p className="eyebrow">{eyebrow}</p><h1>{title}</h1>
   {intro && <p className="page-intro">{intro}</p>}{children}
   <div className="heading-rule" aria-hidden="true"><span /></div>
 </header>
}
