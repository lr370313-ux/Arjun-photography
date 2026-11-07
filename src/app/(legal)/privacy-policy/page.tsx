import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy | Arjun Photography",
  description: "How the Arjun Photography website handles enquiry drafts and external links.",
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { alternates: { canonical: "/privacy-policy/" } } : {}),
};
export default function PrivacyPolicy() {
  return <article>
    <h1>Privacy <em>Policy</em></h1>
    <p>Updated 4 November 2026</p>
    <p>This policy describes the current Arjun Photography website, based in Peerumadara, Ramnagar, Uttarakhand.</p>
    <section><h2>Information you enter</h2><p>The enquiry form asks for your name, email, photography service, preferred date, location and a message. It uses these details in your browser to prepare an enquiry draft. Preparing a draft does not send the information to the studio or save it to a website database.</p></section>
    <section><h2>Your draft and clipboard</h2><p>Your draft stays in the current page session. Reloading or leaving the page clears the website’s draft state, although your browser may retain form entries through its own autofill features. Choosing “Copy enquiry” places the draft on your device’s clipboard, where it may remain until replaced or cleared.</p></section>
    <section><h2>Sending an enquiry</h2><p>If you choose to send a draft through your email or messaging app, that service handles the message under its own privacy policy. Sending is a separate action that you control. Contact details marked as samples are demonstration details and should not be used to send personal information.</p></section>
    <section><h2>Website access and external services</h2><p>The website’s application code does not set advertising cookies or include analytics trackers. A hosting provider may process technical request information, such as an IP address, browser information and requested pages, to deliver and protect the site. Hosting log settings and retention depend on the provider used for deployment.</p><p>Links to Google Maps, WhatsApp and email services open external services. Their privacy practices apply when you use them.</p></section>
    <section><h2>Photography and personal information</h2><p>This website notice covers browsing and enquiry drafts. The handling of photographs, delivery, retention and any permission to publish client images should be agreed with the studio when arranging a shoot. Please avoid including sensitive information or unnecessary details about other people in an enquiry.</p></section>
    <section><h2>Questions and updates</h2><p>For privacy questions about information you have sent to the studio, use the verified contact channel through which you arranged your shoot or visit the studio in Peerumadara, Ramnagar, Uttarakhand. Current contact options appear on the <a href="/contact/">Contact page</a>. This policy will be updated when the site’s data handling changes.</p></section>
  </article>;
}
