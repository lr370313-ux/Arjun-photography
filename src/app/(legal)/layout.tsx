import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "./legal.module.css";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main" className={styles.legal}>{children}</main><Footer /></>;
}
