import React from "react";
import { Link } from "react-router-dom";
import "../../resources/css/Landing.css";

class Landing extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <header className="masthead d-flex">
          <div className="container text-center my-auto">
            <h1 className="font">Telequest</h1>
            <h3 className="mb-5">
              <em>Tell Your Questions</em>
            </h3>
            <Link
              className="btn btn-primary btn-xl js-scroll-trigger"
              to="/register"
            >
              Sign Up
            </Link>
          </div>
          <div className="overlay" />
        </header>

        <section className="content-section bg-light" id="about">
          <div className="container text-center">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <h2>Watch Learn Ask Answer</h2>
                <p className="lead mb-5">
                  Our project provides a new streaming platform that focuses on
                  content interaction rather than content digestion.
                </p>
                <a
                  className="btn btn-dark btn-xl js-scroll-trigger"
                  href="#Cases"
                >
                  What We Offer
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="content-section bg-color1 text-white text-center"
          id="Cases"
        >
          <div className="container">
            <div className="content-section-heading">
              <h3 className="text-primary mb-0">Use Cases</h3>
              <h2 className="mb-5">How is Our Application Useful?</h2>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                <span className="service-icon rounded-circle mx-auto mb-3">
                  <i className="icon-distance" />
                </span>
                <h4>
                  <strong>Distance</strong>
                </h4>
                <p className="text-faded mb-0">
                  Learn and teach regardless of location.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                <span className="service-icon rounded-circle mx-auto mb-3">
                  <i className="icon-education" />
                </span>
                <h4>
                  <strong>Education</strong>
                </h4>
                <p className="text-faded mb-0">
                  Learn everything with online educational courses.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
                <span className="service-icon rounded-circle mx-auto mb-3">
                  <span className="icon-career" />
                </span>
                <h4>
                  <strong>Career</strong>
                </h4>
                <p className="text-faded mb-0">
                  Developers or office workers can conduct projects online in
                  real time.
                </p>
              </div>
              <div className="col-lg-3 col-md-6">
                <span className="service-icon rounded-circle mx-auto mb-3">
                  <i className="icon-presentation" />
                </span>
                <h4>
                  <strong>Presentations</strong>
                </h4>
                <p className="text-faded mb-0">
                  Give a live presentations to any organization or individual.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="callout">
          <div className="container text-center">
            <h2 className="mx-auto mb-5 font2">
              Teach others with simple platform!
            </h2>
            <Link
              className="btn btn-primary btn-xl js-scroll-trigger"
              to="/streams"
            >
              Start Stream
            </Link>
          </div>
        </section>

        <section className="content-section bg-color2 text-white">
          <div className="container text-center">
            <h2 className="mb-4">Something to Add more in here</h2>
          </div>
        </section>
      </div>
    );
  }
}

export default Landing;
