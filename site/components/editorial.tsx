import Link from "next/link"
import type { ReactNode } from "react"
export function EditorialSection({label,title,children,dark=false}:{label:string;title:string;children:ReactNode;dark?:boolean}) {
 return <section className={`editorial-section ${dark ? "on-dark dark-panel engineering-grid" : ""}`}><div><p className="eyebrow">{label}</p><h2>{title}</h2></div><div className="editorial-body">{children}</div></section>
}
export function ContactBand(){return <section className="contact-band on-dark engineering-grid"><div><p className="eyebrow">Start a conversation</p><h2>Let’s talk about<br/>the work ahead.</h2></div><Link href="/contact" className="button button-light">Contact NCC <span aria-hidden>↗</span></Link></section>}
