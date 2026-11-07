import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms & Conditions | Arjun Photography",
  description: "Website use, enquiries and booking information for Arjun Photography.",
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { alternates: { canonical: "/terms-and-conditions/" } } : {}),
};
export default function Terms() {
  return <article>
    <h1>Terms &amp; <em>Conditions</em></h1>
    <p>Updated 4 November 2026</p>
    <p>These terms explain use of the Arjun Photography website and its enquiry features.</p>
    <section><h2>Website information</h2><p>The website introduces photography, videography and album services. Sample images, films, reviews and contact details are identified where used. Sample material is illustrative and does not establish a specific client history or guarantee a particular result.</p></section>
    <section><h2>Enquiries and availability</h2><p>The enquiry form and “Book a slot” popup prepare a draft on your device. They do not reserve a date, confirm a booking or take payment. Availability and a booking must be confirmed directly with the studio using verified contact details.</p></section>
    <section><h2>Booking arrangements</h2><p>Before confirming a shoot, agree the date, venue, coverage, price, payment schedule, travel requirements, deliverables and delivery timing in writing with the studio. Cancellation, rescheduling and refund arrangements must also be set out in that booking agreement. This website does not specify a deposit, cancellation fee or refund schedule.</p></section>
    <section><h2>Images and creative work</h2><p>Website photographs, films and other creative material may be protected by intellectual property rights belonging to the studio or their respective owners. Obtain permission from the relevant rights holder before copying, publishing or commercially reusing material, except where applicable law permits use.</p><p>Rights to use commissioned photographs, album designs and films, including any studio portfolio use, should be addressed in the individual booking agreement.</p></section>
    <section><h2>Responsible use</h2><p>Provide accurate information when making an enquiry. Do not use the website to send unlawful material, interfere with its operation or access information without permission.</p></section>
    <section><h2>External links and privacy</h2><p>External services, including maps, email and messaging apps, have their own terms. Read our <a href="/privacy-policy/">Privacy Policy</a> for details about enquiry drafts and website data handling.</p></section>
    <section><h2>Questions and changes</h2><p>For questions, see the <a href="/contact/">Contact page</a> or visit Arjun Photography in Peerumadara, Ramnagar, Uttarakhand. These website terms may be updated as functionality changes. Updates do not automatically change a separate confirmed booking agreement. Applicable statutory rights continue to apply.</p></section>
  </article>;
}
