
import "../styles/footer.css"
const Footer = () => {
  return (
    <>
      <footer class="pt-5 pb-4">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6 col-12 mb-4">
              <h5 class="fw-bold mb-3">🎬 Tickey</h5>
              <p class="small">
                Your trusted destination for booking tickets, exploring movies,
                and staying updated with the latest releases.
              </p>
            </div>

            <div class="col-lg-2 col-md-6 col-6 mb-4">
              <h6 class="fw-bold mb-3">Quick Links</h6>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <a href="#" class="text-decoration-none">
                    Home
                  </a>
                </li>
                <li class="mb-2">
                  <a href="#" class="text-decoration-none">
                    Movies
                  </a>
                </li>
                <li class="mb-2">
                  <a href="#" class="text-decoration-none">
                    Offers
                  </a>
                </li>
                <li>
                  <a href="#" class="text-decoration-none">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-lg-2 col-md-6 col-6 mb-4">
              <h6 class="fw-bold mb-3">Support</h6>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <a href="#" class="text-decoration-none">
                    FAQ
                  </a>
                </li>
                <li class="mb-2">
                  <a href="#" class="text-decoration-none">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" class="text-decoration-none">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-lg-4 col-md-6 col-12 mb-4">
              <h6 class="fw-bold mb-3">Follow Us</h6>
              <div class="d-flex gap-3">
                <a href="#" class="social-icon">
                  <i class="bi bi-facebook"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="bi bi-instagram"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="bi bi-twitter-x"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="bi bi-youtube"></i>
                </a>
              </div>
            </div>
          </div>

          <hr class="border-secondary opacity-25 my-4" />

          <div class="text-center small">
            © 2025 Tickey Cinema. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
