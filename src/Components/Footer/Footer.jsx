import React from 'react';

const Footer = () => {
    return (
<footer className="text-center text-lg-start bg-light text-muted">
  <section
    className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
  >
    <div className="me-5 d-none d-lg-block">
      <span>Узнай первым о распродажах, акциях и получай специальные промокоды на скидку!</span>
    </div>

    <div>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-google"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-linkedin"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-github"></i>
      </a>
    </div>
  </section>

  <section className="">
    <div className="container text-center text-md-start mt-5">
      <div className="row mt-3">
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h2 className="text-uppercase fw-bold mb-4">
            <i className="fas fa-gem me-3">Обувь SHOP</i>
          </h2>
          <p>
            Качественная обувь только у нас, приходите!
          </p>
        </div>

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Сервис
          </h6>
          <p>
            <a href="#!" className="text-reset">Доставка</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Оплата</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Условия Продажи</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Гарантия</a>
          </p>
        </div>

        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Прочее
          </h6>
          <p>
            <a href="#!" className="text-reset">Цены</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Настройки</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Остальное</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Служба поддержки</a>
          </p>
        </div>

        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Контакт
          </h6>
          <p>
            <i className="fas fa-envelope me-3"></i>
            zenden@example.ru
          </p>
          <p><i className="fas fa-phone me-3"></i> + 8 800 600 90 39</p>
          <p><i className="fas fa-print me-3"></i> + 8 495 481 55 55</p>
        </div>
      </div>
    </div>
  </section>

  <div className="text-center p-4" style={{backgroundColor:'white'}}>
  ©2005-2022 ZENDEN Group
      <a className="text-reset fw-bold" href="https://zenden.ru/">Zenden.ru</a>
  </div>
</footer>
    );
};

export default Footer;