import React, { useEffect, useState } from "react";
import AOS from "aos";
import heroSweets from "./assets/hero-sweets.png";
import laddu from "./assets/laddu.jpg";
import kajuKatli from "./assets/kaju-katli.jpg";
import gulabJamun from "./assets/gulab-jamun.jpg";
import mysorePak from "./assets/mysore-pak.jpg";
import rasmalai from "./assets/rasmalai.jpg";
import jangiri from "./assets/jangiri.jpg";
import badusha from "./assets/badusha.jpg";
import palkova from "./assets/palkova.jpg";
import adhirasam from "./assets/adhirasam.jpg";
import soanPapdi from "./assets/soan-papdi.jpg";
import milkPeda from "./assets/milk-peda.jpg";

import giftBox from "./assets/gift-box.jpg";
import aboutSweets from "./assets/about-sweets.jpg";

import making1 from "./assets/sweet-making-1.jpg";
import making2 from "./assets/sweet-making-2.jpg";
import making3 from "./assets/sweet-making-3.jpg";
import making4 from "./assets/sweet-making-4.jpg";

import gallery1 from "./assets/gallery-1.jpg";
import gallery2 from "./assets/gallery-2.jpg";
import gallery3 from "./assets/gallery-3.jpg";
import gallery4 from "./assets/gallery-4.jpg";
import gallery5 from "./assets/gallery-5.jpg";
import gallery6 from "./assets/gallery-6.jpg";

const products = [
  { id: 1, name: "Golden Motichoor Laddu", category: "Traditional", price: 280, weight: "500 g", image: laddu, tag: "BESTSELLER", rating: "4.9" },
  { id: 2, name: "Royal Kaju Katli", category: "Premium", price: 450, weight: "500 g", image: kajuKatli, tag: "FAVOURITE", rating: "5.0" },
  { id: 3, name: "Soft Gulab Jamun", category: "Traditional", price: 220, weight: "500 g", image: gulabJamun, tag: "POPULAR", rating: "4.8" },
  { id: 4, name: "Classic Mysore Pak", category: "Traditional", price: 320, weight: "500 g", image: mysorePak, tag: "TRADITIONAL", rating: "4.9" },
  { id: 5, name: "Creamy Rasmalai", category: "Milk Sweets", price: 260, weight: "6 pieces", image: rasmalai, tag: "FRESH DAILY", rating: "4.8" },
  { id: 6, name: "Orange Jangiri", category: "Traditional", price: 240, weight: "500 g", image: jangiri, tag: "SPECIAL PICK", rating: "4.7" },
  { id: 7, name: "Traditional Badusha", category: "Traditional", price: 300, weight: "500 g", image: badusha, tag: "CLASSIC", rating: "4.8" },
  { id: 8, name: "Delicious Palkova", category: "Milk Sweets", price: 350, weight: "500 g", image: palkova, tag: "MILK SPECIAL", rating: "4.9" },
  { id: 9, name: "Homemade Adhirasam", category: "Traditional", price: 260, weight: "500 g", image: adhirasam, tag: "FESTIVE PICK", rating: "4.8" },
  { id: 10, name: "Flaky Soan Papdi", category: "Premium", price: 290, weight: "500 g", image: soanPapdi, tag: "LIGHT & SWEET", rating: "4.7" },
  { id: 11, name: "Soft Milk Peda", category: "Milk Sweets", price: 310, weight: "500 g", image: milkPeda, tag: "MILK SPECIAL", rating: "4.9" },
];

const categories = [
  { name: "Traditional Sweets", icon: "bi-stars", filter: "Traditional" },
  { name: "Premium Sweets", icon: "bi-gem", filter: "Premium" },
  { name: "Milk Sweets", icon: "bi-cup-hot", filter: "Milk Sweets" },
  { name: "Sweet Gift Boxes", icon: "bi-gift", filter: "All" },
];

const makingImages = [
  { image: making1, title: "Fresh Ingredients", text: "Carefully selected goodness." },
  { image: making2, title: "Traditional Preparation", text: "Made with familiar recipes." },
  { image: making3, title: "Handcrafted Sweets", text: "A little care in every piece." },
  { image: making4, title: "Ready to Share", text: "Packed for happy moments." },
];

