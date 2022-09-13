import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";
import FullWidthImage from "../components/FullWidthImage";
import Content, { HTMLContent } from '../components/Content';

// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  content,
}) => {

  console.log(image)
  const heroImage = getImage('img/station.jpg')

  const {frontmatter, html} = content

  return (
    <div>
      <FullWidthImage img={heroImage} />
      <section className='section section--gradient'>
        <div className='container'>
          <div className='section'>
            <div className='columns'>
              <div className='column is-10 is-offset-1'>
                <div className='content'>
                  <div className='content'>
                    <div className='tile'>
                      <h1 className='has-text-weight-semibold is-size-2'>
                        {frontmatter.title}
                      </h1>
                    </div>
                    <div className='tile'>
                      <h3 className='subtitle'>{frontmatter.subtitle}</h3>
                    </div>
                    <div className='tile'>
                      <HTMLContent
                        className='content'
                        content={html}
                      />
                    </div>
                  </div>
                  <div className='column is-12'>
                    <h3 className='has-text-weight-semibold is-size-2'>
                      Latest stories
                    </h3>
                    <BlogRoll />
                    <div className='column is-12 has-text-centered'>
                      <Link className='btn' to='/blog'>
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  main: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => {

  console.log(data)
  return (
    <Layout>
      <IndexPageTemplate
        image={data.markdownRemark.image}
        content={data.markdownRemark}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        subtitle
      }
      html
    }
  }
`;
