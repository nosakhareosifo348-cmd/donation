import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    q: 'How are donations used?',
    a: 'Every dollar donated goes directly to supporting vulnerable children with education, healthcare, food, and shelter. We publish annual impact reports showing exactly how funds are distributed.',
  },
  {
    q: 'Is my payment secure?',
    a: 'Yes. Our donation form is secured with HTTPS encryption. We do not store your payment card details. Crypto donations go directly to our verified wallet addresses.',
  },
  {
    q: 'Can I donate with cryptocurrency?',
    a: 'Absolutely. We accept Bitcoin (BTC), Ethereum (ETH), and USDT Tether (TRC20). Simply visit the Donate page, select your amount, and copy our wallet address to send from your crypto wallet.',
  },
  {
    q: 'Can I make an anonymous donation?',
    a: 'Yes. On the donation form you can check "Make this an anonymous donation" and your personal details will not be recorded or published.',
  },
  {
    q: 'Will I receive a confirmation after donating?',
    a: 'Yes. After submitting your donation, our team will verify the transaction and send a confirmation to your email address. For crypto donations, please allow up to 24 hours for blockchain confirmation.',
  },
  {
    q: 'How can I volunteer?',
    a: 'We welcome volunteers! Visit our Volunteer page and fill out the application form. We will reach out within 48 hours to discuss how you can contribute your skills and time.',
  },
  {
    q: 'Can organisations partner with GiveHope?',
    a: 'Yes. We actively seek partnerships with NGOs, corporations, schools, and community groups. Please reach out via our Contact page to discuss partnership opportunities.',
  },
  {
    q: 'Is GiveHope a registered charity?',
    a: 'GiveHope Organization was established in 2014 as a non-governmental, non-profit organization dedicated to the welfare of orphaned and vulnerable children.',
  },
  {
    q: 'How do I contact GiveHope directly?',
    a: 'You can reach us via the Contact page on this website, by email, or by phone. Our team responds within 24 hours on business days.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors group"
      >
        <span className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors pr-4">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

function PageBanner({ title, breadcrumb }) {
  return (
    <div className="relative py-24 flex items-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-secondary/85" />
      <div className="container-custom relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">{title}</h1>
        <nav className="flex items-center gap-2 text-sm text-white/70">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>-</span>
          <span className="text-primary">{breadcrumb}</span>
        </nav>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <>
      <PageBanner title="FAQ" breadcrumb="FAQ" />
      <section className="py-20 bg-gray-50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <p className="section-subtitle">Got Questions?</p>
            <h2 className="section-title mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about donating and working with GiveHope.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
          </div>
          <div className="text-center mt-12 bg-white rounded-sm p-8 border border-gray-200 shadow-sm">
            <h3 className="font-bold text-secondary font-heading text-xl mb-3">Still have questions?</h3>
            <p className="text-gray-600 text-sm mb-5">Our team is happy to help. Reach out any time.</p>
            <Link to="/contact" className="btn-primary">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