const galleryImages = [
  { image: gallery1, alt: "Traditional Indian sweet assortment" },
  { image: gallery2, alt: "Beautiful festive sweet collection" },
  { image: gallery3, alt: "Premium mithai presentation" },
  { image: gallery4, alt: "Freshly prepared Indian sweets" },
  { image: gallery5, alt: "Traditional sweet gift packaging" },
  { image: gallery6, alt: "Delicious assorted mithai" },
];

const faqs = [
  {
    question: "What types of sweets do you offer?",
    answer: "We offer a variety of traditional Indian sweets, premium mithai, milk sweets and special sweet gift collections.",
  },
  {
    question: "Are your sweets freshly prepared?",
    answer: "Our concept focuses on freshly prepared sweets using carefully selected ingredients and traditional recipes.",
  },
  {
    question: "Can I order sweets for special occasions?",
    answer: "Yes. You can explore our sweet gift collection for birthdays, weddings, festivals and family celebrations.",
  },
  {
    question: "Do you offer customized gift boxes?",
    answer: "Our gift collection section is designed to showcase customized gifting options. Contact the shop to discuss availability.",
  },
  {
    question: "How can I contact Sweet Haven?",
    answer: "You can use the contact form below or reach us through the phone number, email and address displayed in the contact section.",
  },
  {
    question: "Do you provide home delivery?",
    answer: "Delivery availability depends on the shop location. Please contact us directly to confirm delivery options.",
  },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 850,
      once: true,
      offset: 65,
      easing: "ease-out-cubic",
    });

    const timer = setTimeout(() => {
      setLoading(false);
      AOS.refresh();
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3000);
    return () => clearTimeout(timer);
  }, [notice]);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const addToCart = (product) => {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id);

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });

    setNotice(`${product.name} added to your basket.`);
  };

  const updateContact = (event) => {
    const { name, value } = event.target;

    setContactForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submitContact = (event) => {
    event.preventDefault();

    const { name, email, phone, subject, message } = contactForm;

    const whatsappMessage = `
Hello Sweet Haven!

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}
    `;

    const whatsappNumber = "919876543210";

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );

    setContactForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleNewsletter = (event) => {
    event.preventDefault();
    setNotice("Thank you for joining our sweet family!");
    setEmail("");
  };

  return (
    <>
      {loading && (
        <div className="loading-screen">
          <div className="loader-content">
            
            <h1>SweetNest</h1>
            <p>MADE WITH LOVE, SHARED WITH JOY</p>
            <div className="loader-track"><span /></div>
            <small>PREPARING SOMETHING DELICIOUS...</small>
          </div>
          <div className="loader-decoration decoration-one">✿</div>
          <div className="loader-decoration decoration-two">✧</div>
        </div>
      )}

      <div className={`site-wrapper ${loading ? "site-hidden" : ""}`}>

        {/* NAVBAR */}

        <header className="main-header">
          <nav className="container-fluid nav-inner">

            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`} />
            </button>

            <button className="brand" onClick={() => scrollTo("home")}>
              
              <span>
                <strong>SweetNest</strong>
                
              </span>
            </button>

            <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
              <button onClick={() => scrollTo("home")}>Home</button>
              <button onClick={() => scrollTo("categories")}>Collections</button>
              <button onClick={() => scrollTo("products")}>Our Sweets</button>
              <button onClick={() => scrollTo("story")}>Our Story</button>
              <button onClick={() => scrollTo("gallery")}>Gallery</button>
              <button onClick={() => scrollTo("contact")}>Contact</button>
            </div>

            <button
              className="cart-button"
              onClick={() => scrollTo("basket")}
              aria-label={`Basket with ${cartCount} items`}
            >
              <i className="bi bi-bag-heart" />
              <span className="cart-label">Basket</span>
              <span className="cart-count">{cartCount}</span>
            </button>
          </nav>
        </header>

        <main>

          {/* HERO */}

          <section className="hero-section" id="home">
            <div className="hero-shape hero-shape-one" />
            <div className="hero-shape hero-shape-two" />

            <div className="container hero-container">
              <div className="row align-items-center hero-row">

                <div className="col-lg-6 hero-copy" data-aos="fade-right">
                  
                  <h1>
                    Life is sweeter
                    <br />
                    with a little
                    <br />
                    <span>Indian mithai.</span>
                  </h1>

                  <p className="hero-description">
                    From timeless family recipes to delightful little
                    indulgences, every sweet we make carries a story
                    of love, celebration and togetherness.
                  </p>

                  <div className="hero-actions">
                    <button
                      className="btn-primary-custom"
                      onClick={() => scrollTo("products")}
                    >
                      Explore our sweets
                      <i className="bi bi-arrow-up-right" />
                    </button>

                    <button
                      className="text-link"
                      onClick={() => scrollTo("story")}
                    >
                      Our little story
                      <i className="bi bi-arrow-right" />
                    </button>
                  </div>

                  <div className="hero-trust">
                    <div className="trust-icon">
                      <i className="bi bi-heart" />
                    </div>
                    <div>
                      <strong>Made fresh, every day</strong>
                      <span>Traditional goodness in every bite</span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 hero-visual" data-aos="fade-left">
                  <div className="hero-image-frame">
                    <img
                      src={heroSweets}
                      alt="Traditional Indian sweet collection"
                    />
                  </div>

                  <div className="hero-sticker">
                    <span>100%</span>
                    <small>LOVE IN<br />EVERY BITE</small>
                  </div>

                  <div className="floating-note">
                    <span className="note-flower">✿</span>
                    <div>
                      <strong>A little box of happiness</strong>
                      <small>Perfect for every occasion</small>
                    </div>
                  </div>
                </div>

              </div>
            </div>

           
          </section>

          {/* PROMISE STRIP */}

          <section className="promise-strip">
            <div className="container">
              <div className="row g-4">
                {[
                  ["bi-flower1", "Freshly Prepared"],
                  ["bi-heart-pulse", "Made with Love"],
                  ["bi-award", "Trusted Recipes"],
                  ["bi-gift", "Gifting Made Special"],
                ].map(([icon, text]) => (
                  <div className="col-6 col-lg-3" key={text}>
                    <div className="promise-item">
                      <i className={`bi ${icon}`} />
                      <span>{text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CATEGORIES */}

          <section className="categories-section section-padding" id="categories">
            <div className="container">
              <div className="section-heading" data-aos="fade-up">
               
                <h2>
                  Something lovely for <span>every craving.</span>
                </h2>
                <p>
                  Explore our little collection of treats, made for
                  big celebrations and everyday happy moments.
                </p>
              </div>

              <div className="row g-3 category-grid">
                {categories.map((category, index) => (
                  <div
                    className="col-6 col-lg-3"
                    key={category.name}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <button
                      className="category-card"
                      onClick={() => {
                        setActiveCategory(category.filter);
                        scrollTo("products");
                      }}
                    >
                      <span className="category-icon">
                        <i className={`bi ${category.icon}`} />
                      </span>
                      <strong>{category.name}</strong>
                      <span className="category-explore">
                        Explore <i className="bi bi-arrow-up-right" />
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PRODUCTS */}

          <section className="products-section section-padding" id="products">
            <div className="container">

              <div className="products-heading" data-aos="fade-up">
                <div className="section-heading section-heading-left">
                  
                  <h2>Little bites of <span>happiness.</span></h2>
                  <p>Our much-loved treats, ready to make your day.</p>
                </div>

                <div className="filter-buttons">
                  {["All", "Traditional", "Premium", "Milk Sweets"].map(
                    (category) => (
                      <button
                        key={category}
                        className={
                          activeCategory === category ? "filter-active" : ""
                        }
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="row g-4 product-grid">
                {filteredProducts.map((product, index) => (
                  <div
                    className="col-6 col-lg-4"
                    key={product.id}
                    data-aos="fade-up"
                    data-aos-delay={(index % 3) * 80}
                  >
                    <article className="product-card">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                        <span className="product-tag">{product.tag}</span>
                        <span className="product-rating">
                          <i className="bi bi-star-fill" /> {product.rating}
                        </span>
                      </div>

                      <div className="product-info">
                        <span className="product-category">
                          {product.category}
                        </span>
                        <h3>{product.name}</h3>

                        <div className="product-bottom">
                          <div>
                            <strong>₹{product.price}</strong>
                            <small>{product.weight}</small>
                          </div>

                          <button
                            className="add-button"
                            onClick={() => addToCart(product)}
                            aria-label={`Add ${product.name}`}
                          >
                            <i className="bi bi-plus-lg" />
                          </button>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* GIFT COLLECTION */}

          <section className="gift-section section-padding" id="gift-section">
            <div className="container">
              <div className="gift-banner" data-aos="zoom-in">
                <div className="gift-copy">
                  <span className="eyebrow">GIVE A LITTLE JOY</span>
                  <h2>
                    Some feelings
                    <br />
                    are best shared
                    <br />
                    <span>in a sweet box.</span>
                  </h2>
                  <p>
                    Make birthdays, festivals and just-because moments
                    memorable with a thoughtful box of traditional treats.
                  </p>
                  <button
                    className="btn-light-custom"
                    onClick={() => scrollTo("products")}
                  >
                    Explore sweet gifting
                    <i className="bi bi-arrow-up-right" />
                  </button>
                </div>

                <div className="gift-image">
                  <img src={giftBox} alt="Sweet gift box" />
                  <span className="gift-roundel">
                    A GIFT<br />FROM THE<br />HEART ✦
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* OUR STORY */}

          <section className="story-section section-padding" id="story">
            <div className="container">
              <div className="row align-items-center g-5">
                <div className="col-lg-6" data-aos="fade-right">
                  <div className="story-image-wrap">
                    <img src={aboutSweets} alt="Sweet Haven traditional sweets" />
                    <div className="story-image-caption">
                      <span>✿</span>
                      <div>
                        <strong>Rooted in tradition</strong>
                        <small>Made for today's happy moments</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 story-copy" data-aos="fade-left">
                  
                  <h2>
                    Not just sweets.
                    <br />
                    <span>Sweet memories.</span>
                  </h2>
                  <p>
                    Some of our happiest memories begin around a box of
                    sweets. A festival at home, a visit from someone dear,
                    or a simple cup of tea shared with family.
                  </p>
                  <p>
                    At Sweet Haven, we celebrate those moments with a
                    thoughtfully selected range of traditional favourites
                    and special treats.
                  </p>

                  <div className="story-points">
                    <div><i className="bi bi-check2-circle" /> Carefully selected ingredients</div>
                    <div><i className="bi bi-check2-circle" /> Traditional recipes</div>
                    <div><i className="bi bi-check2-circle" /> Sweet gifts for every occasion</div>
                  </div>

                  <button
                    className="text-link story-link"
                    onClick={() => scrollTo("contact")}
                  >
                    Come say hello <i className="bi bi-arrow-right" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SWEET MAKING PROCESS - EXTRA IMAGES */}

          <section className="making-section section-padding">
            <div className="container">
              <div className="section-heading" data-aos="fade-up">
                
                <h2>Made with care, <span>served with love.</span></h2>
                <p>
                  Every little detail makes the experience special.
                </p>
              </div>

              <div className="row g-4">
                {makingImages.map((item, index) => (
                  <div
                    className="col-6 col-lg-3"
                    key={item.title}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <article className="making-card">
                      <div className="making-image">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="making-info">
                        <span>0{index + 1}</span>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CUSTOMER REVIEWS */}

          <section className="testimonial-section section-padding">
            <div className="container">
              <div className="section-heading" data-aos="fade-up">
                
                <h2>Made sweeter by <span>you.</span></h2>
                <p>A few words that capture the joy of sharing something sweet.</p>
              </div>

              <div className="row g-4">
                {[
                  {
                    quote: "The kaju katli was delicious and beautifully presented. It made our family gathering feel extra special.",
                    name: "Uday",
                    place: "Krishnagiri",
                  },
                  {
                    quote: "The traditional flavours reminded me of sweets we used to enjoy at home during every festival.",
                    name: "Vidhya",
                    place: "Hosur",
                  },
                  {
                    quote: "A lovely gift idea for people you care about. The selection makes it easy to find a favourite.",
                    name: "Mozhli",
                    place: "Chennai",
                  },
                ].map((review, index) => (
                  <div
                    className="col-md-6 col-lg-4"
                    key={review.name}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <article className="review-card">
                      <div className="review-stars">★★★★★</div>
                      
                      <p>{review.quote}</p>
                      <div className="review-person">
                        <span className="review-avatar">
                          <i className="bi bi-person-heart" />
                        </span>
                        <div>
                          <strong>{review.name}</strong>
                          <small>{review.place}</small>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
              
            </div>
          </section>

          {/* EXTRA IMAGE GALLERY */}

          <section className="gallery-section section-padding" id="gallery">
            <div className="container">
              <div className="section-heading" data-aos="fade-up">
                
                <h2>A gallery full of <span>sweet moments.</span></h2>
                <p>
                  A little look at the treats, details and celebrations
                  that make every moment memorable.
                </p>
              </div>

              <div className="row g-3 gallery-grid">
                {galleryImages.map((item, index) => (
                  <div
                    className="col-6 col-lg-4"
                    key={index}
                    data-aos="zoom-in"
                    data-aos-delay={(index % 3) * 80}
                  >
                    <div className="gallery-image">
                      <img src={item.image} alt={item.alt} />
                      <div className="gallery-overlay">
                        <i className="bi bi-plus-circle" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ ACCORDION */}

          <section className="faq-section section-padding" id="faq">
            <div className="container">
              <div className="section-heading" data-aos="fade-up">
                
                <h2>Some sweet <span>answers.</span></h2>
                <p>
                  A few things you might want to know before choosing
                  your favourite treats.
                </p>
              </div>

              <div className="faq-wrapper" data-aos="fade-up">
                {faqs.map((faq, index) => (
                  <div
                    className={`faq-item ${openFaq === index ? "faq-active" : ""}`}
                    key={faq.question}
                  >
                    <button
                      className="faq-question"
                      onClick={() =>
                        setOpenFaq(openFaq === index ? -1 : index)
                      }
                      aria-expanded={openFaq === index}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>
                      <i
                        className={`bi ${
                          openFaq === index ? "bi-dash-lg" : "bi-plus-lg"
                        }`}
                      />
                    </button>

                    <div
                      className={`faq-answer ${
                        openFaq === index ? "faq-answer-open" : ""
                      }`}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SHOPPING BASKET */}

          <section className="basket-section section-padding" id="basket">
            <div className="container">
              <div className="basket-panel" data-aos="fade-up">
                <div className="basket-heading">
                  <div>
                    <span className="eyebrow">YOUR SWEET SELECTION</span>
                    <h2>Your little <span>basket.</span></h2>
                  </div>
                  <span className="basket-count-label">
                    {cartCount} {cartCount === 1 ? "item" : "items"}
                  </span>
                </div>

                {cart.length === 0 ? (
                  <div className="basket-empty">
                    <i className="bi bi-bag-heart" />
                    <h3>Your basket is waiting for a little sweetness.</h3>
                    <p>Choose your favourites and they will appear here.</p>
                    <button
                      className="btn-primary-custom"
                      onClick={() => scrollTo("products")}
                    >
                      Browse sweets <i className="bi bi-arrow-right" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="basket-items">
                      {cart.map((item) => (
                        <div className="basket-item" key={item.id}>
                          <img src={item.image} alt={item.name} />

                          <div className="basket-item-details">
                            <strong>{item.name}</strong>
                            <small>{item.weight}</small>
                            <span>₹{item.price} each</span>
                          </div>

                          <div className="quantity-controls">
                            <button
                              onClick={() =>
                                setCart((previous) =>
                                  previous
                                    .map((entry) =>
                                      entry.id === item.id
                                        ? { ...entry, quantity: entry.quantity - 1 }
                                        : entry
                                    )
                                    .filter((entry) => entry.quantity > 0)
                                )
                              }
                            >−</button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                setCart((previous) =>
                                  previous.map((entry) =>
                                    entry.id === item.id
                                      ? { ...entry, quantity: entry.quantity + 1 }
                                      : entry
                                  )
                                )
                              }
                            >+</button>
                          </div>

                          <strong className="basket-line-total">
                            ₹{item.price * item.quantity}
                          </strong>
                        </div>
                      ))}
                    </div>

                    <div className="basket-summary">
                      <span>Subtotal</span>
                      <strong>₹{cartTotal}</strong>
                    </div>

                    <p className="basket-disclaimer">
                      Demo basket only. Online payment is not connected.
                    </p>

                    <button
                      className="btn-primary-custom"
                      onClick={() =>
                        setNotice("Your demo basket is ready. Connect a checkout service for real orders.")
                      }
                    >
                      Continue <i className="bi bi-arrow-right" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* NEWSLETTER */}

          <section className="newsletter-section">
            <div className="container">
              <div className="newsletter-inner" data-aos="fade-up">
                
                <h2>A little sweetness in <span>your inbox.</span></h2>
                <p>
                  Get the occasional sweet update, festive inspiration
                  and a little note from us.
                </p>

                <form className="newsletter-form" onSubmit={handleNewsletter}>
                  <label className="visually-hidden" htmlFor="newsletter-email">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Your email address"
                    required
                  />
                  <button type="submit">
                    Count me in <i className="bi bi-arrow-right" />
                  </button>
                </form>

               
              </div>
            </div>
          </section>

          {/* CONTACT PAGE / SECTION */}

          <section className="contact-section section-padding" id="contact">
            <div className="container">
              <div className="section-heading" data-aos="fade-up">
                
                <h2>Let's have a <span>sweet conversation.</span></h2>
                <p>
                  Planning a celebration, looking for a gift or simply
                  have a question? Drop us a little message.
                </p>
              </div>

              <div className="row g-4 contact-layout">

                <div className="col-lg-5" data-aos="fade-right">
                  <div className="contact-information">
                    <span className="eyebrow">GET IN TOUCH</span>
                    <h3>We're just a message away.</h3>
                    <p>
                      Whether it is a family celebration or a small
                      sweet craving, we are happy to help.
                    </p>

                    <div className="contact-info-item">
                      <span><i className="bi bi-geo-alt" /></span>
                      <div>
                        <strong>Our Location</strong>
                        <p>Puliyampatti, Krishnagiri, Tamilnadu</p>
                      </div>
                    </div>

                    <div className="contact-info-item">
                      <span><i className="bi bi-telephone" /></span>
                      <div>
                        <strong>Call Us</strong>
                        <a href="tel:+919342568375">+91 93425 68375</a>
                      </div>
                    </div>

                    <div className="contact-info-item">
                      <span><i className="bi bi-envelope" /></span>
                      <div>
                        <strong>Email Us</strong>
                        <a href="mailto:uday@sweetnest.com">
                          uday@sweetnest.com
                        </a>
                      </div>
                    </div>

                    <div className="contact-info-item">
                      <span><i className="bi bi-clock" /></span>
                      <div>
                        <strong>Opening Hours</strong>
                        <p>Monday – Sunday | 9 AM – 9 PM</p>
                      </div>
                    </div>

                    <div className="contact-socials">
                      <a href="https://www.instagram.com/" aria-label="Instagram">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="https://www.facebook.com/" aria-label="Facebook">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="https://www.whatsapp.com/" aria-label="WhatsApp">
                        <i className="bi bi-whatsapp" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7" data-aos="fade-left">
                  <form
                    className="contact-form"
                    onSubmit={submitContact}
                  >
                    <h3>Send us a message</h3>
                    <p>Fill in the details and we will be happy to connect.</p>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="contact-name">Your Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={contactForm.name}
                          onChange={updateContact}
                          placeholder="Enter your name"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="contact-email">Email Address</label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={contactForm.email}
                          onChange={updateContact}
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="contact-phone">Phone Number</label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          value={contactForm.phone}
                          onChange={updateContact}
                          placeholder="Enter your phone"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="contact-subject">Subject</label>
                        <select
                          id="contact-subject"
                          name="subject"
                          value={contactForm.subject}
                          onChange={updateContact}
                          required
                        >
                          <option value="">Choose a subject</option>
                          <option value="Sweet Orders">Sweet Orders</option>
                          <option value="Gift Boxes">Gift Boxes</option>
                          <option value="Bulk Orders">Bulk Orders</option>
                          <option value="General Enquiry">General Enquiry</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <label htmlFor="contact-message">Your Message</label>
                        <textarea
                          id="contact-message"
                          name="message"
                          value={contactForm.message}
                          onChange={updateContact}
                          placeholder="Tell us how we can help..."
                          rows="5"
                          required
                        />
                      </div>

                      <div className="col-12">
                        <button className="btn-primary-custom" type="submit">
                          Send Message
                          <i className="bi bi-whatsapp" />
                        </button>
                      </div>
                    </div>

                  </form>
                </div>

              </div>
            </div>
          </section>

          {/* FOOTER */}

        </main>

        <footer className="site-footer">
          <div className="container">
            <div className="row g-4 footer-main">

              <div className="col-lg-5 footer-brand-column">
                <button
                  className="brand footer-brand"
                  onClick={() => scrollTo("home")}
                >
                  
                  <span>
                    <strong>SweetNest</strong>
                    
                  </span>
                </button>

                <p>
                  Celebrating life's little moments with traditional
                  favourites, thoughtful gifting and a whole lot of love.
                </p>

                <div className="social-links">
                  <a href="https://www.instagram.com/" aria-label="Instagram">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="https://www.facebook.com/" aria-label="Facebook">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="https://www.pinterest.com/" aria-label="Pinterest">
                    <i className="bi bi-pinterest" />
                  </a>
                </div>
              </div>

              <div className="col-6 col-lg-2 footer-links-column">
                <h3>Explore</h3>
                <button onClick={() => scrollTo("home")}>Home</button>
                <button onClick={() => scrollTo("categories")}>Collections</button>
                <button onClick={() => scrollTo("products")}>Our sweets</button>
                <button onClick={() => scrollTo("story")}>Our story</button>
              </div>

              <div className="col-6 col-lg-2 footer-links-column">
                <h3>Discover</h3>
                <button onClick={() => scrollTo("gift-section")}>Gifting</button>
                <button onClick={() => scrollTo("gallery")}>Gallery</button>
                <button onClick={() => scrollTo("faq")}>FAQs</button>
                <button onClick={() => scrollTo("contact")}>Contact</button>
              </div>

              <div className="col-lg-3 footer-contact-column">
                <h3>Sweet little hello</h3>
                <p>Have a question or planning a special celebration?</p>
                <button
                  className="footer-contact-link"
                  onClick={() => scrollTo("contact")}
                >
                  Let's talk <i className="bi bi-arrow-up-right" />
                </button>
                <div className="footer-hours">
                  <i className="bi bi-heart" />
                  Made with care, shared with joy.
                </div>
              </div>

            </div>

            <div className="footer-bottom">
              <span>
                © {new Date().getFullYear()} SweetNest. All rights reserved.
              </span>
              <span>Small treats. Big happy moments. </span>
            </div>
          </div>
        </footer>

        {/* TOAST */}

        {notice && (
          <div className="toast-message" role="status">
            <i className="bi bi-check-circle-fill" />
            <span>{notice}</span>
            <button onClick={() => setNotice("")} aria-label="Close message">
              <i className="bi bi-x-lg" />
            </button>
          </div>
        )}

        {/* BACK TO TOP */}

        <button
          className="back-to-top"
          onClick={() => scrollTo("home")}
          aria-label="Back to top"
        >
          <i className="bi bi-arrow-up" />
        </button>

      </div>
    </>
  );
}

export default App;
