'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Gift,
  HelpCircle,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  RefreshCcw,
  ShieldAlert,
  Store,
  User,
  Wallet,
  Volume2,
} from 'lucide-react';

const navItems = [
  { icon: User, label: 'My Profile', sub: 'Manage your profile details' },
  { icon: Package, label: 'My Orders', sub: 'Your most loved salons & Products from Shop' },
  { icon: Home, label: 'Manage Addresses', sub: 'Manage your saved addresses' },
  { icon: Briefcase, label: 'First Citizen Club', sub: 'Manage Notification & Reminders' },
  { icon: Wallet, label: 'My Wallet', sub: 'Check balance or add from gift card.' },
  { icon: Gift, label: 'Gift Card/EGV', sub: 'Buy Gift Cards for every occasion' },
  { icon: Store, label: 'Stores Locator', sub: 'Find stores and experiences near you' },
  { icon: User, label: 'Personal Shopper', sub: 'Our style help and curated looks just for you' },
  { icon: HelpCircle, label: 'Help & Support', sub: 'Need assistance? We are happy to help' },
];

const categories = ['Order Related', 'Payment Issue', 'Return / Refund', 'Product Query', 'Delivery Issue', 'Other'];
const subCategories = ['Delayed Delivery', 'Wrong Item', 'Damaged Product', 'Missing Item', 'Cancel Order'];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <main className="min-h-screen bg-white px-5 pb-16 pt-[106px] font-['DM_Sans',Inter,sans-serif] text-[#071225]">
      <div className="mx-auto max-w-[1480px]">
        <h1 className="mb-10 text-[24px] font-bold lowercase tracking-[0]">contactus</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[330px_1fr]">
          <aside className="border-r border-slate-200 pr-8">
            <div className="space-y-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    <Icon size={19} strokeWidth={1.6} className="mt-0.5 text-slate-700" />
                    <div>
                      <p className="text-[15px] font-medium text-slate-800">{item.label}</p>
                      <p className="mt-1 text-[12px] leading-4 text-slate-500">{item.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          <section className="min-w-0">
            <div className="mb-7 flex items-center gap-3">
              <ArrowLeft size={18} />
              <h2 className="text-[18px] font-semibold">Contact Us</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="First Name*" placeholder="First Name" required />
                <Field label="Last Name*" placeholder="Last Name" required />
              </div>

              <Field label="Email ID*" placeholder="Email ID" type="email" required />
              <Field label="Mobile Number*" placeholder="Mobile Number" required />
              <Field label="Order No" placeholder="Order No" />

              <label className="block">
                <span className="mb-2 block text-[13px] font-medium">Title<span className="text-red-500">*</span></span>
                <textarea required className="h-[78px] w-full resize-y border border-slate-300 px-4 py-3 text-[13px] outline-none transition focus:border-pink-500" />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <SelectField label="Category*" options={categories} />
                <SelectField label="Sub Category*" options={subCategories} />
              </div>

              <label className="block">
                <span className="mb-2 block text-[13px] font-medium">Write comments here<span className="text-red-500">*</span></span>
                <textarea required placeholder="Write comments here" className="h-[72px] w-full resize-y border border-slate-300 px-4 py-3 text-[13px] outline-none transition placeholder:text-slate-400 focus:border-pink-500" />
              </label>

              <div className="max-w-[650px]">
                <div className="mb-3 grid grid-cols-[1fr_38px_38px] items-center">
                  <div className="bg-slate-300 py-2 text-center font-mono text-[15px] font-bold tracking-[0.28em]">
                    dCB9C9
                  </div>
                  <button type="button" className="flex h-full items-center justify-center border-y border-slate-300">
                    <RefreshCcw size={15} />
                  </button>
                  <button type="button" className="flex h-full items-center justify-center border border-slate-300">
                    <Volume2 size={15} />
                  </button>
                </div>
                <Field label="Type the word above" placeholder="Type the word above" required />
              </div>

              <button type="submit" className="h-10 w-[140px] bg-slate-300 text-[12px] font-bold uppercase text-white transition hover:bg-[#071225]">
                {submitted ? 'Submitted' : 'Submit'}
              </button>
            </form>

            <section className="mt-8 border border-slate-200 p-5">
              <h3 className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Support Information
              </h3>

              <div className="space-y-4">
                {/* <SupportRow icon={Building2} title="Our Office">
                  Dhirubhai Tower, 5th Floor, Maker Chambers, Mumbai, Maharashtra - 400 004
                </SupportRow> */}

                <div className="grid gap-4 border-y border-slate-100 py-4 md:grid-cols-[1fr_auto]">
                  <div className="space-y-4">
                    <SupportRow icon={Phone} title="Phone">+91 796-972-7777</SupportRow>
                    <SupportRow icon={Mail} title="Email ID">shyamashree24das@gmail.com</SupportRow>
                    <p className="text-[12px] text-slate-600">
                      <span className="font-semibold text-[#071225]">Operational Timings:</span> 09:00 AM to 10:00 PM
                    </p>
                  </div>
                  <button className="h-9 self-start bg-emerald-50 px-4 text-[12px] font-semibold text-emerald-700">
                    WhatsApp Us
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_300px]">
                  <SupportRow icon={ShieldAlert} title="For Grievance Related Queries">
                    In case you are not satisfied with the response / resolution to your complaint or request, you may contact our Grievance Officer.
                  </SupportRow>
                  <div className="border border-slate-200 p-4 text-[12px] leading-6 text-slate-600">
                    <p className="mb-2 font-semibold text-[#071225]">Shyamashree Das</p>
                    <p>+91 9876543210</p>
                    <p>shyamashree24das@gmail.com</p>
                    <p>Monday to Friday, 10:00 am to 6:00 pm</p>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>

      <button className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-xl">
        <MessageCircle size={24} />
      </button>
    </main>
  );
}

function Field({
  label,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium">{label}</span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-12 w-full border border-slate-300 px-4 text-[13px] outline-none transition placeholder:text-slate-400 focus:border-pink-500"
      />
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium">{label}</span>
      <select required className="h-12 w-full border border-slate-300 bg-white px-4 text-[13px] outline-none transition focus:border-pink-500">
        <option value="">Select {label.replace('*', '')}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function SupportRow({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof User;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-orange-50 text-orange-500">
        <Icon size={17} />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#071225]">{title}</p>
        <p className="mt-1 text-[12px] leading-5 text-slate-600">{children}</p>
      </div>
    </div>
  );
}
