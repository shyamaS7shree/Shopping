'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        .shopore-footer {
          background: #0a0a0a;
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
        }
        .footer-main {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1.2fr;
          gap: 40px;
          padding: 60px 60px 40px;
          border-bottom: 1px solid #222222;
        }
        .footer-col h4 {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #ffffff;
        }
        .footer-col a {
          display: block;
          font-size: 13px;
          color: #cccccc;
          text-decoration: none;
          margin-bottom: 10px;
          transition: color 0.2s;
        }
        .footer-col a:hover { color: #ec4899; }

        /* Brand */
        .footer-brand-name {
          font-family: 'Georgia', serif;
          font-size: 26px;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 28px;
          color: #ffffff;
        }
        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #cccccc;
          margin-bottom: 10px;
        }
        .footer-app-label {
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          margin: 24px 0 14px;
        }
        .app-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .app-btn {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.2s;
  border: none;
  background: transparent;
  padding: 0;
}
.app-btn:hover {
  opacity: 0.8;
  transform: scale(1.05);
}
        .app-btn-sub { font-size: 9px; color: #999999; display: block; font-weight: 400; }
        .app-btn-name { font-weight: 700; font-size: 12px; color: #000000; }

        /* Payment */
        .pay-label {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 14px;
        }
        .pay-cards {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .pay-card {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          min-width: 52px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.15);
        }

        /* Bottom Bar */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 60px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .social-links {
          display: flex;
          gap: 20px;
        }
        .social-links a {
          color: #aaaaaa;
          text-decoration: none;
          font-size: 15px;
          transition: color 0.2s;
        }
        .social-links a:hover { color: #ec4899; }
        .scroll-top {
          background: #222222;
          border: 1px solid #444444;
          color: #ffffff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s;
        }
        .scroll-top:hover { background: #ec4899; border-color: #ec4899; }
        .footer-copy {
          font-size: 12px;
          color: #888888;
        }

        @media (max-width: 900px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
            padding: 40px 24px 30px;
          }
          .footer-bottom { padding: 20px 24px; }
        }
        @media (max-width: 500px) {
          .footer-main { grid-template-columns: 1fr; }
        }
      `}</style>

      <footer className="shopore-footer">

        {/* MAIN GRID */}
        <div className="footer-main">

          {/* Brand */}
          <div className="footer-col">
            <div className="footer-brand-name">Shopore</div>
            <h4>Reach Out To Us</h4>
            <div className="footer-contact-item"><span>📞</span> +91 - 796-972-7777</div>
            <div className="footer-contact-item"><span>✉️</span> support@shopore.com</div>
            <div className="footer-app-label">Experience Shopore App On Mobile</div>
            <div className="app-buttons">
              <a href="#" className="app-btn">
                <img
                  src="https://storage.googleapis.com/images_cms_preprod_sscom/app_Store_Icons_f6e52b25de/app_Store_Icons_f6e52b25de.png"
                  alt="App Store"
                  style={{ width: '120px', height: '38px', objectFit: 'contain' }}
                />
              </a>
              <a href="#" className="app-btn" style={{ padding: '0', border: 'none', background: 'transparent' }}>
                <img
                  src="https://storage.googleapis.com/images_cms_preprod_sscom/google_Play_Icons_b931ade941/google_Play_Icons_b931ade941.png"
                  alt="Google Play"
                  style={{ width: '120px', height: '38px', objectFit: 'contain' }}
                />
              </a>
            </div>
          </div>

          {/* Top Categories */}
          <div className="footer-col">
            <h4>Top Categories</h4>
            {['Men', 'Women', 'Kids', 'Beauty', 'Watches', 'Gift', 'Home', 'Luxe', 'Bargain'].map(item => (
              <a key={item} href="#">{item}</a>
            ))}
          </div>

          {/* Useful Links */}
          <div className="footer-col">
            <h4>Useful Links</h4>
            {['About Us', 'Contact Us', 'Track Orders', 'Corporate Site', 'Store Locator', 'Careers', 'Help/FAQS'].map(item => (
              <a key={item} href="#">{item}</a>
            ))}
          </div>

          {/* Our Policies */}
          <div className="footer-col">
            <h4>Our Policies</h4>
            {['Terms Of Use', 'Privacy', 'Delivery Policy', 'Exchange & Return'].map(item => (
              <a key={item} href="#">{item}</a>
            ))}
          </div>

          {/* Pay Securely */}
          {/* <div className="footer-col">
            <div className="pay-label">Pay Securely By</div>
            <div className="pay-cards">
              <div className="pay-card" style={{ background: '#1a1f71', color: '#ffffff' }}>VISA</div>
              <div className="pay-card" style={{ background: '#eb001b', color: '#ffffff' }}>MC</div>
              <div className="pay-card" style={{ background: '#007bc1', color: '#ffffff' }}>AMEX</div>
              <div className="pay-card" style={{ background: '#ffffff', color: '#333333' }}>RuPay</div>
            </div>

            <div className="pay-label">Verified By</div>
            <div className="pay-cards">
              <div className="pay-card" style={{ background: '#1a1f71', color: '#ffffff' }}>VISA</div>
              <div className="pay-card" style={{ background: '#eb001b', color: '#ffffff' }}>MC</div>
              <div className="pay-card" style={{ background: '#007bc1', color: '#ffffff' }}>AMEX</div>
              <div className="pay-card" style={{ background: '#ffffff', color: '#333333' }}>RuPay</div>
            </div>
          </div> */}

        </div>

        {/* BOTTOM BAR */}
        <div className="footer-bottom">
          <div className="social-links">
            <a href="#" title="Facebook">f</a>
            <a href="#" title="Instagram">📷</a>
            <a href="#" title="Twitter">𝕏</a>
          </div>

          <button
            className="scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >∧</button>

          <p className="footer-copy">Copyright © {currentYear} Shopore. All Rights Reserved</p>
        </div>

      </footer>
    </>
  );
}